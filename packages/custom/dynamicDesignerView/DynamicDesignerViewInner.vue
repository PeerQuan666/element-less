<script setup lang="ts">
import draggable from 'vuedraggable'

import { ref, computed, watchEffect } from 'vue'
import { ElMessage } from 'element-plus'
import DynamicDesignerViewItem from './DynamicDesignerViewInnerItem.vue'
import DynamicDesignerViewInner from './DynamicDesignerViewInner.vue'
import DynamicDesignerViewInnerArray from './DynamicDesignerViewInnerArray.vue'
import { useVModel } from '@vueuse/core'
import { lessCom } from '../../utlis/com'
import { useValue } from '../../utlis/use'
interface Props {
    nodeItem?: Record<string, any>,
    data: Array<Record<string, any>>,
    depath?: number,
    containerName?: string,
    parentNode?: Record<string, any>
}

const props = defineProps<Props>()
const emits = defineEmits(['update:data'])
const currData = useVModel(props, 'data', emits)
const { getValue,setValue } = useValue(props)
const setSelectItem = getValue<Function>('setSelectItem', () => { })
const getSelectItem = getValue<Function>('getSelectItem', () => { })
const recordComponent = getValue<Function>('recordComponent', () => { })
const labelWidth = ref(getValue<any>('labelWidth', undefined))
const currDepath = ref(0)
const itemClassName = ref('')
const _isMobile= getValue('isMobile',false)

const currNode = computed<any>(() => {
    let currData = {}
    props.data.forEach(ele => {
        if (ele.componentTypeName == 'Row') {
            ele.data.forEach(cele => {
                currData[cele.keyCode] = cele
            })
        } else {
            currData[ele.keyCode] = ele
        }
    })
    return currData
})

function handleDisabledExpress(item) {

    if (item.config.baseConfig && item.config.advancedConfig.disabled) {
        let currEvent = new Function('parentNode,currNode', "return " + item.config.advancedConfig.disabled);
        return currEvent(props.parentNode, currNode.value);
    }
    return false;
}
function handleIfExpress(item) {
    try {
        if (item.config.advancedConfig && item.config.advancedConfig.vif) {
            let currEvent = new Function('parentNode,currNode', "return " + item.config.advancedConfig.vif);
            return currEvent(props.parentNode, currNode.value);
        }
    } catch (err) {
        console.error(err)
    }

    return true;
}
function handleValueChange(val, item) {
    if (item.config.advancedConfig && item.config.advancedConfig.eventChange) {
        let currEvent = new Function('val,parentNode,currNode', item.config.advancedConfig.eventChange)
        currEvent(val, props.parentNode, currNode.value);
    }
}
function getFormItemAttr(item) {
    const currFormConfig = lessCom.cloneObj(item.config.formConfig)
    if ((item.dataTypeName == 'None' || item.config.baseConfig?.componentName == 'ElsCaption' || item.componentTypeName === 'Row')) {
        currFormConfig.labelWidth = '0px'
    } else if (item.dataTypeName == 'Object' || item.arrayDataTypeName == 'Object') {
        delete currFormConfig.labelWidth
    }
    if (currFormConfig) {
        if (currFormConfig.validMethod) {
            let currEvent = new Function('parentNode,currNode', "return " + currFormConfig.validMethod);
            currFormConfig.validMethod = currEvent(props.parentNode, currNode.value);
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
    return currFormConfig
}


if (props.depath && props.depath > 0) {
    itemClassName.value = "els-dynamic-r-item-child";

} else {
    itemClassName.value = "els-dynamic-r-item";
}
watchEffect(() => {
    const formConfig = props.nodeItem?.config.formConfig
    if (props.nodeItem && formConfig && formConfig.labelWidth) {
        labelWidth.value = formConfig.labelWidth
    }

})



function handleSelectItem(item,) {
    setSelectItem(item, currData.value)
}
function handleAddComponent(e) {
    recordComponent()
    setSelectItem(currData.value[e.newIndex], currData.value)

}
function initArrayChild(element) {
    if (element.data.length > 0) {
        const child = element.data[0];
        if (child.dataTypeName === 'Array') {
            ElMessage.warning('数组不能嵌套数组')
            element.data.splice(0, 1)
            return
        }
        if (child.dataTypeName == 'None') {
            ElMessage.warning('数组中不能展示组件')
            element.data.splice(0, 1)
            return
        }
        element.arrayDataType = child.dataType
        element.arrayDataTypeName = child.dataTypeName
        element.componentName = child.componentName
        element.componentGroup = child.componentGroup
        element.componentType = child.componentType
        element.componentTypeName = child.componentTypeName
        element.data = child.data
    }
    recordComponent()
    return true
}
function handleAddArrayComponent() {

    recordComponent()


}
function handleRemove(item) {
    var index = currData.value.indexOf(item)
    currData.value.splice(index, 1)
    setSelectItem(null)
    recordComponent()

}

currDepath.value += 1;
setValue()


</script>
<template>
    <els-form v-model="currData" :label-width="labelWidth" style="width: 100%;" v-bind="nodeItem?.config?.formConfig">
        <component :is="nodeItem?.componentTypeName=='Row'?'ElsRow':'div'" :gutter="5" :class="itemClassName"
            :style="nodeItem?.componentTypeName === 'Row' ? nodeItem ? nodeItem.config.advancedConfig?.style : '' : ''">
            <draggable tag="div" :class="nodeItem?.componentTypeName === 'Row' ? 'els-row-drag' : ''"
                :style="[{ 'min-height': depath ? '50px' : '650px' },{'padding-top':_isMobile&&nodeItem?.dataTypeName=='Object'?'20px':'0px'}]" style="margin:5px 0;width: 100%;"
                :list="currData" @add="handleAddComponent" item-key="keyID"
                v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 300 }" :sort="true"
                handle=".els-view-move">
                <template #item="{ element, index }">
                    <component :key="element.keyID" :is="nodeItem?.componentTypeName==='Row'?'els-col':'div'">
                        <div class="els-dynamic-d-v-item"
                            :class="{ 'selected': getSelectItem()?.keyID == element.keyID }"
                            @click.stop="handleSelectItem(element)">
                            <span class="els-dynamic-d-v-item-type" v-if="element.componentGroup == 'Form'">
                                <span>{{ element.keyCode }}</span>
                                <span>{{ element.dataTypeName === 'Array' ? `Array
                                    <${element.arrayDataTypeName ? element.arrayDataTypeName : 'T'}>` : element.dataTypeName }}
                                </span>
                            </span>
                            <span class="els-dynamic-d-v-item-move">
                                <el-icon v-if="!handleIfExpress(element)">
                                    <Hide />
                                </el-icon>
                                <el-popconfirm title="确定删除吗？" @confirm="handleRemove(element)">
                                    <template #reference>
                                        <el-icon class="el-icon-remove">
                                            <Delete />
                                        </el-icon></template>
                                </el-popconfirm>
                                <el-icon class="el-icon-rank els-view-move">
                                    <Rank />
                                </el-icon>
                            </span>
                            <DynamicDesignerViewInner v-if="element.componentTypeName == 'Row'" :data="element.data"
                                :parentNode="currNode" :node-item="element" :depath="currDepath">
                            </DynamicDesignerViewInner>
                            <template v-else>
                                <template v-if="_isMobile">
                                    <template v-if="element.dataTypeName === 'Array' && !element.arrayDataTypeName">
                                        <draggable tag="div" class="mobile-slot"
                                            style="min-height:100px;margin:5px 0;width: 100%;z-index:10"
                                            :list="element.data" @add="handleAddArrayComponent()" item-key="keyID"
                                            v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 300 }">
                                            <template #item>
                                                <el-empty v-if="initArrayChild(element)"></el-empty>
                                            </template>
                                        </draggable>
                                    </template>
                                    <els-caption v-else-if="element.config.baseConfig?.componentName == 'ElsCaption'"
                                    v-bind="element.config.baseConfig"
                                    :title="!element.config.baseConfig.title ? element.keyName : element.config.baseConfig.title"></els-caption>
                                    <DynamicDesignerViewItem :key="element.keyID"
                                        v-else-if="element.componentTypeName && element.componentGroup === 'Form'"
                                        :disabled="handleDisabledExpress(element)" :parent-node="parentNode"
                                        :curr-node="currNode" :item="element" v-model="element.value"
                                        :style="element.config.advancedConfig.style"
                                        @valueChange="handleValueChange($event, element)"
                                        v-bind="getFormItemAttr(element)" 
                                        :label="element.config.baseConfig?.componentName == 'ElsCaption' ? '' : element.keyName"
                                        >
                                    </DynamicDesignerViewItem>

                                    <van-cell-group  :title="element.keyName"   v-else-if="element.dataTypeName == 'Object' || (element.dataTypeName == 'Array' && element.arrayDataTypeName == 'Object')" >
                                    <DynamicDesignerViewInner
                                      
                                        :data="element.data" :parentNode="currNode" :node-item="element"
                                        :depath="currDepath">
                                    </DynamicDesignerViewInner>
                                    </van-cell-group>

                                    <DynamicDesignerViewInnerArray
                                        v-else-if="element.dataTypeName == 'Array' && element.arrayDataType && element.arrayDataTypeName != 'Object'"
                                        :parent-node="parentNode" :item="element" :depath="currDepath">
                                    </DynamicDesignerViewInnerArray>


                                    </template>
                                    <template v-else>
                                        <els-caption v-if="element.config.baseConfig?.componentName == 'ElsCaption'"
                                            v-bind="element.config.baseConfig"
                                            :title="!element.config.baseConfig.title ? element.keyName : element.config.baseConfig.title"></els-caption>
                                        
                                        <els-form-item
                                            v-if="element.componentGroup === 'Form' || element.dataTypeName === 'Array' || element.dataTypeName == 'Object'"
                                            :hasFormItem="false" :key="element.keyID" v-bind="getFormItemAttr(element)"
                                            :class="element.dataTypeName == 'Object' ? 'els-dynamic-obj' : ''"
                                            :style="element.config.baseConfig?.componentName == 'ElsCaption' || element.dataTypeName == 'Object' ? 'margin-bottom:0 !important' : ''"
                                            :label="element.config.baseConfig?.componentName == 'ElsCaption' ? '' : element.keyName"
                                            :prop="`[${index}].value`">
                                            <template v-if="element.dataTypeName === 'Array' && !element.arrayDataTypeName">
                                                <draggable tag="div"
                                                    style="min-height:100px;margin:5px 0;width: 100%;z-index:10"
                                                    :list="element.data" @add="handleAddArrayComponent()" item-key="keyID"
                                                    v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 300 }">
                                                    <template #item>
                                                        <el-empty v-if="initArrayChild(element)"></el-empty>
                                                    </template>
                                                </draggable>
                                            </template>


                                            <DynamicDesignerViewItem :key="element.keyID"
                                                v-else-if="element.componentTypeName && element.componentGroup === 'Form'"
                                                :disabled="handleDisabledExpress(element)" :parent-node="parentNode"
                                                :curr-node="currNode" :item="element" v-model="element.value"
                                                :style="element.config.advancedConfig.style"
                                                @valueChange="handleValueChange($event, element)">
                                            </DynamicDesignerViewItem>

                                            <DynamicDesignerViewInner
                                                v-else-if="element.dataTypeName == 'Object' || (element.dataTypeName == 'Array' && element.arrayDataTypeName == 'Object')"
                                                :data="element.data" :parentNode="currNode" :node-item="element"
                                                :depath="currDepath">
                                            </DynamicDesignerViewInner>

                                            <DynamicDesignerViewInnerArray
                                                v-else-if="element.dataTypeName == 'Array' && element.arrayDataType && element.arrayDataTypeName != 'Object'"
                                                :parent-node="parentNode" :item="element" :depath="currDepath">
                                            </DynamicDesignerViewInnerArray>

                                        </els-form-item>
                                        <els-caption
                                            v-if="element.componentGroup === 'Desc' && element.componentTypeName == 'Caption'"
                                            v-bind="element.config.baseConfig"
                                            :title="!element.config.baseConfig.title ? element.keyName : element.config.baseConfig.title"></els-caption>
                            </template>
                        </template>
                        </div>
                    </component>
                </template>
            </draggable>
        </component>
    </els-form>
</template>
<style scoped lang="less">

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

        .els-dynamic-r-item-child {
            display: flex;
            gap: 5px;
        }

        .els-dynamic-r-item {
            display: flex;
        }
    }
}

.els-dynamic-d-v-item {
    position: relative;
    margin-bottom: 5px;
    margin-left: 5px;
    >.els-node{
        border: 1px dashed #aaaaaabf;
    }
    >.el-form-item {
        border: 1px dashed #aaaaaabf;
        padding: 16px 5px 5px 0px;
    }
    >.el-form-item:has(form) {
        border: 0px;
    }
    >.els-caption {
        padding-top: 20px;
        margin-bottom: 0;
    }
    .els-row-drag {
        display: flex;
        flex-wrap: wrap;
        position: relative;
        box-sizing: border-box;
        min-height: 50px !important;
    }
    .els-dynamic-d-v-item-type {
        position: absolute;
        z-index: 2;
        background: #aaaaaabf;
        color: #fff;
        font-size: 12px;
        padding: 0 3px;
        display: flex;
        column-gap: 5px;
        line-height: 15px;
    }
    .els-dynamic-d-v-item-move {
        position: absolute;
        z-index: 2;
        background: #aaaaaadb;
        color: #fff;
        font-size: 12px;
        right: 0;
        padding: 0 3px;
        display: none;
        cursor: pointer;
        line-height: 15px;

    }
 
}

.els-dynamic-d-v-item.selected {
    >.els-node,>.els-caption,>.el-form-item,>.mobile-slot{
        border: 2px solid #409EFF;
    }
    
    >.els-dynamic-d-v-item-move {
        display: flex;
        gap: 5px;
        padding: 2px;
    }

    >.els-caption {
        padding-top: 20px;
        margin-bottom: 0;
    }
    >.el-form-item:has(form) {
        border: 0px;
    }
    >.els-dynamic-d-v-item-type,
    >.els-dynamic-d-v-item-move {
        background: #409effbd;
    }
}

.els-dynamic-d-v-item:has(form) {
    border: 1px dashed #aaaaaabf;
}

.els-dynamic-d-v-item.selected:has(form) {
    border: 2px solid #409EFF !important;
}

</style>
