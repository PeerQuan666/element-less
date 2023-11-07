

import "./custom.less";
import VpDemo from '../components/vp-demo.vue'
import ApiTyping from '../components/globals/vp-api-typing.vue'
import ApiFunctionType from '../components/globals/vp-api-function.vue'
import ApiBooleanType from '../components/globals/vp-api-bool.vue'
import ApiStringType from '../components/globals/vp-api-string.vue'
import ApiNumberType from '../components/globals/vp-api-number.vue'
import ApiRefType from '../components/globals/vp-api-ref.vue'
import ApiEnumType from '../components/globals/vp-api-enum.vue'
import ApiExternalType from '../components/globals/vp-api-external.vue'

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
        app.component('ApiTyping', ApiTyping)

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