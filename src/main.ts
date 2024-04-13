import { createApp } from 'vue'
import './style.css'
import 'element-plus/dist/index.css'
import VueUeditorWrap from "vue-ueditor-wrap"
import App from './App.vue'
import ElementPlus from 'element-plus'
import "jsoneditor";
// 引入 router
import router from './router'
import ElementLess from '../packages/index'
import pinia from '../packages/utlis/pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)
app.config.globalProperties.$lessConfig = {
    api: {
        code: 'ResultCode',
        message: 'ResultMessage',
        data: 'Data',
        successCode: '0',
        eventData: { data: 'EventActionData', data_key: 'Name', data_value: 'value' }
    },
    upload: {
        url: 'UploadFileOSS',
        data: 'UploadInfo',
        data_path: 'ResourcePath',
        data_md5: 'Md5Value',
    },
    uEditor: {
        serverUrl: 'UploadFileOSS',
        homeUrl: '/UEditor/'
    },
    menu: {
        id: 'MenuID',
        name: 'MenuName',
        action: 'ActionType',
        icon: 'ImageUrl',
        buttonColor: 'ButtonColor',
        buttonType: 'ButtonType',
        group: 'Fold',
        url: 'TargetUrl',
        areaName: 'AreaName',
        controllerName: 'ControllerName',
        actionName: 'ActionName'
    },
    table: {
        menu: 'PowerMenu',
        avgDay: 'DayCount',
        page: {
            data: "Data",
            pageSize: 'PageSize',
            currentPage: 'PageIndex',
            total: 'RecordCountInt',
            pageCount: 'PageCount'
        }
    }
}
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(pinia)
app.use(VueUeditorWrap)
app.use(router)
app.use(ElementPlus)
app.use(ElementLess)

app.mount('#app')
