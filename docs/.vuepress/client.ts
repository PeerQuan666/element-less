import { defineClientConfig } from "@vuepress/client";
import VpDemo from './components/vp-demo.vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { library,config  } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ElementLess } from '../../src/packages'
import 'element-plus/dist/index.css'

library.add(far,fas)

export default defineClientConfig({
  enhance: ({ app, router, siteData }) => {
  
    app.component(VpDemo.name, VpDemo)
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    app.component('font-awesome-icon', FontAwesomeIcon)
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
    app.use(ElementPlus);
    app.use(ElementLess);
  },
});
