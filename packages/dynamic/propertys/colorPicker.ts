export const property_colorPicker=[
    {
      "keyID": "4KlLP0W-r",
      "keyName": "Form",
      "keyCode": "sgBxNuD1Hy",
      "children": [
        {
          "keyID": "key_89633",
          "keyName": "栅格行",
          "keyCode": "",
          "children": [
            {
              "keyID": "key_58750",
              "keyName": "是否显示文本框",
              "keyCode": "showInput",
              "children": [],
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
              "defaultValue": false
            },
            {
              "keyID": "key_38251",
              "keyName": "文本框宽度",
              "keyCode": "inputWidth",
              "children": [],
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
          "keyID": "key_20312",
          "keyName": "栅格行",
          "keyCode": "",
          "children": [
            {
              "keyID": "key_65488",
              "keyName": "是否支持透明度选择",
              "keyCode": "show-alpha",
              "children": [],
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
              "defaultValue": false
            },
            {
              "keyID": "key_19316",
              "keyName": "渲染至 body 下",
              "keyCode": "teleported",
              "children": [],
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
              "defaultValue": true
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
          "keyID": "key_21986",
          "keyName": "栅格行",
          "keyCode": "",
          "children": [
            {
              "keyID": "key_55768",
              "keyName": "v-model 颜色的格式",
              "keyCode": "color-format",
              "children": [],
              "dataType": "String",
              "arrayDataType": "",
              "componentTypeLabel": "下拉列表",
              "componentType": "Select",
              "icon": "full-selection",
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
                  "dataType": 1,
                  "data": [
                    {
                      "label": "hsl",
                      "value": "hsl"
                    },
                    {
                      "label": "hsv",
                      "value": "hsv"
                    },
                    {
                      "label": "hex",
                      "value": "hex"
                    },
                    {
                      "label": "rgb",
                      "value": "rgb"
                    },
                    {
                      "label": "hex",
                      "value": "hex"
                    }
                  ],
                  "multiple": false,
                  "filterable": true,
                  "remote": false,
                  "clearable": true,
                  "teleported": true,
                  "allow-create": false
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
              "keyID": "key_88935",
              "keyName": "是否触发表单的校验",
              "keyCode": "validate-event",
              "children": [],
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
              "defaultValue": true
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