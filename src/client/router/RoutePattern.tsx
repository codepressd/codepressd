import { IParsedPatternSegment, PatternType } from './index';
import * as _ from 'lodash';

export class RoutePattern {
    /**
     * The order of these segments is the same as the original pattern.
     */
    private parsedPatternSegments: IParsedPatternSegment[];

    /**
     * Takes string patterns of the form:
     *
     *      "sites/:siteAlias/shoppers/:shopperId?profile=collapsed&tab=Current"
     */
    constructor(private readonly pattern: string) {
        if (_.isEmpty(pattern)) {
            throw new Error('Cannot have an empty pattern');
        }

        const { segments, queryParams } = getHashAndQuerySegments(pattern);
        this.parsedPatternSegments = [];
        let segmentNumber = 0;

        // Parse the segments.
        for (const segment of segments) {
            const aNumber = segmentNumber++;
            let type: PatternType;
            let name: string;

            if (segment[0] === ':') {
                type = PatternType.Variable;
                name = segment.substr(1);
            } else {
                type = PatternType.Literal;
                name = segment;
            }
            this.parsedPatternSegments.push({ type, name, number: aNumber });
        }

        // Parse the query params, if any.
        if (!_.isEmpty(queryParams)) {
            _.forOwn(queryParams, (value, key) => {
                const aNumber = segmentNumber++;

                this.parsedPatternSegments.push({
                    type: PatternType.Query,
                    name: key,
                    number: aNumber,
                    value, // may be undefined
                });
            });
        }
    }

    get patternString(): string {
        return this.pattern;
    }

    /**
     * Create a proper URL hash from the pattern. You are expected to pass in an
     * object with a field corresponding to name of each variable in the pattern
     * (which are prefixed with a colon, `:`, in the pattern syntax), along with
     * the value you want to set it to. You may also pass in fields that
     * correspond to query parameters in the pattern, but it is not required.
     */
    createHash(parameters: { [key: string]: string | undefined } | {}): string {
        let segments: string[] = [];
        let queryParams: string[] = [];
        for (const parsedPatternSegment of this.parsedPatternSegments) {
            if (parsedPatternSegment.type === PatternType.Literal) {
                segments.push(parsedPatternSegment.name);
            } else if (parsedPatternSegment.type === PatternType.Variable) {
                segments.push(parameters[parsedPatternSegment.name] || 'MISSING');
            } else if (parsedPatternSegment.type === PatternType.Query) {
                const queryParamValue =
                    parameters[parsedPatternSegment.name] !== undefined
                        ? parameters[parsedPatternSegment.name]!.replace('%2B', '+') // little ghetto work around... uridecode was not working properly
                        : parameters[parsedPatternSegment.name];
                if (queryParamValue) {
                    queryParams.push(`${parsedPatternSegment.name}=${queryParamValue}`);
                }
            } else {
                throw new Error('Invalid');
            }
        }

        let result = '/' + segments.join('/');
        if (!_.isEmpty(queryParams)) {
            result += '?' + queryParams.join('&');
        }
        return result;
    }

    /**
     * Match against a URL hash. Returns whether or not the route matched, along
     * with an object containing all of the matching variable and query
     * parameters and their values.
     */
    matchHash(
        hash: string,
    ): {
        didMatch: boolean;
        matchedParams: { [key: string]: string };
    } {
        const hashSegmentsAndQueryParams = getHashAndQuerySegments(hash);
        const hashSegments = hashSegmentsAndQueryParams.segments;
        const hashQueryParams = hashSegmentsAndQueryParams.queryParams;
        let matchedParams: { [key: string]: string } = {};

        for (const parsedPatternSegment of this.parsedPatternSegments) {
            if (parsedPatternSegment.type === PatternType.Literal) {
                if (hashSegments[parsedPatternSegment.number] !== parsedPatternSegment.name) {
                    return { didMatch: false, matchedParams };
                }
            } else if (parsedPatternSegment.type === PatternType.Variable) {
                matchedParams[parsedPatternSegment.name] =
                    hashSegments[parsedPatternSegment.number];
            } else if (parsedPatternSegment.type === PatternType.Query) {
                matchedParams[parsedPatternSegment.name] =
                    hashQueryParams[parsedPatternSegment.name];
            } else {
                throw new Error('Invalid');
            }
        }
        return { didMatch: true, matchedParams };
    }
}

/**
 * Separates out the segments and query params from the hash. Works on both
 * real hashes, and patterns.
 *
 * Example:
 *
 *      getHashAndQuerySegments("/sites/dakineUS/insight?adminView=true")
 *
 * would return
 *
 *      { segments: ["sites", "dakineUS", "insight"],
 *        queryParams: { adminView: true } }
 */

function getHashAndQuerySegments(
    hash: string,
): {
    segments: string[];
    queryParams: { [key: string]: string };
} {
    if (_.isEmpty(hash)) {
        return { segments: [], queryParams: {} };
    }
    // Strip off possible hash prefixes that aren't needed in matching.
    if (hash[0] === '/') {
        hash = hash.substr(1);
    } else if (hash.substr(0, 2) === '#/') {
        hash = hash.substr(2);
    } else {
        return;
    }

    const segments = hash.split('/');

    // Check the last segment for query params.
    const [lastSegment] = segments.splice(segments.length - 1);
    const [segment, maybeQueryParamString] = lastSegment.split('?');
    segments.push(segment);

    const queryParams = {};
    if (maybeQueryParamString) {
        const queryParamList = maybeQueryParamString
            .split('&')
            .map(queryParamSegment => queryParamSegment.split('='));

        queryParamList.forEach(([key, value]) => (queryParams[key] = value));
    }

    return { segments, queryParams };
}
