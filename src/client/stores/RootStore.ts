
import { UiState } from "./UiState";

import * as Types from "../../shared/Types";

export class RootStore {
    uiState: Types.UiState;
    constructor() {
        this.uiState = new UiState(this);
    }
}

export const rootStore = new RootStore();