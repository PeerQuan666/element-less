<script setup lang="ts">
import { dynamicControlType } from '../../utlis/lessConfig.js'
import { useVModel } from '@vueuse/core'
import DynamicRenderInnerItem from './DynamicRenderInnerItem.vue'
import '../../utlis/lessPrototype.js'

interface Props {
    item: Record<string, any>,
    parentNode?: Record<string, any>,
}

const props = withDefaults(defineProps<Props>(), {

})
const emits = defineEmits(['update:data'])

const currData = useVModel(props, 'item', emits)
const currControl = dynamicControlType.find(d => d.value == currData.value.controlType)

function handleDisabledExpress() {
    if (currData.value.config.advancedConfig && currData.value.config.advancedConfig.disabled) {
        let currEvent = new Function('parentNode,currNode', "return " + currData.value.config.advancedConfig.disabled);
        return currEvent(props.parentNode, currData.value);
    }
    return false;
}
function handleValueChange(val) {
    if (currData.value.config.advancedConfig && currData.value.config.advancedConfig.eventChange) {
        let currEvent = new Function('val,parentNode,currNode', currData.value.config.advancedConfig.eventChange)
        currEvent(val, props.parentNode, currData.value);
    }
}
function initData() {
    if (currData.value.value === "") {
        let defaultArrayData: any = [];
        if (currData.value.config.baseConfig.arrayDefaultLength === undefined || currData.value.config.baseConfig.arrayDefaultLength === '') {
            defaultArrayData.push('')
        } else {
            for (let i = 0; i < currData.value.config.baseConfig.arrayDefaultLength; i++) {
                defaultArrayData.push('')
            }
        }
        currData.value.value = defaultArrayData;
    }
}
function getItemDefaultValue() {
    if (currData.value.arrayDataTypeName == 'Bool') {
        if (currData.value.defaultValue === 'true') {
            return true;

        } else {
            return false;
        }
    }
    else if (currData.value.arrayDataTypeName === '数字') {
        if (currData.value.defaultValue != undefined && currData.value.defaultValue !== '') {
            return parseFloat(currData.value.defaultValue)
        } else {
            return 0;
        }
    }
    if (currData.value.defaultValue) {
        return currData.value.defaultValue
    }
    return '';

}
function handleAddItem() {
    currData.value.value.push(getItemDefaultValue())
}
initData()
</script>
<template>

    <div :class="{ 'horizontal': currData.config.baseConfig.arrangementType === 'Horizontal' }">
        <els-list :data="currData.value" @add="handleAddItem" :style="[
            { 'max-width': (currData.config.baseConfig.maxWidth ? currData.config.baseConfig.maxWidth + 'px' : '') },
            { 'max-height': (currData.config.baseConfig.maxHeight ? currData.config.baseConfig.maxHeight + 'px' : '') },
            { 'display': currData.config.baseConfig.arrangementType === 'Horizontal' ? 'flex' : '' },
            { 'flex-wrap': 'wrap' }, { 'gap': '5px' }]">

            <DynamicRenderInnerItem v-if="currControl && currControl.componentName == 'ElsCaption'"
                :parent-node="parentNode" :curr-node="currData" :disabled="handleDisabledExpress()" :item="currData"
                :style="item.config.advancedConfig.style" @valueChange="handleValueChange"></DynamicRenderInnerItem>

            <els-caption v-else :line-type="currData.config.baseConfig.lineType">{{ currData.keyName }}</els-caption>
        </els-list>
    </div>
</template>