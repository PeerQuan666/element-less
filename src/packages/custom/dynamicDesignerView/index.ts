import type { App } from 'vue'
import DynamicDesignerView from './DynamicDesignerView.vue'

// 使用install方法，在app.use挂载
DynamicDesignerView.install = (app: App): void => {
  app.component(DynamicDesignerView.__name as string, DynamicDesignerView)
}

export default DynamicDesignerView