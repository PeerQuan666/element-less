import type { App } from 'vue'
import ButtonExport from './ButtonExport.vue'

// 使用install方法，在app.use挂载
ButtonExport.install = (app: App): void => {
  app.component(ButtonExport.__name as string, ButtonExport)
}

export default ButtonExport