import type { App } from 'vue'
import RadioButton from './RadioButton.vue'

// 使用install方法，在app.use挂载
RadioButton.install = (app: App): void => {
  app.component(RadioButton.__name as string, RadioButton)
}

export default RadioButton