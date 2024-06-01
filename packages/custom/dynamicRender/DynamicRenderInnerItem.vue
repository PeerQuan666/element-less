<script setup lang="ts">
import { ref, watchEffect, watch, useAttrs, computed } from 'vue'
import { lessCom } from '../../utlis/com'
import { useValue } from '../../utlis/use'

interface Props {
    modelValue?: any,
    nodeItem: Record<string, any>,
    currDepath?: number,
    parentNode?: Record<string, any>,
    currNode?: Record<string, any>,
    nodeType?: Record<string, any>,
}

defineOptions({
    inheritAttrs: false
})
const {getValue}=useValue()
const controlData = getValue<any>("componentData", [])
const dyProvideData = getValue<any>('dyProvideData', null)
const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue', 'valueChange'])
const attrs = useAttrs()
const currValue = ref()

watchEffect(() => {
    currValue.value = props.modelValue
})

watch(currValue, (val) => {
    emits('update:modelValue', val)
    emits('valueChange', val)
},{deep:true,immediate:true})

function handleClear() {
    if (props.nodeItem.dataTypeName == 'Number' || props.nodeItem.arrayDataTypeName == 'Number') {
        currValue.value = 0;
    } if (props.nodeItem.dataTypeName == 'Bool' || props.nodeItem.arrayDataTypeName == 'Bool') {
        currValue.value = false;
    } else {
        currValue.value = '';
    }
}
function setDefaultPropertys(currBaseConfig,defaultPropertys){
    for(const key in  defaultPropertys){
        if(!currBaseConfig[key]){
            currBaseConfig[key]=defaultPropertys[key]
        }
        else  if(typeof(defaultPropertys[key])==='object'){
            setDefaultPropertys(currBaseConfig['key'],defaultPropertys[key])
        }
    }
}
const baseAttrs = computed(() => {

    let baseConfig = {}
    const currControl = controlData.find(ele => ele.value == props.nodeItem.componentType)
    if (currControl?.defaultPropertys) {
        const currBaseConfig = Object.assign({}, props.nodeItem.config.baseConfig)
        for (var key in currBaseConfig) {
            if (key) {
                if (currBaseConfig[key] === undefined || currBaseConfig[key] === '') {
                    delete currBaseConfig[key]
                }
            }
        }
        lessCom.setDefaultPropertys(currBaseConfig,currControl.defaultPropertys)
        baseConfig = currBaseConfig
    }
    const currAttrs = Object.assign(lessCom.cloneObj(baseConfig), { 'style': props.nodeItem.config.advancedConfig.style }, attrs);
    const parseNumbers=['max','min','precision','step','rows']

    for(const name of parseNumbers){
        if(currAttrs[name]){
            currAttrs[name]=parseInt(currAttrs[name])
        }else{
            delete currAttrs[name]
        }
    }

    if (['ElsSelect', 'ElsRadio', 'ElsCheckBox', 'ElsCascader'].includes(props.nodeItem.componentName)) {
        if(!currAttrs.valueType){
            if (props.nodeItem.dataTypeName == 'Number' || props.nodeItem.arrayDataTypeName == 'Number') {
                currAttrs.valueType = 'Number'
            } else if (props.nodeItem.dataTypeName == 'Bool' || props.nodeItem.arrayDataTypeName == 'Bool') {
                currAttrs.valueType = 'Bool'
            }
        }
    }
    return currAttrs
})
const componentAttrs = ref<any>(baseAttrs.value)
const showText = ref('')
const componentName = ref('')
watchEffect(() => {
    componentName.value = props.nodeItem.componentName
})


//判断父节点类型
watch(dyProvideData, (val) => {
    if (val&&['active-value','inactive-value','multiple','value'].includes(props.nodeItem.keyCode)) {
        const currNodeType = val.nodeType
        showText.value=''
        //判断配置节点数据类型
        if (currNodeType && currNodeType.componentName == 'ElsSwitch') {

            if (props.nodeItem.keyCode == 'active-value' || props.nodeItem.keyCode == 'inactive-value') {
         
                if (currNodeType.dataType == 'Bool') {
                    componentAttrs.value = Object.assign({},baseAttrs.value, { 'disabled': true })
                    if (props.nodeItem.keyCode == 'active-value') {
                        currValue.value = true
                        showText.value = 'true'
                    } else {
                        currValue.value = false
                        showText.value = 'false'
                    }
                } else if (currNodeType.dataType == 'Number') {
                    componentAttrs.value = Object.assign({},baseAttrs.value, { 'disabled': false })
                    if (props.nodeItem.keyCode == 'active-value') {
                        showText.value='1'
                        currValue.value = 1
                    } else {
                        currValue.value = 0
                        showText.value='0'

                    }
                } else {
                    componentAttrs.value = Object.assign({},baseAttrs.value, { 'disabled': false })
                    if (props.nodeItem.keyCode == 'active-value') {
                        if(typeof(currValue.value )!=='string'){
                            currValue.value = 'true'
                        }
                       
                    } else {
                        if(typeof(currValue.value )!=='string'){
                            currValue.value = 'false'
                        }
                   
                    }
                }


            }
        }
        else if (currNodeType && ['ElsSelect', 'ElsRadio', 'ElsCheckBox', 'ElsCascader'].includes(currNodeType.componentName)) {
            if (props.nodeItem.keyCode === 'multiple' && currNodeType.dataType === 'Number') {

                currValue.value = false
                showText.value = 'false'

            } else if (props.nodeItem.keyCode === 'value') {
                if (currNodeType.dataType == 'Bool') {
                    if(typeof(currValue.value)!=='boolean'){
                        currValue.value = false
                    }
                
                    componentName.value = 'ElsSelect';
                    componentAttrs.value = Object.assign( {'teleported':false, 'width':'80', 'data': [{ label: 'true', value: true }, { label: 'false', value: false }], 'type': 'radio'},baseAttrs.value)
                }
                else if (currNodeType.dataType === 'Number') {
                    if(typeof(currValue.value)!=='number'){
                        currValue.value=0
                    }
          
                    componentName.value = 'ElsInputNumber';
                    componentAttrs.value = Object.assign({},baseAttrs.value, { "controls-position":'right','width':'80' })


                }
            }

        }
    }

}, { immediate: true, deep: true })

function getUrl() {
    let currUrl = props.nodeItem.config.baseConfig.url || props.nodeItem.config.baseConfig.modalUrl
    if (currUrl) {
        if (currUrl.startsWith(":")) {
            currUrl = currUrl.substr(1);
            let currEvent = new Function('parentNode,currNode', "return " + currUrl);
            currUrl = currEvent(props.parentNode, props.currNode);
        }
        return currUrl.setPowerPublicQuery()
    }
}
</script>
<template>
    <template v-if="componentName">
        <el-tag v-if="showText">{{ showText }}</el-tag>
        <component v-else :is="componentName" v-bind="componentAttrs" v-model="currValue" :url="getUrl()"
            @clear="handleClear">
        </component>
    </template>
</template>