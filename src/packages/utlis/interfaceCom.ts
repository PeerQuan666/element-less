import  {ValueType,QueryDataType,QueryMethod} from './enumCom'



export interface FormItemProps{
    fieldName?:string,
    label?:string,
    require?:boolean,
    requireMessage?:string,
    validationExpression?:string,
    validationMessage?:string,
    validationMethod?:Function,
    validationTrigger?:string,
    hasFormItem?:boolean,
    queryMethod?:QueryMethod,
    queryDataType?:QueryDataType,
    queryDefaultValue?:any,
    queryAutoReadData?:boolean,
    queryAroundComma?:boolean   

}


export interface RadioProps extends FormItemProps {
    type?: string,
    modelValue?: string | Number,
    width?: string|number,
    height?: string|number,
    optionWidth?: string,
    labelField?: string,
    valueField?: string,
    noExistOptionPrefix?: string,
    filterable?: boolean,
    hasNoExistOption?: boolean,
    disabledField?: string,
    selectIndex?: number,
    url?: string,
    groupField?: string,
    data?: Array<Record<string, any>>,
    isInitTriggerSelect?: boolean,
    resetValueByChangeData?: boolean,
    valueType?: ValueType,
    onChange?: Function
}


export interface QueryInfo{
    key?:string,
    fieldName?:string,
    method?:QueryMethod,
    dataType?:QueryDataType,
    isAroundComma?:boolean,
    isAutoQuery?:boolean,
    parameterType?:string
    Value?:any

}

