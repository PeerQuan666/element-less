import type { App } from 'vue'
import MenuItem from './MenuItem.vue'

// 使用install方法，在app.use挂载
MenuItem.install = (app: App): void => {
  app.component(MenuItem.__name as string, MenuItem)
}

export default MenuItem