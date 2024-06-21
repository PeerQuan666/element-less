export const property_radio= [
	{
	  "keyID": "LJKGNyWMZ",
	  "keyName": "Form",
	  "keyCode": "Pwvqrd0lyO",
	  "children": [
		{
		  "keyID": "bc2fec2427ddd08fe7598b05dacedf29",
		  "keyName": "按钮样式",
		  "keyCode": "type",
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
				  "label": "radio",
				  "value": "radio"
				},
				{
				  "label": "按钮",
				  "value": "button"
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
		  "dataType": "String",
		  "defaultValue": "button"
		},
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
		  "keyID": "31aec5af7c8512667d41fdc786abf868",
		  "keyName": "",
		  "keyCode": "",
		  "children": [
			{
			  "keyID": "0b03a97658d4d34efe23eb40baa11766",
			  "keyName": "宽度",
			  "keyCode": "width",
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
				  "vif": "",
				  "disabled": "",
				  "eventChange": ""
				}
			  },
			  "componentType": "Input",
			  "dataType": "String"
			},
			{
			  "keyID": "a61c2f0caca98debc569b26c7d3b0c8c",
			  "keyName": "选项宽度",
			  "keyCode": "optionWidth",
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
			  "tag": "div"
			},
			"advancedConfig": {
			  "style": "",
			  "vif": "currNode['type'].value=='radio' ",
			  "disabled": "",
			  "eventChange": ""
			}
		  },
		  "componentType": "Row",
		  "dataType": "None"
		},
		{
		  "keyID": "key_99574",
		  "keyName": "数据列表",
		  "keyCode": "data",
		  "children": [
			{
			  "keyID": "key_52808",
			  "keyName": "栅格行",
			  "keyCode": "key_87429",
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
				  "gutter": "10",
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
		  "dataType": "Array",
		  "componentTypeLabel": "Array<T>",
		  "componentType": "",
		  "arrayDataType": "Object",
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
			  "componentName": "ElsFormItem",
			  "title": "",
			  "type": "left",
			  "inline": false,
			  "labelPosition": "",
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
			},
			"arrayConfig": {
			  "arrayDefaultLength": "1",
			  "arrangementType": "Vertical",
			  "maxHeight": "",
			  "maxWidth": "",
			  "borderType": ""
			}
		  }
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
			  "gutter": "10",
			  "justify": "",
			  "align": "",
			  "tag": "div"
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