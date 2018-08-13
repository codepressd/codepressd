
import { UiState } from "./UiState";
import { RouterStore } from './RouterStore';

import * as Types from "../../shared/Types";

export class RootStore {
    routerStore: Types.RouterStore;
    uiState: Types.UiState;

    constructor() {
        this.routerStore = new RouterStore(this);
        this.uiState = new UiState(this);
    }
}

export const rootStore = new RootStore();