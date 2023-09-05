import type { App } from 'vue'
import ColumnSelect from './TableColumnSelect.vue'

// 使用install方法，在app.use挂载
ColumnSelect.install = (app: App): void => {
  app.component(ColumnSelect.__name as string, ColumnSelect)
}

export default ColumnSelect