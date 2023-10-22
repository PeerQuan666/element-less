import type { App } from 'vue'
import InputRange from './InputRange.vue'

// 使用install方法，在app.use挂载
InputRange.install = (app: App): void => {
  app.component(InputRange.__name as string, InputRange)
}

export default InputRange