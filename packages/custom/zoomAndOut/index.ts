import type { App } from 'vue'
import ZoomAndOut from './ZoomAndOut.vue'

// 使用install方法，在app.use挂载
ZoomAndOut.install = (app: App): void => {
  app.component(ZoomAndOut.__name as string, ZoomAndOut)
}

export default ZoomAndOut