import {QueryMethod,QueryDataType} from '../enums'
export interface QueryProps{
    queryField?:string,
    queryMethod?:QueryMethod,
    queryDataType?:QueryDataType,
    queryDefaultValue?:any,
    queryAutoReadData?:any,
    queryAroundComma?:boolean,
    queryRange?:boolean,
    queryRangeOrEqual?:boolean,

}
