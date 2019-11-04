import "@utkusarioglu/object-assist";
import "@utkusarioglu/string-assist";
import { t_classStatesList, t_instanceId, t_variableName, t_propertyPath, t_trackRecord, t_trackRecordStack, t_filteringFields, e_filterMode, t_trackRecordSimplified, t_namespace, t_channel } from "./t_state";
export { i_stateInput } from "./t_state";
export declare class State {
    protected _channel: t_channel;
    private static _states;
    private _id;
    private static _track_stack;
    private static _tracking_enabled;
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
    private assign_Property;
    set_OptionalClasses(property_class_assoc: any, attr: any): this;
    set_RequiredClasses(property_class_assoc: any, attr: any): this;
    private throw_OverloadError;
    private assign_Class;
}
