import type { App } from 'vue'
import MenuTool from './MenuTool.vue'

// 使用install方法，在app.use挂载
MenuTool.install = (app: App): void => {
  app.component(MenuTool.__name as string, MenuTool)
}

export default MenuTool