import type { App } from 'vue'
import ColorPicker from './ColorPicker.vue'

// 使用install方法，在app.use挂载
ColorPicker.install = (app: App): void => {
  app.component(ColorPicker.__name as string, ColorPicker)
}

export default ColorPicker