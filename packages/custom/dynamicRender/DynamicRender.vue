<script setup lang="ts">
import { watch, ref, reactive, defineAsyncComponent } from 'vue'
import { dynamicDataTypes, dynamicComponentTypes, DynamicHandler } from '../../utlis/dynamic'
import { lessCom } from '../../utlis/com'
import { FormItemProps,DynamicComponentType, DynamicDataType  } from '../../utlis/interfaces'
import DynamicRenderInner from './DynamicRenderInner.vue'
import DynamicRenderForm from './DynamicRenderForm.vue'

import { useValue } from '../../utlis/use'

const DynamicRenderInnerAsync = defineAsyncComponent(() => {
    return import('./DynamicRenderInner.vue')
})

const DynamicRenderFormAsync = defineAsyncComponent(() => {
    return import('./DynamicRenderForm.vue')
})

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
    isAsyncComponent?: boolean,
    labelPosition?:string,
    isMobile?:Boolean
}

const props = defineProps<Props>()
const {getValue,setValue} =useValue(props)
const emits = defineEmits(['update:modelValue'])
const idataTypes = getValue<any>("dataTypeData", null)
const icomponentTypes = getValue<any>("componentData", null)
const renderData: Array<Record<string, any>> = reactive([])
const valueData: Record<string, any> = ref({})
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
    initShowConfig(currData, props.showConfig);
    dynamicHandler.recoverData(currData, valueData.value);
    renderData.length = 0;
    renderData.push(...currData.filter(ele => ele.isShow == 1));
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
                    initShowConfig(currData.data, ele.data)
                }
            }
        })
    }
    else {
        data.forEach(ele => {
            ele.isShow = true
            if(ele.data){
                initShowConfig(ele.data, null)

            }
        })
    }
}


function handleReturnResult() {
    //有配置再更新直
    if (props.config) {
        const currData = dynamicHandler.result(renderData)
        if (typeof (props.modelValue) == 'object') {
            emits('update:modelValue', currData)
            return
        }
        emits('update:modelValue', JSON.stringify(currData))
    }
}


function getCurrNodeValueData(){
    let currData = {}
    renderData.forEach(ele => {
        if (ele.componentGroup == 'Container') {
            ele.data.forEach(cele => {
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
    item.data.forEach(cele => {
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
    return getNodeValue(renderData)
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
    <div>
        <ElsFormNode v-bind="lessCom.getFormNodeProps(props)" labelWidth="0px">
            <div class="els-dynamic-render">
                <template v-if="isAsyncComponent">
                    <suspense v-if="isAsyncComponent">
                        <template #default>
                            <div>
                                <DynamicRenderFormAsync  :nodeItem="renderData[0]" v-if="renderData&&renderData.length&&renderData[0].componentTypeName==='Form'">
                                </DynamicRenderFormAsync>
                                <els-form v-model="renderData" v-else>
                                    <DynamicRenderInnerAsync v-for="(item,index) in renderData" :index="index" :nodeItem="item" :keyID="item.keyID">
                                    </DynamicRenderInnerAsync>
                                </els-form>
                            </div>
                        </template>
                        <template #fallback>
                            <el-skeleton animated>
                            </el-skeleton>
                        </template>
                    </suspense>
                </template>
                <template v-else>
                    <DynamicRenderForm  :nodeItem="renderData[0]" :isRoot="true" v-if="renderData&&renderData.length&&renderData[0].componentType==='Form'">
                    </DynamicRenderForm>
                    <els-form v-model="renderData" v-else>
                        <DynamicRenderInner v-for="(item,index) in renderData"  :index="index" :nodeItem="item" :key="item.keyID">
                        </DynamicRenderInner>
                    </els-form>
                </template>
              
            </div>
        </ElsFormNode>
    </div>
</template>
<style lang="less">
::-webkit-scrollbar {background:none; }
.els-dynamic-render{flex-grow: 1;}

</style>