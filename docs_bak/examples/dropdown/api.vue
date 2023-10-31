<template>
    <els-dropdown 
    url="http://manage.ybt2023.com/home/test2" 
    label-field="Name" 
    value-field="ID"
    title="读取接口"
    @command="handleCommand"
    ></els-dropdown>
</template>
<script setup>
function handleCommand(val){
console.info(val)
}
</script>
