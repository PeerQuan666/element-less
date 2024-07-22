import {DynamicComponentGroup} from '@/utils/types'
export interface DynamicComponentType{
    id?:string,
    componentName:string,
    label:string,
    value:string,
    type:string,
    operateType?:string
    description?:string,
    dataTypes?:Array<string>,
    defaultPropertys?:Record<string,any>,
    propertys?:Array<Record<string,any>>,
    events?:Array<string>,
    group:DynamicComponentGroup,
    formItem:boolean,
    restrictChild?:string,
    restrictParent?:string,
    isShow:boolean,
    preview?:string,
    isCustom?:boolean,
    icon?:string,
    slots?:Array<string>
}