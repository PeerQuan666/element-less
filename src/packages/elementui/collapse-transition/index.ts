import type { App } from 'vue'
import CollapseTransition from './CollapseTransition.vue'

// 使用install方法，在app.use挂载
CollapseTransition.install = (app: App): void => {
  app.component(CollapseTransition.__name as string, CollapseTransition)
}

export default CollapseTransition