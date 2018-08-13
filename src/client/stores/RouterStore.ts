import * as Types from "../../shared/Types";
import * as _ from 'lodash';
import * as __ from '../helpers';
import * as Routing from '../router';
import { createBrowserHistory } from 'history';

import { observable, action, toJS } from 'mobx';

export class RouterStore {
    rootStore: Types.RootStore;
    constructor(rootStore: Types.RootStore) {
        this.rootStore = rootStore;
        this.beginListener();
    }

    @observable matchedRoute: Routing.MatchedRoute;

    history: any = createBrowserHistory();
    LinkFor: Routing.LinkRoutes = {};
    routePatterns: [Routing.RoutePattern, any, Routing.Page, string][];

    route = (pathName: string) => {
        const hash = pathName;
        const matchedRoute = this.matchRoute(hash);
        this.setMatchedRoute(matchedRoute);
    }

    push = (hash: string, state?: any) => {
        if (state) {
            this.history.push(hash, state);
        } else {
            this.history.push(hash);
        }
    };

    @action
    setMatchedRoute = (matchedRoute: Routing.MatchedRoute) => {
        this.matchedRoute = matchedRoute;
    }

    beginListener = () => {
        let fullUrl = this.history.location.pathname + location.search;
        this.createRoutePatterns(Routing.Routes);
        this.route(fullUrl);

        this.history.listen((location: any) => {
            fullUrl = location.pathname + location.search;
            this.route(fullUrl);
        });

        // So we can check what links are available
        if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test") {
            window["LinkFor"] = this.LinkFor;
            window["RoutePatterns"] = this.routePatterns;
            window["rootStore"] = this.rootStore;
        }
    }

    createRoutePatterns = (Routes: [string, React.ComponentType, Routing.Page, string][]) => {
        if (!this.routePatterns) {
            // lazy init
            this.routePatterns = __.mapOver4(Routes, routePattern => new Routing.RoutePattern(routePattern));
            this.createLinks(this.routePatterns);
        }
    }

    createLinks = (RoutePatterns: [Routing.RoutePattern, React.ComponentType, Routing.Page, string][]) => {
        RoutePatterns.map(routePattern => {
            function returnLink() {
                return function (params = {}) {
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
        if (_.isUndefined(maybeMatchedRoute))
            throw new Error("`putQueryParams` failed: route did not match");

        const { matchedParams, matchedPattern } = maybeMatchedRoute;
        for (const key in params) {
            const newParam = params[key];
            if (newParam) {
                matchedParams[key] = newParam;
            }
        }
        return matchedPattern.createHash(matchedParams); // Hack it should always be defined
    }
}