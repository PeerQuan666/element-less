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
    { label: '无', value: 'None', type: 'None'},
    { label: '字符串', value: 'String', type: 'String'},
    { label: '数字', value: 'Number', type: 'Number' },
    { label: 'Bool', value: 'Bool', type: 'Bool' },
    { label: 'Object', value: 'Object', type: 'Object' },
    { label: 'Array', value: 'Array', type: 'Array' },
]


export const dynamicComponentType = [
    { componentName: 'ElsInput', config: {}, label: '输入框', value: "Input", type: "Input", dataTypes: ['String'], defaultPropertys: {}, propertys: property_input, group: 'Form' },
    { componentName: 'ElsTextarea', config: {}, label: '文本域', value: 'Textarea', type: "Textarea", dataTypes: ['String'], defaultPropertys: {}, propertys: property_textarea, group: 'Form' },
    { componentName: 'ElsInputNumber', config: {}, label: '数字输入框', value: 'InputNumber', type: "InputNumber", dataTypes: ['Number'], defaultPropertys: {}, propertys: property_inputNumber, group: 'Form' },
    { componentName: 'ElsSwitch', config: {}, label: '开关', value: 'Switch', type: "Switch", dataTypes: ['Bool', 'String', 'Number'], defaultPropertys: {}, propertys: property_switch, group: 'Form' },
    { componentName: 'ElsCheckbox', config: {}, label: '多选列表', value: 'Checkbox', type: "Checkbox", dataTypes: ['String'], defaultPropertys: {}, propertys: property_checkbox, group: 'Form' },
    { componentName: 'ElsSelect', config: {}, label: '下拉列表', value: 'Select',type: "Select",  dataTypes: ['String', 'Number', 'Bool'], defaultPropertys: {}, propertys: property_select, group: 'Form' },
    { componentName: 'ElsRadio', config: {}, label: '单选列表', value: 'Radio', type: "Radio", dataTypes: ['String', 'Number', 'Bool'], defaultPropertys: {}, propertys: property_radio, group: 'Form' },
    { componentName: 'ElsUpload', config: {}, label: '图片', value: 'UploadPic',type: "UploadPic",  dataTypes: ['String'], defaultPropertys: { 'type': 'Pic' }, propertys: property_pic, group: 'Form' },
    { componentName: 'ElsUpload', config: {}, label: '图集', value: 'UploadMutiPic', type: "UploadMutiPic", dataTypes: ['String'], defaultPropertys: { 'type': 'Pic', 'multiple': true }, propertys: property_pic, group: 'Form' },
    { componentName: 'ElsUpload', config: {}, label: '文件', value: 'UploadFile', type: "UploadFile", dataTypes: ['String'], defaultPropertys: { 'type': 'File' }, propertys: property_file, group: 'Form' },
    { componentName: 'ElsDataModal', config: {}, label: '弹窗', value: 'DataModal', type: "DataModal", dataTypes: ['String'], defaultPropertys: {}, propertys: property_datamodal, group: 'Form' },
    { componentName: 'ElsDatePicker', config: {}, label: '日期选择器', value: 'DatePicker', type: "DatePicker", dataTypes: ['String', 'Number'], defaultPropertys: {}, propertys: property_date, group: 'Form' },
    { componentName: 'ElsTimePicker', config: {}, label: '时间选择器', value: 'TimePicker', type: "TimePicker", dataTypes: ['String', 'Number'], defaultPropertys: {}, propertys: property_time, group: 'Form' },
    { componentName: 'ElsCaption', config: {}, label: '分隔描述', value: 'Caption', type: "Caption", dataTypes: ['无'], defaultPropertys: {}, propertys: property_caption, group: 'Desc' },
    { componentName: 'ElsRow', config: {}, label: '栅格', value: 'Row',type: "Row",  dataTypes: ['无'], defaultPropertys: {}, propertys: property_row, group: 'Container' },

]

