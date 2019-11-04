// Generated by dts-bundle v0.7.3

declare module '@utkusarioglu/state' {
    import "@utkusarioglu/object-assist";
    import "@utkusarioglu/string-assist";
    import { t_classStatesList, t_instanceId, t_variableName, t_propertyPath, t_trackRecord, t_trackRecordStack, t_filteringFields, e_filterMode, t_trackRecordSimplified, t_namespace, t_channel } from "@utkusarioglu/state/t_state";
    export { i_stateInput } from "@utkusarioglu/state/t_state";
    export class State {
        protected _channel: t_channel;
        constructor(channel?: t_channel, custom_id?: t_instanceId | null);
        get_Var(path_key: string | string[]): any;
        set_Var(path_key: string, value: any): this;
        copy_Var(path_key: string | string[]): any;
        has_Var(path_key: string | string[]): boolean;
        set_Vars(vars: object): this;
        get_Vars(): object;
        static get_AllStates(hide_id_if_single?: boolean): t_classStatesList;
        get_Id(): string;
        get_Channel(): string;
        remove_State(): void;
        track_Variable(variable_name: t_variableName | t_propertyPath, variable_value?: any | undefined, track_test?: (track_record: t_trackRecord) => boolean): void;
        static track_Variable(channel: t_channel, variable_name: t_variableName | t_propertyPath, variable_value?: any | undefined): void;
        static get_AllTrackRecords(): t_trackRecordStack | string;
        static get_AllTrackedChannels(): t_channel[] | string;
        static get_AllTrackedNamespaces(): t_namespace[] | string;
        static get_SomeTrackRecords(filtering_fields: t_filteringFields, hide_properties?: boolean, filter_mode?: e_filterMode): t_trackRecordSimplified[] | string;
        protected set_OptionalProperties(property_paths: t_propertyPath[], attr: any): this;
        protected set_RequiredProperties(property_paths: t_propertyPath[], attr: any): this;
        set_OptionalClasses(property_class_assoc: any, attr: any): this;
        set_RequiredClasses(property_class_assoc: any, attr: any): this;
    }
}

declare module '@utkusarioglu/state/t_state' {
    //export type t_state = any;
    export interface i_stateInput {
        [key: string]: any;
    }
    //export type t_classState = {
    //    [variable_name: string]: t_state;
    //};
    //export type t_classInstancesList = {
    //    [instance_id: string]: t_classState;
    //};
    //export type t_classStatesList = {
    //    [namespace: string]: t_classInstancesList;
    //};
    //export type t_instanceId = string;
    //export type t_variableName = string;
    //export type t_propertyPath = string;
    //export type t_trackRecord = {
    //    Time: t_epoch;
    //    Channel: t_namespace;
    //    Namespace: t_namespace;
    //    Id: t_instanceId;
    //    Variable: t_variableName;
    //    Value: any;
    //};
    //export type t_trackRecordSimplified = {
    //    Time?: t_epoch;
    //    Channel?: t_namespace;
    //    Namespace?: t_namespace;
    //    Id?: t_instanceId;
    //    Variable: t_variableName;
    //    Value: any;
    //};
    //export type t_trackRecordStack = t_trackRecord[];
    //export type t_filteringFields = {
    //    Time?: [t_epoch | undefined, t_epoch | undefined];
    //    Namespaces?: t_namespace[];
    //    Variables?: t_variableName[];
    //    Call?: (value: any) => boolean;
    //};
    //export enum e_filterMode {
    //    And = 0,
    //    Or = 1
    //}
    //export type t_stateMap<T> = {
    //    [key: string]: T;
    //};
    //export type t_namespace = string;
    //export type t_channel = string;
    //export type t_epoch = number;
}
