<script setup lang="ts">
import { watch, computed,reactive} from 'vue'
import { useVModel } from '@vueuse/core'
import { lessCom } from '../../utlis/com'
import { useValue } from '../../utlis/use'

import DynamicRenderInnerItem from './DynamicRenderInnerItem.vue'

interface Props {
    parentNode?: Record<string, any>,
}

const props = withDefaults(defineProps<Props>(), {

})
const {getValue}=useValue()
const isMobile=getValue<boolean>('isMobile',false);
const dataTypes=getValue<any>('dataTypeData', [])
const nodeItem =defineModel<any>("nodeItem",{default:()=>{return reactive<Record<string, any>>([]);}})

function handleDisabledExpress() {
    if (nodeItem.value.config.advancedConfig && nodeItem.value.config.advancedConfig.disabled) {
        let currEvent = new Function('parentNode,currNode', "return " + nodeItem.value.config.advancedConfig.disabled);
        return currEvent(props.parentNode, nodeItem.value);
    }
    return false;
}
function handleValueChange(val) {
    if (nodeItem.value.config.advancedConfig && nodeItem.value.config.advancedConfig.eventChange) {
        let currEvent = new Function('val,parentNode,currNode', nodeItem.value.config.advancedConfig.eventChange)
        currEvent(val, props.parentNode, nodeItem.value);
    }
}

function getItemDefaultValue() {

    const currDataType=dataTypes.find(ele=>ele.value===nodeItem.value.arrayDataType)
        if(currDataType&&currDataType.defaultValue){
        return currDataType.defaultValue
        }
    if (nodeItem.value.arrayDataTypeName == 'String') {
        if (nodeItem.value.defaultValue) {
        return nodeItem.value.defaultValue
    }
    return '';
    }
   else if (nodeItem.value.arrayDataTypeName == 'Bool') {
        if (nodeItem.value.defaultValue === 'true') {
            return true;

        } else {
            return false;
        }
    }
    else if (nodeItem.value.arrayDataTypeName === 'Number') {
        if (nodeItem.value.defaultValue != undefined && nodeItem.value.defaultValue !== '') {
            return parseFloat(nodeItem.value.defaultValue)
        } else {
            return 0;
        }
    }
    else if(nodeItem.value.arrayDataTypeName==='Object'){
        return {}
    }else if(nodeItem.value.arrayDataTypeName==='Array'){
        return []
    }
    return {}


}
function handleAddItem() {
    return getItemDefaultValue()
}
const formAttrs = computed(() => {
    const currFormConfig = lessCom.cloneObj(nodeItem.value.config.formConfig)
    currFormConfig.labelWidth = '0px'
    if (currFormConfig) {
        if (currFormConfig.validMethod) {
            let currEvent = new Function('parentNode,currNode', "return " + currFormConfig.validMethod);
            currFormConfig.validMethod = currEvent(props.parentNode, nodeItem.value);
        } else {
            delete currFormConfig.validMethod
        }
    }
    return currFormConfig
})

function initDefault(val) {
    let defaultArrayData: any = [];

    let defaultValue=getItemDefaultValue()

    if (val === undefined || val === '') {
        defaultArrayData.push(defaultValue)
    } else {
        for (let i = 0; i < val; i++) {
            defaultArrayData.push(defaultValue)
        }
    }
    nodeItem.value.value=defaultArrayData
}

watch(()=>nodeItem.value.value,(val)=>{
    if(!val||!Array.isArray(val)){
        initDefault(nodeItem.value.config.arrayConfig.arrayDefaultLength)
 
    }
},{immediate:true})

watch(() => nodeItem.value.config.arrayConfig.arrayDefaultLength, (val) => {
    initDefault(val)
})



</script>
<template>
   
    <div class="els-dynamic-array-render" :class="{ 'horizontal': nodeItem.config.arrayConfig.arrangementType === 'Horizontal' }"   style=" flex-grow:1">
        <els-list v-model="nodeItem.value" @add="handleAddItem"  :item-class-name="{'els-dynamic-r-array':nodeItem.arrayDataTypeName==='Object'||nodeItem.componentTypeName==='DynamicRender'}"  :style="[
            { 'max-width': (nodeItem.config.arrayConfig.maxWidth ? nodeItem.config.arrayConfig.maxWidth + 'px' : '') },
            { 'max-height': (nodeItem.config.arrayConfig.maxHeight ? nodeItem.config.arrayConfig.maxHeight + 'px' : '') },
            { 'display': nodeItem.config.arrayConfig.arrangementType === 'Horizontal' ? 'flex' : '' },
            { 'flex-wrap': 'wrap' }, { 'gap': '5px' }, { 'overflow': 'scroll' },{'padding-right':isMobile?'0px':'20px'}]">
            <template #default="{ element,index }">
                <DynamicRenderInnerItem  
                    :class="{'els-dynamic-r-array-item':nodeItem.componentName==='ElsDynamicRender'}" v-bind="formAttrs" 
                     :key="index" :parent-node="parentNode" :curr-node="nodeItem"
                    :disabled="handleDisabledExpress()" v-model="element.value" prop="value" requiredMessage="不能为空" :nodeItem="nodeItem"
                    :style="nodeItem.config.advancedConfig.style" @valueChange="handleValueChange">
                </DynamicRenderInnerItem>
            </template>
        </els-list>
    </div>
</template>
<style scoped lang="less">
.els-dynamic-array-render{
:v-deep(.van-field){
    padding-left: 0;
}
}
</style>