import type { App } from 'vue'
import UEditor from './UEditor.vue'

// 使用install方法，在app.use挂载
UEditor.install = (app: App): void => {
  app.component(UEditor.__name as string, UEditor)
}

export default UEditor