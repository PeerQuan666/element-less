import type { App } from 'vue'
import ColumnEnum from './TableColumnEnum.vue'

// 使用install方法，在app.use挂载
ColumnEnum.install = (app: App): void => {
  app.component(ColumnEnum.__name as string, ColumnEnum)
}

export default ColumnEnum