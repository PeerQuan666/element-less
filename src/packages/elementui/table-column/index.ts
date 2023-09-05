import type { App } from 'vue'
import TableColumn from './TableColumn.vue'

// 使用install方法，在app.use挂载
TableColumn.install = (app: App): void => {
  app.component(TableColumn.__name as string, TableColumn)
}

export default TableColumn