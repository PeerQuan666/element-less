import type { App } from 'vue'
import MenuDropdown from './MenuDropdown.vue'

// 使用install方法，在app.use挂载
MenuDropdown.install = (app: App): void => {
  app.component(MenuDropdown.__name as string, MenuDropdown)
}

export default MenuDropdown