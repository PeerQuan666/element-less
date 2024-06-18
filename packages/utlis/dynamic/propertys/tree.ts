export const property_tree=[
  {
    "keyID": "M_kzawTmA",
    "keyName": "Form",
    "keyCode": "g2IUO-5Ioa",
    "data": [
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
            "dataType": null,
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
            "keyID": "key_84693",
            "keyName": "栅格行",
            "keyCode": "key_1213",
            "data": [
              {
                "keyID": "6f3b17406d7edb401dcecddcb764c7e4",
                "keyName": "",
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
                    "placeholder": "显示文本",
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
                "keyName": "",
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
                    "placeholder": "值",
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
            "dataType": "None",
            "dataTypeName": "None",
            "arrayDataType": "",
            "componentGroup": "Container",
            "componentTypeLabel": "栅格行",
            "componentTypeName": "Row",
            "componentName": "ElsRow",
            "componentType": "Row",
            "formItem": false,
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
            },
            "value": ""
          },
          {
            "keyID": "key_94949",
            "keyName": "栅格行",
            "keyCode": "",
            "data": [
              {
                "keyID": "key_51509",
                "keyName": "",
                "keyCode": "id",
                "data": [],
                "dataType": "String",
                "arrayDataType": "",
                "componentTypeLabel": "输入框",
                "componentType": "Input",
                "icon": "text",
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
                    "placeholder": "ID字段",
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
                "defaultValue": ""
              },
              {
                "keyID": "key_19810",
                "keyName": "",
                "keyCode": "parentId",
                "data": [],
                "dataType": "String",
                "arrayDataType": "",
                "componentTypeLabel": "输入框",
                "componentType": "Input",
                "icon": "text",
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
                    "placeholder": "父ID",
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
                "defaultValue": ""
              }
            ],
            "dataType": "None",
            "dataTypeName": "None",
            "arrayDataType": "",
            "componentGroup": "Container",
            "componentTypeLabel": "栅格行",
            "componentTypeName": "Row",
            "componentName": "ElsRow",
            "componentType": "Row",
            "formItem": false,
            "componentShow": true,
            "icon": "layout-two",
            "config": {
              "formConfig": {},
              "baseConfig": {
                "gutter": 10,
                "justify": "start",
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
            },
            "value": "",
            "defaultValue": ""
          },
          {
            "keyID": "key_76189",
            "keyName": "栅格行",
            "keyCode": "",
            "data": [
              {
                "keyID": "key_944",
                "keyName": "",
                "keyCode": "disabled",
                "data": [],
                "dataType": "String",
                "arrayDataType": "",
                "componentTypeLabel": "输入框",
                "componentType": "Input",
                "icon": "text",
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
                    "placeholder": "禁用字段",
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
                "defaultValue": ""
              },
              {
                "keyID": "key_4426",
                "keyName": "",
                "keyCode": "idPath",
                "data": [],
                "dataType": "String",
                "arrayDataType": "",
                "componentTypeLabel": "输入框",
                "componentType": "Input",
                "icon": "text",
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
                    "placeholder": "ID路径",
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
                "defaultValue": ""
              }
            ],
            "dataType": "None",
            "dataTypeName": "None",
            "arrayDataType": "",
            "componentGroup": "Container",
            "componentTypeLabel": "栅格行",
            "componentTypeName": "Row",
            "componentName": "ElsRow",
            "componentType": "Row",
            "formItem": false,
            "componentShow": true,
            "icon": "layout-two",
            "config": {
              "formConfig": {},
              "baseConfig": {
                "gutter": 10,
                "justify": "start",
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
            },
            "value": "",
            "defaultValue": ""
          }
        ],
        "config": {
          "arrayConfig": {
            "arrayDefaultLength": "1",
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": "",
            "borderType": ""
          },
          "formConfig": {
            "labelWidth": "0",
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
            "componentName": "ElsFormItem",
            "title": "",
            "type": "bottom",
            "inline": false,
            "labelPosition": "right",
            "labelWidth": "",
            "labelSuffix": "",
            "hideRequiredAsterisk": false,
            "requireAsteriskPosition": "",
            "showMessage": false,
            "inlineMessage": false,
            "statusIcon": false,
            "disabled": false,
            "scrollToError": false,
            "scrollIntoViewOptions": false
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
            "clearable": false,
            "showPassword": false,
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
            "gutter": 10,
            "justify": "",
            "align": "",
            "tag": ""
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Row",
        "dataType": "None"
      },
      {
        "keyID": "key_47644",
        "keyName": "栅格行",
        "keyCode": "",
        "data": [
          {
            "keyID": "key_97",
            "keyName": "ID字段",
            "keyCode": "idField",
            "data": [],
            "dataType": "String",
            "arrayDataType": "",
            "componentTypeLabel": "输入框",
            "componentType": "Input",
            "icon": "text",
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
            "defaultValue": ""
          },
          {
            "keyID": "key_36956",
            "keyName": "父ID字段",
            "keyCode": "parentIdField",
            "data": [],
            "dataType": "String",
            "arrayDataType": "",
            "componentTypeLabel": "输入框",
            "componentType": "Input",
            "icon": "text",
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
            "defaultValue": ""
          }
        ],
        "dataType": "None",
        "arrayDataType": "",
        "componentTypeLabel": "栅格行",
        "componentType": "Row",
        "icon": "layout-two",
        "config": {
          "formConfig": {},
          "baseConfig": {
            "gutter": 10,
            "justify": "start",
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
        },
        "defaultValue": ""
      },
      {
        "keyID": "key_48421",
        "keyName": "栅格行",
        "keyCode": "",
        "data": [
          {
            "keyID": "key_40159",
            "keyName": "ID路径字段",
            "keyCode": "idPathField",
            "data": [],
            "dataType": "String",
            "arrayDataType": "",
            "componentTypeLabel": "输入框",
            "componentType": "Input",
            "icon": "text",
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
            "defaultValue": ""
          },
          {
            "keyID": "key_74468",
            "keyName": "禁用字段",
            "keyCode": "disabledField",
            "data": [],
            "dataType": "String",
            "arrayDataType": "",
            "componentTypeLabel": "输入框",
            "componentType": "Input",
            "icon": "text",
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
            "defaultValue": ""
          }
        ],
        "dataType": "None",
        "arrayDataType": "",
        "componentTypeLabel": "栅格行",
        "componentType": "Row",
        "icon": "layout-two",
        "config": {
          "formConfig": {},
          "baseConfig": {
            "gutter": 10,
            "justify": "start",
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
        },
        "defaultValue": ""
      },
      {
        "keyID": "key_16781",
        "keyName": "栅格行",
        "keyCode": "key_72437",
        "data": [
          {
            "keyID": "5c703310ff0bb2e0813d72c109c2e11e",
            "keyName": "多选",
            "keyCode": "multiple",
            "data": [],
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
            "keyID": "key_71189",
            "keyName": "值类型",
            "keyCode": "valueType",
            "data": [],
            "dataType": "String",
            "arrayDataType": "",
            "componentTypeLabel": "单选列表",
            "componentType": "Radio",
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
                    "label": "数字",
                    "value": "number"
                  },
                  {
                    "label": "字符串",
                    "value": "string"
                  }
                ]
              },
              "advancedConfig": {
                "style": "",
                "vif": "currNode['multiple'].value==true",
                "disabled": "",
                "eventChange": ""
              },
              "arrayConfig": {}
            }
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
        "keyID": "850f1351229ab44321526e778bd89d7f",
        "keyName": "",
        "keyCode": "",
        "data": [
          {
            "keyID": "d9363d60122ee734a915d63607a072d1",
            "keyName": "是否筛选",
            "keyCode": "filterable",
            "data": [],
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
            "dataType": "Bool",
            "defaultValue": "true"
          },
          {
            "keyID": "050471fcd7085a37d8cefba26e3371ee",
            "keyName": "大数据开启",
            "keyCode": "isVirtual",
            "data": [],
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
            "dataType": "Bool",
            "defaultValue": ""
          }
        ],
        "config": {
          "formConfig": {},
          "baseConfig": {
            "gutter": 10,
            "justify": "",
            "align": "",
            "tag": ""
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Row",
        "dataType": "None"
      },
      {
        "keyID": "key_35830",
        "keyName": "栅格行",
        "keyCode": "",
        "data": [
          {
            "keyID": "key_91130",
            "keyName": "严格的遵循父子不互相关联",
            "keyCode": "checkStrictly",
            "data": [],
            "dataType": "Bool",
            "arrayDataType": "",
            "componentTypeLabel": "开关",
            "componentType": "Switch",
            "icon": "switch-one",
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
            "defaultValue": "true"
          },
          {
            "keyID": "key_22262",
            "keyName": "点击节点展开子节点",
            "keyCode": "expandOnClickNode",
            "data": [],
            "dataType": "Bool",
            "arrayDataType": "",
            "componentTypeLabel": "开关",
            "componentType": "Switch",
            "icon": "switch-one",
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
            "defaultValue": ""
          }
        ],
        "dataType": "None",
        "arrayDataType": "",
        "componentTypeLabel": "栅格行",
        "componentType": "Row",
        "icon": "layout-two",
        "config": {
          "formConfig": {},
          "baseConfig": {
            "gutter": 0,
            "justify": "start",
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
        },
        "defaultValue": ""
      },
      {
        "keyID": "key_74042",
        "keyName": "栅格行",
        "keyCode": "",
        "data": [
          {
            "keyID": "key_14482",
            "keyName": "勾选节点后父节点也会勾选",
            "keyCode": "checkWithParent",
            "data": [],
            "dataType": "Bool",
            "arrayDataType": "",
            "componentTypeLabel": "开关",
            "componentType": "Switch",
            "icon": "switch-one",
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
            "defaultValue": "true"
          },
          {
            "keyID": "key_5532",
            "keyName": "取消节点后子节点也会取消",
            "keyCode": "unCheckWithchild",
            "data": [],
            "dataType": "Bool",
            "arrayDataType": "",
            "componentTypeLabel": "开关",
            "componentType": "Switch",
            "icon": "switch-one",
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
            "defaultValue": "true"
          }
        ],
        "dataType": "None",
        "arrayDataType": "",
        "componentTypeLabel": "栅格行",
        "componentType": "Row",
        "icon": "layout-two",
        "config": {
          "formConfig": {},
          "baseConfig": {
            "gutter": 0,
            "justify": "start",
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
        },
        "defaultValue": ""
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
        "requireAsteriskPosition": "",
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