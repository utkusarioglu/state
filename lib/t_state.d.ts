export declare type t_state = any;
export interface i_stateInput {
    [key: string]: any;
}
export declare type t_classState = {
    [variable_name: string]: t_state;
};
export declare type t_classInstancesList = {
    [instance_id: string]: t_classState;
};
export declare type t_classStatesList = {
    [namespace: string]: t_classInstancesList;
};
export declare type t_instanceId = string;
export declare type t_variableName = string;
export declare type t_propertyPath = string;
export declare type t_trackRecord = {
    Time: t_epoch;
    Channel: t_namespace;
    Namespace: t_namespace;
    Id: t_instanceId;
    Variable: t_variableName;
    Value: any;
};
export declare type t_trackRecordSimplified = {
    Time?: t_epoch;
    Channel?: t_namespace;
    Namespace?: t_namespace;
    Id?: t_instanceId;
    Variable: t_variableName;
    Value: any;
};
export declare type t_trackRecordStack = t_trackRecord[];
export declare type t_filteringFields = {
    Time?: [t_epoch | undefined, t_epoch | undefined];
    Namespaces?: t_namespace[];
    Variables?: t_variableName[];
    Call?: (value: any) => boolean;
};
export declare enum e_filterMode {
    And = 0,
    Or = 1
}
export declare type t_stateMap<T> = {
    [key: string]: T;
};
export declare type t_namespace = string;
export declare type t_channel = string;
export declare type t_epoch = number;
export declare type i_map<T> = {
    [key: string]: T;
};
