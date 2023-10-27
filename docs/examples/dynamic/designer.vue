<template>
    <el-tabs>
        <el-tab-pane label="配置">
            <ElsDynamicDesigner style="overflow: scroll;" v-model="config" 
            allowCreateType
            :componentSettingVisible="false"
             v-model:initValue="initValue" 
             :dataTypes="dataTypes" :camelCase="true" 
             :appendComponentTypes="appendComponentTypes" 
             :componentRelateDataType="componentRelateDataType"
             saveTypeUrl="sss"
             >
            </ElsDynamicDesigner>

        </el-tab-pane>
       
        <el-tab-pane label="表单属性">
            {{ value }}
        </el-tab-pane>
    </el-tabs>

</template>

<script setup>
import { ref } from 'vue'
const test=ref()
const value = ref()
const config=ref()
const initValue=ref()
const componentRelateDataType=ref({
    'DatePicker':['Date'],
})
const appendComponentTypes=ref([
{ componentName: 'ElsDynamicRender', config: {}, label: '测试', value: 'D1',type: "D1",  dataTypes: ['Object'], propertys: [], defaultPropertys: {
'config':[
  {
    "keyID": "key_56962",
    "keyName": "输入框",
    "keyCode": "Key_79892",
    "data": [],
    "dataType": 1,
    "arrayDataType": "",
    "componentType": "Input",
    "config": {
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "left",
        "suffixContent": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "showWordLimit": false,
        "clearable": true,
        "showPassword": false,
        "isTrim": false,
        "encode": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    }
  },
  {
    "keyID": "key_91673",
    "keyName": "日期选择器",
    "keyCode": "Key_16648",
    "data": [],
    "dataType": 3,
    "arrayDataType": "",
    "componentType": "DatePicker",
    "config": {
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "left",
        "suffixContent": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "type": "",
        "width": "",
        "format": "",
        "valueFormat": "",
        "editable": true,
        "clearable": true
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    }
  },
  {
    "keyID": "key_18471",
    "keyName": "文本域",
    "keyCode": "Key_22008",
    "data": [],
    "dataType": 1,
    "arrayDataType": "",
    "componentType": "Textarea",
    "config": {
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "left",
        "suffixContent": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "rows": "3",
        "autosize": false,
        "maxlength": "",
        "showWordLimit": false,
        "encode": false,
        "clearable": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    }
  }]
}, group: 'Form' },
{
    "componentName": "ElsDynamicRender",
    "config": {},
    "label": "MyModel",
    "value": "MyModel",
    "type": "DynamicRender",
    "dataTypes": [
      "MyModel"
    ],
    "defaultPropertys": {
      "config": [
        {
          "keyID": "key_49943",
          "keyName": "输入框",
          "keyCode": "Key_16118",
          "data": [],
          "dataType": 1,
          "arrayDataType": "",
          "componentType": "Input",
          "config": {
            "formConfig": {
              "labelWidth": "",
              "tip": "",
              "tipPosition": "left",
              "suffixContent": "",
              "required": false,
              "requiredMessage": "",
              "validType": "",
              "validExpression": "",
              "validMessage": "",
              "validMethod": ""
            },
            "baseConfig": {
              "width": "",
              "placeholder": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "prefixTag": "",
              "suffixTag": "",
              "maxlength": "",
              "showWordLimit": false,
              "clearable": true,
              "showPassword": false,
              "isTrim": false,
              "encode": false
            },
            "advancedConfig": {
              "style": "",
              "vif": "",
              "disabled": "",
              "eventChange": ""
            },
            "arrayConfig": {}
          }
        },
        {
          "keyID": "key_80005",
          "keyName": "输入框",
          "keyCode": "Key_76938",
          "data": [],
          "dataType": 1,
          "arrayDataType": "",
          "componentType": "Input",
          "config": {
            "formConfig": {
              "labelWidth": "",
              "tip": "",
              "tipPosition": "left",
              "suffixContent": "",
              "required": false,
              "requiredMessage": "",
              "validType": "",
              "validExpression": "",
              "validMessage": "",
              "validMethod": ""
            },
            "baseConfig": {
              "width": "",
              "placeholder": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "prefixTag": "",
              "suffixTag": "",
              "maxlength": "",
              "showWordLimit": false,
              "clearable": true,
              "showPassword": false,
              "isTrim": false,
              "encode": false
            },
            "advancedConfig": {
              "style": "",
              "vif": "",
              "disabled": "",
              "eventChange": ""
            },
            "arrayConfig": {}
          }
        }
      ]
    },
    "propertys": [],
    "group": "Form"
  },
  {
    "componentName": "ElsSelect",
    "label": "aaa",
    "value": "aaa",
    "type": "Select",
    "dataTypes": [
      "aaa"
    ],
    "defaultPropertys": {
      "data": [
        {
          "label": "a",
          "value": "a"
        },
        {
          "label": "b",
          "value": "b"
        }
      ]
    },
    "group": "Form"
  },
  {
    "componentName": "ElsSelect",
    "label": "bbb",
    "value": "bbb",
    "type": "Select",
    "dataTypes": [
      "bbb"
    ],
    "defaultPropertys": {
      "data": [
        {
          "label": "a",
          "value": "a"
        },
        {
          "label": "b",
          "value": "b"
        }
      ]
    },
    "group": "Form"
  }

])

const dataTypes=[
                { label: '无', value: "None",type:'None' },
                { label: '字符串', value: "String",type:'String'  },
                { label: '数字', value: "Number",type:'Number'  },
                { label: 'Bool', value: "Bool",type:'Bool'  },
                { label: '时间', value: "Date",type:'String'  },
                { label: '文件', value: "File",type:'String'  },
                { label: 'Object', value: "Object",type:'Object'  },
                { label: 'Array', value: "Array",type:'Array'  },
                {
                  "label": "MyModel",
                  "value": "MyModel",
                  "type": "MyModel",
                  "defaultValue": {
                    "Key_16118": "12",
                    "Key_76938": "22"
                  }
                },
                {
                  "label": "aaa",
                  "value": "aaa",
                  "type": "Enum",
                  "defaultValue": ""
                },
                {
                  "label": "bbb",
                  "value": "bbb",
                  "type": "Enum",
                  "defaultValue": ""
                }
            ]
</script>