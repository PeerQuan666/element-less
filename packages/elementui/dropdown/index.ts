import type { App } from 'vue'
import Dropdown from './Dropdown.vue'

// 使用install方法，在app.use挂载
Dropdown.install = (app: App): void => {
  app.component(Dropdown.__name as string, Dropdown)
}

export default Dropdown