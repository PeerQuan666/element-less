<template>
    <els-checkbox v-model="selectValue" 
    :url="apiUrl" 
    label-field="Name" 
    value-field="ID"
    height="600"
    option-width="40%"
    filterable
    ></els-checkbox>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const apiUrl = 'http://dataopenapi.tm.babybus.com/StatTag/GetUserGroupTagData?SysTag=Business&Power_CoteID_ProductID=manage&Power_MenuID=6aef7da4c8434aba886c99fec83e4d51'
const selectValue = ref('')
</script>