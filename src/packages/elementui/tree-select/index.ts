import type { App } from 'vue'
import TreeSelect from './TreeSelect.vue'

// 使用install方法，在app.use挂载
TreeSelect.install = (app: App): void => {
  app.component(TreeSelect.__name as string, TreeSelect)
}

export default TreeSelect