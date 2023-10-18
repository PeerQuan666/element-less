import type { App } from 'vue'
import JsonEditor from './JsonEditor.vue'

// 使用install方法，在app.use挂载
JsonEditor.install = (app: App): void => {
  app.component(JsonEditor.__name as string, JsonEditor)
}

export default JsonEditor