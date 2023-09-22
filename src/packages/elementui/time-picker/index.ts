import type { App } from 'vue'
import TimePicker from './TimePicker.vue'

// 使用install方法，在app.use挂载
TimePicker.install = (app: App): void => {
  app.component(TimePicker.__name as string, TimePicker)
}

export default TimePicker