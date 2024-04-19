import {
    property_input,
    property_switch,
    property_inputNumber,
    property_radio,
    property_checkbox,
    property_select,
    property_pic,
    property_file,
    property_textarea,
    property_datamodal,
    property_date,
    property_time,
    property_caption,
    property_row
} from '../propertys'
import { DynamicComponentType} from '../../interfaces'
import { DynamicComponentGroup } from '../../enums'
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
