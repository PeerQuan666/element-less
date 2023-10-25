<script setup lang="ts">
import { provide, watch, ref, reactive, inject, defineAsyncComponent } from 'vue'
import { dynamicDataTypes, dynamicComponentTypes, DynamicHandler } from '../../utlis/lessConfig.js'
import '../../utlis/lessPrototype.js'
import lessCom from '../../utlis/lessCom'
import DynamicRenderInner from './DynamicRenderInner.vue'
import { FormItemProps } from '../../utlis/interfaceCom'
import  {DynamicComponentType,DynamicDataType} from '../../utlis/interfaceCom.js'

const DynamicRenderInnerAsync = defineAsyncComponent(() => {
    return import('./DynamicRenderInner.vue')
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
    dataTypes?:Array<DynamicDataType>,
    componentTypes?:  Array<DynamicComponentType>,
    appendComponentTypes?: Array<DynamicComponentType>,
    isAsyncComponent?: boolean
}
const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])
const idataTypes = inject<any>("dataTypeData", null)
const icomponentTypes = inject<any>("componentData", null)

const renderData: Array<Record<string, any>> = reactive([])
const valueData: Record<string, any> = ref({})
const provideData = ref({ nodeType: props.nodeType })


const currDynamicDataType = ref<any>([])
if (idataTypes) {
    currDynamicDataType.value.push(...idataTypes)
}
else if (props.dataTypes) {
    currDynamicDataType.value.push(...props.dataTypes)
} else {
    currDynamicDataType.value.push(...dynamicDataTypes)
}


const currComponentTypes = ref<any>([])
if (icomponentTypes) {
    currComponentTypes.value.push(...icomponentTypes)

} else if (props.componentTypes) {
    currComponentTypes.value.push(...props.componentTypes)
} else {
    currComponentTypes.value.push(...dynamicComponentTypes)
}
if (props.appendComponentTypes) {
    currComponentTypes.value.push(...props.appendComponentTypes)
}

const dynamicHandler = new DynamicHandler(currDynamicDataType.value, currComponentTypes.value, props.appendUrlParams, props.uploadUrl, props.resourceCode, props.restrictCode)


provide('componentData', currComponentTypes.value)
provide('dyProvideData', provideData)
provide('inputWidth', props.inputWidth)
provide("tagID", 'els-dynamic-render-' + lessCom.Guid32())
provide('dataTypeData', currDynamicDataType.value)


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
            initShowConfig(ele.data, null)
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

</script>
<template>
    <div>
        <ElsFormNode v-bind="lessCom.getFormNodeProps(props)">
            <div class="els-dynamic-render">
                <suspense v-if="isAsyncComponent">
                    <template #default>
                        <DynamicRenderInnerAsync :data="renderData"></DynamicRenderInnerAsync>
                    </template>
                    <template #fallback>
                        <el-skeleton animated>
                        </el-skeleton>
                    </template>
                </suspense>
                <DynamicRenderInner v-else :data="renderData"></DynamicRenderInner>
            </div>
        </ElsFormNode>
    </div>
</template>
<style lang="less">
.el-row:has(div[class^=el-form-item]) {
    margin-bottom: 0px;
}

.els-dynamic-r-item-child {
    .el-form-item__content {
        .el-form {
            flex-grow: 1;

            .el-row:last-child {
                margin-bottom: 0px;
            }
        }

        .els_upload_container {
            flex-grow: 1;
        }
    }

    .el-form-item:has(form) {
        .el-form-item {
            margin-bottom: 18px;
        }
    }

}

.els-dynamic-obj {
    .el-form-item {
        margin-bottom: 18px !important;
    }

    .el-form-item .el-form-item {
        margin-bottom: 0px !important;
    }
}

.els-dynamic-r-array {
    border: 1px solid #dcdfe6;
    padding: 5px 60px 5px 5px;
    position: relative;

    >.els-list-operate {
        position: absolute;
        right: 0;
        top: 0;
        background: #e5efff;
        margin-left: 0px !important;
    }
}

.els-dynamic-r-array-container {
    overflow: scroll;
    flex-grow: 1;
}

.els-dynamic-r-item,
.els-dynamic-r-array {
    .el-form-item__content>.els-caption {
        margin-bottom: 0px;
    }

    .els-caption {
        flex-grow: 1;
    }

    .listitem {
        .els-list-operate {
            margin-bottom: 0;
        }

        >form {
            flex-grow: 1;

            .els-dynamic-r-item-child:has(label[class^=el-form-item__label]) {
                display: inherit
            }

            .els-dynamic-r-item-child {
                display: flex;
                gap: 5px;
            }
        }

        .els-dynamic-r-item-child {
            display: flex;
            gap: 5px;
        }

        .els-dynamic-r-item {
            display: flex;
        }
    }

}

.els-list>div>div:has(>div[class*=els-dynamic-r-array]) {
    margin-bottom: 10px
}

.el-form-item__content>.els-dynamic-render>form>.els-dynamic-r-item>div>.el-form-item {
    margin-bottom: 18px
}

.el-form-item__content>.els-dynamic-render>form>.els-dynamic-r-item>div:last-child>.el-form-item {
    margin-bottom: 0px
}
.el-form-item__content>.els-dynamic-render>form>.els-dynamic-r-item {
    display: unset;

}
.el-form-item__content>.els-dynamic-render {
    flex-grow: 1;

}

.els-dynamic-r-array-item {
    >form>.els-dynamic-r-item {
        display: unset !important;
    }

    flex-grow: 1;

}

::-webkit-scrollbar-track-piece {
    background: none;
}</style>