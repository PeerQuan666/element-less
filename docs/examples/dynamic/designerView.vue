<template>
 <els-dynamic-designer-view v-model="config"  :appendComponentTypes="componentTypes" >
</els-dynamic-designer-view>

</template>

<script setup>
import { ref } from 'vue'
const componentTypes=ref([
{
        "id": 211,
        "componentName": "ElsDynamicRender",
        "label": "测试组件",
        "value": "测试组件",
        "type": "DynamicRender",
        "dataTypes": [
            "Object"
        ],
        "defaultPropertys": {
            "hasForm":false,
            "config": [
                {
                    "keyID": "key0_000",
                    "keyName": "ddd",
                    "keyCode": "ddd",
                    "data": [

                    ],
                    "dataType": "String",
                    "componentType": "Input",
                    "required": true,
                    "description": "ddd",
                    "config": {
                        "formConfig": {

                        },
                        "baseConfig": {

                        },
                        "advancedConfig": {

                        },
                        "arrayConfig": {

                        }
                    },
                    "arrayDataType": "",
                    "defaultValue": ""
                }
            ]
        },
        "group": "Form"
}
])
const test=ref('<p>sadasdsadsa</p>')
const config = ref()
</script>