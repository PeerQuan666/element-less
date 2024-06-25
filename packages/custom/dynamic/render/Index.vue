<script setup lang="ts">
import { watch, ref, reactive, defineAsyncComponent,useAttrs } from 'vue'
import { dynamicDataTypes, dynamicComponentTypes, DynamicHandler } from '../../../utlis/dynamic'
import { lessCom } from '../../../utlis/com'
import { FormItemProps,DynamicComponentType, DynamicDataType  } from '../../../utlis/interfaces'
import DynamicRenderForm from './Form.vue'
import DynamicRenderInner from './Inner.vue'

import { useValue } from '../../../utlis/use'



defineOptions({
    name: 'ElsDynamicRender',
})
interface Props extends FormItemProps {
    modelValue?: string | Record<string, any>,
    config?: string | Record<string, any>,
    showConfig?: string | Record<string, any>,
    uploadUrl?: string,
    resourceCode?: string,
    restrictCode?: string,  
    appendUrlParams?: Array<Record<string, any>>,
    inputWidth?: string,
    nodeType?: any,
    dataTypes?: Array<DynamicDataType>,
    appendDataTypes?: Array<DynamicDataType>,
    componentTypes?: Array<DynamicComponentType>,
    appendComponentTypes?: Array<DynamicComponentType>,
    labelPosition?:string,
    isMobile?:Boolean
}

const props = defineProps<Props>()
const {getValue,setValue} =useValue(props)
const emits = defineEmits(['update:modelValue'])
const idataTypes = getValue<any>("dataTypeData", null)
const attrs=useAttrs()
const icomponentTypes = getValue<any>("componentData", null)
const renderData = ref<Array<Record<string, any>>>([])
const valueData = ref<Record<string, any>>({})
const provideData = ref({ nodeType: props.nodeType })


const currDynamicDataType = ref<any>([])
if (idataTypes) {
    currDynamicDataType.value.push(...idataTypes)
}
else {
    if (props.dataTypes) {
        currDynamicDataType.value.push(...props.dataTypes)
    } else {
        currDynamicDataType.value.push(...dynamicDataTypes)
    }
    if (props.appendDataTypes) {
        currDynamicDataType.value.push(...props.appendDataTypes)
    }
}

const currComponentTypes = ref<any>([])
if (icomponentTypes) {
    currComponentTypes.value.push(...icomponentTypes)

} else {
    if (props.componentTypes) {
        currComponentTypes.value.push(...props.componentTypes)
    } else {
        currComponentTypes.value.push(...dynamicComponentTypes)
    }
    if (props.appendComponentTypes) {
        currComponentTypes.value.push(...props.appendComponentTypes)
    }
}


const dynamicHandler = new DynamicHandler(currDynamicDataType.value, currComponentTypes.value, props.appendUrlParams, props.uploadUrl, props.resourceCode, props.restrictCode)





watch(() => props.nodeType, (val, old) => {
    if (val != old) {
        provideData.value.nodeType = val
    }
})
watch(renderData, () => {
    handleReturnResult()
}, { deep: true })

watch(() => props.config, (val) => {
    if (val) {
        initData()
    }
}, { deep: true, immediate: true })


function initData() {
    if (props.modelValue) {
        if (typeof (props.modelValue) == "string") {
            valueData.value = JSON.parse(props.modelValue)
        } else {
            valueData.value = props.modelValue
        }
    }
    let currData: any = {}
    if (typeof (props.config) === 'string') {
        currData = JSON.parse(props.config)

    } else {
        currData = lessCom.cloneObj(props.config)
    }
    currData=dynamicHandler.compatibleVersion(currData)
    initShowConfig(currData, props.showConfig);
    dynamicHandler.recoverData(currData, valueData.value);
    renderData.value.length = 0;
    renderData.value.push(...currData.filter(ele => ele.isShow == 1));
}

function initShowConfig(data, showConfigData) {
    if (showConfigData) {
        if (typeof (showConfigData) === 'string') {
            showConfigData = JSON.parse(showConfigData);
        }
        showConfigData.forEach((ele) => {
            let currData = data.find(cele => cele["keyCode"] == ele["keyCode"])
            if (currData) {
                currData.isShow = ele.isShow;
                if (currData.dataTypeName == 'Object' || currData.arrayDataTypeName == 'Object') {
                    initShowConfig(currData.children, ele.children)
                }
            }
        })
    }
    else {
        data.forEach(ele => {
            ele.isShow = true
            if(ele.children){
                initShowConfig(ele.children, null)

            }
        })
    }
}


function handleReturnResult() {
    //有配置再更新直
    if (props.config) {
        const currData = dynamicHandler.result(renderData.value)
        if (typeof (props.modelValue) == 'object') {
            emits('update:modelValue', currData)
            return
        }
        emits('update:modelValue', JSON.stringify(currData))
    }
}


function getCurrNodeValueData(){
    let currData = {}
    renderData.value.forEach(ele => {
        if (ele.componentGroup == 'Container') {
            ele.children.forEach(cele => {
                currData[cele.keyCode] = cele
            })
        } else {
            currData[ele.keyCode] = ele
        }
    })
    return currData
}


function getContainerValue(item) {
    const currData = {}
    item.children.forEach(cele => {
        if (cele.componentGroup === 'Container') {
            Object.assign(currData, getContainerValue(cele))
        } else if (cele.keyCode) {
            currData[cele.keyCode] = cele

        }
    })
    return currData
}

const getNodeValue=function(data){
    let currData = {}
    data.forEach(ele => {
        if (ele.componentGroup === 'Container') {
            Object.assign(currData, getContainerValue(ele))

        } else {
            currData[ele.keyCode] = ele
        }
    })
    return currData
}
const getCurrNode=function(){
    return getNodeValue(renderData.value)
}


setValue({
    "tagID":'els-dynamic-render-' + lessCom.generateID(),
    "componentData":currComponentTypes.value,
    "dyProvideData":provideData,
    "dataTypeData":currDynamicDataType.value,
    getCurrNodeValueData,
    getCurrNode,
    getNodeValue,
})

defineExpose({
    initData
})
</script>
<template>
    <div class="els-node els-dynamic-render">
        <ElsFormNode v-bind="Object.assign({},attrs,lessCom.getFormNodeProps(props))" :labelWidth="(label===''||label===undefined)?'0':undefined" >
            <div class="els-dynamic-render-inner">
                <DynamicRenderForm  :nodeItem="renderData[0]"  :isRoot="true" v-if="renderData&&renderData.length&&renderData[0].componentTypeName==='Form'">
                </DynamicRenderForm>
                <els-form v-model="renderData" v-else>
                    <DynamicRenderInner v-for="(item,index) in renderData" :index="index" :nodeItem="item" :keyID="item.keyID">
                    </DynamicRenderInner>
                </els-form>
            </div>
        </ElsFormNode>
    </div>
</template>
<style lang="less">
.els-dynamic-render >.el-form-item{
      margin-bottom: 0px !important;
    }
</style>
<style lang="less" scoped>
::-webkit-scrollbar {background:none; }
.els-dynamic-render,.els-dynamic-render-inner{flex-grow: 1;}

</style>