<script setup lang="ts">
import { watch, provide, ref, computed, nextTick } from 'vue'
import { dynamicDataType, dynamicControlType, dynamicArrayDataType } from '../../utlis/lessConfig.js'
import DynamicDesignerViewInner from './DynamicDesignerViewInner.vue'
import draggable from 'vuedraggable'
import '../../utlis/lessPrototype.js'
import lessCom from '../../utlis/lessCom'
import property_form from '../../utlis/dynamicPropertys/form'
import property_array from '../../utlis/dynamicPropertys/array'
import property_advanced from '../../utlis/dynamicPropertys/advanced'
import property_arrayAndObject from '../../utlis/dynamicPropertys/arrayAndObject'
defineOptions({
    name: 'ElsDynamicDesignerViewInner',
})
interface Props {
    config: Array<Record<string, any>>,
}

const props = withDefaults(defineProps<Props>(), {

})
const controlData = ref<any>([])
const objectData = ref<any>([
    {
        keyID: "key_" + lessCom.randomNumber().toString(),
        keyName: 'Object',
        keyCode: 'Object_' + (Math.random() * 100000).toString().toInt(),
        data: [],
        dataType: dynamicDataType.find(cele => cele.label == 'Object')?.value,
        dataTypeName: 'Object',
        arrayDataTypeName: '',
        arrayDataType: '',
        componentGroup: 'Form',
        controlTypeName: 'Object',
        componentName: '',
        controlType: 0,
        config: {
            formConfig: {},
            baseConfig: {},
            advancedConfig: {},
            arrayConfig: {}
        },
        value: ''
    },
    {
        keyID: "key_" + lessCom.randomNumber().toString(),
        keyName: 'Array',
        keyCode: 'Array_' + (Math.random() * 100000).toString().toInt(),
        data: [],
        dataType: dynamicDataType.find(cele => cele.label == 'Array')?.value,
        dataTypeName: 'Array',
        componentGroup: 'Form',
        controlTypeName: 'Array<T>',
        componentName: '',
        controlType: 0,
        arrayDataTypeName: '',
        arrayDataType: '',
        config: {
            formConfig: {},
            baseConfig: {},
            advancedConfig: {},
            arrayConfig: {}
        },
        value: ''
    }
])

dynamicControlType.forEach((ele) => {
    controlData.value.push({
        keyID: "key_" + lessCom.randomNumber().toString(),
        keyName: ele.label,
        keyCode: 'Key_' + (Math.random() * 100000).toString().toInt(),
        data: [],
        dataType: dynamicDataType.find(cele => cele.label == ele.dataTypes[0])?.value,
        dataTypeName: ele.dataTypes[0],
        arrayDataTypeName: '',
        arrayDataType: '',
        componentGroup: ele.group,
        controlTypeName: ele.label,
        componentName: ele.componentName,
        controlType: ele.value,
        config: {
            formConfig: {},
            baseConfig: {},
            advancedConfig: {},
            arrayConfig: {}
        },
        value: ''
    })
})
const renderData = ref<any>([])
renderData.value = lessCom.cloneObj(props.config)

watch(() => props.config, (val) => {
    if (val) {
        initData()
    }

}, { deep: true, immediate: true })


function initData() {

    let currData: any = props.config
    renderData.value.length = 0;
    renderData.value.push(...currData.filter(ele => ele.isShow == 1));
}

function getDefaultValue(item) {
    const currDataType = dynamicDataType.find(ele => ele.value == item.dataType)
    if (currDataType) {
        switch (currDataType.label) {
            case '数字':
                if (item.defaultValue) {
                    item.value = parseFloat(item.defaultValue)
                } else {
                    item.value = 0;
                }
                break
            case 'Bool':
                if (item.defaultValue?.toLowerCase() === 'true') {
                    item.value = true;
                } else {
                    item.value = false
                }
                break
            default:
                if (item.defaultValue) {
                    item.value = item.defaultValue.toString()
                } else {
                    item.value = ''
                }
        }
    }

}
function recoverData(data, valueData: any = null) {
    if (!valueData) {
        valueData = {}
    }
    data.forEach((ele) => {
        if (ele.keyCode) {
            const currVal = valueData[ele.keyCode]
            if (currVal === undefined) {
                getDefaultValue(ele)

            } else {
                ele.value = currVal
            }
        } else {
            getDefaultValue(ele)
        }
        const currDataType = dynamicDataType.find(d => d.value == ele.dataType)
        const currArrayDataType = dynamicDataType.find(d => d.value == ele.arrayDataType)
        const currControlType = dynamicControlType.find(d => d.value == ele.controlType)
        ele.componentGroup = currControlType?.group
        ele.dataTypeName = currDataType?.label
        ele.arrayDataTypeName = currArrayDataType?.label
        ele.componentName = currControlType?.componentName
        if (currDataType?.label == 'Array' && currArrayDataType?.label == 'Object') {
            recoverArrayData(ele, valueData[ele.keyCode])
        } else if (currDataType?.label == 'Object') {
            recoverData(ele.data, valueData[ele.keyCode])
        } else if (currDataType?.label == '无' && currControlType?.componentName == 'ElsRow') {
            recoverData(ele.data, valueData)
        }


    })
}
function recoverArrayData(item, valueData: any = null) {
    if (!item["arrayObjData"]) {
        let currData: any = [];
        item.data.forEach(ele => {
            const currDataType = dynamicDataType.find(d => d.value == ele.dataType)
            const currArrayDataType = dynamicDataType.find(d => d.value == ele.arrayDataType)
            const currControlType = dynamicControlType.find(d => d.value == ele.controlType)
            ele.dataTypeName = currDataType?.label
            ele.arrayDataTypeName = currArrayDataType?.label
            ele.componentName = currControlType?.componentName
            ele.componentGroup = currControlType?.group
            var currItem = Object.assign({}, ele)
            getDefaultValue(currItem);


            if (currDataType?.label == 'Array' && currArrayDataType?.label == 'Object') {
                recoverArrayData(currItem)
            } else if (currDataType?.label == 'Object' || currControlType?.componentName == 'ElsRow') {
                recoverData(currItem.data)
            }
            currData.push(currItem)
        })
        item["arrayObjData"] = currData;
    }

    if (valueData) {
        item.value = valueData
        let arrayData: any = [];
        valueData.forEach((ele) => {
            let itemData: any = lessCom.cloneObj(item["arrayObjData"])
            recoverData(itemData, ele)
            arrayData.push(itemData)
        })
        item.data = arrayData
    } else {
        item.value = [];
        let defaultArrayData: any = [];
        if (item.config.baseConfig.arrayDefaultLength === undefined || item.config.baseConfig.arrayDefaultLength === '') {
            defaultArrayData.push(lessCom.cloneObj(item["arrayObjData"]))
        } else {
            for (let i = 0; i < item.config.baseConfig.arrayDefaultLength; i++) {
                defaultArrayData.push(lessCom.cloneObj(item["arrayObjData"]))
            }
        }
        item.data = defaultArrayData
    }
}

function getUploadUrl(url, item) {
    let currUrl = url
    let uploadParms = `&ResourcePicLimitType=${(item.config.baseConfig.picLimitType ?? '')}&ResourcePicWidth=${(item.config.baseConfig.picWidthLimit ?? 0)}&ResourcePicHeight=${(item.config.baseConfig.picHeightLimit ?? 0)}&HasMd5Parameter=${(item.config.baseConfig.hasMd5Parameter ? 1 : 0)}`
    if (item.config.baseConfig.resourceCode) {
        currUrl = currUrl.addUrlParameter('ResourceCode', item.config.baseConfig.resourceCode)
    }
    if (item.config.baseConfig.restrictCode) {
        currUrl = currUrl.addUrlParameter('RestrictCode', item.config.baseConfig.restrictCode)
    }
    let uploadUrl = currUrl + uploadParms;
    return uploadUrl;
}
const currSelectItem = ref()
const showPropertys = ref(false)
function setSelectItem(item) {
    if (!currSelectItem.value || currSelectItem.value.keyID != item.keyID) {
        showPropertys.value = false
        currSelectItem.value = item
        console.info(item)
        nextTick(() => {
            showPropertys.value = true
        })
    }


}

function handleClone(item) {
    item = lessCom.cloneObj(item)
    item.keyID = "key_" + lessCom.randomNumber().toString(),
        item.keyCode = 'Key_' + lessCom.randomNumber()
    return item
}


const currPropertys = computed(() => {
    if (currSelectItem.value) {
        if (currSelectItem.value.dataType !== undefined) {
            if (!currSelectItem.value.controlType) {
                const currVal = dynamicDataType.find(ele => ele.value == currSelectItem.value.dataType)
                const arrayVal = dynamicDataType.find(ele => ele.value == currSelectItem.value.arrayDataType)

                if (currVal?.label == 'Array' && arrayVal?.label === 'Object' || currVal?.label == 'Object') {
                    return lessCom.cloneObj(property_arrayAndObject)
                }
            } else {
                if (dynamicControlType) {
                    const currControlData = dynamicControlType.find(ele => ele.value == currSelectItem.value.controlType)
                    if (currControlData) {
                        return currControlData.propertys
                    }
                }
            }
        }
        else {
            if (!currSelectItem.value.controlType) {
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
function getSelectItem() {
    return currSelectItem.value
}

function getDataTypeData(controlType) {
    if (!controlType) { return [] }
    const currControl = dynamicControlType.find(ele => ele.value == controlType)
    if (!currControl) { return [] }
    return dynamicDataType.filter(ele => currControl.dataTypes.includes(ele.label))


}
const importJSON = ref()
function handleOpenImport() {
    importJSON.value = JSON.stringify(renderData.value, null, '\t')
}
function handleImportDesigner() {
    renderData.value = JSON.parse(importJSON.value)
    recoverData(renderData.value)
    return Promise.resolve(true)
}
function clearAll() {
    renderData.value = []
    currSelectItem.value = null
}
const activeNames = ['1', '2']
const viewPriview = ref(false)
const formValue = ref()
provide("getUploadUrl", getUploadUrl)
provide("setSelectItem", setSelectItem)
provide("getSelectItem", getSelectItem)

</script>
<template>
    <div style="display:flex;background:#f8f8f8;" class="els-dynamic-view">

        <div style="flex-basis:260px;flex-shrink: 0;background: #fff;" class="els-dynamic-view-components">
            <el-tabs stretch >
                <el-tab-pane label="表单组件" >
                    <el-collapse v-model="activeNames">
                        <el-collapse-item title="基础类型" name="1">
                            <draggable tag="ul" :list="controlData.filter(ele=>ele.componentGroup==='Form')" item-key="keyID"
                                :group="{ name: 'dragGroup', pull: 'clone', put: false }" :clone="handleClone" :sort="false">
                                <template #item="{ element, index }">
                                    <li class="container-widget-item" :key="index">
                                        {{ element.controlTypeName }}
                                    </li>
                                </template>
                            </draggable>
                        </el-collapse-item>
                        <el-collapse-item title="对象类型" name="2">
                            <draggable tag="ul" :list="objectData" item-key="keyID"
                                :group="{ name: 'dragGroup', pull: 'clone', put: false }" :clone="handleClone" :sort="false">
                                <template #item="{ element, index }">
                                    <li class="container-widget-item" :key="index">
                                        {{ element.controlTypeName }}
                                    </li>
                                </template>
                            </draggable>
                        </el-collapse-item>
                     </el-collapse>
                    </el-tab-pane>
                    <el-tab-pane  label="展示组件" >
                        <el-collapse v-model="activeNames">
                        <el-collapse-item title="容器" name="1">
                            <draggable tag="ul" :list="controlData.filter(ele=>ele.componentGroup==='Container')" item-key="keyID"
                                :group="{ name: 'dragGroup', pull: 'clone', put: false }" :clone="handleClone" :sort="false">
                                <template #item="{ element, index }">
                                    <li class="container-widget-item" :key="index">
                                        {{ element.controlTypeName }}
                                    </li>
                                </template>
                            </draggable>
                        </el-collapse-item>
                        <el-collapse-item title="展示" name="2">
                            <draggable tag="ul" :list="controlData.filter(ele=>ele.componentGroup==='Desc')" item-key="keyID"
                                :group="{ name: 'dragGroup', pull: 'clone', put: false }" :clone="handleClone" :sort="false">
                                <template #item="{ element, index }">
                                    <li class="container-widget-item" :key="index">
                                        {{ element.controlTypeName }}
                                    </li>
                                </template>
                            </draggable>
                        </el-collapse-item>
                     </el-collapse>
                    </el-tab-pane>
               </el-tabs>
           
        
        </div>
        <div style="flex-grow:1">
            <div style="display: flex; gap: 5px;justify-content: flex-end;background:#fff;line-height:42px;padding:0 15px">
                <el-link type="primary" @click="clearAll">
                    <el-icon>
                        <Delete />
                    </el-icon>清空
                </el-link>
                <els-data-modal title="导入配置" componentName="el-link" buttonLabel="导入配置" :hasInput="false"
                    :open="handleOpenImport" link :confirm="handleImportDesigner" icon="DocumentAdd">
                    <els-textarea v-model="importJSON" width="100%" :rows="20"></els-textarea>
                </els-data-modal>
                <el-link type="primary" @click="viewPriview = !viewPriview">
                    <el-icon>
                        <View />
                    </el-icon>预览
                </el-link>
            </div>
            <div class="main">
                <DynamicDesignerViewInner :data="renderData"></DynamicDesignerViewInner>
                <el-empty v-if="!renderData.length" style="margin-top: -650px">
                    <template #description>请点击拖动<span class="txt-red">左侧</span>组件到此处</template>
                </el-empty>
            </div>
        </div>
        <div style="flex-basis:400px;width:400px; flex-shrink: 0;background: #fff;padding:0 5px;" class="els-dynamic-view-propertys">
            <el-tabs  stretch v-if="currSelectItem && currPropertys && showPropertys">
                <el-tab-pane label="基础属性" v-if="currSelectItem.dataType">
                    <els-form v-model="currSelectItem">
                        <els-input label="名称" prop="keyName" required></els-input>
                        <els-input label="字段名" prop="keyCode" required></els-input>
                        <els-select label="数据类型"
                            v-if="currSelectItem.dataTypeName != 'Array' && currSelectItem.dataTypeName != 'Object'"
                            required :data="getDataTypeData(currSelectItem.controlType)"
                            v-model:select-label="currSelectItem.dataTypeName" valueField="value" labelField="label"
                            placeholder="值类型" prop="dataType"></els-select>
                        <els-select label="数据类型" v-if="currSelectItem.dataTypeName == 'Array' && currSelectItem.controlType"
                            required :data="getDataTypeData(currSelectItem.controlType)"
                            v-model:select-label="currSelectItem.arrayDataTypeName" valueField="value" labelField="label"
                            placeholder="值类型" prop="arrayDataType"></els-select>

                    </els-form>
                </el-tab-pane>
                <el-tab-pane label="组件属性">
                    <ElsDynamicRender v-model="currSelectItem.config.baseConfig"
                        :nodeType="{ dataType: currSelectItem.dataTypeName != 'Array' ? currSelectItem.dataTypeName : currSelectItem.arrayDataTypeName, componentName: currSelectItem.componentName }"
                        :config="currPropertys" inputWidth="100%">
                    </ElsDynamicRender>
                </el-tab-pane>
                <el-tab-pane label="数组属性" v-if="currSelectItem.dataTypeName == 'Array'">
                    <ElsDynamicRender v-model="currSelectItem.config.arrayConfig" :config="property_array"
                        inputWidth="100%">
                    </ElsDynamicRender>
                </el-tab-pane>
                <el-tab-pane label="表单属性" v-if="currSelectItem.dataTypeName != '无'">
                    <ElsDynamicRender v-model="currSelectItem.config.formConfig" :config="property_form" inputWidth="100%">
                    </ElsDynamicRender>
                </el-tab-pane>
                <el-tab-pane label="高级属性">
                    <ElsDynamicRender v-model="currSelectItem.config.advancedConfig" :config="property_advanced"
                        inputWidth="100%">
                    </ElsDynamicRender>
                </el-tab-pane>
            </el-tabs>

        </div>
    </div>
    <els-dialog v-model="viewPriview" width="70%" title="预览效果">
        <el-tabs>
            <el-tab-pane label="预览">
                <ElsDynamicRender v-model="formValue" :config="renderData"></ElsDynamicRender>
            </el-tab-pane>
            <el-tab-pane label="表单属性">
                {{ formValue }}
            </el-tab-pane>
        </el-tabs>
    </els-dialog>
</template>

<style lang="less">
.els-dynamic-view {
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
.el-collapse-item__header{
font-weight:bold;
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

        display: inline-block;
        height: 32px;
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

        .el-icon-remove {
            margin-right: 5px;
        }
    }
}

.els-dynamic-d-v-item.selected {
    >.el-form-item {
        border: 2px solid #409EFF;
    }

    >.els-dynamic-d-v-item-move {
        display: block;
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
</style>