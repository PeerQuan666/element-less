<script setup lang="ts">
import { watch, provide, ref, computed, nextTick,inject } from 'vue'

import { FormItemProps } from '../../utlis/interfaceCom'
import { dynamicDataTypes, dynamicComponentTypes, DynamicHandler } from '../../utlis/lessConfig.js'
import DynamicDesignerViewInner from './DynamicDesignerViewInner.vue'

import draggable from 'vuedraggable'
import '../../utlis/lessPrototype.js'
import lessCom from '../../utlis/lessCom'
import property_form from '../../utlis/dynamicPropertys/form'
import property_array from '../../utlis/dynamicPropertys/array'
import property_advanced from '../../utlis/dynamicPropertys/advanced'
import property_arrayAndObject from '../../utlis/dynamicPropertys/arrayAndObject'
import { useDesign } from '../../utlis/stateDesign.js'
import { ElMessage } from 'element-plus'
import lodash from 'lodash';
import  {DynamicComponentType,DynamicDataType} from '../../utlis/interfaceCom.js'
const { debounce } = lodash;
const useDesignStore = useDesign()
const emits = defineEmits(['update:modelValue'])
defineOptions({
    name: 'ElsDynamicDesignerView'
})
interface Props extends FormItemProps{
    modelValue: Array<Record<string, any>> | string,
    camelCase?: boolean,
    dataTypes?:Array<DynamicDataType>,
    appendDataTypes?: Array<DynamicDataType>,
    componentTypes?:  Array<DynamicComponentType>,
    appendComponentTypes?: Array<DynamicComponentType>,
    componentRelateDataType?: Record<string, any>,

}

const props = withDefaults(defineProps<Props>(), {

})
const isDisabledUndo = ref(true)
const isDisabledReDo = ref(true)
const activeNames = ref<any>(['1', '2','3'])
const viewPriview = ref(false)
const formValue = ref()
const controlData = ref<any>([])
    const diyData = ref<any>([])

const dataTypeData=inject("dataTypeData")
const componentData=inject("componentData")

const currDynamicDataType = ref<any>([])
if(dataTypeData){
    currDynamicDataType.value=dataTypeData
}else{
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
if(componentData){
    currComponentTypes.value=componentData
}else{
    if (props.componentTypes) {
    currComponentTypes.value.push(...props.componentTypes)
} else {
    currComponentTypes.value.push(...dynamicComponentTypes)
}
if (props.appendComponentTypes) {
    currComponentTypes.value.push(...props.appendComponentTypes)
}

if (props.componentRelateDataType) {
    currComponentTypes.value.forEach(ele => {
        const currRelate = props.componentRelateDataType ? props.componentRelateDataType[ele.type] : undefined
        if (currRelate) {
            ele.dataTypes = currRelate
        }
    })
}

}

provide('dataTypeData', currDynamicDataType.value)
provide('componentData', currComponentTypes.value)
const objectData = ref<any>([
    {
        keyID: "key_" + lessCom.randomNumber().toString(),
        keyName: 'Object',
        keyCode: 'object_' + (Math.random() * 100000).toString().toInt(),
        data: [],
        dataType: currDynamicDataType.value.find(cele => cele.type == 'Object')?.value,
        dataTypeName: 'Object',
        arrayDataTypeName: '',
        arrayDataType: '',
        componentGroup: 'Form',
        componentTypeName: '',
        componentTypeLabel:'Object',
        componentName: '',
        componentType: '',
        config: {
            formConfig: {},
            baseConfig: {},
            advancedConfig: {},
            arrayConfig: {}
        },
        value: {}
    },
    {
        keyID: "key_" + lessCom.randomNumber().toString(),
        keyName: 'Array',
        keyCode: 'array_' + (Math.random() * 100000).toString().toInt(),
        data: [],
        dataType: currDynamicDataType.value.find(cele => cele.type == 'Array')?.value,
        dataTypeName: 'Array',
        componentGroup: 'Form',
        componentTypeName: '',
            componentTypeLabel:'Array<T>',   
        componentName: '',
        componentType: '',
        arrayDataTypeName: '',
        arrayDataType: '',
        config: {
            formConfig: {},
            baseConfig: {},
            advancedConfig: {},
            arrayConfig: {}
        },
    }
])
const importJSON = ref()

currComponentTypes.value.forEach((ele) => {
    const currType = currDynamicDataType.value.find(cele =>cele.value==ele.dataTypes[0]|| cele.type == ele.dataTypes[0])
    const currComponent={
        keyID: "key_" + lessCom.randomNumber().toString(),
        keyName: ele.label,
        keyCode: 'key_' + (Math.random() * 100000).toString().toInt(),
        data: [],
        dataType: currType?.value,
        dataTypeName: ele.dataTypes[0],
        arrayDataTypeName: '',
        arrayDataType: '',
        componentGroup: ele.group,
        componentTypeLabel:ele.label,
        componentTypeName: ele.type,
        componentName: ele.componentName,
        componentType: ele.value,
        config: {
            formConfig: {},
            baseConfig: {},
            advancedConfig: {},
            arrayConfig: {}
        },
        value: initValue(currType?.type)
    }
    if(['String','Number','Bool','Object','Array'].includes(currType.type)||currComponent.componentGroup==='Container'||currComponent.componentGroup==='Desc'){
        controlData.value.push(currComponent)
    }else{
        diyData.value.push(currComponent)
    }
    
})
function initValue(type) {
    switch (type) {
        case 'Number':
            return 0
        case 'Bool':
            return false
        case 'Object':
            return {}
        case 'Array':
            return []
        default:
            return ''
    }
}
const dynamicHandler = new DynamicHandler(currDynamicDataType.value, currComponentTypes.value)

const renderData = ref<any>([])
function handleOpenImport() {
    const val = renderData.value
    const currVal = lessCom.cloneObj(val)
    dynamicHandler.returnConfig(currVal)
    importJSON.value = currVal
}
function initData() {

    if (props.modelValue) {
        if (typeof (props.modelValue) === 'object') {
            renderData.value = lessCom.cloneObj(props.modelValue)

        } else {
            renderData.value = lessCom.cloneObj(JSON.parse(props.modelValue))
        }
        dynamicHandler.initConfigType(renderData.value)
    }

}

initData()

const debouncedReturnResult = computed<Function>(() => {

    return debounce(returnResult, 200)

})
function returnResult() {
    const val = renderData.value
    if (val.length > 0) {
        const currVal = lessCom.cloneObj(val)
        dynamicHandler.returnConfig(currVal)
        if (typeof (val) === 'object') {
            emits('update:modelValue', currVal)
        } else {
            emits('update:modelValue', JSON.stringify(currVal))

        }
    } else {
        if (typeof (val) === 'object') {
            emits('update:modelValue', [])
        } else {
            emits('update:modelValue', '')

        }
    }
}
watch(renderData, () => {
    debouncedReturnResult.value()

}, { deep: true })


const currSelectItem = ref()
const currSelectData = ref()
const showPropertys = ref(false)
function setSelectItem(item, data = null) {
    currSelectData.value = data
    if (!item) {
        currSelectItem.value = null
        showPropertys.value = false
        return
    }
    if (!currSelectItem.value || currSelectItem.value.keyID != item.keyID) {
        showPropertys.value = false
        currSelectItem.value = item
        nextTick(() => {
            showPropertys.value = true
        })
    }


}

function handleClone(item) {
    item = lessCom.cloneObj(item)
    item.keyID = "key_" + lessCom.randomNumber().toString(),
        item.keyCode = 'key_' + lessCom.randomNumber()
    return item
}


const currPropertys = computed(() => {
    if (currSelectItem.value) {
        if (currSelectItem.value.dataType !== undefined) {
            if (!currSelectItem.value.componentType) {
                const currVal = currDynamicDataType.value.find(ele => ele.value == currSelectItem.value.dataType)
                const arrayVal = currDynamicDataType.value.find(ele => ele.value == currSelectItem.value.arrayDataType)

                if (currVal?.type == 'Array' && arrayVal?.type === 'Object' || currVal?.type == 'Object') {
                    return lessCom.cloneObj(property_arrayAndObject)
                }
            } else {
                if (currComponentTypes.value) {
                    const currControlData = currComponentTypes.value.find(ele => ele.value == currSelectItem.value.componentType)
                    if (currControlData && currControlData.propertys && currControlData.propertys.length) {
                        return currControlData.propertys
                    } else {
                        const currVal = currDynamicDataType.value.find(ele => ele.value == currSelectItem.value.dataType)
                        const arrayVal = currDynamicDataType.value.find(ele => ele.value == currSelectItem.value.arrayDataType)

                        if (currVal?.type == 'Array' && arrayVal?.type === 'Object' || currVal?.type == 'Object'||currControlData.type==='DynamicRender'){
                            return lessCom.cloneObj(property_arrayAndObject)
                        }else{
                            return []
                        }
                    }
                }
            }
        }
        else {
            if (!currSelectItem.value.componentType) {
                currSelectItem.value.config = {
                    formConfig: {},
                    baseConfig: {},
                    advancedConfig: {},
                    arrayConfig: {}
                }
            }
        }

        return null

    }

})

function recordComponent() {
    setSelectItem(null)
    useDesignStore.record(renderData.value)
    isDisabledUndo.value = false
    isDisabledReDo.value = true
}
function unDoComponent() {
    setSelectItem(null)
    renderData.value = useDesignStore.undo()
    isDisabledReDo.value = false
    if (renderData.value.length == 0) {
        isDisabledUndo.value = true
    }
}
function reDoComponent() {
    const currValue = useDesignStore.redo();
    if (currValue) {
        renderData.value = currValue.data
        isDisabledReDo.value = currValue.last
    }

}
function getSelectItem() {
    return currSelectItem.value
}

function getDataTypeData(componentType) {
    if (!componentType) { return [] }

    const currControl = currComponentTypes.value.find(ele => ele.value === componentType || ele.type === componentType)
    if (!currControl) { return [] }
    return currDynamicDataType.value.filter(ele => currControl.dataTypes.includes(ele.type)||currControl.dataTypes.includes(ele.value))

}

function handleImportDesigner() {

    if (typeof (importJSON.value) === 'string') {
        renderData.value = JSON.parse(importJSON.value)

    } else {
        renderData.value = importJSON.value

    }
    dynamicHandler.initConfigType(renderData.value)
    recordComponent()
    return Promise.resolve(true)
}
function clearAll() {
    isDisabledReDo.value = true;
    isDisabledUndo.value = true;
    useDesignStore.clear()
    renderData.value = []
    currSelectItem.value = null
}
function validationCode(rule, value, callback) {
    console.log(rule)
    if (value === '') {
        callback(new Error('keyCode不能为空'))
    } else if (currSelectData.value && currSelectData.value.filter(ele => ele.keyCode == value).length > 1) {
        ElMessage.warning(`[${value}]重复`)
        callback(new Error('keyCode重复'))
    } else {
        callback()
    }
}
function handleChangeKeyCode(keyCode) {
    if (props.camelCase) {
        currSelectItem.value.keyCode = keyCode.replace(keyCode[0], keyCode[0].toLowerCase())
    }
}


provide("setSelectItem", setSelectItem)
provide("getSelectItem", getSelectItem)
provide("recordComponent", recordComponent)


</script>
<template>
 <div >
    <ElsFormNode v-bind="lessCom.getFormNodeProps(props)">
    <div style="display:flex;background:#f8f8f8;" class="els-dynamic-view">
        <div style="flex-basis:260px;flex-shrink: 0;background: #fff;" class="els-dynamic-view-components">
            <el-tabs stretch>
                <el-tab-pane label="表单组件">
                    <el-collapse v-model="activeNames">
                        <el-collapse-item title="基础类型" name="1">
                            <draggable tag="ul" :list="controlData.filter(ele => ele.componentGroup === 'Form')"
                                item-key="keyID" :group="{ name: 'dragGroup', pull: 'clone', put: false }"
                                :clone="handleClone" :sort="false">
                                <template #item="{ element, index }">
                                    <li class="container-widget-item" :key="index">
                                        {{ element.componentTypeLabel }}
                                    </li>
                                </template>
                            </draggable>
                        </el-collapse-item>
                        <el-collapse-item title="对象类型" name="2">
                            <draggable tag="ul" :list="objectData" item-key="keyID"
                                :group="{ name: 'dragGroup', pull: 'clone', put: false }" :clone="handleClone"
                                :sort="false">
                                <template #item="{ element, index }">
                                    <li class="container-widget-item" :key="index">
                                        {{ element.componentTypeLabel }}
                                    </li>
                                </template>
                            </draggable>
                        </el-collapse-item>
                        <el-collapse-item title="自定义类型" name="3" v-if="diyData.length">
                            <draggable tag="ul" :list="diyData" item-key="keyID"
                                :group="{ name: 'dragGroup', pull: 'clone', put: false }" :clone="handleClone"
                                :sort="false">
                                <template #item="{ element, index }">
                                    <li class="container-widget-item" :key="index">
                                        {{ element.componentTypeLabel }}
                                    </li>
                                </template>
                            </draggable>
                        </el-collapse-item>
                    </el-collapse>
                </el-tab-pane>
                <el-tab-pane label="展示组件">
                    <el-collapse v-model="activeNames">
                        <el-collapse-item title="容器" name="1">
                            <draggable tag="ul" :list="controlData.filter(ele => ele.componentGroup === 'Container')"
                                item-key="keyID" :group="{ name: 'dragGroup', pull: 'clone', put: false }"
                                :clone="handleClone" :sort="false">
                                <template #item="{ element, index }">
                                    <li class="container-widget-item" :key="index">
                                        {{ element.componentTypeLabel }}
                                    </li>
                                </template>
                            </draggable>
                        </el-collapse-item>
                        <el-collapse-item title="展示" name="2">
                            <draggable tag="ul" :list="controlData.filter(ele => ele.componentGroup === 'Desc')"
                                item-key="keyID" :group="{ name: 'dragGroup', pull: 'clone', put: false }"
                                :clone="handleClone" :sort="false">
                                <template #item="{ element, index }">
                                    <li class="container-widget-item" :key="index">
                                        {{ element.componentTypeLabel }}
                                    </li>
                                </template>
                            </draggable>
                        </el-collapse-item>
                    </el-collapse>
                </el-tab-pane>
            </el-tabs>


        </div>
        <div style="flex-grow:1">
            <div class="main-tool">
                <span style="display: flex; align-items: center;cursor: pointer;">
                    <el-button link @click="unDoComponent" :disabled="isDisabledUndo">
                        <svg t="1697597294665" class="icon" viewBox="0 0 1137 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="1473" width="32" height="32">
                            <path
                                d="M489.244444 568.888889l60.681482 75.851852H265.481481l64.474075-265.481482 60.681481 72.05926c34.133333-30.340741 109.985185-68.266667 238.933333-68.266667 201.007407 0 280.651852 204.8 280.651852 204.8S792.651852 455.111111 663.703704 455.111111c-98.607407 0-155.496296 75.851852-174.45926 113.777778z"
                                p-id="1474" fill="#409eff"></path>
                        </svg>
                    </el-button>
                    <el-button link @click="reDoComponent" :disabled="isDisabledReDo">
                        <svg t="1697597431667" class="icon" viewBox="0 0 1137 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="980" width="32" height="32">
                            <path
                                d="M611.783111 569.344L549.622519 644.740741h284.444444l-65.498074-265.481482-59.922963 72.666074c-35.422815-28.48237-108.278519-68.342519-238.667852-68.342518-202.827852 0-280.651852 206.01363-280.651852 206.013629s116.318815-132.778667 246.215111-132.778666c97.204148-0.037926 153.865481 74.827852 176.241778 112.526222z"
                                p-id="981" fill="#409eff"></path>
                        </svg>
                    </el-button>
                </span>
                <span style="display: flex; align-items: center;gap: 5px;">
                    <el-link type="primary" @click="clearAll">
                        <el-icon>
                            <Delete />
                        </el-icon>清空
                    </el-link>
                    <els-data-modal title="导入配置" :open="handleOpenImport" componentName="el-link" buttonLabel="导入配置"
                        :hasInput="false" link :confirm="handleImportDesigner" icon="DocumentAdd">
                        <ElsJsonEditor v-model="importJSON" style="height: 500px;"></ElsJsonEditor>

                    </els-data-modal>
                    <el-link type="primary" @click="viewPriview = !viewPriview">
                        <el-icon>
                            <View />
                        </el-icon>预览
                    </el-link>
                </span>
            </div>
            <div class="main">
                <DynamicDesignerViewInner :data="renderData"></DynamicDesignerViewInner>
                <el-empty v-if="!renderData.length" style="margin-top: -650px">
                    <template #description>请点击拖动<span class="txt-red">左侧</span>组件到此处</template>
                </el-empty>
            </div>
        </div>
        <div style="flex-basis:400px;width:400px; flex-shrink: 0;background: #fff;padding:0 5px;"
            class="els-dynamic-view-propertys">

            <el-tabs stretch v-if="currSelectItem && currPropertys && showPropertys">
                <el-tab-pane label="基础属性" v-if="currSelectItem.dataType">
                    <els-form v-model="currSelectItem">
                        <els-input label="名称" prop="keyName" required></els-input>
                        <els-input label="字段名" prop="keyCode" @input="handleChangeKeyCode" :validMethod="validationCode"
                            required></els-input>
                        <els-select label="数据类型"
                            v-if="currSelectItem.dataTypeName != 'Array' && currSelectItem.dataTypeName != 'Object'"
                            required :data="getDataTypeData(currSelectItem.componentType)"
                            @select="(sitem) => { currSelectItem.dataTypeName = sitem.selectItem.type }" valueField="value"
                            labelField="label" placeholder="值类型" prop="dataType"></els-select>
                        <els-select label="数据类型"
                            v-if="currSelectItem.dataTypeName == 'Array' && currSelectItem.componentType" required
                            :data="getDataTypeData(currSelectItem.componentType)"
                            @select="(sitem) => { currSelectItem.arrayDataTypeName = sitem.selectItem.type }" valueField="value"
                            labelField="label" placeholder="值类型" prop="arrayDataType"></els-select>
                        <els-textarea label="默认值" prop="defaultValue" :rows="3"></els-textarea>

                    </els-form>
                </el-tab-pane>
                <el-tab-pane label="组件属性" v-if="currPropertys.length">
                    <ElsDynamicRender isAsyncComponent v-model="currSelectItem.config.baseConfig"
                        :nodeType="{ dataType: currSelectItem.dataTypeName != 'Array' ? currSelectItem.dataTypeName : currSelectItem.arrayDataTypeName, componentName: currSelectItem.componentName }"
                        :config="currPropertys" inputWidth="100%">
                    </ElsDynamicRender>
                </el-tab-pane>
                <el-tab-pane label="数组属性" isAsyncComponent v-if="currSelectItem.dataTypeName == 'Array'">
                    <ElsDynamicRender v-model="currSelectItem.config.arrayConfig" :config="property_array"
                        inputWidth="100%">
                    </ElsDynamicRender>
                </el-tab-pane>
                <el-tab-pane label="表单属性" isAsyncComponent v-if="currSelectItem.dataTypeName != 'None'">
                    <ElsDynamicRender v-model="currSelectItem.config.formConfig" :config="property_form" inputWidth="100%">
                    </ElsDynamicRender>
                </el-tab-pane>
                <el-tab-pane label="高级属性">
                    <ElsDynamicRender isAsyncComponent v-model="currSelectItem.config.advancedConfig" :config="property_advanced"
                        inputWidth="100%">
                    </ElsDynamicRender>
                </el-tab-pane>
            </el-tabs>

        </div>
    </div>
    </ElsFormNode></div>
    <els-dialog v-model="viewPriview" width="70%" title="预览效果">
        <el-tabs>
            <el-tab-pane label="预览">
                <ElsDynamicRender v-model="formValue" :config="renderData"></ElsDynamicRender>
            </el-tab-pane>
            <el-tab-pane label="表单属性">
                <ElsJsonViewer :data="formValue" :expandDepth="10"></ElsJsonViewer>
            </el-tab-pane>
        </el-tabs>
    </els-dialog>
</template>

<style lang="less">
.els-dynamic-view {
    .main-tool {
        display: flex;
        gap: 5px;
        justify-content: space-between;
        background: #fff;
        line-height: 42px;
        padding: 0 15px
    }

    .main-tool button.is-disabled {
        svg path {
            fill: #a8abb2
        }
    }

    .main {
        background: #fff;
        padding: 10px;
        margin: 10px;
        display: grid;

        .el-card__body {
            padding-top: 5px;
        }

    }
}

.els-dynamic-view-components {
    .el-collapse-item__header {
        font-weight: bold;
    }

    .el-card__body {
        padding: 0px 10px;
    }

    ul {
        padding-left: 0 !important;
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
        padding: 5px;
        justify-content: space-between;
    }

    .container-widget-item:hover {
        background: #F1F2F3;
        border-color: #409eff;
    }

    .container-widget-item {
        :hover {
            background: #F1F2F3;
            border-color: #409eff;
        }
        word-wrap: break-word;
        display: inline-block;
        min-height: 32px;
        line-height: 32px;
        width: 98px;
        cursor: move;
        background: #fff;
        border: 1px solid #e8e9eb;
        border-radius: 4px;
        padding: 0 8px;
    }
}

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

        .els-dynamic-r-item-child {
            display: flex;
            gap: 5px;
        }

        .els-dynamic-r-item {
            display: flex;
        }
    }
}

.els-dynamic-view {
    .ghost {
        content: "";
        font-size: 0;
        height: 3px;
        box-sizing: border-box;
        background: #409EFF;
        border: 2px solid #409EFF;
        outline-width: 0;
        padding: 0;
        margin-bottom: 10px;
        overflow: hidden;
        width: 100%
    }

    .els-dynamic-view-propertys {
        .el-row {
            flex-direction: column;
        }

        .el-col {
            max-width: 100%;
        }
    }

}

.els-dynamic-d-v-item {
    position: relative;
    margin-bottom: 5px;
    margin-left: 5px;

    >.el-form-item {
        border: 1px dashed #aaaaaabf;
        padding: 16px 5px 5px 0px;
    }

    >.el-form-item:has(form) {
        border: 0px;
    }

    >.els-caption {
        padding-top: 20px;
        margin-bottom: 0;
    }


    .els-row-drag {
        display: flex;
        flex-wrap: wrap;
        position: relative;
        box-sizing: border-box;
        min-height: 50px !important;

    }


    .els-dynamic-d-v-item-type {
        position: absolute;
        z-index: 2;
        background: #aaaaaabf;
        color: #fff;
        font-size: 12px;
        padding: 0 3px;
        display: flex;
        column-gap: 5px;
        line-height: 15px;
    }

    .els-dynamic-d-v-item-move {
        position: absolute;
        z-index: 2;
        background: #aaaaaadb;
        color: #fff;
        font-size: 12px;
        right: 0;
        padding: 0 3px;
        display: none;
        cursor: pointer;
        line-height: 15px;

    }
}

.els-dynamic-d-v-item.selected {
    >.el-form-item {
        border: 2px solid #409EFF;
    }

    >.els-dynamic-d-v-item-move {
        display: flex;
        gap: 5px;
        padding: 2px;
    }

    >.els-caption {
        padding-top: 20px;
        margin-bottom: 0;
    }

    >.el-form-item:has(form) {
        border: 0px;
    }

    >.els-dynamic-d-v-item-type,
    >.els-dynamic-d-v-item-move {
        background: #409effbd;
    }

}

.els-dynamic-d-v-item:has(form) {
    border: 1px dashed #aaaaaabf;
}

.els-dynamic-d-v-item.selected:has(form) {
    border: 2px solid #409EFF !important;
}
.el-form-item__content>div:has(>div[class^=els-dynamic-render]) {
    flex-grow: 1;
 

}

</style>