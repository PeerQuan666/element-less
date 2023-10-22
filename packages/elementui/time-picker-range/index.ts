import type { App } from 'vue'
import TimePickerRange from './TimePickerRange.vue'

// 使用install方法，在app.use挂载
TimePickerRange.install = (app: App): void => {
  app.component(TimePickerRange.__name as string, TimePickerRange)
}

export default TimePickerRange