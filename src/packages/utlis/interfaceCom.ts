import  {ValueType,QueryDataType,QueryMethod} from './enumCom'

export interface FormItemProps{
    prop?:string,
    label?:string,
    require?:boolean,
    requireMessage?:string,
    validationExpression?:string,
    validationMessage?:string,
    validationMethod?:Function,
    validationTrigger?:string,
    hasFormItem?:boolean,
    queryField?:string,
    queryMethod?:QueryMethod,
    queryDataType?:QueryDataType,
    queryDefaultValue?:any,
    queryAutoReadData?:boolean,
    queryAroundComma?:boolean,
    queryRange?:boolean,
    queryRangeOrEqual?:boolean
}

export interface RangeFormItemProps extends FormItemProps{
    propStart?:'',
    propEnd?:'',
}


export interface DatePickerProps extends FormItemProps {
    type?: string,
    modelValue?: string | number,
    start?: string | number,
    end?: string | number,
    valueFormat?: string,
    greaterThan?: string,
    lessThan?: string,
    width?: string,
    isShortcuts?: boolean,
    disabledDate?: Function,
    shortcutsDate?: string | number,
    shortcuts?: Array<{ text: string, value: Date | Function }>,
    valueSeparator?: string,
    defaultTime?: string|Array<string> 
}


export interface TimePickerProps extends FormItemProps {
    type?: string,
    modelValue?: string,
    start?: string | number,
    end?: string | number,
    greaterThan?: string,
    lessThan?: string,
    width?: string,
    isShortcuts?: boolean,
    defaultValue?:string|Array<string>
    disabledHours?: Function|Array<any>,
    disabledMinutes?: Function|Array<any>,
    disabledSeconds?: Function|Array<any>,
    valueSeparator?:string,
    valueFormat?:string
}




export interface CheckboxProps extends FormItemProps {
    type?: string,
    modelValue?: string,
    width?: string,
    height?: string,
    optionWidth?: string,
    labelField?: string,
    valueField?: string,
    disabledField?: string,
    noExistOptionPrefix?: string,
    hasNoExistOption?: boolean,
    url?: string,
    data?: Array<Record<string, any>>,
    groupField?: string,
    filterable?: boolean,
    showCheckall?: boolean,
    showInverse?: boolean,
    resetValueByChangeData?: boolean,
    isInitTriggerSelect?: boolean,
    valueType?: ValueType,
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
export interface ColumnProps {
    prop?: string,
    sortable?: string | boolean,
    type?: string,
    isLocaleString?: boolean,
    isHb?: boolean,
    isTb?: boolean,
    isEdit?: boolean,
    editFields?: string,
    isCustomEdit?: boolean,
    sortExpress?: string,
    filterable?: boolean,
    dateFormatter?: string,
    isExport?: boolean,
    autoComplete?: boolean,
    triggerActionName?: string,
    triggerMenuId?: string,
    headerFormatter?: string,
    mergeRow?: boolean,
    mergeRowByFieldname?: string,
    mergeFieldname?: string,
    mergeMethod?: Function,
    mergeSum?: boolean,
    showSummary?: boolean,
    summaryMethod?: Function,
    summaryValue?: string | number,
    trueLabel?: string,
    falseLabel?: string | number | boolean,
    trueValue?: string | number | boolean,
    trueClass?: string,
    falseClass?: string,
    enumShowType?: string,
    enumEqualType?: string,
    enumData?: any,
    enumNoneLabel?: string,
    hasBottomBorder?: boolean,
    imageStyle?: string,
    imageEmptyDesc?: string,
    isPreview?: boolean,
    isFold?: boolean,
    unFoldCount?: number,
    selectButtonLabel?: string,
    sortMethod?: Function,
    columnKey?: string,
    isAvgDay?: boolean,
    sortData?: any,
    tipContent?: string,
    align?:string,
    headerAlign?:string,
    require?:boolean,
    requireMessage?:string,
    validationExpression?:string,
    validationMessage?:string,
    validationMethod?:Function,
    validationTrigger?:string,
}

export interface QueryInfo{
    key?:string,
    prop?:string,
    method?:QueryMethod,
    dataType?:QueryDataType,
    isAroundComma?:boolean,
    isAutoQuery?:boolean,
    parameterType?:string,
    isRange?:boolean,
    isRangeOrEqual?:boolean,
    value?:any

}

