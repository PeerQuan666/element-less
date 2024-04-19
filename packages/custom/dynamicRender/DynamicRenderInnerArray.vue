<script setup lang="ts">
import { watch, computed} from 'vue'
import { useVModel } from '@vueuse/core'
import { lessCom } from '../../utlis/com'
import { useValue } from '../../utlis/use'

import DynamicRenderInnerItem from './DynamicRenderInnerItem.vue'

interface Props {
    item: Record<string, any>,
    parentNode?: Record<string, any>,
}

const props = withDefaults(defineProps<Props>(), {

})
const {getValue}=useValue()
const emits = defineEmits(['update:data'])
const isMobile=getValue<boolean>('isMobile',false);
const dataTypes=getValue<any>('dataTypeData', [])
const currData = useVModel(props, 'item', emits)

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

function getItemDefaultValue() {

    const currDataType=dataTypes.find(ele=>ele.value===currData.value.arrayDataType)
        if(currDataType&&currDataType.defaultValue){
        return currDataType.defaultValue
        }
    if (currData.value.arrayDataTypeName == 'String') {
        if (currData.value.defaultValue) {
        return currData.value.defaultValue
    }
    return '';
    }
   else if (currData.value.arrayDataTypeName == 'Bool') {
        if (currData.value.defaultValue === 'true') {
            return true;

        } else {
            return false;
        }
    }
    else if (currData.value.arrayDataTypeName === 'Number') {
        if (currData.value.defaultValue != undefined && currData.value.defaultValue !== '') {
            return parseFloat(currData.value.defaultValue)
        } else {
            return 0;
        }
    }
    else if(currData.value.arrayDataTypeName==='Object'){
        return {}
    }else if(currData.value.arrayDataTypeName==='Array'){
        return []
    }
    return {}


}
function handleAddItem() {
    return getItemDefaultValue()
}
const formAttrs = computed(() => {
    const currFormConfig = lessCom.cloneObj(currData.value.config.formConfig)
    currFormConfig.labelWidth = '0px'
    if (currFormConfig) {
        if (currFormConfig.validMethod) {
            let currEvent = new Function('parentNode,currNode', "return " + currFormConfig.validMethod);
            currFormConfig.validMethod = currEvent(props.parentNode, currData.value);
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
    currData.value.value=defaultArrayData
}

watch(()=>currData.value.value,(val)=>{
    if(!val||!Array.isArray(val)){
        initDefault(currData.value.config.arrayConfig.arrayDefaultLength)
 
    }
},{immediate:true})

watch(() => currData.value.config.arrayConfig.arrayDefaultLength, (val) => {
    initDefault(val)
})



</script>
<template>
    <div class="els-dynamic-array-render" :class="{ 'horizontal': currData.config.arrayConfig.arrangementType === 'Horizontal' }"   style=" flex-grow:1">
        <els-list v-model="currData.value" @add="handleAddItem" :sortable="false" :item-class-name="{'els-dynamic-r-array':item.arrayDataTypeName==='Object'||item.componentTypeName==='DynamicRender'}"  :style="[
            { 'max-width': (currData.config.arrayConfig.maxWidth ? currData.config.arrayConfig.maxWidth + 'px' : '') },
            { 'max-height': (currData.config.arrayConfig.maxHeight ? currData.config.arrayConfig.maxHeight + 'px' : '') },
            { 'display': currData.config.arrayConfig.arrangementType === 'Horizontal' ? 'flex' : '' },
            { 'flex-wrap': 'wrap' }, { 'gap': '5px' }, { 'overflow': 'scroll' },{'padding-right':isMobile?'0px':'20px'}]">
            <template #default="{ element,index }">
                <DynamicRenderInnerItem :class="{'els-dynamic-r-array-item':item.componentName==='ElsDynamicRender'}" v-bind="formAttrs" :key="index" :parent-node="parentNode" :curr-node="currData"
                    :disabled="handleDisabledExpress()" v-model="element.value" prop="value" requiredMessage="不能为空" :item="currData"
                    :style="item.config.advancedConfig.style" @valueChange="handleValueChange">
                </DynamicRenderInnerItem>
            </template>

        </els-list>
    </div>
</template>
<style scoped lang="less">
.els-dynamic-array-render{
::v-deep(.van-field){
    padding-left: 0;
}
}
</style>