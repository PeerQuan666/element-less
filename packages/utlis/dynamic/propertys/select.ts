export const property_select= [
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
		  "dataType": "String",
		  "componentGroup": "Form",
		  "componentTypeName": "Input",
		  "dataTypeName": "String",
		  "componentName": "ElsInput",
		  "value": ""
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
		  "dataType": "String",
		  "componentGroup": "Form",
		  "componentTypeName": "Input",
		  "dataTypeName": "String",
		  "componentName": "ElsInput",
		  "value": ""
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
	},
	{
	  "keyID": "5c703310ff0bb2e0813d72c109c2e11e",
	  "keyName": "多选",
	  "keyCode": "multiple",
	  "data": [],
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
			  "label": "数字",
			  "value": "number"
			},
			{
			  "label": "字符串",
			  "value": "string"
			}
		  ],
		  "url": "",
		  "labelField": "",
		  "valueField": ""
		},
		"advancedConfig": {
		  "style": "",
		  "vif": "currNode['multiple'].value==true",
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
		  "dataType": "Bool",
		  "defaultValue": "true"
		},
		{
		  "keyID": "050471fcd7085a37d8cefba26e3371ee",
		  "keyName": "远程搜索",
		  "keyCode": "remote",
		  "data": [],
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
			  "active-text": "",
			  "inactive-text": "",
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
	  "keyID": "546662ca44854844760cd0fc4898ed72",
	  "keyName": "",
	  "keyCode": "",
	  "data": [
		{
		  "keyID": "dee3c6c8402ca1fba8fe695c6dcacbc0",
		  "keyName": "宽度",
		  "keyCode": "width",
		  "data": [],
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
		  "data": [],
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
	  "keyID": "365c62d24d6308cf925c4b12015ced92",
	  "keyName": "",
	  "keyCode": "",
	  "data": [
		{
		  "keyID": "717bb3d97275644535b5314d957f1b7a",
		  "keyName": "显示清除",
		  "keyCode": "clearable",
		  "data": [],
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
		  "dataType": "Bool",
		  "defaultValue": "true"
		},
		{
		  "keyID": "af94f7071b16b8ec37b188ca79f98c3b",
		  "keyName": "元素插入Body",
		  "keyCode": "teleported",
		  "data": [],
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
	  "data": [],
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
		  "active-text": "",
		  "inactive-text": "",
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
  ]