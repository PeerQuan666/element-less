import type { App } from 'vue'
import Form from './Form.vue'

// 使用install方法，在app.use挂载
Form.install = (app: App): void => {
  app.component(Form.__name as string, Form)
}

export default Form