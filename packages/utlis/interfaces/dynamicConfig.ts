export interface DynamicConfig{
    keyID:string,
    keyName:string,
    keyCode:string,
    dataType?: any,
    arrayDataType?:any,
    required?:boolean,
    validExpression?:string,
    componentType?: any,
    data: Array<DynamicConfig>,
    isShow?:boolean,
    description?:string,
    isAdd?:boolean,
    config:{formConfig:Record<string,any>,baseConfig:Record<string,any>,arrayConfig: Record<string,any>,advancedConfig:Record<string,any>},
    defaultValue?: any
}