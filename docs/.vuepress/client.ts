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
      api:{
        code:'ResultCode',
        message:'ResultMessage',
        data:'Data',
        successCode:'0',
        eventData:{data:'EventActionData',data_key:'Name',data_value:'value'}
      },
      upload:{
        url:'http://manage.ybt2023.com/Home/TestUpload',
        data:'UploadInfo',
        data_path:'ResourcePath',
        data_md5:'Md5Value',
      },
      menu:{
        id:'MenuID',
        name:'MenuName',
        action:'ActionName',
        actionType:'ActionType',
        icon:'ImageUrl',
        buttonColor:'ButtonColor',
        buttonType:'ButtonType',
        group:'Fold'
      },
      table:{
          menu:'PowerMenu',
          avgDay:'DayCount',
          page:{
            data:"Data",
            pageSize:'PageSize',
            currentPage:'PageIndex',
            total:'RecordCountInt',
            pageCount:'PageCount'
          }
      }
  }
    app.use(ElementPlus);
    app.use(ElementLess);
  },
});
