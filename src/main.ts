import { createApp } from 'vue'
import './style.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import store from './packages/store'
import { BabyUI } from './packages'
// 引入 router
import router from './router'
const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(store)
app.use(BabyUI)
app.mount('#app')
