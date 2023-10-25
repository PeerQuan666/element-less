<script setup lang="ts">
import { ref, inject, watchEffect, watch, useAttrs, computed } from 'vue'
import '../../utlis/lessPrototype.js'
import lessCom from '../../utlis/lessCom';
interface Props {
    modelValue?: any,
    item: Record<string, any>,
    currDepath?: number,
    parentNode?: Record<string, any>,
    currNode?: Record<string, any>,
    nodeType?: Record<string, any>,
}

defineOptions({
    inheritAttrs: false
})
const controlData = inject<any>("componentData", [])
const dyProvideData = inject<any>('dyProvideData', null)
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
},{deep:true})

function handleClear() {
    if (props.item.dataTypeName == 'Number' || props.item.arrayDataTypeName == 'Number') {
        currValue.value = 0;
    } if (props.item.dataTypeName == 'Bool' || props.item.arrayDataTypeName == 'Bool') {
        currValue.value = false;
    } else {
        currValue.value = '';
    }
}

const baseAttrs = computed(() => {

    let baseConfig = {}
    const currControl = controlData.find(ele => ele.value == props.item.componentType)
    if (currControl?.defaultPropertys) {
        const currBaseConfig = Object.assign({}, currControl?.defaultPropertys, props.item.config.baseConfig)
        for (var key in currBaseConfig) {
            if (key) {
                if (currBaseConfig[key] === undefined || currBaseConfig[key] === '') {
                    delete currBaseConfig[key]
                }
            }
        }
        baseConfig = currBaseConfig
    }
    const currAttrs = Object.assign(lessCom.cloneObj(baseConfig), { 'style': props.item.config.advancedConfig.style }, attrs);
    const parseNumbers=['max','min','precision','step','rows']

    for(const name of parseNumbers){
        if(currAttrs[name]){
            currAttrs[name]=parseInt(currAttrs[name])
        }else{
            delete currAttrs[name]
        }
    }

    if (['ElsSelect', 'ElsRadio', 'ElsCheckBox', 'ElsCascader'].includes(props.item.componentName)) {
        if (props.item.dataTypeName == 'Number' || props.item.arrayDataTypeName == 'Number') {

            currAttrs.valueType = 'Number'
        } else if (props.item.dataTypeName == 'Bool' || props.item.arrayDataTypeName == 'Bool') {
            currAttrs.valueType = 'Bool'
        }
    }
    return currAttrs
})
const componentAttrs = ref<any>(baseAttrs.value)
const showText = ref('')
const componentName = ref('')
watchEffect(() => {
    componentName.value = props.item.componentName
})


//判断父节点类型
watch(dyProvideData, (val) => {
    if (val&&['active-value','inactive-value','multiple','value'].includes(props.item.keyCode)) {
        const currNodeType = val.nodeType
        showText.value=''
        //判断配置节点数据类型
        if (currNodeType && currNodeType.componentName == 'ElsSwitch') {

            if (props.item.keyCode == 'active-value' || props.item.keyCode == 'inactive-value') {
         
                if (currNodeType.dataType == 'Bool') {
                    componentAttrs.value = Object.assign({},baseAttrs.value, { 'disabled': true })
                    if (props.item.keyCode == 'active-value') {
                        currValue.value = true
                        showText.value = 'true'
                    } else {
                        currValue.value = false
                        showText.value = 'false'
                    }
                } else if (currNodeType.dataType == 'Number') {
                    componentAttrs.value = Object.assign({},baseAttrs.value, { 'disabled': false })
                    if (props.item.keyCode == 'active-value') {
                        showText.value='1'
                        currValue.value = 1
                    } else {
                        currValue.value = 0
                        showText.value='0'

                    }
                } else {
                    componentAttrs.value = Object.assign({},baseAttrs.value, { 'disabled': false })
                    if (props.item.keyCode == 'active-value') {
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
            if (props.item.keyCode === 'multiple' && currNodeType.dataType === 'Number') {

                currValue.value = false
                showText.value = 'false'

            } else if (props.item.keyCode === 'value') {
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
    let currUrl = props.item.config.baseConfig.url || props.item.config.baseConfig.modalUrl
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