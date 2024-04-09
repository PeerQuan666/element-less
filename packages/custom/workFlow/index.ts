import type { App } from 'vue'
import WorkFlow from './WorkFlow.vue'

// 使用install方法，在app.use挂载
WorkFlow.install = (app: App): void => {
  app.component(WorkFlow.__name as string, WorkFlow)
}

export default WorkFlow