import property_input from './dynamicPropertys/input'
import property_switch from './dynamicPropertys/switch'
import property_inputNumber from './dynamicPropertys/inputNumber'
import property_radio from './dynamicPropertys/radio'

export const dynamicDataType = [
    { label: '无', value: 0 },
    { label: '字符串', value: 1 },
    { label: '数字', value: 2 },
    { label: 'Bool', value: 3 },
    { label: 'Object', value: 4 },
    { label: 'Array', value: 5 },
]

export const dynamicArrayDataType = [
    { label: '字符串', value: 1 },
    { label: '数字', value: 2 },
    { label: 'Bool', value: 3 },
    { label: 'Object', value: 4 },
]

export const dynamicControlType = [
    { componentName: 'ElsInput', config: {}, label: '输入框', value: 1, dataTypes: ['字符串'], propertys: property_input },
    { componentName: 'ElsTextarea', config: {}, label: '文本域', value: 2, dataTypes: ['字符串'], propertys: [] },
    { componentName: 'ElsInputNumber', config: {}, label: '数字输入框', value: 3, dataTypes: ['数字'], propertys: property_inputNumber },
    { componentName: 'ElsSwitch', config: {}, label: '开关', value: 4, dataTypes: ['字符串', '数字', 'Bool'], propertys: property_switch },
    { componentName: 'ElsCheckbox', config: {}, label: '多选列表', value: 5, dataTypes: ['字符串', '数字', 'Bool'], propertys: [] },
    { componentName: 'ElsSelect', config: {}, label: '下拉列表', value: 6, dataTypes: ['字符串', '数字', 'Bool'], propertys: [] },
    { componentName: 'ElsRadio', config: {}, label: '单选列表', value: 7, dataTypes: ['字符串', '数字', 'Bool'], propertys: property_radio },
    { componentName: 'ElsUpload', config: {}, label: '图片', value: 8, dataTypes: ['字符串'], propertys: [] },
    { componentName: 'ElsUpload', config: {}, label: '图集', value: 9, dataTypes: ['字符串'], propertys: [] },
    { componentName: 'ElsUpload', config: {}, label: '文件', value: 10, dataTypes: ['字符串'], propertys: [] },
    { componentName: 'ElsTextarea', config: {}, label: '文本域', value: 11, dataTypes: ['字符串'], propertys: [] },
    { componentName: 'ElsDataModal', config: {}, label: '弹窗', value: 12, dataTypes: ['字符串'], propertys: [] },
    { componentName: 'ElsDatePick', config: {}, label: '日期选择器', value: 13, dataTypes: ['字符串', '数字'], propertys: [] },
    { componentName: 'ElsTimePick', config: {}, label: '时间选择器', value: 14, dataTypes: ['字符串', '数字'], propertys: [] },
    { componentName: 'ElsCaption', config: {}, label: '分隔描述', value: 50, dataTypes: ['无'], propertys: [] },
    { componentName: 'ElsRow', config: {}, label: '栅格', value: 100, dataTypes: ['无'], propertys: [] },

]

