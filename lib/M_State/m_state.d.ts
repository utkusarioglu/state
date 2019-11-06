import { State } from "../state";
import { M_Namespace } from "@utkusarioglu/m_namespace";
import { i_stateInput } from "../t_state";
export interface M_State extends M_Namespace {
}
export declare abstract class M_State {
    private _state;
    initialize_State(state_content?: i_stateInput): this;
    get_State(): State;
    protected remove_State(): void;
}
