export const property_select= [
	{
	  "keyID": "M_kzawTmA",
	  "keyName": "Form",
	  "keyCode": "g2IUO-5Ioa",
	  "children": [
		{
		  "keyID": "c22a17d687c1569a7fe2e7979b12e9a0",
		  "keyName": "数据源",
		  "keyCode": "dataType",
		  "children": [],
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
			  "type": "button",
			  "dataType": "String",
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
		  "children": [
			{
			  "keyID": "key_84693",
			  "keyName": "栅格行",
			  "keyCode": "key_1213",
			  "children": [
				{
				  "keyID": "6f3b17406d7edb401dcecddcb764c7e4",
				  "keyName": "",
				  "keyCode": "label",
				  "children": [],
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
				  "children": [],
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
		  "children": [],
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
		  "children": [
			{
			  "keyID": "84f659e12c75e78abad11c3c31932c0e",
			  "keyName": "显示字段",
			  "keyCode": "labelField",
			  "children": [],
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
			  "children": [],
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
			  "vif": "currNode['dataType'].value==2",
			  "disabled": "",
			  "eventChange": ""
			}
		  },
		  "componentType": "Row",
		  "dataType": "None"
		},
		{
		  "keyID": "key_16781",
		  "keyName": "栅格行",
		  "keyCode": "key_72437",
		  "children": [
			{
			  "keyID": "5c703310ff0bb2e0813d72c109c2e11e",
			  "keyName": "多选",
			  "keyCode": "multiple",
			  "children": [],
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
		  "children": [
			{
			  "keyID": "d9363d60122ee734a915d63607a072d1",
			  "keyName": "是否筛选",
			  "keyCode": "filterable",
			  "children": [],
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
			  "keyName": "远程搜索",
			  "keyCode": "remote",
			  "children": [],
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
				  "active-value": true,
				  "inactive-value": false
				},
				"advancedConfig": {
				  "style": "",
				  "vif": "parentNode['dataType'].value==2",
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
		  "keyID": "546662ca44854844760cd0fc4898ed72",
		  "keyName": "",
		  "keyCode": "",
		  "children": [
			{
			  "keyID": "dee3c6c8402ca1fba8fe695c6dcacbc0",
			  "keyName": "宽度",
			  "keyCode": "width",
			  "children": [],
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
				},
				"arrayConfig": {}
			  },
			  "componentType": "Input",
			  "dataType": "String"
			},
			{
			  "keyID": "0f273ad1e2f7cfde654ba61f8b7c7696",
			  "keyName": "占位文本",
			  "keyCode": "placeholder",
			  "children": [],
			  "config": {
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
				},
				"arrayConfig": {}
			  },
			  "componentType": "Input",
			  "dataType": "String"
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
		  "keyID": "365c62d24d6308cf925c4b12015ced92",
		  "keyName": "",
		  "keyCode": "",
		  "children": [
			{
			  "keyID": "717bb3d97275644535b5314d957f1b7a",
			  "keyName": "显示清除",
			  "keyCode": "clearable",
			  "children": [],
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
			  "keyID": "af94f7071b16b8ec37b188ca79f98c3b",
			  "keyName": "元素插入Body",
			  "keyCode": "teleported",
			  "children": [],
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
			}
		  ],
		  "config": {
			"formConfig": {},
			"baseConfig": {
			  "gutter": "",
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
		  "keyID": "645dfc27b5e7fc8d70eed47c2bc868c4",
		  "keyName": "允许创建",
		  "keyCode": "allow-create",
		  "children": [],
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
			  "active-value": true,
			  "inactive-value": false
			},
			"advancedConfig": {
			  "style": "",
			  "vif": "currNode['filterable'].value==true",
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