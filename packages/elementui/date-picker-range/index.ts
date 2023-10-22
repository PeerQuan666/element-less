import type { App } from 'vue'
import DatePickerRange from './DatePickerRange.vue'

// 使用install方法，在app.use挂载
DatePickerRange.install = (app: App): void => {
  app.component(DatePickerRange.__name as string, DatePickerRange)
}

export default DatePickerRange