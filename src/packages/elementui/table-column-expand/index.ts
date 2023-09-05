import type { App } from 'vue'
import ColumnExpand from './TableColumnExpand.vue'

// 使用install方法，在app.use挂载
ColumnExpand.install = (app: App): void => {
  app.component(ColumnExpand.__name as string, ColumnExpand)
}

export default ColumnExpand