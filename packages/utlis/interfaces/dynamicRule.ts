export interface DynamicRuleConfig{
    id?:string,
    type:string,
    config:Record<string,any>
    children:Array<DynamicRuleConfig>,
    comparator?:string

}

