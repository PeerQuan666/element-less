
import {FormItemProps} from './formItemProps'
import {ValueType} from '../enums'
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
    onChange?: Function,
}