import { observable, action } from 'mobx';
import * as Types from "../../shared/Types";

export class UiState {
    constructor(rootStore: Types.RootStore) {
    }
    @observable menuOpen: boolean;

    @action
    toggleMenu = () => {
        this.menuOpen = !this.menuOpen;
    }

}