import * as React from "react";
import { reaction } from "mobx";
import { observer, inject } from "mobx-react";
import * as _ from "lodash";
import * as __ from '../helpers';

//import * as Stored from "./Stored";
import * as Types from "../../shared/Types";
//import * as __ from "./LodashExtensions";

import Home from '../components/views/Home';
import About from '../components/views/About';
import Contact from '../components/views/Contact';
import Projects from '../components/views/Projects';

const prefix = "Codepressd - ";
/**
 * You need to add to this enum when you create a new page.
 * Also when we create links for the page we use this enum
 * This can be done better in the future, but There is quite
 * a few pages that reference this and I didn't want to rip
 * them all apart.
 */

export enum Page {
    Home = "Home",
    About = "About",
    Projects = "Projects",
    Contact = "Contact",
}


/////////////////////////
// Declare Routes Here //
/////////////////////////

export const Routes: [string, React.ComponentType, Page, string][] = [
    ["/", Home, Page.Home, prefix + "Home"],
    ["/about", About, Page.About, prefix + "About"],
    ["/contact", Contact, Page.Contact, prefix + "Get In Touch"],
    ["/projects?project", Projects, Page.Projects, ""],
];


/**
 * Our pattern syntax supports three ways of matching.
 *
 * By a string: "/about/me" 
 *
 * By a Variable: "about/:customer/info" finds :customer and that value is entered
 * in the matchedRoute inside RouterStore as:
 *    matchedParams : { customer: "some value"}
 *
 * By QueryParam: "about/:customer/info?name&phone will find the :customer but will 
 * also find name and phone. Once again that will be added to matchedParams:
 *    matchedParams:{customer: "some value", name: "some value", phone: "some value"}
 *
 * An appropriate value must be provided for each variable when generating one
 * of these urls, and strings are the only supported type for variables and
 * query param values.
 */

enum PatternType {
    Literal,
    Variable,
    Query,
}

export interface MatchedRoute {
    matchedPage: Page;
    matchedComponent: any;
    matchedTitle?: string;
    matchedParams: { [key: string]: string } | {};
    matchedPattern: RoutePattern;
    standardizedPath: string; // ensure that the input hash is standardized
}

export interface ParsedPatternSegment {
    type: PatternType;
    name: string;
    number: number;
    value?: string; // for PatternType.Query
}

export interface LinkRoutes {
    [key: string]: (params?: {}) => any;
}

/**
 * This is the component that switches which one to show depending on the matched route
 */

interface RouterState {
    matchedRoute?: MatchedRoute;
}

@observer
export class Router_ extends React.Component<any, RouterState> {
    rootStore: Types.RootStore = this.props["rootStore"];
    uiState = this.rootStore.uiState;
    routerStore = this.rootStore.routerStore;

    constructor(props: any) {
        super(props);

        this.state = {
            matchedRoute: this.routerStore.matchedRoute,
        };

        reaction(
            () => this.routerStore.matchedRoute,
            (matchedRoute: any) => this.setState({ matchedRoute }),
        );
    }

    shouldComponentUpdate(nextProps: any, nextState: RouterState) {
        if (
            nextState.matchedRoute &&
            this.state.matchedRoute &&
            nextState.matchedRoute.matchedPage === this.state.matchedRoute.matchedPage
        ) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        const { matchedRoute } = this.state;
        const Component = matchedRoute ? matchedRoute.matchedComponent : Home;
        return <Component {...(matchedRoute ? matchedRoute.matchedParams : {})} />;
    }
}
export const Router = inject("rootStore")(Router_);


export class RoutePattern {
    /**
     * The order of these segments is the same as the original pattern.
     */
    private parsedPatternSegments: ParsedPatternSegment[];

    /**
     * Takes string patterns of the form:
     *
     *      "sites/:siteAlias/shoppers/:shopperId?profile=collapsed&tab=Current"
     */
    constructor(private readonly pattern: string) {
        if (_.isEmpty(pattern)) throw "Cannot have an empty pattern";

        const { segments, queryParams } = getHashAndQuerySegments(pattern);
        this.parsedPatternSegments = [];
        let segmentNumber = 0;

        // Parse the segments.
        for (let segment of segments) {
            const number = segmentNumber++;
            let type: PatternType;
            let name: string;

            if (segment[0] === ":") {
                type = PatternType.Variable;
                name = segment.substr(1);
            } else {
                type = PatternType.Literal;
                name = segment;
            }
            this.parsedPatternSegments.push({ type, name, number });
        }

        // Parse the query params, if any.
        if (!_.isEmpty(queryParams)) {
            _.forOwn(queryParams, (value, key) => {
                const number = segmentNumber++;

                this.parsedPatternSegments.push({
                    type: PatternType.Query,
                    name: key,
                    number,
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
                segments.push(parameters[parsedPatternSegment.name] || "MISSING");
            } else if (parsedPatternSegment.type === PatternType.Query) {
                const queryParamValue =
                    parameters[parsedPatternSegment.name] !== undefined
                        ? parameters[parsedPatternSegment.name]!.replace("%2B", "+") // little ghetto work around... uridecode was not working properly
                        : parameters[parsedPatternSegment.name];
                queryParamValue &&
                    queryParams.push(`${parsedPatternSegment.name}=${queryParamValue}`);
            } else throw "Invalid";
        }

        let result = "/" + segments.join("/");
        if (!_.isEmpty(queryParams)) {
            result += "?" + queryParams.join("&");
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

        for (let parsedPatternSegment of this.parsedPatternSegments) {
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
            } else throw "Invalid";
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
export function getHashAndQuerySegments(
    hash: string,
): {
        segments: string[];
        queryParams: { [key: string]: string };
    } {
    if (_.isEmpty(hash)) {
        return { segments: [], queryParams: {} };
    }
    // Strip off possible hash prefixes that aren't needed in matching.
    if (hash[0] === "/") {
        hash = hash.substr(1);
    } else if (hash.substr(0, 2) === "#/") {
        hash = hash.substr(2);
    } else {
    }

    const segments = hash.split("/");

    // Check the last segment for query params.
    const [lastSegment] = segments.splice(segments.length - 1);
    const [segment, maybeQueryParamString] = lastSegment.split("?");
    segments.push(segment);

    let queryParams = {};
    if (maybeQueryParamString) {
        const queryParamList = maybeQueryParamString
            .split("&")
            .map(queryParamSegment => queryParamSegment.split("="));

        queryParamList.forEach(([key, value]) => (queryParams[key] = value));
    }

    return { segments, queryParams };
}
