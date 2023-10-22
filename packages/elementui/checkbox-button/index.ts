import type { App } from 'vue'
import CheckboxButton from './CheckboxButton.vue'

// 使用install方法，在app.use挂载
CheckboxButton.install = (app: App): void => {
  app.component(CheckboxButton.__name as string, CheckboxButton)
}

export default CheckboxButton