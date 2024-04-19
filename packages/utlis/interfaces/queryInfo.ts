
import {QueryMethod,QueryDataType} from '../enums'
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