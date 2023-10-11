import type { App } from 'vue'
import ElsMdEditor from './ElsMdEditor.vue'

// 使用install方法，在app.use挂载
ElsMdEditor.install = (app: App): void => {
  app.component(ElsMdEditor.__name as string, ElsMdEditor)
}

export default ElsMdEditor