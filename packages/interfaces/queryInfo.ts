
import {QueryMethod,QueryDataType} from '../utils'
export interface QueryInfo{
    /**
     * @descript key
     */
    key:string,
    /**
     * @description 查询字段
     */
    prop:string,
    /**
     * @description 查询方法
     */
    method:QueryMethod,
    /**
     * @description 查询类型
     */
    dataType:QueryDataType,
    /**
     * @description 查询值是否前后逗号
     */
    isAroundComma?:boolean,
    /**
     * @description 是否自动查询
     */
    isAutoQuery?:boolean,
    /**
     * @description 参数类型
     */
    parameterType?:string,
    /**
     * @description 是否范围查询
     */
    isRange?:boolean,
    /**
     * @description 是否范围查询包含等于
     */
    isRangeOrEqual?:boolean,
    /**
     * @description 值
     */
    value?:any

}
