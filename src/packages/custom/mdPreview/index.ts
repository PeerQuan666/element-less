import type { App } from 'vue'
import ElsMdPreview from './ElsMdPreview.vue'

// 使用install方法，在app.use挂载
ElsMdPreview.install = (app: App): void => {
  app.component(ElsMdPreview.__name as string, ElsMdPreview)
}

export default ElsMdPreview