import type { App } from 'vue'
import StampBadge from './StampBadge.vue'

// 使用install方法，在app.use挂载
StampBadge.install = (app: App): void => {
  app.component(StampBadge.__name as string, StampBadge)
}

export default StampBadge