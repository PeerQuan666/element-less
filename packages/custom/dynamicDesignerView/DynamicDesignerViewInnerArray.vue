<script setup lang="ts">
import { watch, computed } from 'vue'
import { useVModel } from '@vueuse/core'
import { lessCom } from '../../utlis/com'
import DynamicDesignerViewInnerItem from './DynamicDesignerViewInnerItem.vue'

interface Props {
    item: Record<string, any>,
    parentNode?: Record<string, any>,
}

const props = withDefaults(defineProps<Props>(), {

})
const emits = defineEmits(['update:data'])

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
    if (currData.value.arrayDataTypeName == 'Bool') {
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
    if (currData.value.defaultValue) {
        return currData.value.defaultValue
    }
    return '';

}
function handleAddItem() {
    currData.value.value.push(getItemDefaultValue())
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
    let defaultValue=currData.value?.defaultValue
    
    if(currData.value.arrayDataTypeName==='Number'){
        if(defaultValue&&defaultValue!==''){
            defaultValue=parseFloat(defaultValue)
        }else{
            defaultValue=0
        }
    }else if(currData.value.arrayDataTypeName==='Bool'){
        if(defaultValue&&defaultValue?.toLowerCase() === 'true'){
            defaultValue=parseFloat(defaultValue)
        }
        else{
            defaultValue=false
        }
    }else if(!defaultValue){
        defaultValue=''
    }

    if (val === undefined || val === '') {

        defaultArrayData.push(defaultValue)
    } else {
        for (let i = 0; i < val; i++) {
            defaultArrayData.push(defaultValue)
        }
    }
    currData.value.value=defaultArrayData
}
watch(()=>currData.value,(val)=>{
    if(!val||!Array.isArray(val)){
        initDefault(currData.value.config.arrayConfig.arrayDefaultLength)
    }
},{immediate:true})
watch(() => currData.value.config.arrayConfig.arrayDefaultLength, (val) => {
    initDefault(val)
})




</script>
<template>
    <div :class="{ 'horizontal': currData.config.arrayConfig.arrangementType === 'Horizontal' }" style="flex-grow:1">
        <els-list v-model="currData.value" @add="handleAddItem" item-key="" :style="[
            { 'max-width': (currData.config.arrayConfig.maxWidth ? currData.config.arrayConfig.maxWidth + 'px' : '') },
            { 'max-height': (currData.config.arrayConfig.maxHeight ? currData.config.arrayConfig.maxHeight + 'px' : '') },
            { 'display': currData.config.arrayConfig.arrangementType === 'Horizontal' ? 'flex' : '' },
            { 'flex-wrap': 'wrap' }, { 'gap': '5px' }]">
            <template #default="{ index }">
                <DynamicDesignerViewInnerItem v-bind="formAttrs" :parent-node="parentNode" :curr-node="currData"
                    :disabled="handleDisabledExpress()" :prop="index.toString()" :item="currData"
                    :style="item.config.advancedConfig.style" @valueChange="handleValueChange">
                </DynamicDesignerViewInnerItem>
            </template>

        </els-list>
    </div>
</template>