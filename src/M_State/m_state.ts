
/*
 *	COMMON CLASSES
 */
import { State } from "../state";
import { M_Namespace } from "@utkusarioglu/m_namespace";

/**
 * CONSTANTS
 * */
import { C_State } from "../c_state";

/*
 *  DATATYPES
 */
import { i_stateInput } from "../t_state";

/**
 * Interface for M_State
 * */
export interface M_State extends M_Namespace {}



/**
 * Provides State management functionality
 * Requires M_Namespace
 * 
 * @remarks
 * Service: State
 * */
export abstract class M_State {

    private _state!: State;



/*
 * ======================================================== Boundary 1 =========
 *
 *	DECLARATION
 *
 * =============================================================================
 */

    /**
     * Initializes the state management
     * 
     * @param state_content
     * 
     * @remarks
     * Class: M_State
     * Service: State
     */
    initialize_State(state_content?: i_stateInput): this {

        if (this._state !== undefined) {
            throw new Error(C_State.E_AlreadyDefined);
        }

        const namespace = this.get_GlobalNamespace();

        this._state = new State(namespace);

        if (state_content !== undefined) {
            this._state.set_Vars(state_content);
        }

        return this;
    }

    /**
     * Returns the managed state content of the class
     *
     * @remarks
     * Class: M_State
     * Service: State
     * */
    get_State(): State {

        if (!(this._state instanceof State)) {
            throw new Error(C_State.E_CalledBeforeDeclaration)
        }

        return this._state;
    }


/*
 * ======================================================== Boundary 1 =========
 *
 *	IMPLEMENTATION
 *
 * =============================================================================
 */

/* ---------------------------------------------------------- Use Case ---------
 *	REMOVE STATE
 */

    /**
     * Removes the instance's state from the State pool
     *
     * @remarks
     * Class: M_State
     * Service: State
     * */
    protected remove_State() {
        this._state.remove_State();
    }


/* ---------------------------------------------------------- Use Case ---------
 *	TRACK STATE
 */

    /** 
     * Alias for State.track_Variable
     * 
     * @remarks
     * Class: M_State
     * Service: State
     */
    //protected track_Var = this.get_State().track_Variable;

}