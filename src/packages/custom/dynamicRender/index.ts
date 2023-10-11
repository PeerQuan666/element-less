import type { App } from 'vue'
import DynamicRender from './DynamicRender.vue'

// 使用install方法，在app.use挂载
DynamicRender.install = (app: App): void => {
  app.component(DynamicRender.__name as string, DynamicRender)
}

export default DynamicRender