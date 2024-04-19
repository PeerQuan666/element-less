import {FormItemProps} from './formItemProps'
import {ValueType} from '../enums'
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