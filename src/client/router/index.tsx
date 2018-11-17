import * as React from 'react';
import { reaction } from 'mobx';
import { observer, inject } from 'mobx-react';
import * as _ from 'lodash';
import * as __ from '../helpers';

import * as Types from '../../shared/Types';

import Home from '../components/views/Home';
import About from '../components/views/About';
import Contact from '../components/views/Contact';
import Projects from '../components/views/Projects';
import { RoutePattern, RoutePattern as RoutePatternType } from './RoutePattern';

export type IRoutePatternType = RoutePatternType;

const prefix = 'Codepressd - ';
/**
 * You need to add to this enum when you create a new page.
 * Also when we create links for the page we use this enum
 * This can be done better in the future, but There is quite
 * a few pages that reference this and I didn't want to rip
 * them all apart.
 */

export enum Page {
    Home = 'Home',
    About = 'About',
    Projects = 'Projects',
    Contact = 'Contact',
}

/////////////////////////
// Declare Routes Here //
/////////////////////////

export const Routes: Array<[string, React.ComponentType, Page, string]> = [
    ['/', Home, Page.Home, prefix + 'Home'],
    ['/about', About, Page.About, prefix + 'About'],
    ['/contact', Contact, Page.Contact, prefix + 'Get In Touch'],
    ['/projects?project', Projects, Page.Projects, ''],
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

export enum PatternType {
    Literal,
    Variable,
    Query,
}

export interface IMatchedRoute {
    matchedPage: Page;
    matchedComponent: any;
    matchedTitle?: string;
    matchedParams: { [key: string]: string } | {};
    matchedPattern: RoutePattern;
    standardizedPath: string; // ensure that the input hash is standardized
}

export interface IParsedPatternSegment {
    type: PatternType;
    name: string;
    number: number;
    value?: string; // for PatternType.Query
}

export interface ILinkRoutes {
    [key: string]: (params?: {}) => any;
}

/**
 * This is the component that switches which one to show depending on the matched route
 */

interface IRouterState {
    matchedRoute?: IMatchedRoute;
}

interface Injected {
    rootStore: Types.RootStore;
}

@inject('rootStore')
@observer
export class Router extends React.Component<any, IRouterState> {
    uiState = this.injected.rootStore.uiState;
    routerStore = this.injected.rootStore.routerStore;

    get injected() {
        return this.props as Injected;
    }

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

    // Mobx throws a warning on this, but it is here if you ever want to just use links
    // to modify query params without the components re-rendering

    shouldComponentUpdate(nextProps: any, nextState: IRouterState) {
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
