import type { App } from 'vue'
import WorkPlan from './WorkPlan.vue'

// 使用install方法，在app.use挂载
WorkPlan.install = (app: App): void => {
  app.component(WorkPlan.__name as string, WorkPlan)
}

export default WorkPlan