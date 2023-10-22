export default [
	{
		"keyID": "e6b2986e1a5a954b6f2972791efe6d8c",
		"keyName": "标签类型",
		"keyCode": "componentName",
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
				"type": "button",
				"dataType": "String",
				"width": "",
				"optionWidth": "",
				"data": [
					{
						"label": "FormItem",
						"value": "ElsFormItem"
					},
					{
						"label": "Caption",
						"value": "ElsCaption"
					}
				],
				"url": "",
				"labelField": "",
				"valueField": ""
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
		"defaultValue": "ElsFormItem"
	},
	{
		"keyID": "key_99212",
		"keyName": "标题",
		"keyCode": "title",
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
				"width": "",
				"placeholder": "",
				"prefixIcon": "",
				"suffixIcon": "",
				"prefixTag": "",
				"suffixTag": "",
				"maxlength": "",
				"showWordLimit": false,
				"clearable": true,
				"isPassword": false,
				"isTrim": false,
				"encode": false
			},
			"advancedConfig": {
				"style": "",
				"vif": "currNode['componentName'].value=='ElsCaption'",
				"disabled": "",
				"eventChange": ""
			},
			"arrayConfig": {}
		},
		"componentType": "Input",
		"dataType": "String"
	},
	{
		"keyID": "d95dcc72d437eb45e99b0b2207b1cf3e",
		"keyName": "显示类型",
		"keyCode": "type",
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
				"type": "button",
				"dataType": "String",
				"width": "",
				"optionWidth": "",
				"data": [
					{
						"label": "底部",
						"value": "bottom"
					},
					{
						"label": "左侧",
						"value": "left"
					}
				],
				"url": "",
				"labelField": "",
				"valueField": ""
			},
			"advancedConfig": {
				"style": "",
				"vif": "currNode['componentName'].value=='ElsCaption'",
				"disabled": "",
				"eventChange": ""
			}
		},
		"componentType": "Radio",
		"dataType": "String",
		"defaultValue": "bottom"
	}
]