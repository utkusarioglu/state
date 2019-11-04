/**
 * A single variable of the instance
 * */
export type t_state = any;

/**
 * Datatype that set_State accepts for the initial state vars.
 * */
export interface i_stateInput {
    [key: string]: any
}

/**
 * collection of instance variables: the state of the instance
 * */
export type t_classState = { [variable_name: string]: t_state }

/**
 * List of every instance belonging to the namespace
 * */
export type t_classInstancesList = { [instance_id: string]: t_classState }

/**
 * List of every State record
 * */
export type t_classStatesList = { [namespace: string]: t_classInstancesList }

/**
 * Alias for string denoting instance id
 * */
export type t_instanceId = string;

/**
 * Alias for denoting name of a variable
 * */
export type t_variableName = string;

/**
 * Alias for denoting cascaded path for a variable
 */
export type t_propertyPath = string

/**
 * State.tracker record entry
 * */
export type t_trackRecord = {
    Time: t_epoch,
    Channel: t_namespace,
    Namespace: t_namespace,
    Id: t_instanceId,
    Variable: t_variableName,
    Value: any,
}

/**
 * State.tracker record with some properties optional
 * */
export type t_trackRecordSimplified = {
    Time?: t_epoch,
    Channel?: t_namespace,
    Namespace?: t_namespace,
    Id?: t_instanceId,
    Variable: t_variableName,
    Value: any,
}

/**
 * Array of track records
 * */
export type t_trackRecordStack = t_trackRecord[];

/**
 * Holds data about how the tracking filter will work
 * Time: start and end epochs
 * Namespace: array of namespaces that will be included
 * VariableName: array of variable names that will be included
 * */
export type t_filteringFields = {
    Time?: [t_epoch | undefined, t_epoch | undefined],
    Namespaces?: t_namespace[],
    Variables?: t_variableName[],
    Call?: (value:any) => boolean
}

/**
 * Sets the mode that the record tracker filter will use for determining
 * Which records to include
 * */
export enum e_filterMode {
    And,
    Or,
}

/**
 * Generic mapping object
 * */
export type t_stateMap<T> = { [key: string]: T }




/*
 *	STAND-INS
 */

/**
 * A stand-in alias for the t_namespace type from M_Namespace
 * */
export type t_namespace = string;

/**
 * Stand-in type for t_channel from Controller
 * */
export type t_channel = string;

/**
 * Alias for denoting use of number as epoch
 * */
export type t_epoch = number