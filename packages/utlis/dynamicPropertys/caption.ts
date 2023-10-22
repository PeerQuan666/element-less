export default [
	{
		"keyID": "be4a36ad3dc655baa5d0eab3ae93a494",
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
				"vif": "",
				"disabled": "",
				"eventChange": ""
			}
		},
		"componentType": "Radio",
		"dataType": "String",
		"defaultValue": "bottom"
	}
]