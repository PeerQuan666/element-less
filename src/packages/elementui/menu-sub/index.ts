import type { App } from 'vue'
import SubMenu from './SubMenu.vue'

// 使用install方法，在app.use挂载
SubMenu.install = (app: App): void => {
  app.component(SubMenu.__name as string, SubMenu)
}

export default SubMenu