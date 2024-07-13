
import { withInstall } from 'element-plus/es/utils/index'
import Designer from './src/designer.vue'

export const ElsDynamicDesigner = withInstall(Designer)

export default ElsDynamicDesigner

export * from './src/designer'