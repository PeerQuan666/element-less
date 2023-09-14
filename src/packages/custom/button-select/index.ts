import type { App } from 'vue'
import ButtonSelect from './ButtonSelect.vue'

// 使用install方法，在app.use挂载
ButtonSelect.install = (app: App): void => {
  app.component(ButtonSelect.__name as string, ButtonSelect)
}

export default ButtonSelect