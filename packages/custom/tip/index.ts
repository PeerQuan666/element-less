import type { App } from 'vue'
import Tip from './Tip.vue'

// 使用install方法，在app.use挂载
Tip.install = (app: App): void => {
  app.component(Tip.__name as string, Tip)
}

export default Tip