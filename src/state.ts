/*
 *	GLOBALS
 */
import "@utkusarioglu/starel-globals";
import "@utkusarioglu/object-assist";
import "@utkusarioglu/string-assist";

/*
 *	DATATYPES
 */
import { C_State } from "./c_state";

/*
 *	DATATYPES
 */
import {
    t_classStatesList,
    t_instanceId,
    t_variableName,
    t_propertyPath,
    t_trackRecord,
    t_trackRecordStack,
    t_filteringFields,
    e_filterMode,
    t_trackRecordSimplified,
    t_stateMap,
    t_namespace,
    t_channel,
} from "./t_state";


export { i_stateInput } from "./t_state";
export { M_State } from "./m_state"; 


/**
 * Stores state information for classes
 * 
 * @remarks
 * Service State
 * */
export class State {

/*
 * ======================================================== Boundary 1 =========
 *
 *	INSTANTIATION
 *
 * =============================================================================
 */

    /** Stores the channel info of the class that State class is instantiated in*/
    protected _channel: t_channel;
    /** Hold state information for all classes that instantiate state class*/
    private static _states: t_classStatesList = {};
    /** id for the particular instance*/
    private _id: t_instanceId;

    private static _track_stack: t_trackRecordStack = [];

    private static _tracking_enabled: boolean = true;

    /**
     * Creates an instance of State class and holds the state information
     * 
     * @param channel: channel for which the state is being managed. In most cases. 
     * The channel will be a namespace
     * @param custom_id: a custom id that the state class will use to distinguish 
     * the current instance from all other instances from the same channel
     * 
     * @remarks
     * Class: State
     * Service: State
     */
    constructor(channel: t_channel = "Generic", custom_id: t_instanceId | null = null) {

        this._channel = channel;
        this._id = custom_id ? custom_id : Math.random().toString().slice(2);

        State._states.pave([this._channel, this._id],
            () => {
                this.throw_OverloadError()
            },
            () => {
                return {}
            }
        )
    }


/*
 * ======================================================== Boundary 1 =========
 *
 *	DECLARATION
 *
 * =============================================================================
 */

/* ---------------------------------------------------------- Use Case ---------
 *	HANDLE VARIABLE
 */

    /**
     * Calls a certain stored variable for the state of the current instance
     * 
     * @param path_key supports dot notation for cascaded objects
     * 
     * @returns the variable that was previously assigned to the given variable name
     * 
     * @remarks
     * Class: State
     * Service: State
     */
    get_Var(path_key: string | string[]): any {

        return (State._states as any).sniff([this._channel, this._id],
            () => {
                console.log(
                    C_State.E_VarNotDefined.subs(this._channel, this._id)
                );
            },
            (instance_state: any) => {
                return instance_state.sniff(path_key,
                    () => {
                        //console.warn(`Variable ${this._channel}/${this._id}/${path_key} is not defined`);
                    },
                    (variable: any) => {
                        return variable;
                    });
            });
    }

    /**
     * Sets a value to the given variable name
     * 
     * @param path_key: supports dot notation for cascaded objects
     * @param value: value for the given path as any
     * 
     * ```ts
     * this._state.set_Var("object1.object2.object3", "variable")
     * ```
     *
     * @remarks
     * Class: State
     * Service: State
     */
    set_Var(path_key: string, value: any): this {
        ((State._states as any)[this._channel][this._id] as object).pave(path_key,
            () => {
                //console.log(path_key, "already defined");
                return value;
            },
            () => {
                return value;
            }
        )
        return this;
    }


    /**
     * Calls a certain stored variable for the state of the current instance
     * Unlike get_Var, copy_Var returns a deep copy of the variable
     * 
     * @param path_key: supports dot notation for cascaded objects
     * 
     * @returns the variable that was previously assigned to the given variable name
     *
     * @remarks
     * Class: State
     * Service: State
     */
    copy_Var(path_key: string | string[]): any {
        const variable = this.get_Var(path_key);
        if (variable) {
            return JSON.parse(JSON.stringify(variable));
        } else {
            return undefined;
        }
    }

    /**
     * Checks whether the given path key contains a variable
     * 
     * @param path_key
     * 
     * @returns availability of the given variable as boolean
     *
     * @remarks
     * Class: State
     * Service: State
     */
    has_Var(path_key: string | string[]): boolean {
        return (State._states as any)[this._channel][this._id]
            .sniff(path_key,
                () => {
                    return false;
                },
                () => {
                    return true;
                });
    }


/* ---------------------------------------------------------- Use Case ---------
 *	HANDLE VARIABLES
 */

    /**
     * Sets values for multiple variables
     * 
     * @param vars: object as the assignment values. see {@link State.set_Var | set_Var } 
     * for the format of the individual variables
     *
     * @remarks
     * Class: State
     * Service: State
     */
    set_Vars(vars: object): this {
        Object.entries(vars).forEach(([key, value]) => {
            this.set_Var(key, value);
        })
        return this;
    }

    /**
     * Returns all variables that belong to the current instance
     * 
     * @returns all vars for the instance
     *
     * @remarks
     * Class: State
     * Service: State
     * */
    get_Vars(): object {
        return (State._states as any)[this._channel][this._id];
    }



/* ---------------------------------------------------------- Use Case ---------
 *	HANDLE STATES
 */

    /**
     * Returns all states that the state manager stores
     *
     * @remarks
     * Class: State
     * Service: State
     * */
    static get_AllStates(hide_id_if_single: boolean = true): t_classStatesList {

        if (hide_id_if_single) {

            let refined_list: t_classStatesList = {};

            Object.entries(this._states).forEach(([key, value]) => { // channels
                const instance_ids = Object.keys(value);
                if (instance_ids.length < 2) {
                    refined_list[key] = value[instance_ids[0]];
                } else {
                    refined_list[key] = value;
                }
            });

            return refined_list;

        } else {
            return State._states;
        }
    }



/* ---------------------------------------------------------- Use Case ---------
 *	HANDLE ID
 */
    /**
     * Returns randomly assigned instance id
     *
     * @remarks
     * Class: State
     * Service: State
     * */
    get_Id(): string {
        return this._id;
    }



/* ---------------------------------------------------------- Use Case ---------
 *	HANDLE CHANNEL
 */

    /**
     * Returns the assigned channel for the given instance
     * 
     * @returns channel as string
     *
     * @remarks
     * Class: State
     * Service: State
     * */
    get_Channel(): string {
        return this._channel;
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
     * Removes the state information, and the encapsulating object if there is no other 
     * object belonging to the same family
     *
     * @remarks
     * Class: State
     * Service: State
     * */
    remove_State() {
        delete (State._states as any)[this._channel][this._id];
        if ((State._states as any)[this._channel].is_empty()) {
            delete (State._states as any)[this._channel];
        }
    }

    /**
     * Removes all the states for all consumers
     * 
     * @remarks
     * Class: State
     * Service: State
     * */
    static remove_AllStates(): void {
        State._states = {};
    }



/* ---------------------------------------------------------- Use Case ---------
 *	TRACK VARIBLES
 */

    /**
     * Saves the value of a variable with deep copy during execution
     * This method as a static counterpart as well.
     * 
     * @param variable_name variable to be saved. If the variable is stored in the
     * state manager
     * @param variable_value value to be saved. If the variable is already stored in the state
     * manager, the value will be pulled from the state 
     * @param track_test a test to determine if the current passing of the run shall be saved,
     * default test returns true, meaning all the executions will be saved
     *
     * @remarks
     * Class: State
     * Service: State
     */
    public track_Variable(
        variable_name: t_variableName | t_propertyPath,
        variable_value: any | undefined = undefined,
        track_test: (track_record: t_trackRecord) => boolean = () => true,
    ): void {

        if (!State._tracking_enabled) return

        const channel: t_channel = this.get_Channel();
        const track_record: t_trackRecord = {
            Time: (new Date()).getTime(),
            Channel: channel,
            Namespace: channel.split(":")[0].split("?")[0],
            Id: this.get_Id(),
            Variable: variable_name,
            Value: variable_value === undefined
                ? this.copy_Var(variable_name)
                : variable_value
        }

        if (track_test(track_record)) {
            State._track_stack.push(track_record);
        }
    }

    /**
     * Saves the value of a variable with deep copy during execution.
     * This method has a dynamic counterpart as well
     *
     * @param variable_name variable to be saved. If the variable is stored in the
     * state manager
     * @param variable_value value to be saved. If the variable is already stored in the state
     * manager, the value will be pulled from the state
     * @param track_test a test to determine if the current passing of the run shall be saved,
     * default test returns true, meaning all the executions will be saved
     *
     * @remarks
     * Class: State
     * Service: State
     */
    public static track_Variable(
        channel: t_channel,
        variable_name: t_variableName | t_propertyPath,
        variable_value: any | undefined = undefined
    ): void {

        if (!State._tracking_enabled) return

        const track_record: t_trackRecord = {
            Time: (new Date()).getTime(),
            Channel: channel,
            Namespace: channel.split(":")[0].split("?")[0],
            Id: "-",
            Variable: variable_name,
            Value: variable_value,
        }

        State._track_stack.push(track_record);
    }



/* ---------------------------------------------------------- Use Case ---------
 *	MONITOR TRACKING
 */

    /**
     * Returns the entire track stack
     *
     * @remarks
     * Class: State
     * Service: State
     * */
    public static get_AllTrackRecords(): t_trackRecordStack | string {

        if (!State._tracking_enabled) return C_State.E_TrackingOff

        return State._track_stack;

    }

    /**
     * Returns all the channels that have currently been tracked
     *
     * @remarks
     * Class: State
     * Service: State
     * */
    public static get_AllTrackedChannels(): t_channel[] | string {

        if (!State._tracking_enabled) return C_State.E_TrackingOff

        return State._track_stack
            .map((record) => {
                return record.Channel;
            })
            .filter((channel, index, stack) => {
                return stack.indexOf(channel) === index;
            });

    }

    /**
     * Returns all the namespaces that have curently been tracked
     *
     * @remarks
     * Class: State
     * Service: State
     * */
    public static get_AllTrackedNamespaces(): t_namespace[] | string {

        if (!State._tracking_enabled) return C_State.E_TrackingOff

        return State._track_stack
            .map((record) => {
                return record.Namespace
            })
            .filter((namespace, index, stack) => {
                return stack.indexOf(namespace) === index;
            });


    }

    /**
     * Returns track records that return true for the filter test
     * 
     * @param filtering_fields
     * @param hide_properties 
     * @param filter_mode
     *
     * @remarks
     * Class: State
     * Service: State
     */
    public static get_SomeTrackRecords(
        filtering_fields: t_filteringFields,
        hide_properties: boolean = true,
        filter_mode: e_filterMode = e_filterMode.And, // this doesnt work well
    ): t_trackRecordSimplified[] | string {

        if (!State._tracking_enabled) return C_State.E_TrackingOff

        let filtered: t_trackRecordStack = State._track_stack.filter((track_record: t_trackRecord) => {

            const time: boolean = filtering_fields.sniff("Time",
                () => true,
                ([start, end]) => {
                    return (start === undefined || (track_record.Time >= start)) &&
                        ((end === undefined) || (track_record.Time <= end));
                });

            const channel: boolean = filtering_fields.sniff("Channels",
                () => true,
                (channels) => {
                    return (channels.find((filter_channel: t_channel) => {
                        return track_record.Channel === filter_channel;
                    }) !== undefined) ||
                        channels.length === 0;
                });

            const namespace: boolean = filtering_fields.sniff("Namespaces",
                () => true,
                (namespaces) => {
                    return (namespaces.find((filter_namespace: t_channel) => {
                        return track_record.Namespace === filter_namespace;
                    }) !== undefined) ||
                        namespaces.length === 0;
                });

            const variable_name: boolean = filtering_fields.sniff("Variables",
                () => true,
                (variable_names) => {
                    return (variable_names.find((filter_variable_name: t_variableName) => {
                        return track_record.Variable === filter_variable_name;
                    }) !== undefined) ||
                        variable_names.length === 0;
                });

            const call_result = filtering_fields.sniff("Call",
                () => true,
                (call: any) => {
                    return (call as (value: t_trackRecord) => boolean)(track_record);
                });

            //if (value_truncation) {
            //    if (typeof track_record.Value === "string") {
            //        track_record.Value = (track_record.Value as string)
            //            .slice(0, (value_truncation as number)) + "...";
            //    }
            //    // support for other primitives may be added here
            //}

            return [
                time,
                channel,
                variable_name,
                call_result,
                namespace,
            ].reduce((total, current) => {

                total = (total === undefined || total);

                switch (filter_mode) {

                    case e_filterMode.And:
                        return total && current;

                    case e_filterMode.Or:
                        return total || current;

                }
            });
        });

        if (hide_properties) {
            filtered = filtered.map((track_record: t_trackRecord) => {
                delete track_record.Channel;
                delete track_record.Time;
                delete track_record.Id;
                return track_record;
            })
        }

        return filtered;
    }










    /*
     * PROPERTIES
     */
    protected set_OptionalProperties(property_paths: t_propertyPath[], attr: any): this {
        property_paths.forEach((property) => { this.assign_Property(property, attr) });
        return this;
    }

    protected set_RequiredProperties(property_paths: t_propertyPath[], attr: any): this {
        property_paths.forEach((property_path) => {
            if (!this.assign_Property(property_path, attr))
                throw new Error(C_State.E_PropertyRequired.subs(property_path));
        });
        return this;
    }

    private assign_Property(property_path: t_propertyPath, attr: any): boolean {
        let property_path_arr = property_path.split(Separator.Expression);
        let property = property_path_arr.slice(-1)[0];
        return (attr as object).sniff(property,
            () => {
                return false;
            },
            () => {
                this.set_Var(property_path, attr[property]);
                return true;
            })
    }



    /*
     * CLASSES
     */
    public set_OptionalClasses(property_class_assoc: any, attr: any): this {
        Object.keys(property_class_assoc).forEach((property_path) => {
            this.assign_Class(property_class_assoc, property_path, attr)
        });
        return this;
    }

    public set_RequiredClasses(property_class_assoc: any, attr: any): this {
        Object.keys(property_class_assoc).forEach((property_path_string) => {
            if (!this.assign_Class(property_class_assoc, property_path_string, attr))
                throw new Error(
                    C_State.E_PropertyRequired.subs(property_path_string)
                );
        });
        return this;
    }

    private throw_OverloadError(property_path = ['empty']): void {
        throw new Error(C_State.E_ChOverload.subs(
            this._channel,
            this._id,
            JSON.stringify(property_path))
        );
    }

    private assign_Class(
        property_class_assoc: t_stateMap<ObjectConstructor>,
        property_path_string: string,
        attr: t_stateMap<any>
    ): boolean {

        let property_path: string[] = property_path_string
            .split(Separator.Expression);
        let property: string = property_path.slice(-1)[0] as string;

        if (attr.hasOwnProperty(property)) {

            const property_args = Array.isArray(attr[property])
                ? attr[property]
                : [attr[property]];

            this.get_Vars().pave(property_path,
                () => {
                    this.throw_OverloadError(property_path)
                },
                () => {

                    return property_args.map((v: any) => {
                        let a = new property_class_assoc[property_path_string](v);
                        return a;
                    })

                });

            return true;
        } else {
            return false;
        }
    }

}