import type { App } from 'vue'
import ColumnBool from './TableColumnBool.vue'

// 使用install方法，在app.use挂载
ColumnBool.install = (app: App): void => {
  app.component(ColumnBool.__name as string, ColumnBool)
}

export default ColumnBool