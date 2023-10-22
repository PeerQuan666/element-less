import type { App } from 'vue'
import MenuContext from './MenuContext.vue'

// 使用install方法，在app.use挂载
MenuContext.install = (app: App): void => {
  app.component(MenuContext.__name as string, MenuContext)
}

export default MenuContext