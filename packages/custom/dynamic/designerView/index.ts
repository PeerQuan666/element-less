import type { App } from 'vue'
import Index from './Index.vue'

// 使用install方法，在app.use挂载
Index.install = (app: App): void => {
  app.component(Index.__name as string, Index)
}

export default Index