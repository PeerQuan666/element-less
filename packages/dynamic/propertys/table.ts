export const property_table=[
  {
    "keyID": "eOJy1pTxY",
    "keyName": "Form",
    "keyCode": "tzfMTDRitv",
    "children": [
      {
        "keyID": "key_56039",
        "keyName": "栅格行",
        "keyCode": "",
        "children": [
          {
            "keyID": "key_86647",
            "keyName": "主键ID",
            "keyCode": "rowKey",
            "children": [],
            "dataType": "String",
            "arrayDataType": "",
            "componentTypeLabel": "输入框",
            "componentType": "Input",
            "icon": "text",
            "operateType": "input",
            "slots": [],
            "config": {
              "formConfig": {},
              "baseConfig": {},
              "advancedConfig": {},
              "arrayConfig": {}
            }
          },
          {
            "keyID": "key_51309",
            "keyName": "表格名称",
            "keyCode": "tableName",
            "children": [],
            "dataType": "String",
            "arrayDataType": "",
            "componentTypeLabel": "输入框",
            "componentType": "Input",
            "icon": "text",
            "operateType": "input",
            "slots": [],
            "config": {
              "formConfig": {},
              "baseConfig": {},
              "advancedConfig": {},
              "arrayConfig": {}
            }
          }
        ],
        "dataType": "None",
        "arrayDataType": "",
        "componentTypeLabel": "栅格行",
        "componentType": "Row",
        "icon": "layout-two",
        "slots": [],
        "config": {
          "formConfig": {},
          "baseConfig": {
            "gutter": 10,
            "justify": "start",
            "tag": "div"
          },
          "advancedConfig": {},
          "arrayConfig": {}
        }
      },
      {
        "keyID": "key_1783",
        "keyName": "数据接口",
        "keyCode": "url",
        "children": [],
        "dataType": "String",
        "arrayDataType": "",
        "componentTypeLabel": "输入框",
        "componentType": "Input",
        "icon": "text",
        "operateType": "input",
        "slots": [],
        "config": {
          "formConfig": {},
          "baseConfig": {},
          "advancedConfig": {},
          "arrayConfig": {}
        }
      },
      {
        "keyID": "key_61789",
        "keyName": "数据列表",
        "keyCode": "data",
        "children": [],
        "dataType": "Object",
        "arrayDataType": "",
        "componentTypeLabel": "弹窗选择",
        "componentType": "DataModal",
        "icon": "share",
        "operateType": "button",
        "slots": [
          {
            "name": "default",
            "children": [
              {
                "keyID": "key_92800",
                "keyName": "数据列表",
                "keyCode": "default",
                "children": [],
                "dataType": "Object",
                "dataTypeName": "Object",
                "arrayDataTypeName": "",
                "arrayDataType": "",
                "componentGroup": "Form",
                "componentTypeLabel": "Json编辑器",
                "componentTypeName": "JsonEditor",
                "componentName": "ElsJsonEditor",
                "componentType": "JsonEditor",
                "formItem": true,
                "componentShow": true,
                "icon": "text-style",
                "slots": [],
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
                    "navigationBar": true,
                    "mainMenuBar": true,
                    "readOnly": false,
                    "statusBar": true
                  },
                  "advancedConfig": {
                    "style": "height:450px",
                    "vif": "",
                    "disabled": "",
                    "eventChange": ""
                  },
                  "arrayConfig": {}
                }
              }
            ]
          }
        ],
        "config": {
          "formConfig": {},
          "baseConfig": {
            "buttonLabel": "数据列表",
            "buttonWidth": "100%",
            "hasInput": false,
            "inputWidth": "",
            "title": "配置数据",
            "width": "",
            "height": "",
            "targetType": "",
            "url": "",
            "dataUrl": "",
            "buttonComponent": "",
            "showBadge": true,
            "buttonProps": {},
            "functionconfirm": ""
          },
          "advancedConfig": {},
          "arrayConfig": {}
        },
        "defaultValue": ""
      },
      {
        "keyID": "key_38632",
        "keyName": "列配置",
        "keyCode": "columns",
        "children": [],
        "dataType": "Object",
        "arrayDataType": "",
        "componentTypeLabel": "弹窗选择",
        "componentType": "DataModal",
        "icon": "share",
        "operateType": "button",
        "slots": [
          {
            "name": "default",
            "children": [
              {
                "keyID": "key_42618",
                "keyName": "Table表格",
                "keyCode": "default",
                "children": [],
                "dataType": "Array",
                "dataTypeName": "Array",
                "arrayDataTypeName": "",
                "arrayDataType": "",
                "componentGroup": "Show",
                "componentTypeLabel": "Table表格",
                "componentTypeName": "Table",
                "componentName": "ElsTable",
                "componentType": "Table",
                "formItem": true,
                "componentShow": true,
                "icon": "table",
                "slots": [],
                "config": {
                  "formConfig": {},
                  "baseConfig": {
                    "rowKey": "id",
                    "isEdit": true,
                    "columns": [
                      {
                        "label": "label",
                        "prop": "label",
                        "width": "",
                        "showSummary": false,
                        "sortable": false,
                        "isEdit": true
                      },
                      {
                        "label": "字段名",
                        "prop": "prop",
                        "width": "",
                        "showSummary": false,
                        "sortable": false,
                        "isEdit": true
                      },
                      {
                        "label": "宽度",
                        "prop": "width",
                        "width": "",
                        "showSummary": false,
                        "sortable": false,
                        "isEdit": true
                      },
                      {
                        "label": "类型",
                        "prop": "type",
                        "width": "",
                        "showSummary": false,
                        "sortable": false,
                        "isEdit": true,
                        "editComponent": {
                          "name": "els-select",
                          "props": {
                            "data": [
                              {
                                "label": "default",
                                "value": "default"
                              },
                              {
                                "label": "selection",
                                "value": "selection"
                              },
                              {
                                "label": "index",
                                "value": "index"
                              },
                              {
                                "label": "bool",
                                "value": "bool"
                              },
                              {
                                "label": "image",
                                "value": "image"
                              }
                            ]
                          }
                        }
                      },
                      {
                        "label": "编辑",
                        "prop": "isEdit",
                        "width": "60",
                        "showSummary": false,
                        "sortable": false,
                        "isEdit": true,
                        "editComponent": {
                          "name": "els-switch",
                          "props": {
                            "activeValue": true,
                            "inactiveValue": false
                          }
                        }
                      },
                      {
                        "label": "编辑设置",
                        "prop": "editComponent",
                        "width": "",
                        "showSummary": false,
                        "sortable": false,
                        "isEdit": true,
                        "editComponent": {
                          "name": "els-dynamic-render",
                          "props": {
                            "config": [
                              {
                                "keyID": "id_B8IJ2Y_e3",
                                "keyName": "Form",
                                "keyCode": "key_P4TcPStsVd",
                                "children": [
                                  {
                                    "keyID": "id_kqkxgceVy",
                                    "keyName": "Button按钮",
                                    "keyCode": "",
                                    "children": [],
                                    "dataType": "None",
                                    "arrayDataType": "",
                                    "componentTypeLabel": "Button按钮",
                                    "componentType": "Button",
                                    "icon": "button",
                                    "slots": [],
                                    "config": {
                                      "formConfig": {},
                                      "baseConfig": {
                                        "innerContent": "组件设置",
                                        "type": "primary",
                                        "plain": false,
                                        "text": false,
                                        "bg": false,
                                        "link": false,
                                        "round": false,
                                        "circle": false,
                                        "autoInsertSpace": false,
                                        "tag": "button",
                                        "eventClick": "refs['id_gIvW2Lhc-'].open()"
                                      },
                                      "advancedConfig": {
                                        "style": "width:100%",
                                        "vif": "",
                                        "disabled": "",
                                        "eventChange": ""
                                      },
                                      "arrayConfig": {}
                                    }
                                  },
                                  {
                                    "keyID": "id_gIvW2Lhc-",
                                    "keyName": "Dialog弹窗",
                                    "keyCode": "",
                                    "children": [
                                      {
                                        "keyID": "id_b8chkAuW-",
                                        "keyName": "组件名称",
                                        "keyCode": "name",
                                        "children": [],
                                        "dataType": "String",
                                        "arrayDataType": "",
                                        "componentTypeLabel": "单选列表",
                                        "componentType": "Radio",
                                        "icon": "radio-two",
                                        "slots": [],
                                        "config": {
                                          "formConfig": {
                                            "labelWidth": "",
                                            "suffixContent": "",
                                            "required": true,
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
                                            "width": "",
                                            "optionWidth": "",
                                            "data": [
                                              {
                                                "label": "输入框",
                                                "value": "els-input"
                                              },
                                              {
                                                "label": "下拉框",
                                                "value": "els-select"
                                              },
                                              {
                                                "label": "开关",
                                                "value": "els-switch"
                                              }
                                            ],
                                            "url": "",
                                            "labelField": "",
                                            "valueField": ""
                                          },
                                          "advancedConfig": {},
                                          "arrayConfig": {}
                                        },
                                        "defaultValue": "els-input"
                                      },
                                      {
                                        "keyID": "id_fhAxnwTSP",
                                        "keyName": "组件属性",
                                        "keyCode": "props",
                                        "children": [],
                                        "dataType": "Object",
                                        "arrayDataType": "",
                                        "componentTypeLabel": "Json编辑器",
                                        "componentType": "JsonEditor",
                                        "icon": "text-style",
                                        "slots": [],
                                        "config": {
                                          "formConfig": {},
                                          "baseConfig": {
                                            "navigationBar": true,
                                            "mainMenuBar": true,
                                            "readOnly": false,
                                            "statusBar": true
                                          },
                                          "advancedConfig": {
                                            "style": "height:350px",
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
                                    "componentTypeLabel": "Dialog弹窗",
                                    "componentType": "Dialog",
                                    "icon": "share",
                                    "operateType": "button",
                                    "slots": [],
                                    "config": {
                                      "formConfig": {},
                                      "baseConfig": {
                                        "title": "组件设置",
                                        "fullscreen": false,
                                        "modal": true,
                                        "append-to-body": true,
                                        "show-close": true,
                                        "draggable": false
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
                                    "showMessage": false,
                                    "inlineMessage": false,
                                    "statusIcon": false,
                                    "disabled": false,
                                    "scrollToError": false,
                                    "scrollIntoViewOptions": false
                                  },
                                  "advancedConfig": {},
                                  "arrayConfig": {}
                                }
                              }
                            ]
                          }
                        }
                      }
                    ],
                    "isClientSort": false,
                    "isClientPage": false,
                    "dragRow": true,
                    "hasPage": true
                  },
                  "advancedConfig": {},
                  "arrayConfig": {}
                },
                "value": []
              },
              {
                "keyID": "key_83057",
                "keyName": "Button按钮",
                "keyCode": "",
                "children": [],
                "dataType": "None",
                "dataTypeName": "None",
                "arrayDataTypeName": "",
                "arrayDataType": "",
                "componentGroup": "Show",
                "componentTypeLabel": "Button按钮",
                "componentTypeName": "Button",
                "componentName": "ElButton",
                "componentType": "Button",
                "formItem": false,
                "componentShow": true,
                "icon": "button",
                "slots": [],
                "config": {
                  "formConfig": {},
                  "baseConfig": {
                    "innerContent": "添加列",
                    "type": "primary",
                    "icon": "edit",
                    "plain": false,
                    "text": false,
                    "bg": false,
                    "link": false,
                    "round": false,
                    "circle": false,
                    "autoInsertSpace": false,
                    "tag": "button",
                    "eventClick": "currNode[\"default\"].value.push({\n  id:utils.shortid(),\n  label:'',\n  prop:'',\n  type:'default',\n  width:'',\n  isEdit:false,\n  editComponent:{name:'els-input',props:{}}\n})"
                  },
                  "advancedConfig": {},
                  "arrayConfig": {}
                }
              }
            ]
          }
        ],
        "config": {
          "formConfig": {},
          "baseConfig": {
            "buttonLabel": "配置列数据",
            "buttonWidth": "100%",
            "hasInput": false,
            "inputWidth": "",
            "title": "设置列",
            "width": "",
            "height": "",
            "targetType": "",
            "url": "",
            "dataUrl": "",
            "buttonComponent": "",
            "showBadge": true,
            "buttonProps": {},
            "functionconfirm": ""
          },
          "advancedConfig": {},
          "arrayConfig": {}
        },
        "defaultValue": ""
      },
      {
        "keyID": "id_ND4bbmpxe",
        "keyName": "栅格行",
        "keyCode": "",
        "children": [
          {
            "keyID": "id_X5F2J1yfX",
            "keyName": "对齐方式",
            "keyCode": "align",
            "children": [],
            "dataType": "String",
            "arrayDataType": "",
            "componentTypeLabel": "下拉列表",
            "componentType": "Select",
            "icon": "full-selection",
            "operateType": "picker",
            "slots": [],
            "config": {
              "formConfig": {},
              "baseConfig": {
                "dataType": 1,
                "data": [
                  {
                    "label": "居中",
                    "value": "center"
                  },
                  {
                    "label": "左对齐",
                    "value": "left"
                  },
                  {
                    "label": "右对齐",
                    "value": "right"
                  }
                ],
                "url": "",
                "labelField": "",
                "valueField": "",
                "multiple": false,
                "valueType": "",
                "filterable": true,
                "remote": false,
                "width": "",
                "placeholder": "",
                "clearable": true,
                "teleported": true,
                "allow-create": false
              },
              "advancedConfig": {},
              "arrayConfig": {}
            },
            "defaultValue": "center"
          },
          {
            "keyID": "id_hd0RthSne",
            "keyName": "是否编辑表格",
            "keyCode": "isEdit",
            "children": [],
            "dataType": "Bool",
            "arrayDataType": "",
            "componentTypeLabel": "开关",
            "componentType": "Switch",
            "icon": "switch-one",
            "slots": [],
            "config": {
              "formConfig": {},
              "baseConfig": {
                "active-text": "",
                "inactive-text": "",
                "active-value": true,
                "inactive-value": false
              },
              "advancedConfig": {},
              "arrayConfig": {}
            },
            "defaultValue": false
          }
        ],
        "dataType": "None",
        "arrayDataType": "",
        "componentTypeLabel": "栅格行",
        "componentType": "Row",
        "icon": "layout-two",
        "slots": [],
        "config": {
          "formConfig": {},
          "baseConfig": {
            "gutter": 10,
            "justify": "start",
            "align": "",
            "tag": "div"
          },
          "advancedConfig": {},
          "arrayConfig": {}
        }
      },
      {
        "keyID": "key_10907",
        "keyName": "栅格行",
        "keyCode": "",
        "children": [
          {
            "keyID": "key_86553",
            "keyName": "客户端排序",
            "keyCode": "isClientSort",
            "children": [],
            "dataType": "Bool",
            "arrayDataType": "",
            "componentTypeLabel": "开关",
            "componentType": "Switch",
            "icon": "switch-one",
            "slots": [],
            "config": {
              "formConfig": {},
              "baseConfig": {
                "active-text": "",
                "inactive-text": "",
                "active-value": true,
                "inactive-value": false
              },
              "advancedConfig": {},
              "arrayConfig": {}
            }
          },
          {
            "keyID": "key_95399",
            "keyName": "客户端分页",
            "keyCode": "isClientPage",
            "children": [],
            "dataType": "Bool",
            "arrayDataType": "",
            "componentTypeLabel": "开关",
            "componentType": "Switch",
            "icon": "switch-one",
            "slots": [],
            "config": {
              "formConfig": {},
              "baseConfig": {
                "active-text": "",
                "inactive-text": "",
                "active-value": true,
                "inactive-value": false
              },
              "advancedConfig": {},
              "arrayConfig": {}
            }
          }
        ],
        "dataType": "None",
        "arrayDataType": "",
        "componentTypeLabel": "栅格行",
        "componentType": "Row",
        "icon": "layout-two",
        "slots": [],
        "config": {
          "formConfig": {},
          "baseConfig": {
            "gutter": 10,
            "justify": "start",
            "tag": "div"
          },
          "advancedConfig": {},
          "arrayConfig": {}
        }
      },
      {
        "keyID": "key_31826",
        "keyName": "栅格行",
        "keyCode": "",
        "children": [
          {
            "keyID": "key_44957",
            "keyName": "拖动排序",
            "keyCode": "dragRow",
            "children": [],
            "dataType": "Bool",
            "arrayDataType": "",
            "componentTypeLabel": "开关",
            "componentType": "Switch",
            "icon": "switch-one",
            "slots": [],
            "config": {
              "formConfig": {},
              "baseConfig": {
                "active-text": "",
                "inactive-text": "",
                "active-value": true,
                "inactive-value": false
              },
              "advancedConfig": {},
              "arrayConfig": {}
            }
          },
          {
            "keyID": "key_75130",
            "keyName": "显示分页",
            "keyCode": "hasPage",
            "children": [],
            "dataType": "Bool",
            "arrayDataType": "",
            "componentTypeLabel": "开关",
            "componentType": "Switch",
            "icon": "switch-one",
            "slots": [],
            "config": {
              "formConfig": {},
              "baseConfig": {
                "active-text": "",
                "inactive-text": "",
                "active-value": true,
                "inactive-value": false
              },
              "advancedConfig": {},
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
        "slots": [],
        "config": {
          "formConfig": {},
          "baseConfig": {
            "gutter": 10,
            "justify": "start",
            "tag": "div"
          },
          "advancedConfig": {},
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
        "showMessage": false,
        "inlineMessage": false,
        "statusIcon": false,
        "disabled": false,
        "scrollToError": false,
        "scrollIntoViewOptions": false
      },
      "advancedConfig": {},
      "arrayConfig": {}
    }
  }
]