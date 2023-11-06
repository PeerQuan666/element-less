import type { App } from 'vue'
import Cron from './Cron.vue'

// 使用install方法，在app.use挂载
Cron.install = (app: App): void => {
  app.component(Cron.__name as string, Cron)
}

export default Cron