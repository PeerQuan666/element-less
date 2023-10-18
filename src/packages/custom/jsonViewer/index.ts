import type { App } from 'vue'
import JsonViewer from './JsonViewer.vue'

// 使用install方法，在app.use挂载
JsonViewer.install = (app: App): void => {
  app.component(JsonViewer.__name as string, JsonViewer)
}

export default JsonViewer