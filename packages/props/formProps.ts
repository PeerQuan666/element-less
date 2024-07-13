
import { formProps as _formProps } from 'element-plus'
import { buildProps } from 'element-plus/es/utils/index'

export const formProps = buildProps({
    ..._formProps,
    /**
    * @description 保存地址
    */
    saveUrl: String,
    /**
     * @description 保存前方法
     */
    beforeSave: Function,
    /**
     * @description 保存后方法
     */
    afterSave: Function,
    /**
     * @description 标签宽度
     */
    labelWidth: String,
 
    /**
     * 输入框宽度
     */
    inputWidth: String

})
