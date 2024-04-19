import {FormItemProps} from './formItemProps'
export interface TimePickerProps extends FormItemProps {
    modelValue?: string,
    start?: string | number,
    end?: string | number,
    greaterThan?: string,
    lessThan?: string,
    width?: string,
    defaultValue?:string|Array<string>
    disabledHours?: Function|Array<any>,
    disabledMinutes?: Function|Array<any>,
    disabledSeconds?: Function|Array<any>,
    valueSeparator?:string,
    valueFormat?:string,
    isRange?:boolean
}
