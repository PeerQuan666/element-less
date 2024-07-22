
import { PropType } from 'vue'
import { formItemProps as _formItemProps } from 'element-plus'

import { QueryMethod, ValidType, QueryDataType, ValidTriggerType } from '../utils/types'
import { buildProps } from 'element-plus/es/utils/index'
import type { ChildType, TipPosition,SpaceSize } from '../utils/types';

export const formItemProps = buildProps({
    ..._formItemProps,
    /**
    * @description 数组当前索引值
    */
    aIndex: {
        type: Number,
        default: -1
    },

    /**
   * @description 提示信息
   */
    tip: String,

    /**
     * @description 提示信息位置  
     */
    tipPosition: {
        type: String as PropType<TipPosition>,
        default: 'left'
    },

    /**
     * @description 后缀内容
     */
    suffixContent: String,

    /**
     * @description 子节点类型 移动端使用
     */
    childType: {
        type: String as PropType<ChildType>
    },
    /**
     * @description 占位文本 移动端使用
     */
    placeholder: String,

    /** 
     * @description 子节点是否创建FormItem
    */
    childCreateFormItem: {
        type: Boolean,
        default: true
    },
    /**
     * @description 创建FormItem
     */
    createFormItem:{
        type:Boolean,
        default:undefined
    },

    /**
     * @description 必填提示
     */
    requiredMessage: String,

    /**
     * @description 验证类型
     */
    validType: {
        type: String as PropType<ValidType>
    },
    /**
     * @description 正则验证
     */
    validExpression: String,
    /**
     * @description 验证描述
     */
    validMessage: String,
    /**
     * @description  验证方法
     */
    validMethod: Function,

    /**
     * @description 触发验证方式
     */
    validTrigger: {
        type: String as PropType<ValidTriggerType>,
        default:'blur'
    },

    /**
     * @description 查询字段名
     */
    queryField: String,
    /**
     * @description 查询方法
     */
    queryMethod: {
        type:String as PropType<QueryMethod>
    },
    /**
     * @description 查询数据类型
     */
    queryDataType: {
        type: String as PropType<QueryDataType>
    },
    /**
     * @description 查询默认值
     */
    queryDefaultValue: {
        type: [String, Number, Boolean],
        default:undefined
    },
    /** 
     * @description 自动查询
     */
    queryAutoReadData: {
        type:Boolean,
        default:undefined
    },
    /**
     * @description 查询添加前后逗号
     */
    queryAroundComma: {
        type:Boolean,
        default:undefined
    },
    /**
     * @description 范围查询
     */
    queryRange: {
        type:Boolean,
        default:undefined
    },
    /**
     * @description 范围查询是否包含等于
     */
    queryRangeOrEqual: {
        type:Boolean,
        default:undefined
    },

    /**
     * @description 子元素间隔符
     */
    spacer: String,
    /**
   * @description 子元素是否自动拆行
   */
    spaceWrap: Boolean,

    /**
     * @description 子元素间隔大小
     */
    spaceSize: {
        type: [Number, String as PropType<SpaceSize>]
    },
    /**
     * @description 范围选择开始字段名
     */
    propStart:String,
    /**
     * @description 范围选择结束字段名
     */
    propEnd:String


})
