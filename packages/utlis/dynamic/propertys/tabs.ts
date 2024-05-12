export const property_tabs=[
  {
    "keyID": "key_77618",
    "keyName": "选项卡标题",
    "keyCode": "label",
    "data": [],
    "required": false,
    "config": {
      "formConfig": {
        "labelWidth": "",
        "labelPosition": "",
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
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "key_36419",
    "keyName": "选项卡值",
    "keyCode": "value",
    "data": [],
    "required": false,
    "config": {
      "formConfig": {
        "labelWidth": "",
        "labelPosition": "",
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
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "key_44602",
    "keyName": "是否禁用",
    "keyCode": "disabled",
    "data": [],
    "required": false,
    "config": {
      "formConfig": {
        "labelWidth": "",
        "labelPosition": "",
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
        "active-text": "",
        "inactive-text": "",
        "active-value": true,
        "inactive-value": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "Switch",
    "dataType": "Bool"
  },
  {
    "keyID": "key_51831",
    "keyName": "标签是否可关闭",
    "keyCode": "closable",
    "data": [],
    "required": false,
    "config": {
      "formConfig": {
        "labelWidth": "",
        "labelPosition": "",
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
        "controls-position": "",
        "width": "",
        "step": "",
        "precision": "",
        "min": "",
        "max": ""
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "InputNumber",
    "dataType": "Number"
  },
  {
    "keyID": "key_16864",
    "keyName": "标签是否延迟渲染",
    "keyCode": "lazy",
    "data": [],
    "required": false,
    "config": {
      "formConfig": {
        "labelWidth": "",
        "labelPosition": "",
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
        "controls-position": "",
        "width": "",
        "step": "",
        "precision": "",
        "min": "",
        "max": ""
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "InputNumber",
    "dataType": "Number"
  },
  {
    "keyID": "c22a17d687c1569a7fe2e7979b12e9a0",
    "keyName": "数据源",
    "keyCode": "dataType",
    "data": [],
    "config": {
      "arrayConfig": {
        "componentName": "ElsFormItem",
        "type": "bottom",
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      },
      "formConfig": {
        "labelWidth": "",
        "labelPosition": "",
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
        "type": "button",
        "dataType": 1,
        "width": "",
        "optionWidth": "",
        "data": [
          {
            "label": "数据列表",
            "value": 1
          },
          {
            "label": "接口读取",
            "value": 2
          }
        ],
        "url": "",
        "labelField": "label",
        "valueField": "value"
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Radio",
    "dataType": "Number",
    "defaultValue": "1"
  },
  {
    "keyID": "67cecb440365abb61e4aace2d5686cb9",
    "keyName": "数据列表",
    "keyCode": "data",
    "data": [
      {
        "keyID": "6f3b17406d7edb401dcecddcb764c7e4",
        "keyName": "label",
        "keyCode": "label",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "labelPosition": "",
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
            "placeholder": "显示文本",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "showPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      },
      {
        "keyID": "aa9af377f57b5b1c70ae39952200040f",
        "keyName": "value",
        "keyCode": "value",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "labelPosition": "",
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
            "placeholder": "值",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "showPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "arrayConfig": {
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      },
      "formConfig": {
        "labelWidth": "0",
        "labelPosition": "",
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
        "componentName": "ElsFormItem",
        "type": "bottom"
      },
      "advancedConfig": {
        "style": "",
        "vif": "currNode['dataType'].value==1",
        "disabled": "",
        "eventChange": ""
      }
    },
    "dataType": "Array",
    "arrayDataType": "Object"
  },
  {
    "keyID": "4aa99ce37d6e0fbfb045f18c9faf397d",
    "keyName": "数据接口",
    "keyCode": "url",
    "data": [],
    "config": {
      "arrayConfig": {
        "componentName": "ElsFormItem",
        "type": "bottom",
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      },
      "formConfig": {
        "labelWidth": "",
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
        "clearable": false,
        "isPassword": false,
        "isTrim": false,
        "encode": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "currNode['dataType'].value==2",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "6ac45742d153533c89be8c38ea6a03ff",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "84f659e12c75e78abad11c3c31932c0e",
        "keyName": "显示字段",
        "keyCode": "labelField",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
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
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      },
      {
        "keyID": "3116242ce5345ebe9efa0a0e3169c247",
        "keyName": "值字段",
        "keyCode": "valueField",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
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
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "arrayConfig": {},
      "formConfig": {
        "labelWidth": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "gutter": "",
        "justify": "",
        "align": "",
        "tag": ""
      },
      "advancedConfig": {
        "style": "",
        "vif": "currNode['dataType'].value==2",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Row",
    "dataType": "None"
  }
]