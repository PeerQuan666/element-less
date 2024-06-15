import type { App } from 'vue'
import WangEditor from './WangEditor.vue'

// 使用install方法，在app.use挂载
WangEditor.install = (app: App): void => {
  app.component(WangEditor.__name as string, WangEditor)
}

export default WangEditor