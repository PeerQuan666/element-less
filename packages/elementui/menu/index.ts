import type { App } from 'vue'
import Menu from './Menu.vue'

// 使用install方法，在app.use挂载
Menu.install = (app: App): void => {
  app.component(Menu.__name as string, Menu)
}

export default Menu