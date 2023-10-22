import type { App } from 'vue'
import OptionGroup from './OptionGroup.vue'

// 使用install方法，在app.use挂载
OptionGroup.install = (app: App): void => {
  app.component(OptionGroup.__name as string, OptionGroup)
}

export default OptionGroup