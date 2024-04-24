<template>
    <els-dropdown 
    v-model="selectValue"
    url="http://manage.ybt2023.com/home/test2" 
    label-field="Name" 
    value-field="ID"
    @select="handleCommand"
    maxHeight="200"
    ></els-dropdown>
</template>
<script setup>
import { ref,provide } from 'vue'
const selectValue=ref()
function handleCommand(val){
alert(val)
}
</script>
