<script setup lang="ts">
import draggable from 'vuedraggable'

import { ref, inject, computed, watchEffect } from 'vue'
import { ElMessage } from 'element-plus'
import DynamicDesignerViewItem from './DynamicDesignerViewInnerItem.vue'
import DynamicDesignerViewInner from './DynamicDesignerViewInner.vue'
import DynamicDesignerViewInnerArray from './DynamicDesignerViewInnerArray.vue'
import { useVModel } from '@vueuse/core'

import '../../utlis/lessPrototype.js'
import lessCom from '../../utlis/lessCom'

interface Props {
    nodeItem?: Record<string, any>,
    data: Array<Record<string, any>>,
    depath?: number,
    containerName?: string,
    parentNode?: Record<string, any>,
}

const props = withDefaults(defineProps<Props>(), {

})
const emits = defineEmits(['update:data'])

const currData = useVModel(props, 'data', emits)

const defaultLabelWidth = inject<any>('labelWidth', undefined)

const labelWidth = ref()
const currDepath = ref(0)
const itemClassName = ref('')

const currNode = computed<any>(() => {
    let currData = {}
    props.data.forEach(ele => {
        if (ele.componentName == 'ElsRow') {
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
    if ((item.dataTypeName == '无' || item.config.baseConfig?.componentName == 'ElsCaption' || item.componentName === 'ElsRow')) {
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
    } return currFormConfig
}


if (props.depath && props.depath > 0) {
    itemClassName.value = "els-dynamic-r-item-child";

} else {
    itemClassName.value = "els-dynamic-r-item";
}
watchEffect(() => {
    const formConfig = props.nodeItem?.config.formConfig
    if (props.nodeItem && formConfig) {
        labelWidth.value = formConfig.labelWidth ? formConfig.labelWidth : undefined
    }
    if (!labelWidth.value && defaultLabelWidth) {
        labelWidth.value = defaultLabelWidth.value
    }
})


const setSelectItem = inject<Function>('setSelectItem', () => { })
const getSelectItem = inject<Function>('getSelectItem', () => { })
const recordComponent = inject<Function>('recordComponent', () => { })


function handleSelectItem(item) {
    setSelectItem(item)
}
function handleAddComponent(e) {
    recordComponent()
    setSelectItem(currData.value[e.newIndex])

}
function initArrayChild(element){
    if (element.data.length > 0) {
        const child = element.data[0];
        if (child.dataTypeName === 'Array') {
            ElMessage.warning('数组不能嵌套数组')
            element.data.splice(0, 1)
            return
        }
        if(child.dataTypeName=='无'){
            ElMessage.warning('数组中不能展示组件')
            element.data.splice(0, 1)
            return
        }
        element.arrayDataType = child.dataType
        element.arrayDataTypeName = child.dataTypeName
        element.componentName = child.componentName
        element.componentGroup = child.componentGroup
        element.controlType = child.controlType
        element.controlTypeName = child.controlTypeName
        element.data = child.data
        element.value = []
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



</script>
<template>
    <els-form v-model="currData" :label-width="labelWidth" style="width: 100%;">
        <component :is="nodeItem?.componentName=='ElsRow'?'ElsRow':'div'" :gutter="5" :class="itemClassName"
            :style="nodeItem?.componentName === 'ElsRow' ? nodeItem ? nodeItem.config.advancedConfig?.style : '' : ''">
            <draggable tag="div" :class="nodeItem?.componentName === 'ElsRow' ? 'els-row-drag' : ''"
                :style="[{ 'min-height': depath ? '50px' : '650px' }]" style="margin:5px 0;width: 100%;" :list="currData"
                @add="handleAddComponent" item-key="keyID"
                v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 300 }" :sort="true" handle=".els-view-move">
                <template #item="{ element, index }">

                    <component :key="element.keyID" :is="nodeItem?.componentName==='ElsRow'?'els-col':'div'">
                        <div v-if="handleIfExpress(element)" class="els-dynamic-d-v-item"
                            :class="{ 'selected': getSelectItem()?.keyID == element.keyID }"
                            @click.stop="handleSelectItem(element)">
                            <span class="els-dynamic-d-v-item-type" v-if="element.componentGroup == 'Form'">
                                <span>{{ element.keyCode }}</span>
                                <span>{{ element.dataTypeName === 'Array' ? `Array
                                    <${element.arrayDataTypeName ? element.arrayDataTypeName : 'T'}>` :
                                    element.dataTypeName }}
                                </span>
                            </span>
                            <span class="els-dynamic-d-v-item-move">
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
                            <DynamicDesignerViewInner v-if="element.componentName == 'ElsRow'" :data="element.data"
                                :parentNode="currNode" :node-item="element" :depath="currDepath">
                            </DynamicDesignerViewInner>
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
                                        <draggable  tag="div" style="min-height:100px;margin:5px 0;width: 100%;z-index:10"
                                            :list="element.data" @add="handleAddArrayComponent()"  item-key="keyID"
                                            v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 300 }">
                                            <template #item>
                                                <el-empty v-if="initArrayChild(element)"></el-empty>
                                            </template>
                                        </draggable>
                                    </template>
                                    <DynamicDesignerViewItem :key="element.keyID"
                                        v-else-if="element.dataTypeName != 'Array' && element.dataTypeName != 'Object' && element.componentName !== 'ElsRow'"
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
                                    v-if="element.componentGroup === 'Desc' && element.componentName == 'ElsCaption'"
                                    v-bind="element.config.baseConfig">{{ element.config.baseConfig.title ?? '描述'
                                    }}</els-caption>
                            </template>

                        </div>
                    </component>
                </template>
            </draggable>



        </component>
    </els-form>
</template>

