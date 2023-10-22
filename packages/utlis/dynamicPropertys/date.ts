export default [
	{
		"keyID": "3169c3c3186532321c4f0ac69cad4939",
		"keyName": "类型",
		"keyCode": "type",
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
				"dataType": "String",
				"data": [
					{
						"label": "日期",
						"value": "date"
					},
					{
						"label": "日期范围",
						"value": "daterange"
					},
					{
						"label": "日期时间",
						"value": "datetime"
					},
					{
						"label": "日期时间范围",
						"value": "datetimerange"
					},
					{
						"label": "年",
						"value": "year"
					},
					{
						"label": "月",
						"value": "month"
					},
					{
						"label": "月范围",
						"value": "monthrange"
					},
					{
						"label": "周",
						"value": "week"
					},
					{
						"label": "多日期",
						"value": "dates"
					}
				],
				"url": "",
				"labelField": "",
				"valueField": "",
				"multiple": false,
				"clearable": false,
				"filterable": false,
				"allow-create": false,
				"width": "",
				"placeholder": "",
				"teleported": true,
				"remote": false
			},
			"advancedConfig": {
				"style": "",
				"vif": "",
				"disabled": "",
				"eventChange": ""
			},
			"arrayConfig": {}
		},
		"componentType": "Select",
		"dataType": "String"
	},
	{
		"keyID": "54b51767d5823fedde4bf4d81161d56b",
		"keyName": "宽度",
		"keyCode": "width",
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
		"keyID": "7b0cb2c91ce84caa8130caab6e9c5b8f",
		"keyName": "",
		"keyCode": "",
		"data": [
			{
				"keyID": "d4d89b4984ee0d263b582c99872c06cd",
				"keyName": "显示格式",
				"keyCode": "format",
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
				"keyID": "d65abcb2dcfbcee1c8cc1c125b1f8c82",
				"keyName": "值格式",
				"keyCode": "valueFormat",
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
			}
		],
		"config": {
			"formConfig": {},
			"baseConfig": {},
			"advancedConfig": {},
			"arrayConfig": {}
		},
		"componentType": "Row",
		"dataType": "None"
	},
	{
		"keyID": "eebed46cca84132e0d2da329e3b5b537",
		"keyName": "",
		"keyCode": "",
		"data": [
			{
				"keyID": "6ba1e2ef0f37b5c5d6926ade6cc90288",
				"keyName": "可输入",
				"keyCode": "editable",
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
				"keyID": "c739beaf93387f2638fe67377db95dd7",
				"keyName": "可清除",
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
			}
		],
		"config": {
			"formConfig": {},
			"baseConfig": {},
			"advancedConfig": {},
			"arrayConfig": {}
		},
		"componentType": "Row",
		"dataType": "None"
	}
]