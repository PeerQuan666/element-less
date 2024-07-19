export const property_form=[
  {
    "keyID": "ETm1QVohg",
    "keyName": "Form",
    "keyCode": "ny9eaO0s7L",
    "children": [
      {
        "keyID": "key_98635",
        "keyName": "栅格行",
        "keyCode": "key_64589",
        "children": [
          {
            "keyID": "key_2905",
            "keyName": "行内表单模式",
            "keyCode": "inline",
            "children": [],
            "required": false,
            "config": {
              "formConfig": {
                "labelWidth": "",
                "suffixContent": "",
                "required": false,
                "requiredMessage": "",
                "tip": "",
                "tipPosition": "left",
                "validType": "",
                "validMessage": "",
                "validExpression": "",
                "validMethod": ""
              },
              "baseConfig": {
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
            "keyID": "key_15571",
            "keyName": "表单域标签的位置",
            "keyCode": "labelPosition",
            "children": [],
            "required": false,
            "config": {
              "formConfig": {
                "labelWidth": "",
                "suffixContent": "",
                "required": false,
                "requiredMessage": "",
                "tip": "",
                "tipPosition": "left",
                "validType": "",
                "validMessage": "",
                "validExpression": "",
                "validMethod": ""
              },
              "baseConfig": {
                "type": "button",
                "dataType": 1,
                "data": [
                  {
                    "label": "right",
                    "value": "right"
                  },
                  {
                    "label": "left",
                    "value": "left"
                  },
                  {
                    "label": "top",
                    "value": "top"
                  }
                ]
              },
              "advancedConfig": {
                "style": "",
                "vif": "",
                "disabled": "",
                "eventChange": ""
              },
              "arrayConfig": {}
            },
            "componentType": "Radio",
            "dataType": "String",
            "defaultValue": "right"
          }
        ],
        "dataType": "None",
        "arrayDataType": "",
        "componentTypeLabel": "栅格行",
        "componentType": "Row",
        "config": {
          "formConfig": {},
          "baseConfig": {
            "gutter": 10,
            "justify": "",
            "align": "",
            "tag": "div"
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
        "keyID": "key_81509",
        "keyName": "栅格行",
        "keyCode": "key_11469",
        "children": [
          {
            "keyID": "key_21700",
            "keyName": "标签的长度",
            "keyCode": "labelWidth",
            "children": [],
            "required": false,
            "config": {
              "formConfig": {
                "labelWidth": "",
                "suffixContent": "",
                "required": false,
                "requiredMessage": "",
                "tip": "",
                "tipPosition": "left",
                "validType": "",
                "validMessage": "",
                "validExpression": "",
                "validMethod": ""
              },
              "baseConfig": {
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
            "keyID": "key_71304",
            "keyName": "表单域标签的后缀",
            "keyCode": "labelSuffix",
            "children": [],
            "required": false,
            "config": {
              "formConfig": {
                "labelWidth": "",
                "suffixContent": "",
                "required": false,
                "requiredMessage": "",
                "tip": "",
                "tipPosition": "left",
                "validType": "",
                "validMessage": "",
                "validExpression": "",
                "validMethod": ""
              },
              "baseConfig": {
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
          }
        ],
        "dataType": "None",
        "arrayDataType": "",
        "componentTypeLabel": "栅格行",
        "componentType": "Row",
        "config": {
          "formConfig": {},
          "baseConfig": {
            "gutter": 10,
            "justify": "",
            "align": "",
            "tag": "div"
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
        "keyID": "key_22690",
        "keyName": "栅格行",
        "keyCode": "key_27795",
        "children": [
          {
            "keyID": "key_81638",
            "keyName": "隐藏必填字段红色星号",
            "keyCode": "hideRequiredAsterisk",
            "children": [],
            "required": false,
            "config": {
              "formConfig": {
                "labelWidth": "",
                "suffixContent": "",
                "required": false,
                "requiredMessage": "",
                "tip": "",
                "tipPosition": "left",
                "validType": "",
                "validMessage": "",
                "validExpression": "",
                "validMethod": ""
              },
              "baseConfig": {
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
            "keyID": "key_25603",
            "keyName": "星号的位置",
            "keyCode": "requireAsteriskPosition",
            "children": [],
            "required": false,
            "config": {
              "formConfig": {
                "labelWidth": "",
                "suffixContent": "",
                "required": false,
                "requiredMessage": "",
                "tip": "",
                "tipPosition": "left",
                "validType": "",
                "validMessage": "",
                "validExpression": "",
                "validMethod": ""
              },
              "baseConfig": {
                "type": "button",
                "dataType": 1,
                "data": [
                  {
                    "label": "left",
                    "value": "left"
                  },
                  {
                    "label": "right",
                    "value": "right"
                  }
                ]
              },
              "advancedConfig": {
                "style": "",
                "vif": "",
                "disabled": "",
                "eventChange": ""
              },
              "arrayConfig": {}
            },
            "componentType": "Radio",
            "dataType": "String"
          }
        ],
        "dataType": "None",
        "arrayDataType": "",
        "componentTypeLabel": "栅格行",
        "componentType": "Row",
        "config": {
          "formConfig": {},
          "baseConfig": {
            "gutter": 10,
            "justify": "",
            "align": "",
            "tag": "div"
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
        "keyID": "key_22743",
        "keyName": "栅格行",
        "keyCode": "key_8869",
        "children": [
          {
            "keyID": "key_17342",
            "keyName": "显示校验错误信息",
            "keyCode": "showMessage",
            "children": [],
            "required": false,
            "config": {
              "formConfig": {
                "labelWidth": "",
                "suffixContent": "",
                "required": false,
                "requiredMessage": "",
                "tip": "",
                "tipPosition": "left",
                "validType": "",
                "validMessage": "",
                "validExpression": "",
                "validMethod": ""
              },
              "baseConfig": {
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
            "keyID": "key_25024",
            "keyName": "以行内形式展示校验",
            "keyCode": "inlineMessage",
            "children": [],
            "required": false,
            "config": {
              "formConfig": {
                "labelWidth": "",
                "suffixContent": "",
                "required": false,
                "requiredMessage": "",
                "tip": "",
                "tipPosition": "left",
                "validType": "",
                "validMessage": "",
                "validExpression": "",
                "validMethod": ""
              },
              "baseConfig": {
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
          }
        ],
        "dataType": "None",
        "arrayDataType": "",
        "componentTypeLabel": "栅格行",
        "componentType": "Row",
        "config": {
          "formConfig": {},
          "baseConfig": {
            "gutter": 10,
            "justify": "",
            "align": "",
            "tag": "div"
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
        "keyID": "key_82483",
        "keyName": "栅格行",
        "keyCode": "key_59422",
        "children": [
          {
            "keyID": "key_96634",
            "keyName": "输入框中显示校验反馈图标",
            "keyCode": "statusIcon",
            "children": [],
            "required": false,
            "config": {
              "formConfig": {
                "labelWidth": "",
                "suffixContent": "",
                "required": false,
                "requiredMessage": "",
                "tip": "",
                "tipPosition": "left",
                "validType": "",
                "validMessage": "",
                "validExpression": "",
                "validMethod": ""
              },
              "baseConfig": {
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
            "keyID": "key_3462",
            "keyName": "禁用表单内所有组件",
            "keyCode": "disabled",
            "children": [],
            "required": false,
            "config": {
              "formConfig": {
                "labelWidth": "",
                "suffixContent": "",
                "required": false,
                "requiredMessage": "",
                "tip": "",
                "tipPosition": "left",
                "validType": "",
                "validMessage": "",
                "validExpression": "",
                "validMethod": ""
              },
              "baseConfig": {
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
          }
        ],
        "dataType": "None",
        "arrayDataType": "",
        "componentTypeLabel": "栅格行",
        "componentType": "Row",
        "config": {
          "formConfig": {},
          "baseConfig": {
            "gutter": 10,
            "justify": "",
            "align": "",
            "tag": "div"
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
        "keyID": "key_14956",
        "keyName": "栅格行",
        "keyCode": "key_18893",
        "children": [
          {
            "keyID": "key_50182",
            "keyName": "校验失败滚动到第一个错误项",
            "keyCode": "scrollToError",
            "children": [],
            "required": false,
            "config": {
              "formConfig": {
                "labelWidth": "",
                "suffixContent": "",
                "required": false,
                "requiredMessage": "",
                "tip": "",
                "tipPosition": "left",
                "validType": "",
                "validMessage": "",
                "validExpression": "",
                "validMethod": ""
              },
              "baseConfig": {
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
            "keyID": "key_72238",
            "keyName": "校验失败滚动到第一个表单",
            "keyCode": "scrollIntoViewOptions",
            "children": [],
            "required": false,
            "config": {
              "formConfig": {
                "labelWidth": "",
                "suffixContent": "",
                "required": false,
                "requiredMessage": "",
                "tip": "",
                "tipPosition": "left",
                "validType": "",
                "validMessage": "",
                "validExpression": "",
                "validMethod": ""
              },
              "baseConfig": {
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
          }
        ],
        "dataType": "None",
        "arrayDataType": "",
        "componentTypeLabel": "栅格行",
        "componentType": "Row",
        "config": {
          "formConfig": {},
          "baseConfig": {
            "gutter": 10,
            "justify": "",
            "align": "",
            "tag": "div"
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
    ],
    "dataType": "None",
    "arrayDataType": "",
    "componentTypeLabel": "Form表单",
    "componentType": "Form",
    "config": {
      "baseConfig": {
        "inline": false,
        "labelPosition": "top",
        "labelWidth": "",
        "labelSuffix": "",
        "hideRequiredAsterisk": false,
        "showMessage": true,
        "inlineMessage": false,
        "statusIcon": false,
        "disabled": false,
        "scrollToError": false,
        "scrollIntoViewOptions": false
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