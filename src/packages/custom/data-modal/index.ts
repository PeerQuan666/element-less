import type { App } from 'vue'
import DataModal from './DataModal.vue'

// 使用install方法，在app.use挂载
DataModal.install = (app: App): void => {
  app.component(DataModal.__name as string, DataModal)
}

export default DataModal