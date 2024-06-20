export interface DynamicRuleConfigValue{
    id:string,
    type:string,
    keyCode?:string,
    keyName?:string,
    dataType?:string,
    comparator?:string,
    children:Array<DynamicRuleConfigValue>
}
