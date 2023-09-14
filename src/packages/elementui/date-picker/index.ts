import type { App } from 'vue'
import DatePicker from './DatePicker.vue'

// 使用install方法，在app.use挂载
DatePicker.install = (app: App): void => {
  app.component(DatePicker.__name as string, DatePicker)
}

export default DatePicker