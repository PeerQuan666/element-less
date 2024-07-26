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
    property_row,
    property_col,
    property_tabs,
    property_tabPane,
    property_tip,
    property_form,
    property_card,
    property_slider,
    property_aceEditor,
    property_wangEditor,
    property_tree,
    property_collapse,
    property_collapseItem,
    property_formItemCom,
    property_colorPicker,
    property_alert,
    property_button,
    property_jsonEditor,
    property_table,
    property_dialog,
    property_drawer
} from '../propertys'
import { DynamicComponentType } from '../interfaces'
export const dynamicComponentTypes: Array<DynamicComponentType> = [
    {
        componentName: 'ElsInput',
        icon: 'text',
        label: '输入框',
        value: "Input",
        type: "Input",
        operateType: 'input',
        dataTypes: ['String'],
        defaultPropertys: {},
        propertys: property_input,
        group: 'Form',
        formItem: true,
        isShow: true
    },
    {
        componentName: 'ElsTextarea',
        icon: 'expand-text-input',
        label: '文本域',
        value: 'Textarea',
        type: "Textarea",
        operateType: 'input',
        dataTypes: ['String'],
        defaultPropertys: {},
        propertys:property_textarea,
        group: 'Form',
        formItem: true,
        isShow: true
    },
    {
        componentName: 'ElsInputNumber',
        icon: 'list-numbers',
        label: '数字输入框',
        value: 'InputNumber',
        type: "InputNumber",
        operateType: 'input',
        dataTypes: ['Number'],
        defaultPropertys: {},
        propertys: property_inputNumber,
        group: 'Form',
        formItem: true,
        isShow: true
    },
    {
        componentName: 'ElsSlider',
        icon: 'hand-drag',
        label: 'Slider滑块',
        value: 'Slider',
        type: "Slider",
        dataTypes: ['Number'],
        defaultPropertys: {},
        propertys: property_slider,
        group: 'Form',
        formItem: true,
        isShow: true
    },
    {
        componentName: 'ElsSwitch',
        icon: 'switch-one',
        label: '开关',
        value: 'Switch',
        type: "Switch",
        dataTypes: ['Bool','String','Number'],
        defaultPropertys: {},
        propertys: property_switch,
        group: 'Form',
        formItem: true,
        isShow: true
    },
    {
        componentName: 'ElsCheckbox',
        icon: 'list-checkbox',
        label: '多选列表',
        value: 'Checkbox',
        type: "Checkbox",
        dataTypes: ['String'],
        defaultPropertys: {},
        propertys: property_checkbox,
        group: 'Form',
        formItem: true,
        isShow: true
    },
    {
        componentName: 'ElsSelect',
        icon: 'full-selection',
        label: '下拉列表',
        value: 'Select',
        type: "Select",
        operateType: 'picker',
        dataTypes: ['String','Number','Bool'],
        defaultPropertys: {},
        propertys: property_select,
        group: 'Form',
        formItem: true,
        isShow: true
    },
    {
        componentName: 'ElsRadio',
        icon: 'radio-two',
        label: '单选列表',
        value: 'Radio',
        type: "Radio",
        dataTypes: ['String','Number','Bool'],
        defaultPropertys: {},
        propertys: property_radio,
        group: 'Form',
        formItem: true,
        isShow: true
    },
    {
        componentName: 'ElsUpload',
        icon: 'add-picture',
        label: '图片',
        value: 'UploadPic',
        type: "UploadPic",
        dataTypes: ['String'],
        defaultPropertys: { 'type': 'Pic' },
        propertys: property_pic,
        group: 'Form',
        formItem: true,
        isShow: true
    },
    {
        componentName: 'ElsUpload',
        icon: 'picture-album',
        label: '图集',
        value: 'UploadMutiPic',
        type: "UploadMutiPic",
        dataTypes: ['String'],
        defaultPropertys: {'type': 'Pic','multiple': true},
        propertys: property_pic,
        group: 'Form',
        formItem: true,
        isShow: true
    },
    {
        componentName: 'ElsUpload',
        icon: 'upload',
        label: '文件',
        value: 'UploadFile',
        type: "UploadFile",
        dataTypes: ['String'],
        defaultPropertys: { 'type': 'File' },
        propertys: property_file,
        group: 'Form',
        formItem: true,
        isShow: true
    },
    {
        componentName: 'ElsDataModal',
        icon: 'share',
        label: '弹窗选择',
        value: 'DataModal',
        type: "DataModal",
        operateType:'button',
        dataTypes: ['String','Object'],
        defaultPropertys: {
            'functionopen':`
                if(dataType==='String'&&typeof(currValue.value)==='string'){
                    if(slotRootHasDefault){
                        slotValue["default"]={default:JSON.parse(currValue.value)};
                    }else{
                         slotValue["default"]=JSON.parse(currValue.value)
                    }
                    return
                }
                const cloneObjValue=utils.cloneObj(currValue.value)
                if(slotRootHasDefault){
                    slotValue["default"]["default"]=cloneObjValue
                }else{
                    slotValue["default"]= cloneObjValue;
                    
                }
              
             `,
            'functionconfirm':`
                let defaultValue=slotValue["default"];
                if(typeof(defaultValue)==='string'){
                    defaultValue=JSON.parse(defaultValue)
                } 
                defaultValue=utils.cloneObj(defaultValue)
                if(slotRootHasDefault){
                    if(dataType==='String'){
                      currValue.value=JSON.stringify(defaultValue.default) 

                    }else{
                      currValue.value=defaultValue.default
                    }
                }else{
                    if(dataType==='String'){
                        currValue.value=JSON.stringify(defaultValue) 
                    }else{
                        currValue.value=defaultValue
                    }
                }
                return Promise.resolve(true);
            `
        },
        propertys: property_datamodal,
        events:['open','close','confirm'],
        slots: ['default'],
        group: 'Form',
        formItem: true,
        isShow: true
    },
    {
        componentName: 'ElsDatePicker',
        icon: 'calendar-dot',
        label: '日期选择器',
        value: 'Datepicker',
        type: "Datepicker",
        operateType: 'picker',
        dataTypes: ['String','Number'],
        defaultPropertys: {},
        propertys: property_date,
        group: 'Form',
        formItem: true,
        isShow: true
    },
    {
        componentName: 'ElsTimePicker',
        icon: 'time',
        label: '时间选择器',
        value: 'Timepicker',
        type: "Timepicker",
        operateType: 'picker',
        dataTypes: ['String','Number'],
        defaultPropertys: {},
        propertys: property_time,
        group: 'Form',
        formItem: true,
        isShow: true
    },
    {
        componentName: 'ElsTree',
        icon: 'tree-list',
        label: '树形控件',
        value: 'Tree',
        type: "Tree",
        dataTypes: ['String','Number'],
        defaultPropertys: {},
        propertys: property_tree,
        group: 'Form',
        formItem: true,
        isShow: true
    },
    {
        componentName: 'ElsColorPicker',
        icon: 'platte',
        label: '取色器',
        value: 'ColorPicker',
        type: "ColorPicker",
        dataTypes: ['String'],
        defaultPropertys: {},
        propertys: property_colorPicker,
        group: 'Form',
        formItem: true,
        isShow: true
    },
    {
        componentName: 'ElsWangEditor',
        icon: 'word',
        label: '富文本',
        value: 'WangEditor',
        type: "WangEditor",
        dataTypes: ['String'],
        defaultPropertys: {},
        propertys: property_wangEditor,
        group: 'Form',
        formItem: true,
        isShow: true
    },
    {
        componentName: 'ElsAceEditor',
        icon: 'text-style',
        label: 'Ace编辑器',
        value: 'AceEditor',
        type: "AceEditor",
        dataTypes: ['String'],
        defaultPropertys: {},
        propertys: property_aceEditor,
        group: 'Form',
        formItem: true,
        isShow: true
    },
    {
        componentName: 'ElsJsonEditor',
        icon: 'text-style',
        label: 'Json编辑器',
        value: 'JsonEditor',
        type: "JsonEditor",
        dataTypes: ['Object'],
        defaultPropertys: {},
        propertys: property_jsonEditor,
        group: 'Form',
        formItem: true,
        isShow: true
    },
    {
        componentName: 'ElsRow',
        icon: 'layout-two',
        label: '栅格行',
        value: 'Row',
        type: "Row",
        dataTypes: ['None'],
        defaultPropertys: {},
        propertys: property_row,
        group: 'Container',
        formItem: false,
        isShow: true
    },
    {
        componentName: 'ElsCol',
        icon: 'margin',
        label: '栅格列',
        value: 'Col',
        type: "Col",
        dataTypes: ['None'],
        defaultPropertys: {},
        propertys: property_col,
        group: 'Container',
        restrictParent: 'Row',
        formItem: false,
        isShow: true
    },
    {
        componentName: 'ElsTabs',
        icon: 'label',
        label: 'Tabs标签页',
        value: 'Tabs',
        type: "Tabs",
        dataTypes: ['String','Number'],
        defaultPropertys: {},
        propertys: property_tabs,
        group: 'Container',
        restrictChild: 'TabPane',
        formItem: true,
        isShow: true
    },
    {
        componentName: 'ElsOption',
        icon: 'bookmark',
        label: 'Tabs选项',
        value: 'TabPane',
        type: "Option",
        dataTypes: ['None'],
        defaultPropertys: {},
        propertys: property_tabPane,
        group: 'Container',
        restrictParent: 'Tabs',
        formItem: true,
        isShow: true
    },

    {
        componentName: 'ElsForm',
        icon: 'form-one',
        label: 'Form表单',
        value: 'Form',
        type: "Form",
        dataTypes: ['None'],
        defaultPropertys: {},
        propertys: property_form,
        group: 'Container',
        formItem: false,
        isShow: false
    },
    {
        componentName: 'ElCollapse',
        icon: 'menu-unfold',
        label: '折叠面板',
        value: 'Collapse',
        type: "Collapse",
        dataTypes: ['None'],
        defaultPropertys: {},
        propertys: property_collapse,
        group: 'Container',
        restrictChild: 'CollapseItem',
        formItem: false,
        isShow: true
    },
    {
        componentName: 'ElCollapseItem',
        icon: 'hamburger-button',
        label: '折叠节点',
        value: 'CollapseItem',
        type: "CollapseItem",
        dataTypes: ['None'],
        defaultPropertys: {},
        propertys: property_collapseItem,
        group: 'Container',
        restrictParent: 'Collapse',
        formItem: false,
        isShow: true
    },
    {
        componentName: 'ElCard',
        icon: 'bank-card',
        label: 'Card卡片',
        value: 'Card',
        type: "Card",
        dataTypes: ['None'],
        defaultPropertys: {},
        propertys: property_card,
        group: 'Container',
        formItem: false,
        isShow: true
    },
    {
        componentName: 'ElsFormItem',
        icon: 'form-one',
        label: 'Form表单项',
        value: 'FormItem',
        type: "FormItem",
        dataTypes: ['None'],
        defaultPropertys: {},
        propertys: property_formItemCom,
        group: 'Container',
        formItem: false,
        isShow: true
    },
    {
        componentName: 'ElsDialog',
        icon: 'share',
        label: 'Dialog弹窗',
        value: 'Dialog',
        type: "Dialog",
        dataTypes: ['None'],
        propertys: property_dialog,
        slots: [],
        group: 'Container',
        formItem: false,
        isShow: true
    },
    {
        componentName: 'ElsDrawer',
        icon: 'share',
        label: 'Drawer抽屉',
        value: 'Drawer',
        type: "Drawer",
        dataTypes: ['None'],
        propertys: property_drawer,
        slots: [],
        group: 'Container',
        formItem: false,
        isShow: true
    },
    {
        componentName: 'div',
        icon: 'code',
        label: 'Div标签',
        value: 'Html',
        type: "Html",
        dataTypes: ['None'],
        defaultPropertys: {},
        propertys: [],
        group: 'Container',
        formItem: false,
        isShow: true
    },

    {
        componentName: 'ElsCaption',
        icon: 'dividing-line',
        label: '分隔描述',
        value: 'Caption',
        type: "Caption",
        dataTypes: ['None','String'],
        defaultPropertys: {},
        propertys: property_caption,
        group: 'Show',
        formItem: true,
        isShow: true
    },
    {
        componentName: 'ElsTip',
        icon: 'tips',
        label: '页面提示',
        value: 'Tip',
        type: "Tip",
        dataTypes: ['None'],
        defaultPropertys: {},
        propertys: property_tip,
        group: 'Show',
        formItem: false,
        isShow: true
    },
    {
        componentName: 'ElAlert',
        icon: 'topic-discussion',
        label: 'Alert提示',
        value: 'Alert',
        type: "Alert",
        dataTypes: ['None'],
        defaultPropertys: {},
        propertys: property_alert,
        group: 'Show',
        formItem: false,
        isShow: true
    },
    {
        componentName: 'ElButton',
        icon: 'button',
        label: 'Button按钮',
        value: 'Button',
        type: "Button",
        dataTypes: ['None'],
        defaultPropertys: {},
        propertys: property_button,
        group: 'Show',
        formItem: false,
        isShow: true
    },
    {
        componentName: 'ElsTable',
        icon: 'table',
        label: 'Table表格',
        value: 'Table',
        type: "Table",
        dataTypes: ['Array'],
        defaultPropertys: {},
        propertys: property_table,
        group: 'Show',
        formItem: true,
        isShow: true
    },
    

]
