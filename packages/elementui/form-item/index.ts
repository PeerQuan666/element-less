import type { App } from 'vue'
import FormItem from './FormItem.vue'

// 使用install方法，在app.use挂载
FormItem.install = (app: App): void => {
  app.component(FormItem.__name as string, FormItem)
}

export default FormItem