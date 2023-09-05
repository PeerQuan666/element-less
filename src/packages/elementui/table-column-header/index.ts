import type { App } from 'vue'
import ColumnHeader from './TableColumnHeader.vue'

// 使用install方法，在app.use挂载
ColumnHeader.install = (app: App): void => {
  app.component(ColumnHeader.__name as string, ColumnHeader)
}

export default ColumnHeader