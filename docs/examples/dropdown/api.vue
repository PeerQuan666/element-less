<template>
    <els-dropdown 
    placeholder="请选择"
    v-model="selectValue"
    url="http://manage.ybt2023.com/home/test2" 
    label-field="Name" 
    value-field="ID"
    @select="handleCommand"
    maxHeight="200"
    ></els-dropdown>
</template>
<script setup>
import { ref } from 'vue'
const selectValue=ref()
function handleCommand(val){
console.log(val)
}
</script>
