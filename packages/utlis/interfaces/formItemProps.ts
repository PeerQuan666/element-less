import {ValidProps} from './validProps'
import {QueryProps} from './queryProps'
export interface FormItemProps extends ValidProps,QueryProps{
    prop?:string,
    label?:string,
    hasFormItem?:boolean,
    span?:number,
    aIndex?:number,
    tip?:string,
    tipPosition?:string,
    suffixContent?:string,
    labelWidth?:string,
    tagName?:string,
    placeholder?:string,
}