<script setup lang="ts">
import { provide, watch, ref, reactive } from 'vue'
import { dynamicDataType, dynamicControlType } from '../../utlis/lessConfig.js'
import DynamicRenderInner from './DynamicRenderInner.vue'

import '../../utlis/lessPrototype.js'
import lessCom from '../../utlis/lessCom'
defineOptions({
    name: 'ElsDynamicRender',
})
interface Props {
    modelValue?: string | Record<string, any>,
    config?: string | Record<string, any>,
    showConfig?: string | Record<string, any>,
    uploadUrl?: string,
    resourceCode?: string,
    restrictCode?: string,
    appendUrlParams?: Array<Record<string, any>>,
    inputWidth?:string,
    nodeType?:any
}
const props = withDefaults(defineProps<Props>(), {

})
provide('inputWidth', props.inputWidth)
const emits = defineEmits(['update:modelValue'])
provide("tagID", 'els-dynamic-render-' + lessCom.Guid32())
provide("getUploadUrl", getUploadUrl)

const renderData: Array<Record<string, any>> = reactive([])
const valueData: Record<string, any> = ref({})

const provideData=ref({nodeType:props.nodeType})
watch(()=>props.nodeType,(val,old)=>{
    if(val!=old){
        provideData.value.nodeType=val
    }
})
provide('dyProvideData',provideData)

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
        currData =lessCom.cloneObj(props.config) 
    }
    initShowConfig(currData, props.showConfig);
    recoverData(currData, valueData.value);
    renderData.length = 0;
    renderData.push(...currData.filter(ele => ele.isShow == 1));
}
function getUploadUrl(url, item) {
    let currUrl = url
    if (!currUrl) {
        currUrl = props.uploadUrl
    }
    let uploadParms = `&ResourcePicLimitType=${(item.config.baseConfig.picLimitType ?? '')}&ResourcePicWidth=${(item.config.baseConfig.picWidthLimit ?? 0)}&ResourcePicHeight=${(item.config.baseConfig.picHeightLimit ?? 0)}&HasMd5Parameter=${(item.config.baseConfig.hasMd5Parameter ? 1 : 0)}`
    if (!item.config.baseConfig.resourceCode) {
        item.config.baseConfig.resourceCode = props.resourceCode
    }
    if (!item.config.baseConfig.restrictCode) {
        item.config.baseConfig.restrictCode = props.restrictCode
    }
    if (item.config.baseConfig.resourceCode) {
        currUrl = currUrl.addUrlParameter('ResourceCode', item.config.baseConfig.resourceCode)
    }
    if (item.config.baseConfig.restrictCode) {
        currUrl = currUrl.addUrlParameter('RestrictCode', item.config.baseConfig.restrictCode)
    }
    let uploadUrl = currUrl + uploadParms;
    return uploadUrl;
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
                }else{
                    item.value = ''
                }
        }
    }

}
function handleAppendQuery(item) {
    if (!props.appendUrlParams) {
        return
    }
    let currAppendQuery = props.appendUrlParams.find(ele => ele.Key == item.keyCode);
    if (!currAppendQuery) {
        currAppendQuery = props.appendUrlParams.find(ele => ele.Key === '');
    }
    let currUrl = item.config.baseConfig.url
    if (item.config.baseConfig.modalUrl) {
        currUrl = item.config.baseConfig.modalUrl
    }
    if (currAppendQuery) {
        if (currUrl.indexOf('?') > -1) {
            currUrl += "&"
        } else {
            currUrl += "?"
        }
        currUrl += currAppendQuery.Value
    }
    if (item.config.baseConfig.modalUrl) {
        item.config.baseConfig.modalUrl = currUrl;
    } else {
        item.config.baseConfig.url = currUrl
    }

}

function recoverData(data, valueData: any = null) {
    if (!valueData) {
        valueData = {}
    }
    data.forEach((ele) => {
        if(ele.keyCode){
            const currVal=valueData[ele.keyCode]
            if (currVal===undefined) {
                getDefaultValue(ele)

            } else {
                ele.value = currVal
            }
        }else{
            getDefaultValue(ele)
        }
        const currDataType = dynamicDataType.find(d => d.value == ele.dataType)
        const currArrayDataType = dynamicDataType.find(d => d.value == ele.arrayDataType)
        const currControlType = dynamicControlType.find(d => d.value == ele.controlType)
        ele.componentGroup=currControlType?.group
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
        if (props.appendUrlParams && ['ElsCheckbox', 'ElsSelect', 'ElsRadio', 'ElsUpload', 'ElsDataModal'].includes(currControlType?.componentName ?? '') && ele.config.baseConfig && (ele.config.baseConfig.url || ele.config.baseConfig.modalUrl)) {
            handleAppendQuery(ele)
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
            ele.componentGroup=currControlType?.group
            var currItem = Object.assign({}, ele)
            getDefaultValue(currItem);


            if (currDataType?.label == 'Array' && currArrayDataType?.label == 'Object') {
                recoverArrayData(currItem)
            } else if (currDataType?.label == 'Object'||currControlType?.componentName == 'ElsRow') {
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
        var currData = {};
        renderData.forEach(ele => {
            if (ele.componentName !== 'ElsCaption') {
                if (ele.dataTypeName == 'Object'&&ele.keyCode) {
                    currData[ele.keyCode] = childResult(ele)
                }
                else if (ele.dataTypeName == '无' && ele.componentName == 'ElsRow') {
                    Object.assign(currData, childResult(ele))
                }
                else if (ele.dataTypeName == 'Array' && ele.arrayDataTypeName == 'Object'&&ele.keyCode) {
                    currData[ele.keyCode] = childResultList(ele)
                } else if(ele.keyCode){
                    currData[ele.keyCode] = ele.value;
                }
            }

        })
        if (typeof (props.modelValue) == 'object') {
            emits('update:modelValue', currData)
            return
        }
        emits('update:modelValue', JSON.stringify(currData))
    }
}
function childResult(item) {
    var currItem = {};
    var currData = item.data;
    if (currData === "" || !Array.isArray(currData)) {
        return "";
    }
    if (!currData) { currData = item; }
    currData.forEach(ele => {
        if (ele.componentName !== 'ElsCaption') {
            if (ele.dataTypeName == 'Object'&&ele.keyCode) {
                currItem[ele.keyCode] = childResult(ele)
            }
            else if (ele.dataTypeName == '无' && ele.componentName == 'ElsRow') {
                Object.assign(currItem, childResult(ele))
            }
            else if (ele.dataTypeName == 'Array' && ele.arrayDataTypeName == 'Object'&&ele.keyCode) {
                currItem[ele.keyCode] = childResultList(ele)
            } else if(ele.keyCode){
                currItem[ele.keyCode] = ele.value;
            }
        }
    })
    return currItem;
}
function childResultList(item) {
    if (item.dataTypeName == 'Array' && item.arrayDataTypeName == 'Object') {
        let currList: any = [];
        item.data.forEach(ele => {
            if (Array.isArray(ele)) {
                let currData = {}
                ele.forEach(cele => {
                    if (cele.dataTypeName == '无' && cele.componentName == 'ElsRow') {
                        Object.assign(currData, childResult(cele))
                    } else {
                        var currItemData = childResultList(cele);
                        if (!Array.isArray(currItemData)) {
                            currData[cele.keyCode] = currItemData[cele.keyCode]
                        } else {
                            currData[cele.keyCode] = currItemData
                        }
                    }

                })
                currList.push(currData);
            }

        })
        return currList;
    } else if (item.dataTypeName == 'Object') {
        let currData = {};
        currData[item.keyCode] = childResult(item);
        return currData;

    } else {
        let currData = {};
        currData[item.keyCode] = item.value
        return currData;
    }
}

</script>
<template>
    <DynamicRenderInner :data="renderData"></DynamicRenderInner>
</template>
<style lang="less">
.el-row:has(div[class^=el-form-item]){
    margin-bottom: 0px;
}
.leo-dynamic-r-item-child {
    .el-form-item__content {
        .el-form {
            flex-grow: 1;
            .el-row:last-child{
                margin-bottom: 0px;
            }
        }
        .els_upload_container{
            flex-grow: 1;
        }
    }
    .el-form-item:has(form){
        .el-form-item {
            margin-bottom: 18px;
        }
    }

}
.els-dynamic-obj{
    .el-form-item{
        margin-bottom: 18px !important;
    }
    .el-form-item .el-form-item{
        margin-bottom: 0px !important;
    }
}
.els-dynamic-r-array{
    border: 1px solid #dcdfe6;
    padding: 5px 60px 5px 5px;
    position:relative;
    >.els-list-operate{
    position: absolute;
    right: 0;
    top: 0;
    background: #e5efff;
    margin-left: 0px !important;
}
}
.els-dynamic-r-array-container{
    overflow: scroll;
    flex-grow:1;
}

.els-dynamic-r-item,.els-dynamic-r-array{
    .el-form-item__content>.els-caption{
        margin-bottom: 0px;
    }
    .els-caption{
        flex-grow: 1;
    }
    .listitem {
        .els-list-operate{margin-bottom: 0;}
        .leo-dynamic-r-item-child {display: flex;gap: 5px;}
        form{
            .leo-dynamic-r-item-child {
                display:inherit
            }
            flex-grow:1;
        }
        .els-dynamic-r-item{
            display: flex;
        }
    }

}
.els-list>div>div:has(>div[class*=els-dynamic-r-array])
{ margin-bottom:10px}

::-webkit-scrollbar-track-piece{
    background: none;
}

</style>