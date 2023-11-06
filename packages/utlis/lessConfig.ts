import { DynamicComponentType, DynamicConfig, DynamicDataType } from './interfaceCom'
import { DynamicComponentGroup } from './enumCom'
import property_input from './dynamicPropertys/input'
import property_switch from './dynamicPropertys/switch'
import property_inputNumber from './dynamicPropertys/inputNumber'
import property_radio from './dynamicPropertys/radio'
import property_checkbox from './dynamicPropertys/checkbox'
import property_select from './dynamicPropertys/select'
import property_pic from './dynamicPropertys/pic'
import property_file from './dynamicPropertys/file'
import property_textarea from './dynamicPropertys/textarea'
import property_datamodal from './dynamicPropertys/datamodal'
import property_date from './dynamicPropertys/date'
import property_time from './dynamicPropertys/time'
import property_caption from './dynamicPropertys/caption'
import property_row from './dynamicPropertys/row'

import lessCom from './lessCom'
import { ElMessage } from 'element-plus'


export const dynamicDataTypes: Array<DynamicDataType> = [
    { label: '无', value: 'None', type: 'None' },
    { label: '字符串', value: 'String', type: 'String' },
    { label: '数字', value: 'Number', type: 'Number' },
    { label: 'Bool', value: 'Bool', type: 'Bool' },
    { label: 'Object', value: 'Object', type: 'Object' },
    { label: 'Array', value: 'Array', type: 'Array' },
]


export const dynamicComponentTypes: Array<DynamicComponentType> = [
    { componentName: 'ElsInput', label: '输入框', value: "Input", type: "Input", dataTypes: ['String'], defaultPropertys: {}, propertys: property_input, group: DynamicComponentGroup.Form },
    { componentName: 'ElsTextarea', label: '文本域', value: 'Textarea', type: "Textarea", dataTypes: ['String'], defaultPropertys: {}, propertys: property_textarea, group: DynamicComponentGroup.Form },
    { componentName: 'ElsInputNumber', label: '数字输入框', value: 'InputNumber', type: "InputNumber", dataTypes: ['Number'], defaultPropertys: {}, propertys: property_inputNumber, group: DynamicComponentGroup.Form },
    { componentName: 'ElsSwitch', label: '开关', value: 'Switch', type: "Switch", dataTypes: ['Bool', 'String', 'Number'], defaultPropertys: {}, propertys: property_switch, group: DynamicComponentGroup.Form },
    { componentName: 'ElsCheckbox', label: '多选列表', value: 'Checkbox', type: "Checkbox", dataTypes: ['String'], defaultPropertys: {}, propertys: property_checkbox, group: DynamicComponentGroup.Form },
    { componentName: 'ElsSelect', label: '下拉列表', value: 'Select', type: "Select", dataTypes: ['String', 'Number', 'Bool'], defaultPropertys: {}, propertys: property_select, group: DynamicComponentGroup.Form },
    { componentName: 'ElsRadio', label: '单选列表', value: 'Radio', type: "Radio", dataTypes: ['String', 'Number', 'Bool'], defaultPropertys: {}, propertys: property_radio, group: DynamicComponentGroup.Form },
    { componentName: 'ElsUpload', label: '图片', value: 'UploadPic', type: "UploadPic", dataTypes: ['String'], defaultPropertys: { 'type': 'Pic' }, propertys: property_pic, group: DynamicComponentGroup.Form },
    { componentName: 'ElsUpload', label: '图集', value: 'UploadMutiPic', type: "UploadMutiPic", dataTypes: ['String'], defaultPropertys: { 'type': 'Pic', 'multiple': true }, propertys: property_pic, group: DynamicComponentGroup.Form },
    { componentName: 'ElsUpload', label: '文件', value: 'UploadFile', type: "UploadFile", dataTypes: ['String'], defaultPropertys: { 'type': 'File' }, propertys: property_file, group: DynamicComponentGroup.Form },
    { componentName: 'ElsDataModal', label: '弹窗', value: 'DataModal', type: "DataModal", dataTypes: ['String'], defaultPropertys: {}, propertys: property_datamodal, group: DynamicComponentGroup.Form },
    { componentName: 'ElsDatePicker', label: '日期选择器', value: 'DatePicker', type: "DatePicker", dataTypes: ['String', 'Number'], defaultPropertys: {}, propertys: property_date, group: DynamicComponentGroup.Form },
    { componentName: 'ElsTimePicker', label: '时间选择器', value: 'TimePicker', type: "TimePicker", dataTypes: ['String', 'Number'], defaultPropertys: {}, propertys: property_time, group: DynamicComponentGroup.Form },
    { componentName: 'ElsCaption', label: '分隔描述', value: 'Caption', type: "Caption", dataTypes: ['None'], defaultPropertys: {}, propertys: property_caption, group: DynamicComponentGroup.Desc },
    { componentName: 'ElsRow', label: '栅格', value: 'Row', type: "Row", dataTypes: ['None'], defaultPropertys: {}, propertys: property_row, group: DynamicComponentGroup.Container },
]

export class DynamicHandler {
    componentTypes: any = []
    dataTypes: any = []
    appendUrlParams: any = []
    uploadUrl = ''
    resourceCode = ''
    restrictCode = ''
    constructor(dataTypes, componentTypes, appendUrlParams: any = [], uploadUrl = '', resourceCode = '', restrictCode = '') {
        if (componentTypes) {
            this.componentTypes = componentTypes

        } else {
            this.componentTypes.push(...dynamicComponentTypes)
        }
        if (dataTypes) {
            this.dataTypes = dataTypes

        } else {
            this.dataTypes.push(...dynamicDataTypes)
        }
        this.appendUrlParams = appendUrlParams
        this.uploadUrl = uploadUrl
        this.resourceCode = resourceCode
        this.restrictCode = restrictCode
    }
    jsonValueType(val) {
        let currType: any = typeof (val)
        if (Array.isArray(val)) {
            currType = 'array'
        }
        if (currType === 'object') {
            const currDataType = this.dataTypes.find(ele => lessCom.isSameObject(val, ele.defaultValue))
            if (currDataType) { return currDataType }
        }
        const currDataType = this.dataTypes.find(ele => lessCom.isSameObject(val, ele.defaultValue) || ele.type.toLowerCase() === currType || (ele.type === 'Bool' && currType === 'boolean'))
        return currDataType
    }
    jsonToConfig(jsonData) {
        if (JSON.stringify(jsonData) === "{}") {
            return []
        }
        if (Array.isArray(jsonData)) {
            ElMessage.warning('不支持数组类型')
            return []
        }
        const importData: Array<DynamicConfig> = []
        for (let key in jsonData) {
            if (key) {
                const currType = this.jsonValueType(jsonData[key])
                let currArrayType:any = {}
                let currData: any = []
                if (currType?.type === 'Array' && jsonData[key].length) {
                     currArrayType = this.jsonValueType(jsonData[key][0])
                    if (currArrayType?.type === 'Object') {
                        currData.push(...this.jsonToConfig(jsonData[key][0]))
                    }
                }else if(currType.type==='Object'){
                    currArrayType = this.jsonValueType(jsonData[key])
                    if (currArrayType?.type === 'Object') {
                        currData.push(...this.jsonToConfig(jsonData[key]))
                    }
                }
                let componentName = ''
                if(currType?.type === 'Object' || currArrayType?.type === 'Object'){
                    componentName=''
                }
                else if (currType?.type === 'Number' || currArrayType?.type === 'Number') {
                    componentName = this.componentTypes.find(ele => ele.type == 'InputNumber').value
                } else if (currType?.type === 'Bool' || currArrayType?.type === 'Bool') {
                    componentName = this.componentTypes.find(ele => ele.type == 'Switch').value
                } else if (currType?.type === 'String' || currArrayType?.type === 'String') {
                    componentName = this.componentTypes.find(ele => ele.type == 'Input').value
                } else {
                    componentName = this.componentTypes.find(ele => ele.dataTypes.includes(currType.value)||ele.dataTypes.includes(currArrayType?.value))?.value
                }
                importData.push({
                    "keyID": "key_" + lessCom.randomNumber().toString(),
                    "keyName": key,
                    "keyCode": key,
                    "data": currData,
                    "dataType": currType?.value,
                    "arrayDataType": currArrayType?.value,
                    "componentType": componentName,
                    "required": false,
                    "description": '',
                    "defaultValue":jsonData[key],
                    "config": {
                        "formConfig": {},
                        "baseConfig": {},
                        "advancedConfig": {},
                        "arrayConfig": {}
                    }
                })
            }

        }
        return importData
    }
    initTypeName(item) {
        const currDataType = this.dataTypes.find(d => d.value === item.dataType || d.type === item.dataType)
        const currArrayDataType = this.dataTypes.find(d => d.value === item.arrayDataType || d.type === item.arrayDataType)
        const currcomponentType = this.componentTypes.find(d => d.value === item.componentType || d.type === item.componentType)
        if (currDataType?.type === 'Object' || currDataType?.type === 'Array') {
            item.componentGroup = 'Form'
        } else {
            item.componentGroup = currcomponentType?.group
        }
        item.componentTypeName = currcomponentType?.type
        item.dataTypeName = currDataType?.type
        item.arrayDataTypeName = currArrayDataType?.type
        item.componentName = currcomponentType?.componentName
    }
    initConfigType(data) {
        data.forEach((ele) => {
            this.initTypeName(ele)
            if (ele.dataTypeName == 'Object' || (ele.dataTypeName == 'Array' && ele.arrayDataTypeName == 'Object')) {
                this.initConfigType(ele.data)
            } else if (ele.dataTypeName == 'None' && ele.componentTypeName == 'Row') {
                this.initConfigType(ele.data)
            } 
            else {
                this.getTemplateDefaultValue(ele)

            }
        })
    }
    initConfig(data){
        data.forEach((ele) => {
            if (ele.dataTypeName == 'Array' && ele.arrayDataTypeName == 'Object') {
                this.initConfig(ele.data)
            } else if (ele.dataTypeName == 'Object') {
                this.initConfig(ele.data)
            } else if (ele.dataTypeName == 'None' && ele.componentName == 'ElsRow') {
                this.initConfig(ele.data)
            }
            if(!ele.keyID){
                ele.keyID="key_" + lessCom.randomNumber().toString()
            }
        })
    }
    returnConfig(data) {
        data.forEach((ele) => {
            if (ele.dataTypeName == 'Array' && ele.arrayDataTypeName == 'Object') {
                this.returnArrayConfig(ele)
            } else if (ele.dataTypeName == 'Object') {
                this.returnConfig(ele.data)
            } else if (ele.dataTypeName == 'None' && ele.componentName == 'ElsRow') {
                this.returnConfig(ele.data)
            }
            delete ele.componentGroup
            delete ele.dataTypeName
            delete ele.arrayDataTypeName
            delete ele.componentName
            delete ele.componentTypeName
            delete ele.value
        })
    }
    returnArrayConfig(item) {
        delete item.arrayObjData
        delete item.value
        item.data.forEach(ele => {
            if (ele.dataTypeName == 'Array' && ele.arrayDataTypeName == 'Object') {
                this.returnArrayConfig(ele)
            } else if (ele.dataTypeName == 'Object') {
                this.returnConfig(ele.data)
            } else if (ele.dataTypeName == 'None' && ele.componentName == 'ElsRow') {
                this.returnConfig(ele.data)
            }
        })

    }
    recoverData(data, valueData: any = null) {
        if (!valueData) {
            valueData = {}
        }
        data.forEach((ele) => {
            if (ele.keyCode) {
                const currVal = valueData[ele.keyCode]
                if (currVal === undefined) {
                    this.getDefaultValue(ele)

                } else {
                    ele.value = currVal
                }
            } else {
                this.getDefaultValue(ele)
            }

            this.initTypeName(ele)

            if (ele.dataTypeName == 'Array' && ele.arrayDataTypeName == 'Object' && !ele.componentTypeName) {
                this.recoverArrayData(ele, valueData[ele.keyCode])
            } else if (ele.dataTypeName == 'Object') {
                this.recoverData(ele.data, valueData[ele.keyCode])
            } else if (ele.dataTypeName == 'None' && ele.componentTypeName == 'Row') {
                this.recoverData(ele.data, valueData)
            }
            if (this.appendUrlParams && ['Checkbox', 'Select', 'Radio', 'Upload', 'DataModal'].includes(ele.componentTypeName ?? '') && ele.config.baseConfig && (ele.config.baseConfig.url || ele.config.baseConfig.modalUrl)) {
                this.appendCommonParams(ele)
                if (ele.componentTypeName === 'Upload') {
                    this.appendUploadParams(ele)
                }

            }

        })
    }
    appendUploadParams(item) {
        let currUrl = this.uploadUrl
        if (item.config.baseConfig.url) {
            currUrl = item.config.baseConfig.url
        }
        let uploadParms = `&ResourcePicLimitType=${(item.config.baseConfig.picLimitType ?? '')}&ResourcePicWidth=${(item.config.baseConfig.picWidthLimit ?? 0)}&ResourcePicHeight=${(item.config.baseConfig.picHeightLimit ?? 0)}&HasMd5Parameter=${(item.config.baseConfig.hasMd5Parameter ? 1 : 0)}`
        if (!item.config.baseConfig.resourceCode) {
            item.config.baseConfig.resourceCode = this.resourceCode
        }
        if (!item.config.baseConfig.restrictCode) {
            item.config.baseConfig.restrictCode = this.restrictCode
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

    appendCommonParams(item) {
        if (!this.appendUrlParams) {
            return
        }
        let currAppendQuery = this.appendUrlParams.find(ele => ele.Key == item.keyCode);
        if (!currAppendQuery) {
            currAppendQuery = this.appendUrlParams.find(ele => ele.Key === '');
        }
        let currUrl = item.config.baseConfig.url
        if (currAppendQuery) {
            if (currUrl.indexOf('?') > -1) {
                currUrl += "&"
            } else {
                currUrl += "?"
            }
            currUrl += currAppendQuery.Value
        }
        item.config.baseConfig.url = currUrl

    }
    recoverArrayData(item, valueData: any = null) {

        if (!item["arrayObjData"]) {
            let currData: any = [];
            item.data.forEach(ele => {
                this.initTypeName(ele)
                var currItem = Object.assign({}, ele)
                this.getDefaultValue(currItem);


                if (ele.dataTypeName == 'Array' && ele.arrayDataTypeName == 'Object') {
                    this.recoverArrayData(currItem)
                } else if (ele.dataTypeName == 'Object' || ele.componentTypeName == 'Row') {
                    this.recoverData(currItem.data)
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
                this.recoverData(itemData, ele)
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
    configResult(config) {
        const currConfig = lessCom.cloneObj(config)
        this.initConfigType(currConfig)
        return this.getConfigValue(currConfig)
    }
    getConfigValue(data) {
        let currData = {}
        data.forEach((ele) => {
            if (ele.dataTypeName == 'Array' && ele.arrayDataTypeName == 'Object') {
                currData[ele.keyCode] = this.getArrayConfigValue(ele)
            }
            else if(ele.dataTypeName==='Array'&&!ele.arrayDataTypeName){
                currData[ele.keyCode] = [ele.defaultValue]
            }
            else if (ele.dataTypeName == 'Object') {
                currData[ele.keyCode] = this.getConfigValue(ele.data)
            } else if (ele.dataTypeName == 'None' && ele.componentName == 'ElsRow') {
                currData = Object.assign(currData, this.getConfigValue(ele.data))
            }
            else if (ele.keyCode) {
                currData[ele.keyCode] = ele.value
            }
        })
        return currData
    }
    getArrayConfigValue(item) {
        let currValue = {}
        item.data.forEach(ele => {
            if (ele.dataTypeName == 'Array' && ele.arrayDataTypeName == 'Object') {
                currValue[ele.keyCode] = this.getArrayConfigValue(ele)
            } else if (ele.dataTypeName == 'Object') {
                currValue[ele.keyCode] = this.getArrayConfigValue(ele.data)
            } else if (ele.dataTypeName == 'None' && ele.componentName == 'ElsRow') {
                currValue = Object.assign(currValue, this.getArrayConfigValue(ele.data))
            } else if (ele.keyCode) {
                currValue[ele.keyCode] = ele.value
            }
        })
        return [currValue]
    }
    getTemplateDefaultValue(item) {
        const currDataType = this.dataTypes.find(ele => ele.value === item.dataType || ele.type === item.dataType)

        if (currDataType) {
            switch (currDataType.type) {
                case 'Number':
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
                case 'Object':
                    item.value = {}
                    break
                case 'Enum':
                case 'String':
                    if (item.defaultValue) {
                        item.value = item.defaultValue;
                    } else {
                        item.value = ''
                    }
                    break
                case 'Array':
                    const currArrayDataType = this.dataTypes.find(ele => ele.value === item.arrayDataType || ele.type === item.arrayDataType)
                    if (item.defaultValue) {
                        item.value = JSON.parse(item.defaultValue)
                    } else if (currArrayDataType.defaultValue) {
                        item.value = [currArrayDataType.defaultValue]
                    }else{
                        item.value=[]
                    }
                default:
                    try {
                        if (item.defaultValue) {
                            item.value = JSON.parse(item.defaultValue)
                        } else if (currDataType.defaultValue) {
                            item.value = currDataType.defaultValue
                        }
                    } catch (err) {
                        console.error(err)
                    }
            }
        }
    }
    getDefaultValue(item) {
        const currDataType = this.dataTypes.find(ele => ele.value === item.dataType || ele.type === item.dataType)

        if (currDataType) {
            switch (currDataType.type) {
                case 'Number':
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
                case 'Object':
                    item.value = {}
                    break
                case 'Enum':
                case 'String':
                    if (item.defaultValue) {
                        item.value = item.defaultValue;
                    } else {
                        item.value = ''
                    }
                    break
                default:
                    try {
                        if (item.defaultValue) {
                            item.value = JSON.parse(item.defaultValue)
                        } else if (currDataType.defaultValue) {
                            item.value = currDataType.defaultValue
                        }
                    } catch (err) {
                        console.error(err)
                    }
            }
        }
    }
    result(renderData) {
        var currData = {};
        renderData.forEach(ele => {
            if (ele.componentGroup !== 'Desc') {
                if (ele.dataTypeName == 'Object' && ele.keyCode) {
                    currData[ele.keyCode] = this.childResult(ele)
                }
                else if (ele.dataTypeName == 'None' && ele.componentTypeName == 'Row') {
                    Object.assign(currData, this.childResult(ele))
                }
                else if (ele.dataTypeName == 'Array' && ele.arrayDataTypeName == 'Object' && ele.keyCode) {
                    currData[ele.keyCode] = this.childResultList(ele)
                } else if (ele.keyCode) {
                    currData[ele.keyCode] = ele.value
                }
            }

        })

        return currData

    }
    childResult(item) {
        var currItem = {};
        var currData = item.data;
        if (currData === "" || !Array.isArray(currData)) {
            return "";
        }
        if (!currData || !currData.length) {
            if (item.value) {
                return item.value
            }
            return {}
        }

        currData.forEach(ele => {
            if (ele.componentTypeName !== 'Caption') {
                if (ele.dataTypeName == 'Object' && ele.keyCode) {
                    currItem[ele.keyCode] = this.childResult(ele)
                }
                else if (ele.dataTypeName == 'None' && ele.componentTypeName == 'Row') {
                    Object.assign(currItem, this.childResult(ele))
                }
                else if (ele.dataTypeName == 'Array' && ele.arrayDataTypeName == 'Object' && ele.keyCode) {
                    currItem[ele.keyCode] = this.childResultList(ele)
                } else if (ele.keyCode) {
                    currItem[ele.keyCode] = ele.value;
                }
            }
        })
        return currItem;
    }
    childResultList(item) {
        if (!item.data || !item.data.length) {
            if (item.value) {
                return item.value
            }
            return []
        }
        let currList: any = [];
        item.data.forEach(ele => {
            if (Array.isArray(ele)) {
                let currData = {}
                ele.forEach(cele => {
                    if (cele.dataTypeName === 'Array') {
                        currData[cele.keyCode] = this.childResultList(cele)
                    } else if (cele.dataTypeName === 'Object') {
                        currData[cele.keyCode] = this.childResult(cele);
                    } else {
                        currData[cele.keyCode] = cele.value
                    }

                })
                currList.push(currData);
            }

        })
        return currList;

    }

}
