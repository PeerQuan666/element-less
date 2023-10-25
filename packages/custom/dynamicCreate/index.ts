import type { App } from 'vue'
import DynamicCreate from './DynamicCreate.vue'

// 使用install方法，在app.use挂载
DynamicCreate.install = (app: App): void => {
  app.component(DynamicCreate.__name as string, DynamicCreate)
}

export default DynamicCreate