<script setup lang="ts">
import { watch, ref, computed, nextTick ,onMounted} from 'vue'
import DynamicDesignerViewBaseSetting from './BaseSetting.vue'
import DynamicDesignerViewBody from './Body.vue'
import { FormItemProps, DynamicComponentType, DynamicDataType } from '../../../utlis/interfaces'
import { dynamicDataTypes, dynamicComponentTypes, DynamicHandler } from '../../../utlis/dynamic'
import { property_form, property_formItem, property_array, property_advanced, property_arrayAndObject } from '../../../utlis/dynamic/propertys'
import { lessCom,ElsMessage } from '../../../utlis/com'
import { useDesign } from './stateDesign.js'
import { useValue } from '../../../utlis/use'
import lodash from 'lodash';
import draggable from 'vuedraggable'
const { debounce } = lodash;
const useDesignStore = useDesign()
const emits = defineEmits(['update:modelValue','save'])
defineOptions({
    name: 'ElsDynamicDesignerView'
})

interface Props extends FormItemProps {
    modelValue: Array<Record<string, any>> | string,
    camelCase?: boolean,
    dataTypes?: Array<DynamicDataType>,
    appendDataTypes?: Array<DynamicDataType>,
    componentTypes?: Array<DynamicComponentType>,
    appendComponentTypes?: Array<DynamicComponentType>,
    componentRelateDataType?: Record<string, any>,
    initRootForm?:boolean,
    onSave?:Function

}
const props = withDefaults(defineProps<Props>(),{
    initRootForm:true
})
const { getValue, setValue } = useValue(props)

const isDisabledUndo = ref(true)
const isDisabledReDo = ref(true)
const activeNames = ref<any>(['1', '2', '3'])
const viewActiveNames = ref<any>(['1', '2'])
const viewPriview = ref(false)
const formValue = ref()
const deviceType = ref('PC')
const controlData = ref<any>([])
const customData = ref<any>([])
const startCreate = ref(false)
const dataTypeData = getValue<any>("dataTypeData")
const componentData = getValue<any>("componentData")
const mainInner=ref()
const designer=ref()
const gapTop=ref(0)
const designerTop=ref(0)
const mainZoom=ref(1)

const currDynamicDataType = ref<any>([])
if (dataTypeData) {
    currDynamicDataType.value = dataTypeData
} else {
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
if (componentData) {
    currComponentTypes.value = componentData
} else {
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


const objectData = ref<any>([
    {
        keyID: "key_" + lessCom.randomNumber().toString(),
        keyName: 'Object',
        keyCode: 'object_' + (Math.random() * 100000).toString().toInt(),
        children: [],
        dataType: currDynamicDataType.value.find(cele => cele.type == 'Object')?.value,
        dataTypeName: 'Object',
        arrayDataTypeName: '',
        arrayDataType: '',
        componentGroup: 'Form',
        componentTypeName: '',
        componentTypeLabel: 'Object',
        componentName: '',
        componentType: '',
        formItem:true,
        icon:'internal-data',
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
        children: [],
        dataType: currDynamicDataType.value.find(cele => cele.type == 'Array')?.value,
        dataTypeName: 'Array',
        componentGroup: 'Form',
        componentTypeName: '',
        componentTypeLabel: 'Array<T>',
        componentName: '',
        componentType: '',
        arrayDataTypeName: '',
        arrayDataType: '',
        formItem:true,
        icon:'view-grid-list',
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
    const currType = currDynamicDataType.value.find(cele => cele.value == ele.dataTypes[0] || cele.type == ele.dataTypes[0])
    const currComponent = {
        keyID: "key_" + lessCom.randomNumber().toString(),
        keyName: ele.label,
        keyCode: 'key_' + (Math.random() * 100000).toString().toInt(),
        children: [],
        dataType: currType?.value,
        dataTypeName: ele.dataTypes[0],
        arrayDataTypeName: '',
        arrayDataType: '',
        componentGroup: ele.group,
        componentTypeLabel: ele.label,
        componentTypeName: ele.type,
        componentName: ele.componentName,
        componentType: ele.value,
        restrictChild: ele.restrictChild,
        restrictParent: ele.restrictParent,
        formItem:ele.formItem,
        componentShow:ele.isShow,
        componentPreview:ele.preview,
        icon:ele.icon,
        config: {
            formConfig: {},
            baseConfig: {},
            advancedConfig: {},
            arrayConfig: {}
        },
        value: initValue(currType?.type),
        defaultValue:''
    }
    if(ele.isCustom){
        customData.value.push(currComponent)
    }else if (['String', 'Number', 'Bool', 'Object', 'Array'].includes(currType.type) || currComponent.componentGroup === 'Container' || currComponent.componentGroup === 'Show') {
        controlData.value.push(currComponent)
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
        renderData.value=dynamicHandler.compatibleVersion(renderData.value)  
        dynamicHandler.initConfigType(renderData.value)
    }
    else if(props.initRootForm){
        createRootForm()
    }
    if (renderData.value.length) {
        startCreate.value = true
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
        if (typeof (props.modelValue) === 'object') {
            emits('update:modelValue', currVal)
            return currVal
        } else {
            emits('update:modelValue', JSON.stringify(currVal))
            return JSON.stringify(currVal)

        }
    } else {
        if (typeof (props.modelValue) === 'object') {
            emits('update:modelValue', [])
            return []
        } else {
            emits('update:modelValue', '')
            return ''
        }
    }
}
watch(renderData, () => {
    debouncedReturnResult.value()

}, { deep: true })


const currSelectItem = ref()
const currSelectData = ref()
const showPropertys = ref(false)

function setSelectItem(item) {
    if (!item) {
        currSelectItem.value = null
        showPropertys.value = false
        return
    }
    nextTick(()=>{
        if (!currSelectItem.value || currSelectItem.value.keyID != item.keyID) {
            showPropertys.value = false
            currSelectItem.value = item
            nextTick(() => {
                showPropertys.value = true
            })
        }
    })



}

function handleClone(item) {
    item = lessCom.cloneObj(item)
    item.keyID = "key_" + lessCom.randomNumber().toString()
    if(item.componentGroup!=='Container'&&item.componentGroup!=='Show'){
        item.keyCode = 'key_' + lessCom.randomNumber()
    }else{
        item.keyCode=''
    }
    return item
}
function handleMove(e) {
    if (e.draggedContext&&e.draggedContext.element?.componentGroup === 'Container') {
        if (!e.to || !e.to.className) {
            if (e.dragged.dataset['restrict']) {
                return false
            }
            return true
        }
        if (e.to.dataset["restrict"]) {
            return e.to.dataset['restrict'] == e.dragged.dataset['type']
        }

        if (e.dragged.dataset['restrict']) {
            return e.dragged.dataset['restrict'] == e.to.dataset['type']
        }
        return e.to.className.indexOf('el-' + e.dragged.dataset['type']?.toKebabCase()) == -1
    } else if (e.dragged.dataset['type'] === 'Array' && e.to.dataset['type'] === 'Array') { return false }

    return true
}


const currPropertys = computed(() => {
    if (currSelectItem.value) {
        if (currSelectItem.value.dataType !== undefined) {
            if (!currSelectItem.value.componentType) {
                const currVal = currDynamicDataType.value.find(ele => ele.value == currSelectItem.value.dataType)
                const arrayVal = currDynamicDataType.value.find(ele => ele.value == currSelectItem.value.arrayDataType)

                if (currVal?.type == 'Array' && arrayVal?.type === 'Object' || currVal?.type == 'Object') {4
                    const propertyData:any =lessCom.cloneObj(property_arrayAndObject)
                    propertyData[0].children.push(...property_form[0].children)
                    return propertyData
                }
            } else {
                if (currComponentTypes.value) {
                    const currControlData = currComponentTypes.value.find(ele => ele.value == currSelectItem.value.componentType)
                    if (currControlData && currControlData.propertys && currControlData.propertys.length) {
                        return currControlData.propertys
                    } else {
                        const currVal = currDynamicDataType.value.find(ele => ele.value == currSelectItem.value.dataType)
                        const arrayVal = currDynamicDataType.value.find(ele => ele.value == currSelectItem.value.arrayDataType)

                        if (currVal?.type == 'Array' && arrayVal?.type === 'Object' || currVal?.type == 'Object' || currControlData.type === 'DynamicRender') {
                            return lessCom.cloneObj(Object.assign([...property_arrayAndObject,...property_form]) )
                        } else {
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
    return currDynamicDataType.value.filter(ele => currControl.dataTypes.includes(ele.type) || currControl.dataTypes.includes(ele.value))

}

function handleImportDesigner() {
     let currRenderData={}
    if (typeof (importJSON.value) === 'string') {
        currRenderData = JSON.parse(importJSON.value)

    } else {
        currRenderData= importJSON.value

    }
    renderData.value=dynamicHandler.compatibleVersion(currRenderData)  
    dynamicHandler.initConfigType(renderData.value)
    recordComponent()
    return Promise.resolve(true)
}
function clearAll() {
    isDisabledReDo.value = true;
    isDisabledUndo.value = true;
    startCreate.value=false
    useDesignStore.clear()
    renderData.value.length=0
    currSelectItem.value = null
}
function validationCode(rule, value, callback) {
    console.log(rule)
    if (value === ''&&currSelectItem.value.componentGroup!=='Container'&&currSelectItem.value.componentGroup!=='Show') {
        callback(new Error('keyCode不能为空'))
    } else if (currSelectData.value && currSelectData.value.filter(ele => ele.keyCode == value).length > 1) {
        ElsMessage.warning(`[${value}]重复`)
        callback(new Error('keyCode重复'))
    } else {
        callback()
    }
}

function createRootForm() {
    renderData.value.push(
        {
            "keyID": lessCom.generateID(),
            "keyName": "Form",
            "keyCode": lessCom.generateID(),
            "children": [],
            "dataType": "None",
            "dataTypeName":"None",
            "arrayDataType": "",
            "componentName":"Form",
            "componentTypeLabel": "Form表单",
            "componentType": "Form",
            "componentGroup":"Container",
            "config": {
                "baseConfig": {
                },
                "advancedConfig": {
                },
                "arrayConfig": {

                }
            }
        })
    startCreate.value = true
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
    return getNodeValue(renderData)
}

function getDeviceType(){
    return deviceType
}
function handleSave(){
    const result=returnResult()
    if(props.onSave){
        props.onSave(result)
    }
}
setValue({
    "isMobile": false,
    "dataTypeData": currDynamicDataType.value,
    "componentData": currComponentTypes.value,
    validationCode,
    setSelectItem,
    getSelectItem,
    handleMove,
    getCurrNode,
    getNodeValue,
    getDeviceType,
    getDataTypeData,
    removeItem: (item) => {
        lessCom.removeArrayItem(renderData.value, item)
    },
    recordComponent,

})
onMounted(() => {
    gapTop.value= (mainInner.value.getBoundingClientRect().top+20).appendPx()
    designerTop.value=designer.value.getBoundingClientRect().top
})

</script>
<template>
    <div ref="designer" :style="`--gapTop:${gapTop};--designerTop:${designerTop}`">
        <ElsFormNode v-bind="lessCom.getFormNodeProps(props)">
            <div style="display:flex;background:#f8f8f8;" class="els-dynamic-d-view">
                <div style="flex-basis:260px;flex-shrink: 0;background: #fff;" class="els-dynamic-d-view-components" >
                    <slot name="left"  v-bind="{ data: controlData,customData:customData}">
                      <el-tabs stretch>
                        <el-tab-pane label="表单组件">
                            <el-collapse v-model="activeNames">
                                <el-collapse-item title="基础类型" name="1">
                                    <draggable tag="div" class="container-widget" :list="controlData.filter(ele => ele.componentGroup === 'Form')"
                                        item-key="keyID" :group="{ name: 'dragGroup', pull: 'clone', put: false }"
                                        :clone="handleClone" :sort="false">
                                        <template #item="{ element, index }">
                                            <div class="container-widget-item" :key="index">
                                                <component :is="'icon-'+element.icon" theme="outline" size="20" fill="#333"/> 
                                                {{ element.componentTypeLabel }}
                                            </div>
                                        </template>
                                    </draggable>
                                </el-collapse-item>
                                <el-collapse-item title="对象类型" name="2">
                                    <draggable tag="div" class="container-widget" :list="objectData" item-key="keyID" :move="handleMove"
                                        :group="{ name: 'dragGroup', pull: 'clone', put: false }" :clone="handleClone"
                                        :sort="false">
                                        <template #item="{ element, index }">
                                            <div class="container-widget-item" :data-type="element.dataTypeName"
                                                :key="index">
                                                <component :is="'icon-'+element.icon" theme="outline" size="20" fill="#333"/> 
                                                {{ element.componentTypeLabel }}
                                            </div>
                                        </template>
                                    </draggable>
                                </el-collapse-item>
                                <el-collapse-item title="自定义类型" name="3" v-if="customData.length">
                                    <draggable tag="div" class="container-widget" :list="customData" item-key="keyID"
                                        :group="{ name: 'dragGroup', pull: 'clone', put: false }" :clone="handleClone"
                                        :sort="false">
                                        <template #item="{ element, index }">
                                            <div class="container-widget-item" :key="index">
                                                {{ element.componentTypeLabel }}
                                            </div>
                                        </template>
                                    </draggable>
                                </el-collapse-item>
                            </el-collapse>
                        </el-tab-pane>
                        <el-tab-pane label="展示组件">
                            <el-collapse v-model="viewActiveNames">
                                <el-collapse-item title="布局" name="1">
                                    <draggable tag="div" class="container-widget" :move="handleMove"
                                        :list="controlData.filter(ele => ele.componentGroup === 'Container'&&ele.componentShow)"
                                        item-key="keyID" :group="{ name: 'dragGroup', pull: 'clone', put: false }"
                                        :clone="handleClone" :sort="false">
                                        <template #item="{ element, index }">
                                            <div class="container-widget-item" :data-type="element.componentType"
                                                :data-restrict="element.restrictParent" :key="index">
                                                <component :is="'icon-'+element.icon" theme="outline" size="20" fill="#333"/> 
                                                {{ element.componentTypeLabel }}
                                            </div>
                                        </template>
                                    </draggable>
                                </el-collapse-item>
                                <el-collapse-item title="展示" name="2">
                                    <draggable tag="div" class="container-widget" :list="controlData.filter(ele => ele.componentGroup === 'Show')"
                                        item-key="keyID" :group="{ name: 'dragGroup', pull: 'clone', put: false }"
                                        :clone="handleClone" :sort="false">
                                        <template #item="{ element, index }">
                                            <div class="container-widget-item" :key="index">
                                                <component :is="'icon-'+element.icon" theme="outline" size="20" fill="#333"/> 
                                                {{ element.componentTypeLabel }}
                                            </div>
                                        </template>
                                    </draggable>
                                </el-collapse-item>
                            </el-collapse>
                        </el-tab-pane>
                     </el-tabs>
                    </slot>
                </div>
                <div style="flex-grow:1">
                    <div class="main-tool">
                        <span style="display: flex; align-items: center;cursor: pointer;">
                            <el-button link @click="unDoComponent" type="primary" :disabled="isDisabledUndo">
                                <icon-back theme="outline" size="20" fill="#333"/>
                            </el-button>
                            <el-button link @click="reDoComponent" :disabled="isDisabledReDo">
                                <icon-next theme="outline" size="20" fill="#333"/>
                            </el-button>
                            <els-radio-button v-model="deviceType">
                                <els-option>PC</els-option>
                                <els-option>H5</els-option>
                            </els-radio-button>
                            <ElsZoomAndOut v-model="mainZoom" :min="0.5" :max="1.5"></ElsZoomAndOut>

                        </span>
                        <span style="display: flex; align-items: center;gap: 5px;">
                            <el-link type="primary" @click="clearAll">
                                <el-icon>
                                    <Delete />
                                </el-icon>清空
                            </el-link>
                            <els-data-modal title="导入配置" :open="handleOpenImport" componentName="el-link"
                                buttonLabel="导入配置" :hasInput="false" link :confirm="handleImportDesigner"
                                icon="DocumentAdd">
                                <ElsJsonEditor v-model="importJSON" style="height: 500px;"></ElsJsonEditor>

                            </els-data-modal>
                            <el-link type="primary" @click="viewPriview = !viewPriview">
                                <el-icon>
                                    <View />
                                </el-icon>预览
                            </el-link>
                            <el-link type="primary" @click="handleSave" v-if="onSave">
                                <el-icon>
                                    <Check />
                                </el-icon>保存
                            </el-link>
                        </span>
                    </div>
                    <div class="main" :class="deviceType">
                        <div class="main-inner" ref="mainInner" :style="`--mainZoom:${mainZoom}`">
                            <div class="main-create-from" v-if="!startCreate && !renderData.length&&initRootForm===true">
                                <div>
                                    <div class="txt-center confirm-inner">
                                        <el-card class="confirm-item ">
                                            <div class="confirm-title confirm-no-title">
                                                <el-icon><Close /></el-icon>
                                            </div>
                                            <div class="confirm-body confirm-no-body">
                                                <div>页面已有Form表单</div>
                                                <div>
                                                <el-button type="info" @click="startCreate = true;">直接进入</el-button>
                                            </div>
                                            </div>
                                           
                                        </el-card>
                                        <el-card class="confirm-item ">
                                            <div class="confirm-title confirm-yes-title"><el-icon><Check /></el-icon></div>
                                            <div class="confirm-body confirm-yes-body">
                                            <div>
                                                没有Form表单创建一个
                                            </div>
                                            <div>
                                                <el-button type="primary" @click="createRootForm">创建表单</el-button>
                                            </div>
                                            </div>
                                          
                                        </el-card>
                                    </div>
                                </div>
                            </div>
                            <div v-else style="position: relative;">
                                <DynamicDesignerViewBody v-if="deviceType=='H5'" :isMobile="true" :renderData="renderData">
                                </DynamicDesignerViewBody>
                                <DynamicDesignerViewBody v-else :type="deviceType" :renderData="renderData">
                                </DynamicDesignerViewBody>
                                <el-empty  v-if="!renderData.length||(renderData.length&&renderData[0].componentType==='Form'&&!renderData[0].children.length)" >
                                    <template #description>请点击拖动<span class="txt-red">左侧</span>组件到此处</template>
                                </el-empty>
                            </div>
                        </div>
                    </div>
                </div>
                <div  class="els-dynamic-d-view-propertys">
                    <slot name="right"  v-bind="{ selectItem: currSelectItem,propertys:currPropertys}">
                        <el-tabs stretch v-if="currSelectItem && currPropertys && showPropertys">
                            <el-tab-pane label="基础属性" v-if="currSelectItem.dataType&&currSelectItem.formItem">
                              <DynamicDesignerViewBaseSetting :nodeItem="currSelectItem"></DynamicDesignerViewBaseSetting>
                            </el-tab-pane>
                            <el-tab-pane label="组件属性" v-if="currPropertys.length">
                                <ElsDynamicRender isAsyncComponent v-model="currSelectItem.config.baseConfig" :isMobile="false"
                                    :nodeType="{ dataType: currSelectItem.dataTypeName != 'Array' ? currSelectItem.dataTypeName : currSelectItem.arrayDataTypeName, componentName: currSelectItem.componentName }"
                                    :config="currPropertys" inputWidth="100%">
                                </ElsDynamicRender>
                            </el-tab-pane>
                            <el-tab-pane label="数组属性" v-if="currSelectItem.dataTypeName == 'Array'">
                                <ElsDynamicRender isAsyncComponent v-model="currSelectItem.config.arrayConfig"  :isMobile="false"
                                    :config="property_array" inputWidth="100%">
                                </ElsDynamicRender>
                            </el-tab-pane>
                            <el-tab-pane label="表单属性" v-if="currSelectItem.componentGroup == 'Form'">
                                <ElsDynamicRender isAsyncComponent v-model="currSelectItem.config.formConfig"  :isMobile="false"
                                    :config="property_formItem" inputWidth="100%">
                                </ElsDynamicRender>
                            </el-tab-pane>
                            <el-tab-pane label="高级属性">
                                <ElsDynamicRender isAsyncComponent v-model="currSelectItem.config.advancedConfig"  :isMobile="false"
                                    :config="property_advanced" inputWidth="100%">
                                </ElsDynamicRender>
                            </el-tab-pane>
                        </el-tabs>
                    </slot>
                </div>
            </div>
        </ElsFormNode>
    </div>
    <els-dialog v-model="viewPriview"  class="preview-dialog" destroy-on-close @close="formValue={};" :width="deviceType == 'PC' ? '70%' : '40%'" top="20px" contentHeight="60%" title="预览效果">
        <el-tabs>
            <el-tab-pane label="预览">
                <div class="preview-main" :class="deviceType">
                    <div class="preview-main-inner">
                        <ElsDynamicRender  v-model="formValue" :config="renderData" :isMobile="deviceType == 'H5'">
                        </ElsDynamicRender>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="表单属性">
                <ElsJsonViewer :data="formValue" :expandDepth="10"></ElsJsonViewer>
            </el-tab-pane>
        </el-tabs>
    </els-dialog>
</template>

<style lang="less" scoped>
.main-tool:deep {
    display: flex;
    gap: 5px;
    justify-content: space-between;
    background: #fff;
    line-height: 42px;
    padding: 0 15px;
    svg path {
            stroke: var(--el-color-primary);
            fill: var(--el-color-primary) 
        }
    .is-disabled{
        svg path {
            stroke: #a8abb2;
            fill: #a8abb2
        }
    }
    .zoom-and-out-box{
        position: absolute;
       left: calc(50% - 88px);
    }

}

.main.H5,.preview-main.H5 {
    width: 420px;
    margin: auto;

    .main-inner,.preview-main-inner {
        border-radius: 15px;
        box-shadow: 0 0 1px 10px #495060;
        padding: 5px;
        .main-create-from{
            >div{
                >.txt-center{
                    width: 150px;
                }
            }
        }
    }
    
}

.main-inner {
    height: calc(100vh - var(--gapTop));
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    background: #fff;
    padding: 10px;
    margin: 10px;
    display: grid;
    zoom: var(--mainZoom);
    .el-card__body {
        padding-top: 5px;
    }

    .main-create-from:deep {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #c7e9f9;
        color: #fff;
        font-size: 20px;
   
        .confirm-item{
            width: 200px;
           
            border:unset;
            
            .el-card__body{padding: 0;}
            .confirm-title{
                .el-icon{
                    font-size: 40px;
                    border: 1px solid;
                    border-radius: 40px;
                }
                color: #fff;
                height: 100px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center; 
            }
        }
        .confirm-body{
            height: 130px;
            font-size: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
        }
        .confirm-no-body{
            .el-button{
                background: #f56160;
                border: unset;
                
                &:hover{
                    box-shadow: 3px 4px 7px #f56160;
              }
            }
        }
        .confirm-yes-body{
            .el-button{
       
                background: #61c1f5;
                border: unset;
              &:hover{
                box-shadow: 3px 4px 7px #61c1f5;
              }
            }
        }

        .confirm-no-title{
            background: #f56160;
        
        }
.confirm-yes-title{
    background:  #61c1f5;
   
}
        >div {
            display: flex;
            flex-direction: column;
            row-gap: 20px;

            >div {
                display: flex;
                justify-content: center;
                column-gap: 60px;

                >button {
                    >span>div>div:first-of-type {
                        font-size: 20px;
                        margin-bottom: 10px;
                    }

                    width: 200px;
                    height: 60px;
                }
            }
        }
    }
}

.preview-main-inner {
    min-height: 600px;
    background: #fff;
    padding: 10px;
    margin: 10px;
    display: grid;

    .el-card__body {
        padding-top: 5px;
    }
}

.els-dynamic-d-view-components {
    border-right: 1px solid #eaecef;
    height: calc(100vh - var(--designerTop));
    overflow-y: scroll;
    .el-collapse-item__header {
        font-weight: bold;
    }

    .el-card__body {
        padding: 0px 10px;
    }

    .container-widget {
        padding-left: 0 !important;
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
        padding: 5px;
        justify-content: space-between;
    }


    .container-widget-item{
        &:hover {
            background: #F1F2F3;
            border-color: #409eff;
        }
        word-wrap: break-word;
        display: inline-block;
        min-height: 32px;
        width: 48%;
        cursor: move;
        background: #fff;
        border: 1px solid #e8e9eb;
        border-radius: 4px;
        padding: 0 8px;
        display: flex;
        align-items: center;
        column-gap: 8px;
        box-sizing: border-box;
    }
}


.els-dynamic-d-view {
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
    .els-dynamic-d-view-propertys:deep{
       
        overflow-y: scroll;
        form,.el-tabs,.el-form-item,.el-tabs__content,.el-tab-pane,.el-tab-pane>div{
            height: 100%;
        }
        .el-tabs__content{
            padding: 0px 12px;
        }
    }
    .els-dynamic-d-view-propertys {
        height: calc(100vh - var(--designerTop));
        border-left: 1px solid #eaecef;
        flex-basis: 400px;
        width: 400px;
        flex-shrink: 0;
        background: rgb(255, 255, 255);
        padding: 0px 10px;
        .el-row {
            flex-direction: column;
        }

        .el-col {
            max-width: 100%;
        }
    
    }
}
.el-empty{
    position: absolute;
    width: 100%;
    top: calc(50vh - 200px);
}
</style>