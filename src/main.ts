import { createApp } from 'vue'
import './style.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import store from './packages/store'
import { ElementLess } from './packages'
// 引入 router
import router from './router'
const app = createApp(App)
app.config.globalProperties.$lessConfig = {
    table:{
        menuFieldname:'PowerMenu',
        contextMenu:{
            idFieldname:'MenuID',
            nameFieldname:'MenuName',
            actionFieldname:'ActionName',
            iconFieldname:'ImageUrl'
        }
        
    }
}
app.use(router)
app.use(ElementPlus)
app.use(store)
app.use(ElementLess)
app.mount('#app')
