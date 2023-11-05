import type { App } from 'vue'
import Highlight from './Highlight.vue'

// 使用install方法，在app.use挂载
Highlight.install = (app: App): void => {
  app.component(Highlight.__name as string, Highlight)
}

export default Highlight