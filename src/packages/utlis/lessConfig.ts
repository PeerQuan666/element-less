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
    { componentName: 'ElsInput', config: {}, label: '输入框', value: 1, dataTypes: ['字符串'], defaultPropertys:{}, propertys: property_input,group:'Form' },
    { componentName: 'ElsTextarea', config: {}, label: '文本域', value: 2, dataTypes: ['字符串'],defaultPropertys:{}, propertys: property_textarea,group:'Form' },
    { componentName: 'ElsInputNumber', config: {}, label: '数字输入框', value: 3, dataTypes: ['数字'], defaultPropertys:{},propertys: property_inputNumber,group:'Form' },
    { componentName: 'ElsSwitch', config: {}, label: '开关', value: 4, dataTypes: ['Bool','字符串', '数字'], defaultPropertys:{},propertys: property_switch ,group:'Form'},
    { componentName: 'ElsCheckbox', config: {}, label: '多选列表', value: 5, dataTypes: ['字符串'], defaultPropertys:{},propertys: property_checkbox,group:'Form' },
    { componentName: 'ElsSelect', config: {}, label: '下拉列表', value: 6, dataTypes: ['字符串', '数字', 'Bool'], defaultPropertys:{},propertys: property_select ,group:'Form'},
    { componentName: 'ElsRadio', config: {}, label: '单选列表', value: 7, dataTypes: ['字符串', '数字', 'Bool'], defaultPropertys:{},propertys: property_radio ,group:'Form'},
    { componentName: 'ElsUpload', config: {}, label: '图片', value: 8, dataTypes: ['字符串'], defaultPropertys:{'type':'Pic'},propertys: property_pic,group:'Form' },
    { componentName: 'ElsUpload', config: {}, label: '图集', value: 9, dataTypes: ['字符串'], defaultPropertys:{'type':'Pic','multiple':true},propertys: property_pic ,group:'Form'},
    { componentName: 'ElsUpload', config: {}, label: '文件', value: 10, dataTypes: ['字符串'],defaultPropertys:{'type':'File'}, propertys: property_file,group:'Form' },
    { componentName: 'ElsDataModal', config: {}, label: '弹窗', value: 11, dataTypes: ['字符串'], defaultPropertys:{},propertys: property_datamodal,group:'Form' },
    { componentName: 'ElsDatePicker', config: {}, label: '日期选择器', value: 12, dataTypes: ['字符串', '数字'], defaultPropertys:{},propertys: property_date ,group:'Form'},
    { componentName: 'ElsTimePicker', config: {}, label: '时间选择器', value: 13, dataTypes: ['字符串', '数字'], defaultPropertys:{},propertys: property_time ,group:'Form'},
    { componentName: 'ElsCaption', config: {}, label: '分隔描述', value: 50, dataTypes: ['无'], defaultPropertys:{},propertys: property_caption ,group:'Desc'},
    { componentName: 'ElsRow', config: {}, label: '栅格', value: 100, dataTypes: ['无'], defaultPropertys:{},propertys: property_row,group:'Container' },

]

