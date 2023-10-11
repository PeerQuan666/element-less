<script setup lang="ts">
import { ref, inject, watchEffect, watch, useAttrs } from 'vue'
import { FormItemProps } from '../../utlis/interfaceCom'
import '../../utlis/lessPrototype.js'

interface Props extends FormItemProps {
    modelValue?: number | string | boolean | Array<any>,
    item: Record<string, any>,
    currDepath?: number,
    parentNode?: Record<string, any>,
    currNode?: Record<string, any>,
}

defineOptions({
    inheritAttrs:false
})
const props = withDefaults(defineProps<Props>(), {

})
const emits = defineEmits(['update:modelValue', 'valueChange'])

const attrs = useAttrs()

const currValue = ref<any>('')

const getUploadUrl = inject<Function>('getUploadUrl', () => null)

const getModelValue = inject<Function>('getModelValue', () => null)

const setModelValue = inject<Function>('setModelValue', () => { })

function initModelValue() {
    if (!props.modelValue && getModelValue && props.prop) {
        return getModelValue(props.prop, props.aIndex)
    }
    return props.modelValue
}
watchEffect(() => {
    const currVal = initModelValue()
    currValue.value = currVal
})
watch(currValue, (val) => {
    if (setModelValue && props.prop) {
        setModelValue(props.prop, val, props.aIndex)
    }
    emits('update:modelValue', val)
    emits('valueChange', val)
})

function handleClear() {
    if (props.item.dataTypeName == '数字' || props.item.arrayDataTypeName == '数字') {
        currValue.value = 0;
    } else {
        currValue.value = '';
    }
}
const componentName = ref('')
componentName.value = props.item.componentName

if (props.item.componentName == 'ElsInput' && (props.item.dataTypeName == '数字' || props.item.arrayDataTypeName== '数字') ) {
    componentName.value = 'ElsInputNumber';
}
const dyProvideData = inject<any>('dyProvideData', null)
const baseAttrs = Object.assign(props.item.config.baseConfig, props.item.config.advancedConfig, props.item.config.validConfig, attrs);
const componentAttrs = ref(baseAttrs)
const showText=ref('')
watch(dyProvideData, (val) => {
    const currNodeType = val.nodeType
    //判断配置节点数据类型
    if (currNodeType && currNodeType.componentName == 'ElsSwitch' && currNodeType.dataType == 'Bool') {
        if (props.item.keyCode == 'active-value' || props.item.keyCode == 'inactive-value') {
            componentAttrs.value = Object.assign(baseAttrs, { 'disabled': true })
            if(props.item.keyCode == 'active-value'){
                currValue.value=true
                showText.value='true'
            }else{
                currValue.value=false
                showText.value='false'
            }
            
        }
    }
    
}, { immediate: true, deep: true })

//移除输入框限制
if(props.item.config.baseConfig?.maxLength==props.item.config.baseConfig.minLength){
    delete componentAttrs.value.maxLength
    delete componentAttrs.value.minLength
}


if(props.item.config.baseConfig?.max==0){
    delete componentAttrs.value.max
}
if(props.item.config.baseConfig?.step==0){
    delete componentAttrs.value.step
}
//移除未设置字段
if(!props.item.config.labelField){
    delete componentAttrs.value.labelField
}
if(!props.item.config.valueField){
    delete componentAttrs.value.valueField
}



function getFileUploadUrl() {
    let currUrl = props.item.config.baseConfig.url || props.item.config.baseConfig.modalUrl
    if (currUrl) {
        if (currUrl.startsWith(":")) {
            currUrl = currUrl.substr(1);
            let currEvent = new Function('parentNode,currNode', "return " + currUrl);
            currUrl = currEvent(props.parentNode, props.currNode);
        }
        if (props.item.componentName === 'ElsUpload') {
            return getUploadUrl(currUrl, props.item);

        } else {
            return currUrl.setPowerPublicQuery()
        }
    }
}



</script>
<template>
    <el-tag v-if="showText">{{ showText }}</el-tag>
    <component  v-else :is="componentName"  v-bind="componentAttrs" v-model="currValue" :url="getFileUploadUrl()"
        @clear="handleClear">
    </component>
</template>