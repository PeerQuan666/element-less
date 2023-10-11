<script setup lang="ts">
import { ref, inject, computed, onMounted } from 'vue'
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
        return currEvent(props.parentNode, currNode);
    }
    return false;
}
function handleIfExpress(item) {
    if (item.config.advancedConfig && item.config.advancedConfig.vif) {
        let currEvent = new Function('parentNode,currNode', "return " + item.config.advancedConfig.vif);
        return currEvent(props.parentNode, currNode);
    }
    return true;
}
function handleValueChange(val, item) {
    if (item.config.advancedConfig && item.config.advancedConfig.eventChange) {
        let currEvent = new Function('val,parentNode,currNode', item.config.advancedConfig.eventChange)
        currEvent(val, props.parentNode, currNode);
    }
}
function initClass() {
    if (props.depath == 0) {
        itemClassName.value = "els-dynamic-r-item";
    } else {
        itemClassName.value = "leo-dynamic-r-item-child";
    }

    if (props.nodeItem && props.nodeItem.config.baseConfig) {
        labelWidth.value = props.nodeItem.baseConfig && props.nodeItem.baseConfig.width ? props.nodeItem.baseConfig.width + 'px' : undefined
    }
    if (!labelWidth.value && defaultLabelWidth) {
        labelWidth.value = defaultLabelWidth.value
    }
    currDepath.value += 1;
}

function handleAddItem(item) {
    item.data.push(lessCom.cloneObj(item.arrayObjData))
}


onMounted(() => {
    initClass()
})

</script>
<template>
  
    <els-form v-model="currData" :label-width="labelWidth"  >
        <component :is="nodeItem?.componentName=='ElsRow'?'ElsRow':'div'"  :class="itemClassName"
            :style="nodeItem?.componentName==='ElsRow' ? nodeItem ? nodeItem.config.advancedConfig?.style : '' : ''">


            <component :is="nodeItem?.componentName==='ElsRow'?'els-col':'div'"  v-for="(item, index) in currData">
             
                <template v-if="handleIfExpress(item)">
                    <els-caption v-if="item.config.baseConfig?.componentName == 'ElsCaption'" v-bind="item.config.baseConfig">
                    {{ item.keyName}}</els-caption>
                    <els-form-item v-if="item.componentName !== 'ElsCaption'" :hasFormItem="false"
                        :style="item.dataTypeName == '无'||item.config.baseConfig.componentName == 'ElsCaption' ? 'margin-bottom:0 !important' : ''"
                        :label="item.dataTypeName == '无'||item.config.baseConfig.componentName == 'ElsCaption' ? '' : item.keyName"
                        :label-width="(item.dataTypeName == '无'||item.config.baseConfig.componentName == 'ElsCaption') ? '0' :undefined" v-bind="item.validConfig"
                        :prop="`[${index}].value`">

                        <DynamicRenderInnerItem
                            v-if="item.dataTypeName != 'Array' && item.dataTypeName != 'Object' && item.componentName !== 'ElsRow'"
                            :disabled="handleDisabledExpress(item)" :parent-node="parentNode" :curr-node="currNode"
                            :item="item" v-model="item.value" :style="item.config.advancedConfig.style"
                            @valueChange="handleValueChange($event, item)">
                        </DynamicRenderInnerItem>

                        <DynamicRenderInner v-else-if="item.dataTypeName == 'Object' || item.componentName == 'ElsRow'"
                            :data="item.data" :node-item="item" :depath="currDepath">
                        </DynamicRenderInner>

                        <div v-else-if="item.dataTypeName == 'Array' && item.arrayDataTypeName == 'Object'" class="els-dynamic-r-array"
                            :class="{ 'horizontal': item.config.baseConfig.arrangementType === 'Horizontal' }">
                            <els-list :data="item.data" @add="handleAddItem(item)"
                                item-class-name="els-dynamic-r-array"
                                :hasForm="false"
                                :style="item.config.advancedConfig.style ? item.config.advancedConfig.style : [{ 'max-width': (item.config.baseConfig.maxWidth ? item.config.baseConfig.maxWidth + 'px' : '') }, { 'max-height': (item.config.baseConfig.maxHeight ? item.config.baseConfig.maxHeight + 'px' : '') }, { 'display': item.config.baseConfig.arrangementType === 'Horizontal' ? 'flex' : '' }, { 'flex-wrap': 'wrap' }]">
                                <template #default="{ $item }">
                                    <DynamicRenderInner :parent-node="currNode" :node-item="item" :data="$item"
                                        :depath="currDepath">
                                    </DynamicRenderInner>
                                </template>
                            </els-list>
                        </div>

                        <DynamicRenderInnerArray v-else-if="item.dataTypeName == 'Array' && item.arrayDataTypeName != 'Object'"
                            :parent-node="currNode" :item="item" :depath="currDepath">
                        </DynamicRenderInnerArray>

                    </els-form-item>

                    
                </template>
            </component>

        </component>
    </els-form>
</template>
