import type { App } from 'vue'
import ColumnCheckbox from './TableColumnCheckbox.vue'

// 使用install方法，在app.use挂载
ColumnCheckbox.install = (app: App): void => {
  app.component(ColumnCheckbox.__name as string, ColumnCheckbox)
}

export default ColumnCheckbox