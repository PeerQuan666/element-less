import type { App } from 'vue'
import Autocomplete from './Autocomplete.vue'

// 使用install方法，在app.use挂载
Autocomplete.install = (app: App): void => {
  app.component(Autocomplete.__name as string, Autocomplete)
}

export default Autocomplete