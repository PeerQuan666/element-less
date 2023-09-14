import type { App } from 'vue'
import CascaderPannel from './CascaderPannel.vue'

// 使用install方法，在app.use挂载
CascaderPannel.install = (app: App): void => {
  app.component(CascaderPannel.__name as string, CascaderPannel)
}

export default CascaderPannel