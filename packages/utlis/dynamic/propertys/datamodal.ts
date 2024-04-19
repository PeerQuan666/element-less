export const property_datamodal= [
	{
		"keyID": "5e6a12e2af64c446f348f1e26c4ddc9c",
		"keyName": "按钮文本",
		"keyCode": "buttonLabel",
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
		"keyID": "d2835e6475ee0ed3d227451021029bd8",
		"keyName": "",
		"keyCode": "",
		"data": [
			{
				"keyID": "c1d53a89bba399d3a92d8c5da572eb9c",
				"keyName": "显示输入框",
				"keyCode": "hasInput",
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
				"keyID": "e470d73c5920324862ec0b282b43a78c",
				"keyName": "输入框宽度",
				"keyCode": "inputWidth",
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
						"vif": "currNode['hasInput'].value==true",
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
		"keyID": "833125df2e85a8dfcc45a41551c8f6b8",
		"keyName": "弹窗标题",
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
		"keyID": "34e5d6d9d646cd77098f9b4f9b057422",
		"keyName": "",
		"keyCode": "",
		"data": [
			{
				"keyID": "e2389627302a5276b6dbc374e95da0fd",
				"keyName": "弹窗宽度",
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
				"keyID": "464b8e722ef921cd4cf003b05200834b",
				"keyName": "弹窗高度",
				"keyCode": "height",
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
		"keyID": "9495b741e0a80d7c6a7ab0f5a2968016",
		"keyName": "跳转类型",
		"keyCode": "targetType",
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
						"label": "路由",
						"value": "route"
					},
					{
						"label": "链接",
						"value": "link"
					},
					{
						"label": "手动填写",
						"value": "normal"
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
				"eventChange": "if(val==='route'){\ncurrNode['url'].value='/AppConfigManage/ReadData/SelectTemplateJsonData';\n}else if(val==='link'){\ncurrNode['url'].value='/AppConfigManage/ReadData/SelectRouteData';\n}else{\ncurrNode['url'].value=''\n}"
			},
			"arrayConfig": {}
		},
		"componentType": "Select",
		"dataType": "String"
	},
	{
		"keyID": "11495a7047412ffe5ad3afc18b4ca815",
		"keyName": "弹窗地址",
		"keyCode": "url",
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
		"keyID": "eaf764e8002b9bde9219cdc29e25be92",
		"keyName": "数据接口",
		"keyCode": "dataUrl",
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
]