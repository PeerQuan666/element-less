<template>
 <els-dynamic-designer v-model="config" >
</els-dynamic-designer>

</template>

<script setup>
import { ref } from 'vue'
const test=ref('<p>sadasdsadsa</p>')
const config = ref([
  {
    "keyID": "key_16486",
    "keyName": "a",
    "keyCode": "a",
    "required": false,
    "config": {
      "formConfig": {},
      "baseConfig": {
        "type": "File"
      },
      "advancedConfig": {},
      "arrayConfig": {}
    },
    "componentType": "UploadFile",
    "dataType": "String",
    "data": []
  },
  {
    "keyID": "key_7706",
    "keyName": "b",
    "keyCode": "b",
    "data": [
      {
        "keyID": "key_95198",
        "keyName": "bb",
        "keyCode": "bb",
        "data": [],
        "required": false,
        "config": {
          "formConfig": {},
          "baseConfig": {},
          "advancedConfig": {},
          "arrayConfig": {}
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "required": false,
    "config": {
      "formConfig": {},
      "baseConfig": {},
      "advancedConfig": {},
      "arrayConfig": {}
    },
    "dataType": "Object"
  }
])
</script>