import type { App } from 'vue'
import ColumnOperate from './TableColumnOperate.vue'

// 使用install方法，在app.use挂载
ColumnOperate.install = (app: App): void => {
  app.component(ColumnOperate.__name as string, ColumnOperate)
}

export default ColumnOperate