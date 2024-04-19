
import {FormItemProps} from './formItemProps'
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
