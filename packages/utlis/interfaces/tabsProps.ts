import {FormItemProps} from './formItemProps'
import {ValueType} from '../enums'
export interface TabsProps extends FormItemProps {
    modelValue?: string | Number,
    labelField?: string,
    valueField?: string,
    noExistOptionPrefix?: string,
    hasNoExistOption?: boolean,
    disabledField?: string,
    selectIndex?: number,
    url?: string,
    data?: Array<Record<string, any>>,
    isInitTriggerSelect?: boolean,
    resetValueByChangeData?: boolean,
    valueType?: ValueType,
    onChange?: Function,
}