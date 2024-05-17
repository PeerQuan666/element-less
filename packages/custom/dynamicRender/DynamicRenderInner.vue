<script setup lang="ts">
import { ref, computed, watchEffect, reactive } from 'vue'

import { lessCom } from '../../utlis/com'
import { useValue } from '../../utlis/use'
const { getValue } = useValue()

import DynamicRenderInnerItem from './DynamicRenderInnerItem.vue'
import DynamicRenderInnerArray from './DynamicRenderInnerArray.vue'
import DynamicRenderInnerWrap from './DynamicRenderInnerWrap.vue'
import DynamicRenderShow from './DynamicRenderShow.vue'
import DynamicRenderInnerObjectArray from './DynamicRenderInnerObjectArray.vue'
import DynamicRenderForm from './DynamicRenderForm.vue'


interface Props {
}


const props = defineProps<Props>()
const isMobile = getValue<boolean>('isMobile', false)

const nodeItem = defineModel<any>("nodeItem", { default: () => { return reactive<Record<string, any>>([]); } })
const getCurrNode = getValue<Function>('getCurrNode', () => { return {} })
const getParentNode = getValue<Function>('getParentNode', () => { return {} })


function handleIfExpress(item) {
    try {
        if (item.config && item.config.advancedConfig && item.config.advancedConfig.vif) {
            let currEvent = new Function('parentNode,currNode', "return " + item.config.advancedConfig.vif);
            return currEvent(getParentNode(), getCurrNode());
        }
    } catch (err) {
        console.error(err)
    }

    return true;
}

function getFormItemAttr(item) {
    const currFormConfig = lessCom.cloneObj(item.config.formConfig)
    if ((item.dataTypeName == 'None' || item.config.baseConfig?.componentName == 'ElsCaption' || item.componentTypeName === 'Row')) {
        currFormConfig.labelWidth = '0px'
    } else if (item.dataTypeName == 'Array' && item.arrayDataTypeName == 'Object') {
        delete currFormConfig.labelWidth
    }
    if (currFormConfig) {
        if (currFormConfig.validMethod) {
            let currEvent = new Function('parentNode,currNode', "return " + currFormConfig.validMethod);
            currFormConfig.validMethod = currEvent(getParentNode(), getCurrNode());
        } else {
            delete currFormConfig.validMethod
        }
    }
    if (item.required) {
        currFormConfig['required'] = true
    }
    if (item.description) {
        currFormConfig['tip'] = item.description
    }
    currFormConfig['label'] = nodeItem.value.keyName
    return currFormConfig
}


</script>
<template>

    <template v-if="handleIfExpress(nodeItem)">
        <template
            v-if="(nodeItem.dataTypeName === 'Object' || nodeItem.arrayDataTypeName == 'Object') && nodeItem.config.baseConfig?.componentName == 'ElsCaption'">
            <els-caption v-bind="nodeItem.config.baseConfig"
                :title="nodeItem.config.baseConfig.title || nodeItem.keyName">
            </els-caption>
            <DynamicRenderInnerObjectArray
                v-if="nodeItem.dataTypeName === 'Array' && nodeItem.arrayDataTypeName == 'Object'" :nodeItem="nodeItem">
            </DynamicRenderInnerObjectArray>
            <DynamicRenderForm :nodeItem="nodeItem" v-else></DynamicRenderForm>
        </template>

        <DynamicRenderShow v-if="nodeItem.componentTypeName && nodeItem.componentGroup === 'Show'"
            :nodeItem="nodeItem" :style="nodeItem.config.advancedConfig.style" :title="nodeItem.keyName">
        </DynamicRenderShow>


        <template  v-else-if="nodeItem.componentGroup == 'Container'">
            <els-form-node :hasFormItem="false" v-if="nodeItem.keyCode&&nodeItem.formItem"
                v-bind="getFormItemAttr(nodeItem)">
                <DynamicRenderInnerWrap :parentNode="nodeItem" :nodeItem="nodeItem">
                </DynamicRenderInnerWrap>
            </els-form-node>
            <DynamicRenderInnerWrap :parentNode="nodeItem" :nodeItem="nodeItem" v-else >
            </DynamicRenderInnerWrap>
        </template>
        
        <els-form-node :hasFormItem="false" v-else
            v-bind="getFormItemAttr(nodeItem)">
            <DynamicRenderForm :nodeItem="nodeItem" v-if="nodeItem.dataTypeName == 'Object'"></DynamicRenderForm>
            <DynamicRenderInnerObjectArray v-else-if="nodeItem.dataTypeName === 'Array' &&nodeItem.arrayDataType == 'Object'"  :nodeItem="nodeItem">
            </DynamicRenderInnerObjectArray>
            <DynamicRenderInnerArray :nodeItem="nodeItem"  v-else-if="nodeItem.dataTypeName === 'Array' && nodeItem.arrayDataType">
            </DynamicRenderInnerArray>
            <DynamicRenderInnerItem :nodeItem="nodeItem" v-model="nodeItem.value" v-else-if="nodeItem.componentTypeName && nodeItem.componentGroup === 'Form'">
            </DynamicRenderInnerItem>
        </els-form-node>
    </template>


</template>

<style scoped lang="less">
.txt-red {
    color: red;
}

.els-dynamic-r-array-m-container {
    ::v-deep(.els-list-bottom) {
        text-align: center;
        line-height: 24px;
        padding: 5px 0;
    }

    ::v-deep(.listitem) {
        display: unset !important;
    }

    .els-dynamic-r-item-child {
        display: unset !important;
    }

}

.els-dynamic-r-mobile-title {
    display: flex;
    justify-content: space-between;
}

//has影响性能
.el-row:has(div[class^=el-form-item]) {
    margin-bottom: 0px;
}

.el-form-item:has(div[class^=els-dynamic-render]) {
    margin-bottom: 0 !important;
}

.els-dynamic-render {
    .el-form-item__content {
        >.el-form {
            flex-grow: 1;
        }
    }

    .el-col>.el-form-item {
        margin-bottom: 18px;
    }
}

.els-dynamic-r-item-child {
    .el-form-item__content {
        .el-form {
            flex-grow: 1;

            .el-row:last-child {
                margin-bottom: 0px;
            }
        }

        .els_upload_container {
            flex-grow: 1;
        }
    }

    .el-form-item:has(form) {
        .el-form-item {
            margin-bottom: 18px;
        }
    }

}

.els-dynamic-obj {
    .el-form-item {
        margin-bottom: 18px !important;
    }

    .el-form-item .el-form-item {
        margin-bottom: 0px !important;
    }
}

.els-dynamic-r-array {
    border: 1px solid #dcdfe6;
    padding: 5px 60px 5px 5px;
    position: relative;

    >.els-list-operate {
        position: absolute;
        right: 0;
        top: 0;
        background: #e5efff;
        margin-left: 0px !important;
    }
}

.els-dynamic-r-array-container {
    overflow: scroll;
    flex-grow: 1;
}

.els-dynamic-r-item,
.els-dynamic-r-array {
    .el-form-item__content>.els-caption {
        margin-bottom: 0px;
    }

    .els-caption {
        flex-grow: 1;
    }

    .listitem {
        .els-list-operate {
            margin-bottom: 0;
        }

        >form {
            flex-grow: 1;

            //has影响性能
            .els-dynamic-r-item-child:has(label[class^=el-form-item__label]) {
                display: inherit
            }

            .els-dynamic-r-item-child {
                display: flex;
                gap: 5px;
            }
        }

        .els-dynamic-r-item-child {
            display: flex;
            gap: 5px;
        }

        .els-dynamic-r-item {
            display: flex;
        }
    }

}


.el-form-item__content>.els-dynamic-render>form>.els-dynamic-r-item {
    display: unset;

}

.el-form-item__content>.els-dynamic-render {
    flex-grow: 1;

}

.els-dynamic-r-array-item {
    >form>.els-dynamic-r-item {
        display: unset !important;
    }

    flex-grow: 1;

}

.els-dynamic-render>form>div>div:has([class^=el-form-item]) {
    margin-bottom: 18px;
}

.els-dynamic-render>form>div>div:has(form) {
    margin-bottom: 0px !important;
}
</style>