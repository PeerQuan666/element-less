import type { App } from 'vue'
import ColumnImage from './TableColumnImage.vue'

// 使用install方法，在app.use挂载
ColumnImage.install = (app: App): void => {
  app.component(ColumnImage.__name as string, ColumnImage)
}

export default ColumnImage