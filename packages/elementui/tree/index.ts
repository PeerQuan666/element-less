import type { App } from 'vue'
import Tree from './Tree.vue'

// 使用install方法，在app.use挂载
Tree.install = (app: App): void => {
  app.component(Tree.__name as string, Tree)
}

export default Tree