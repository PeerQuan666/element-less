import {DynamicComponentGroup} from '../enums'
export interface DynamicComponentType{
    id?:string,
    componentName:string,
    label:string,
    value:string,
    type:string,
    description?:string,
    dataTypes?:Array<string>,
    defaultPropertys?:Record<string,any>,
    propertys?:Array<Record<string,any>>,
    group:DynamicComponentGroup,
    formItem:boolean,
    restrictChild?:string,
    restrictParent?:string,
    isShow:boolean,
    preview?:string,
    isCustom?:boolean,
    icon?:string
}