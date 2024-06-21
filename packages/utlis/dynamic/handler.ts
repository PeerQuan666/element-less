import { dynamicComponentTypes, dynamicDataTypes } from './types'
import { DynamicConfig } from '../interfaces'
import { ElMessage } from 'element-plus'
import { lessCom } from '../com'
export class DynamicHandler {
    componentTypes: any = []
    dataTypes: any = []
    appendUrlParams: any = []
    uploadUrl = ''
    resourceCode = ''
    restrictCode = ''
    constructor(dataTypes, componentTypes = [], appendUrlParams: any = [], uploadUrl = '', resourceCode = '', restrictCode = '') {
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
    //兼容版本数据
    compatibleVersion(data){
        const cloneData=lessCom.cloneObj(data)
        cloneData.forEach(ele=>{
            //重命名data节点为children
            if(ele.data&&!ele.children){
                ele.children= this.compatibleVersion(ele.data)
                delete ele.data
            }
        })
        return cloneData
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
                let currArrayType: any = {}
                let currData: any = []
                if (currType?.type === 'Array' && jsonData[key].length) {
                    currArrayType = this.jsonValueType(jsonData[key][0])
                    if (currArrayType?.type === 'Object') {
                        currData.push(...this.jsonToConfig(jsonData[key][0]))
                    }
                } else if (currType.type === 'Object') {
                    currArrayType = this.jsonValueType(jsonData[key])
                    if (currArrayType?.type === 'Object') {
                        currData.push(...this.jsonToConfig(jsonData[key]))
                    }
                }
                let componentName = ''
                if (currType?.type === 'Object' || currArrayType?.type === 'Object') {
                    componentName = ''
                }
                else if (currType?.type === 'Number' || currArrayType?.type === 'Number') {
                    componentName = this.componentTypes.find(ele => ele.type == 'InputNumber').value
                } else if (currType?.type === 'Bool' || currArrayType?.type === 'Bool') {
                    componentName = this.componentTypes.find(ele => ele.type == 'Switch').value
                } else if (currType?.type === 'String' || currArrayType?.type === 'String') {
                    componentName = this.componentTypes.find(ele => ele.type == 'Input').value
                } else {
                    componentName = this.componentTypes.find(ele => ele.dataTypes.includes(currType.value) || ele.dataTypes.includes(currArrayType?.value))?.value
                }
                importData.push({
                    "keyID": "key_" + lessCom.randomNumber().toString(),
                    "keyName": key,
                    "keyCode": key,
                    "children": currData,
                    "dataType": currType?.value,
                    "arrayDataType": currArrayType?.value,
                    "componentType": componentName,
                    "required": false,
                    "description": '',
                    "defaultValue": jsonData[key],
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
        item.componentTypeName = currcomponentType?.type
        item.dataTypeName = currDataType?.type
        item.arrayDataTypeName = currArrayDataType?.type
        item.componentName = currcomponentType?.componentName
        item.formItem = currcomponentType?.formItem
        item.componentGroup = currcomponentType?.group
        if (currDataType?.type === 'Object' || currDataType?.type === 'Array') {
            item.formItem = true
            item.componentGroup = 'Form'
        } else {
            item.componentGroup = currcomponentType?.group
        }

    }
    initConfigType(data) {
   
        data.forEach((ele) => {
            this.initTypeName(ele)
            if (ele.dataTypeName == 'Object' || (ele.dataTypeName == 'Array' && ele.arrayDataTypeName == 'Object') || ele.componentGroup == 'Container') {
                this.initConfigType(ele.children)
            }
            else {
                this.getTemplateDefaultValue(ele)

            }
        })
    }

    initConfig(children) {
        children.forEach((ele) => {
            if (ele.dataTypeName == 'Array' && ele.arrayDataTypeName == 'Object') {
                this.initConfig(ele.children)
            } else if (ele.dataTypeName == 'Object') {
                this.initConfig(ele.children)
            } else if (ele.componentGroup == 'Container') {
                this.initConfig(ele.children)
            }
            if (!ele.keyID) {
                ele.keyID = "key_" + lessCom.randomNumber().toString()
            }
        })
    }
    returnConfig(data) {
        data.forEach((ele) => {
            if (ele.dataTypeName == 'Array' && ele.arrayDataTypeName == 'Object') {
                this.returnArrayConfig(ele)
            } else if (ele.dataTypeName == 'Object') {
                this.returnConfig(ele.children)
            } else if (ele.componentGroup == 'Container') {
                this.returnConfig(ele.children)
            }
            delete ele.componentGroup
            delete ele.dataTypeName
            delete ele.arrayDataTypeName
            delete ele.componentName
            delete ele.componentTypeName
            delete ele.componentShow
            delete ele.componentPreview
            delete ele.restrictChild
            delete ele.restrictParent
            delete ele.formItem
            delete ele.value
        })
    }
    toKeyNameData(config, data) {

        if (config && data) {
            let sourceConfig = config
            if (typeof (config) === 'string') {
                sourceConfig = JSON.parse(config)
            }
            let sourceData = data
            if (typeof (data) === 'string') {
                sourceData = JSON.parse(data)
            }
            const currData: any = {}
            for (const key in sourceData) {
                if (key) {
                    const currConfig = sourceConfig.find(ele => ele.keyCode === key)
                    if (currConfig) {
                        currData[currConfig.keyName] = sourceData[key]
                        if (typeof (sourceData[key]) === 'object' && !Array.isArray(sourceData[key])) {
                            currData[currConfig.keyName] = this.toKeyNameData(currConfig.children, sourceData[key])
                        }
                    } else {
                        currData[key] = sourceData[key]
                    }

                }

            }
            return currData
        }
        return data
    }
    returnArrayConfig(item) {
        delete item.arrayObjData
        delete item.value
        item.children.forEach(ele => {
            if (ele.dataTypeName == 'Array' && ele.arrayDataTypeName == 'Object') {
                this.returnArrayConfig(ele)
            } else if (ele.dataTypeName == 'Object') {
                this.returnConfig(ele.children)
            } else if (ele.componentGroup == 'Container') {
                this.returnConfig(ele.children)
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
            } else if (ele.dataTypeName == 'Object' || (ele.componentGroup === 'Container' && ele.formItem && ele.keyCode)) {
                this.recoverData(ele.children, valueData[ele.keyCode])
            } else if (ele.componentGroup === 'Container') {
                this.recoverData(ele.children, valueData)
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
            item.children.forEach(ele => {
                this.initTypeName(ele)
                var currItem = Object.assign({}, ele)
                this.getDefaultValue(currItem);
                if (ele.dataTypeName == 'Array' && ele.arrayDataTypeName == 'Object') {
                    this.recoverArrayData(currItem)
                } else if (ele.dataTypeName == 'Object' || ele.componentGroup == 'Container') {
                    this.recoverData(currItem.children)
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
            item.children = arrayData
        } else {
            item.value = [];
            let defaultArrayData: any = [];
            if (item.config.arrayConfig.arrayDefaultLength === undefined || item.config.arrayConfig.arrayDefaultLength === '') {
                defaultArrayData.push(lessCom.cloneObj(item["arrayObjData"]))
            } else {
                for (let i = 0; i < item.config.arrayConfig.arrayDefaultLength; i++) {
                    defaultArrayData.push(lessCom.cloneObj(item["arrayObjData"]))
                }
            }
            item.children = defaultArrayData
        }
    }


    configResult(config, showKeyField = 'keyCode') {
        const currConfig = lessCom.cloneObj(config)
        this.initConfigType(currConfig)
        return this.getConfigValue(currConfig, showKeyField)
    }
    getConfigValue(data, showKeyField) {
        let currData = {}
        data.forEach((ele) => {
            if (ele.formItem || ele.componentGroup === 'Form' || ele.dataTypeName == 'Array' || ele.dataType === 'Object') {
                if (ele.dataTypeName == 'Array' && ele.arrayDataTypeName == 'Object') {
                    currData[ele[showKeyField]] = this.getArrayConfigValue(ele, showKeyField)
                }
                else if (ele.dataTypeName === 'Array' && !ele.arrayDataTypeName) {
                    currData[ele[showKeyField]] = [ele.defaultValue]
                }
                else if (ele.dataTypeName == 'Object') {
                    currData[ele[showKeyField]] = this.getConfigValue(ele.children, showKeyField)
                } else if (ele.componentGroup == 'Container') {
                    if (ele[showKeyField]) {
                        currData[ele[showKeyField]] = this.getConfigValue(ele.children, showKeyField)
                    } else {
                        currData = Object.assign(currData, this.getConfigValue(ele.children, showKeyField))
                    }
                }
                else if (ele[showKeyField]) {
                    currData[ele[showKeyField]] = ele.value
                }
            }

        })
        return currData
    }
    getArrayConfigValue(item, showKeyField) {
        let currValue = {}
        item.children.forEach(ele => {
            if (ele.formItem || ele.componentGroup === 'Form' || ele.dataTypeName == 'Array' || ele.dataType === 'Object') {
                if (ele.dataTypeName == 'Array' && ele.arrayDataTypeName == 'Object') {
                    currValue[ele[showKeyField]] = this.getArrayConfigValue(ele, showKeyField)
                } else if (ele.dataTypeName == 'Object') {
                    currValue[ele[showKeyField]] = this.getConfigValue(ele.children, showKeyField)
                } else if (ele.componentGroup == 'Container') {
                    if (ele[showKeyField]) {
                        currValue[ele[showKeyField]] = this.getConfigValue(ele.children, showKeyField)
                    } else {
                        currValue = Object.assign(currValue, this.getConfigValue(ele.children, showKeyField))
                    }
                } else if (ele[showKeyField]) {
                    currValue[ele[showKeyField]] = ele.value
                }
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
                    if (item.defaultValue?.toString().toLowerCase() === 'true') {
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
                    } else {
                        item.value = []
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
                    if (typeof (item.defaultValue) === 'boolean') {
                        item.value = item.defaultValue
                        return
                    }
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
            Object.assign(currData, this.itemValue(ele))

        })
        return currData

    }
    childResult(item) {
        var currItem = {};
        var currData = item.children;
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
            Object.assign(currItem, this.itemValue(ele))

        })
        return currItem;
    }
    childResultList(item) {
        if (!item.children || !item.children.length) {
            if (item.value) {
                return item.value
            }
            return []
        }
        let currList: any = [];
        item.children.forEach(ele => {
            if (Array.isArray(ele)) {
                let currItem = {}
                ele.forEach(cele => {
                    Object.assign(currItem, this.itemValue(cele))
                })
                currList.push(currItem);
            }

        })
        return currList;

    }
    itemValue(item) {
        let currValue = {}
        if (item.formItem || item.componentGroup === 'Form' || item.dataTypeName == 'Array' || item.dataType === 'Object') {
            if (item.dataTypeName == 'Object' && item.keyCode) {
                currValue[item.keyCode] = this.childResult(item)
            }
            else if (item.componentGroup == 'Container') {
                if (item.keyCode) {
                    currValue[item.keyCode] = this.childResult(item)
                } else {
                    Object.assign(currValue, this.childResult(item))
                }
            }
            else if (item.dataTypeName == 'Array' && item.arrayDataTypeName == 'Object' && item.keyCode) {
                currValue[item.keyCode] = this.childResultList(item)
            } else if (item.keyCode) {
                currValue[item.keyCode] = item.value;
            }
        }
        else if (item.componentGroup === 'Container') {
            Object.assign(currValue, this.childResult(item))
        }
        return currValue;
    }

}
