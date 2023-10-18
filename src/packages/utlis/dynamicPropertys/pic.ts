export default[
	{
		"keyID": "9116dba237f1b937269b287d469c0edb",
		"keyName": "上传地址",
		"keyCode": "url",
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
		"controlType": 1,
		"dataType": 1
	},
	{
		"keyID": "d1dbb0e693a82a2e813338c4b5f7a8fe",
		"keyName": "大小限制M",
		"keyCode": "sizeLimit",
		"data": [],
		"config": {
			"formConfig": {
				"labelWidth": "",
				"required": false,
				"requiredMessage": "",
				"validType": "Float",
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
		"controlType": 1,
		"dataType": 1
	},
	{
		"keyID": "81704d07c46be9883f52fff36096c470",
		"keyName": "尺寸限制",
		"keyCode": "picLimitType",
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
				"type": "button",
				"dataType": 1,
				"width": "",
				"optionWidth": "",
				"data": [
					{
						"label": "不限制",
						"value": ""
					},
					{
						"label": "最小",
						"value": "Min"
					},
					{
						"label": "最大",
						"value": "Max"
					},
					{
						"label": "固定",
						"value": "Fixed"
					},
					{
						"label": "等比",
						"value": "FixedProportion"
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
			},
			"arrayConfig": {}
		},
		"controlType": 7,
		"dataType": 1
	},
	{
		"keyID": "b0c58a556779de8a47657b5d3edef014",
		"keyName": "",
		"keyCode": "",
		"data": [
			{
				"keyID": "ff0df9e76d758379b9f8e8700511bfb5",
				"keyName": "限制宽度",
				"keyCode": "picWidthLimit",
				"data": [],
				"config": {
					"formConfig": {
						"labelWidth": "",
						"required": false,
						"requiredMessage": "",
						"validType": "Float",
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
				"controlType": 1,
				"dataType": 1
			},
			{
				"keyID": "1941031bd3d8bdd983a7c61913ac3d5f",
				"keyName": "限制高度",
				"keyCode": "picHeightLimit",
				"data": [],
				"config": {
					"formConfig": {
						"labelWidth": "",
						"required": false,
						"requiredMessage": "",
						"validType": "Float",
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
				"controlType": 1,
				"dataType": 1
			}
		],
		"config": {
			"formConfig": {},
			"baseConfig": {},
			"advancedConfig": {
				"vif": "currNode['picLimitType'].value!=''"
			},
			"arrayConfig": {}
		},
		"controlType": 100,
		"dataType": 0
	},
	{
		"keyID": "6883b83615ea250e48565d57b2d35129",
		"keyName": "",
		"keyCode": "",
		"data": [
			{
				"keyID": "a3934e6fea5f41511c66c31a3f63007f",
				"keyName": "ResourceCode",
				"keyCode": "resourceCode",
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
				"controlType": 1,
				"dataType": 1
			},
			{
				"keyID": "61f4392caabdb4e90c59c255cb086457",
				"keyName": "RestrictCode",
				"keyCode": "restrictCode",
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
				"controlType": 1,
				"dataType": 1
			}
		],
		"config": {
			"formConfig": {},
			"baseConfig": {},
			"advancedConfig": {},
			"arrayConfig": {}
		},
		"controlType": 100,
		"dataType": 0
	},
	{
		"keyID": "7a9f6a9ff34b9e589df040d2d2bf2767",
		"keyName": "文件类型",
		"keyCode": "fileTypes",
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
		"controlType": 1,
		"dataType": 1
	},
	{
		"keyID": "e5041a10342b4f1a233398c4241c0450",
		"keyName": "",
		"keyCode": "",
		"data": [
			{
				"keyID": "302ea0f0796e7becdbd254d712f57132",
				"keyName": "返回MD5参数",
				"keyCode": "hasMd5Parameter",
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
				"controlType": 4,
				"dataType": 3
			},
			{
				"keyID": "45821220bef3c5ef1ac3bfa11af3bb38",
				"keyName": "返回尺寸",
				"keyCode": "isReturnSize",
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
				"controlType": 4,
				"dataType": 3
			}
		],
		"config": {
			"formConfig": {},
			"baseConfig": {},
			"advancedConfig": {},
			"arrayConfig": {}
		},
		"controlType": 100,
		"dataType": 0
	}
]