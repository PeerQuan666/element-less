import type { App } from 'vue'
import Caption from './Caption.vue'

// 使用install方法，在app.use挂载
Caption.install = (app: App): void => {
  app.component(Caption.__name as string, Caption)
}

export default Caption