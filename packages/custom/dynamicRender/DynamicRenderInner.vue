<script setup lang="ts">
import { ref, inject, computed, watchEffect } from 'vue'
import DynamicRenderInnerItem from './DynamicRenderInnerItem.vue'
import DynamicRenderInner from './DynamicRenderInner.vue'
import DynamicRenderInnerArray from './DynamicRenderInnerArray.vue'
import { useVModel } from '@vueuse/core'

import '../../utlis/lessPrototype.js'
import lessCom from '../../utlis/lessCom'

interface Props {
    nodeItem?: Record<string, any>,
    data: Array<Record<string, any>> | Record<string, any>,
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

const currNode = computed(() => {
    let currData = {}
    props.data.forEach(ele => {
        if (ele.componentType == 'Row') {
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
        debugger
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
    if ((item.dataTypeName == 'None' || item.config.baseConfig?.componentName == 'ElsCaption' || item.componentType === 'Row')) {
        currFormConfig.labelWidth = '0px'
    } else if (item.dataTypeName == 'Array' && item.arrayDataTypeName == 'Object') {
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

function handleAddItem(item) {
    item.data.push(lessCom.cloneObj(item.arrayObjData))
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

currDepath.value += 1;



</script>
<template>
    <els-form v-model="currData" :label-width="labelWidth">
        <component :is="nodeItem?.componentType=='Row'?'ElsRow':'div'" :class="itemClassName"
            :style="nodeItem?.componentType === 'Row' ? nodeItem ? nodeItem.config.advancedConfig?.style : '' : ''">

            <component :is="nodeItem?.componentType==='Row'?'els-col':'div'" v-for="(item, index) in currData">

                <template v-if="handleIfExpress(item)">

                    <DynamicRenderInner v-if="item.componentType == 'Row'" :data="item.data" :parentNode="currNode"
                        :node-item="item" :depath="currDepath">
                    </DynamicRenderInner>
                    <template v-else>
                        <els-caption v-if="item.config.baseConfig?.componentName == 'ElsCaption'"
                                    v-bind="item.config.baseConfig"
                                    :title="!item.config.baseConfig.title ? item.keyName : item.config.baseConfig.title"></els-caption>

                        <els-form-item v-if="item.componentGroup === 'Form'||item.dataTypeName==='Array'||item.dataTypeName=='Object'" :hasFormItem="false"
                          :key="item.keyID"
                            v-bind="getFormItemAttr(item)"
                            :class="item.dataTypeName == 'Object'?'els-dynamic-obj':''"
                            :style="item.config.baseConfig?.componentName == 'ElsCaption' || item.dataTypeName == 'Object' ? 'margin-bottom:0 !important' : ''"
                            :label="item.config.baseConfig?.componentName == 'ElsCaption' ? '' : item.keyName"
                            :prop="`[${index}].value`">
                            <DynamicRenderInnerItem
                                :key="item.keyID"
                                v-if="item.dataTypeName != 'Array' && item.dataTypeName != 'Object' && item.componentType !== 'Row'"
                                :disabled="handleDisabledExpress(item)" :parent-node="parentNode" :curr-node="currNode"
                                :item="item" v-model="item.value" :style="item.config.advancedConfig.style"
                                @valueChange="handleValueChange($event, item)">
                            </DynamicRenderInnerItem>

                            <DynamicRenderInner  v-else-if="item.dataTypeName == 'Object'" :data="item.data"
                                :parentNode="currNode" :node-item="item" :depath="currDepath">
                            </DynamicRenderInner>

                            <div v-else-if="item.dataTypeName == 'Array' && item.arrayDataTypeName == 'Object'"
                                class="els-dynamic-r-array-container"
                                :class="{ 'horizontal': item.config.baseConfig.arrangementType === 'Horizontal' }">
                                <els-list :labelWidth="item.config.formConfig.labelWidth" :data="item.data"
                                    @add="handleAddItem(item)" item-class-name="els-dynamic-r-array" :hasForm="false"
                                    :style="item.config.advancedConfig.style ? item.config.advancedConfig.style : [{ 'max-width': (item.config.baseConfig.maxWidth ? item.config.baseConfig.maxWidth + 'px' : '') }, { 'max-height': (item.config.baseConfig.maxHeight ? item.config.baseConfig.maxHeight + 'px' : '') }, { 'display': item.config.baseConfig.arrangementType === 'Horizontal' ? 'flex' : '' }, { 'flex-wrap': 'wrap' }]">
                                    <template #default="{ $item }">
                                        <DynamicRenderInner :parent-node="currNode" :node-item="item" :data="$item" class="test1111111111"
                                            :depath="currDepath">
                                        </DynamicRenderInner>
                                    </template>
                                </els-list>
                            </div>

                            <DynamicRenderInnerArray
                                v-else-if="item.dataTypeName == 'Array' && item.arrayDataType && item.arrayDataTypeName != 'Object'"
                                :parent-node="parentNode" :item="item" :depath="currDepath">
                            </DynamicRenderInnerArray>

                        </els-form-item>
                        <els-caption v-if="item.componentGroup === 'Desc'&&item.componentType=='Caption'" v-bind="item.config.baseConfig"></els-caption>
                    </template>
                </template>
            </component>

        </component>
</els-form></template>
