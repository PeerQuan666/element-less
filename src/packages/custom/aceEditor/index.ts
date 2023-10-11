import type { App } from 'vue'
import AceEditor from './AceEditor.vue'

// 使用install方法，在app.use挂载
AceEditor.install = (app: App): void => {
  app.component(AceEditor.__name as string, AceEditor)
}

export default AceEditor