
import {formItemProps} from './formItemProps'
import { buildProps } from 'element-plus/es/utils/index'

export const formNodeProps = buildProps({
    ...formItemProps,
    createFormItem:Boolean

})
