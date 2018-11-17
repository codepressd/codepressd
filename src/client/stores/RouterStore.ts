import * as Types from '../../shared/Types';
import * as _ from 'lodash';
import * as __ from '../helpers';
import * as Routing from '../router';
import { RoutePattern } from '../router/RoutePattern';
import { createBrowserHistory } from 'history';

import { observable, action, toJS } from 'mobx';

export class RouterStore {
    rootStore: Types.RootStore;
    @observable matchedRoute: Routing.IMatchedRoute;
    history: any = createBrowserHistory();
    LinkFor: Routing.ILinkRoutes = {};
    routePatterns: Array<[Routing.IRoutePatternType, any, Routing.Page, string]>;

    constructor(rootStore: Types.RootStore) {
        this.rootStore = rootStore;
        this.beginListener();
    }

    route = (pathName: string) => {
        const hash = pathName;
        const matchedRoute = this.matchRoute(hash);
        this.setMatchedRoute(matchedRoute);
    };

    push = (hash: string, state?: any) => {
        if (state) {
            this.history.push(hash, state);
        } else {
            this.history.push(hash);
        }
    };

    @action
    setMatchedRoute = (matchedRoute: Routing.IMatchedRoute) => {
        this.matchedRoute = matchedRoute;
    };

    beginListener = () => {
        let fullUrl = this.history.location.pathname + location.search;
        this.createRoutePatterns(Routing.Routes);
        this.route(fullUrl);

        this.history.listen((location: any) => {
            fullUrl = location.pathname + location.search;
            this.route(fullUrl);
        });

        // So we can check what links are available
        if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
            window['LinkFor'] = this.LinkFor;
            window['RoutePatterns'] = this.routePatterns;
            window['rootStore'] = this.rootStore;
        }
    };

    createRoutePatterns = (Routes: Array<[string, React.ComponentType, Routing.Page, string]>) => {
        if (!this.routePatterns) {
            // lazy init
            this.routePatterns = __.mapOver4(
                Routes,
                routePattern => new RoutePattern(routePattern),
            );
            this.createLinks(this.routePatterns);
        }
    };

    createLinks = (
        RoutePatterns: Array<
            [Routing.IRoutePatternType, React.ComponentType, Routing.Page, string]
        >,
    ) => {
        RoutePatterns.map(routePattern => {
            function returnLink() {
                return (params = {}) => {
                    return routePattern[0].createHash(
                        __.mapObject(params, param => encodeURIComponent(param)),
                    );
                };
            }
            const objectKey = __.camelize(routePattern[2]);
            this.LinkFor[objectKey] = returnLink();
        });
    };

    matchRoute = (route: string) => {
        const routePatterns = this.routePatterns;
        for (const [routePattern, component, page, title] of routePatterns) {
            const { didMatch, matchedParams } = routePattern.matchHash(route);
            if (didMatch) {
                return {
                    matchedPage: page,
                    matchedComponent: component,
                    matchedTitle: title,
                    matchedParams: __.mapObject(matchedParams, param => decodeURIComponent(param)),
                    matchedPattern: routePattern,
                    standardizedPath: routePattern.createHash(matchedParams),
                };
            }
        }
        return;
    };

    /**
     * Takes a hash and returns it with any new query params that apply to it.
     * Replaces existing query params with new ones. Throws if the hash did not
     * match.
     */
    changeQueryParams = (hash: string, params: { [key: string]: string | undefined } | {}) => {
        const maybeMatchedRoute = this.matchRoute(hash);
        if (_.isUndefined(maybeMatchedRoute)) {
            throw new Error('`putQueryParams` failed: route did not match');
        }

        const { matchedParams, matchedPattern } = maybeMatchedRoute;
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                matchedParams[key] = params[key];
            }
        }
        return matchedPattern.createHash(matchedParams); // Hack it should always be defined
    };
}
