import type { App } from 'vue'
import FormNode from './FormNode.vue'

// 使用install方法，在app.use挂载
FormNode.install = (app: App): void => {
  app.component(FormNode.__name as string, FormNode)
}

export default FormNode