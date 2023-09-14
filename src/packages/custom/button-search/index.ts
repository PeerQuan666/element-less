import type { App } from 'vue'
import ButtonSearch from './ButtonSearch.vue'

// 使用install方法，在app.use挂载
ButtonSearch.install = (app: App): void => {
  app.component(ButtonSearch.__name as string, ButtonSearch)
}

export default ButtonSearch