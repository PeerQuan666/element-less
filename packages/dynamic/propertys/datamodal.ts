export const property_datamodal=[
	{
	  "keyID": "e15n2QiSm",
	  "keyName": "Form",
	  "keyCode": "h3mvYQq6FI",
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
	  },
	  "children": [
		{
		  "keyID": "key_43499",
		  "keyName": "栅格行",
		  "keyCode": "",
		  "children": [
			{
			  "keyID": "5e6a12e2af64c446f348f1e26c4ddc9c",
			  "keyName": "按钮文本",
			  "keyCode": "buttonLabel",
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
			  "dataType": "String",
			  "children": []
			},
			{
			  "keyID": "key_17900",
			  "keyName": "按钮宽度",
			  "keyCode": "buttonWidth",
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
		  "keyID": "d2835e6475ee0ed3d227451021029bd8",
		  "keyName": "",
		  "keyCode": "",
		  "config": {
			"formConfig": {},
			"baseConfig": {
			  "gutter": 10,
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
		  "componentType": "Row",
		  "dataType": "None",
		  "children": [
			{
			  "keyID": "c1d53a89bba399d3a92d8c5da572eb9c",
			  "keyName": "显示输入框",
			  "keyCode": "hasInput",
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
			  "defaultValue": true,
			  "children": []
			},
			{
			  "keyID": "e470d73c5920324862ec0b282b43a78c",
			  "keyName": "输入框宽度",
			  "keyCode": "inputWidth",
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
			  "dataType": "String",
			  "children": []
			}
		  ]
		},
		{
		  "keyID": "833125df2e85a8dfcc45a41551c8f6b8",
		  "keyName": "弹窗标题",
		  "keyCode": "title",
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
		  "dataType": "String",
		  "children": []
		},
		{
		  "keyID": "34e5d6d9d646cd77098f9b4f9b057422",
		  "keyName": "",
		  "keyCode": "",
		  "config": {
			"formConfig": {},
			"baseConfig": {
			  "gutter": 10,
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
		  "componentType": "Row",
		  "dataType": "None",
		  "children": [
			{
			  "keyID": "e2389627302a5276b6dbc374e95da0fd",
			  "keyName": "弹窗宽度",
			  "keyCode": "width",
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
			  "dataType": "String",
			  "children": []
			},
			{
			  "keyID": "464b8e722ef921cd4cf003b05200834b",
			  "keyName": "弹窗高度",
			  "keyCode": "height",
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
			  "dataType": "String",
			  "children": []
			}
		  ]
		},
		{
		  "keyID": "9495b741e0a80d7c6a7ab0f5a2968016",
		  "keyName": "跳转类型",
		  "keyCode": "targetType",
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
			  "multiple": false,
			  "clearable": false,
			  "filterable": false,
			  "allow-create": false,
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
		  "dataType": "String",
		  "children": []
		},
		{
		  "keyID": "11495a7047412ffe5ad3afc18b4ca815",
		  "keyName": "弹窗地址",
		  "keyCode": "url",
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
		  "dataType": "String",
		  "children": []
		},
		{
		  "keyID": "eaf764e8002b9bde9219cdc29e25be92",
		  "keyName": "数据接口",
		  "keyCode": "dataUrl",
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
			  "showWordLimit": false,
			  "maxlength": "",
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
		  "dataType": "String",
		  "children": []
		},
		{
		  "keyID": "key_74586",
		  "keyName": "栅格行",
		  "keyCode": "",
		  "children": [
			{
			  "keyID": "key_25303",
			  "keyName": "按钮组件名",
			  "keyCode": "buttonComponent",
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
				"baseConfig": {
				  "width": "",
				  "placeholder": "",
				  "prefixIcon": "",
				  "suffixIcon": "",
				  "prefixTag": "",
				  "suffixTag": "",
				  "showWordLimit": false,
				  "maxlength": "",
				  "clearable": true,
				  "showPassword": false,
				  "isTrim": false,
				  "encode": false
				},
				"advancedConfig": {},
				"arrayConfig": {}
			  }
			},
			{
			  "keyID": "key_10491",
			  "keyName": "有值时显示Badge",
			  "keyCode": "showBadge",
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
		  "keyID": "key_74816",
		  "keyName": "按钮属性",
		  "keyCode": "buttonProps",
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
				  "keyID": "key_94797",
				  "keyName": "按钮属性",
				  "keyCode": "default",
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
					  "style": "height:450px",
					  "vif": "",
					  "disabled": "",
					  "eventChange": ""
					},
					"arrayConfig": {}
				  },
				  "componentTypeName": "JsonEditor",
				  "dataTypeName": "Object",
				  "componentName": "ElsJsonEditor",
				  "formItem": true,
				  "componentGroup": "Form"
				}
			  ]
			}
		  ],
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
			  "buttonLabel": "编辑属性",
			  "buttonWidth": "100%",
			  "hasInput": false,
			  "inputWidth": "",
			  "title": "",
			  "width": "",
			  "height": "",
			  "targetType": "",
			  "url": "",
			  "dataUrl": "",
			  "buttonComponent": "",
			  "showBadge": 1,
			  "buttonProps": {},
			  "functionconfirm": ""
			},
			"advancedConfig": {
			  "style": "",
			  "vif": "",
			  "disabled": "",
			  "eventChange": ""
			},
			"arrayConfig": {}
		  },
		  "defaultValue": ""
		},
		{
		  "keyID": "key_84495",
		  "keyName": "确认事件",
		  "keyCode": "functionconfirm",
		  "children": [],
		  "dataType": "String",
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
				  "keyID": "key_47295",
				  "keyName": "确认事件",
				  "keyCode": "default",
				  "children": [],
				  "dataType": "String",
				  "dataTypeName": "String",
				  "arrayDataTypeName": "",
				  "arrayDataType": "",
				  "componentGroup": "Form",
				  "componentTypeLabel": "Ace编辑器",
				  "componentTypeName": "AceEditor",
				  "componentName": "ElsAceEditor",
				  "componentType": "AceEditor",
				  "formItem": true,
				  "componentShow": true,
				  "icon": "text-style",
				  "slots": [],
				  "config": {
					"formConfig": {},
					"baseConfig": {
					  "rows": 25,
					  "readonly": false,
					  "theme": "",
					  "language": ""
					},
					"advancedConfig": {},
					"arrayConfig": {}
				  }
				}
			  ]
			}
		  ],
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
			  "buttonLabel": "编辑事件",
			  "buttonWidth": "100%",
			  "hasInput": false,
			  "inputWidth": "",
			  "title": "",
			  "width": "",
			  "height": "",
			  "targetType": "",
			  "url": "",
			  "dataUrl": "",
			  "buttonComponent": "",
			  "showBadge": 1,
			  "buttonProps": {},
			  "functionconfirm": ""
			},
			"advancedConfig": {
			  "style": "",
			  "vif": "",
			  "disabled": "",
			  "eventChange": ""
			},
			"arrayConfig": {}
		  },
		  "defaultValue": ""
		}
	  ]
	}
  ]