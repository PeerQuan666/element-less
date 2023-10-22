import type { App } from 'vue'
import DynamicDesigner from './DynamicDesigner.vue'

// 使用install方法，在app.use挂载
DynamicDesigner.install = (app: App): void => {
  app.component(DynamicDesigner.__name as string, DynamicDesigner)
}

export default DynamicDesigner