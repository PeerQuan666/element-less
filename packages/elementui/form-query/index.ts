import type { App } from 'vue'
import FormQuery from './FormQuery.vue'

// 使用install方法，在app.use挂载
FormQuery.install = (app: App): void => {
  app.component(FormQuery.__name as string, FormQuery)
}

export default FormQuery