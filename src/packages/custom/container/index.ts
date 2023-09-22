import type { App } from 'vue'
import Container from '../container/Container.vue'

// 使用install方法，在app.use挂载
Container.install = (app: App): void => {
  app.component(Container.__name as string, Container)
}

export default Container