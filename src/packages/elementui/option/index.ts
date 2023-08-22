import type { App } from 'vue'
import Option from './Option.vue'

// 使用install方法，在app.use挂载
Option.install = (app: App): void => {
  app.component(Option.__name as string, Option)
}

export default Option