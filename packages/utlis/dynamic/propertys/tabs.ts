export const property_tabs=[
  {
    "keyID": "ARVQ0FCl_",
    "keyName": "Form",
    "keyCode": "FE6q5TTUVq",
    "children": [
      {
        "keyID": "key_47877",
        "keyName": "风格类型",
        "keyCode": "type",
        "children": [],
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
                "label": "card",
                "value": "card"
              },
              {
                "label": "border-card",
                "value": "border-card"
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
        }
      },
      {
        "keyID": "key_88308",
        "keyName": "选项卡所在位置",
        "keyCode": "tab-position",
        "children": [],
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
                "label": "top",
                "value": "top"
              },
              {
                "label": "right",
                "value": "right"
              },
              {
                "label": "bottom",
                "value": "bottom"
              },
              {
                "label": "left",
                "value": "left"
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
        "defaultValue": "top"
      },
      {
        "keyID": "key_36118",
        "keyName": "栅格行",
        "keyCode": "key_12849",
        "children": [
          {
            "keyID": "key_79961",
            "keyName": "标签是否可关闭",
            "keyCode": "closable",
            "children": [],
            "dataType": "Bool",
            "arrayDataType": "",
            "componentTypeLabel": "开关",
            "componentType": "Switch",
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
            }
          },
          {
            "keyID": "key_24929",
            "keyName": "标签是否可增加",
            "keyCode": "addable",
            "children": [],
            "dataType": "Bool",
            "arrayDataType": "",
            "componentTypeLabel": "开关",
            "componentType": "Switch",
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
            "gutter": "",
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
        "keyID": "key_51153",
        "keyName": "栅格行",
        "keyCode": "key_49724",
        "children": [
          {
            "keyID": "key_44602",
            "keyName": "是否同时可增加和关闭",
            "keyCode": "editable",
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
            "keyID": "key_57531",
            "keyName": "标签的宽度是否自撑开",
            "keyCode": "stretch",
            "children": [],
            "dataType": "Bool",
            "arrayDataType": "",
            "componentTypeLabel": "开关",
            "componentType": "Switch",
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
            "gutter": "",
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