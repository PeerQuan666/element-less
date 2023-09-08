import type { App } from 'vue'
import ImageViewer from './ImageViewer.vue'

// 使用install方法，在app.use挂载
ImageViewer.install = (app: App): void => {
  app.component(ImageViewer.__name as string, ImageViewer)
}

export default ImageViewer