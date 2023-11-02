

import "./custom.less";
import VpDemo from '../components/vp-demo.vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueUeditorWrap from "vue-ueditor-wrap"
import ElementLess from '../../../packages'
import pinia from '../../../packages/utlis/pinia'
import 'element-plus/dist/index.css'
import DefaultTheme from 'vitepress/theme'
export default {
    ...DefaultTheme,
    
    enhanceApp({ app, router, siteData }) {
        app.component(VpDemo.name, VpDemo)
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
        app.config.globalProperties.$lessConfig = {
            api: {
                code: 'ResultCode',
                message: 'ResultMessage',
                data: 'Data',
                successCode: '0',
                eventData: { data: 'EventActionData', data_key: 'Name', data_value: 'value' }
            },
            upload: {
                url: 'http://manage.ybt2023.com/Home/TestUpload',
                data: 'UploadInfo',
                data_path: 'ResourcePath',
                data_md5: 'Md5Value',
            },
            uEditor: {
                serverUrl: 'http://manage.ybt2023.com/UEditorTest/Upload',
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

        app.use(pinia)
        app.use(VueUeditorWrap)
        app.use(ElementPlus);
        app.use(ElementLess);

    }
}