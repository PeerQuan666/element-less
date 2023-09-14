<template>
    <els-menu 
    @menuClick="handleClick"
    width="200"
    url="http://manage.ybt2023.com/home/TestTree" 
    idField="MenuID"
    labelField="MenuName"
    parentIdField="ParentID"
    ></els-menu>

</template>
<script setup lang="ts">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
function handleClick(item){
ElMessage.success('点击了菜单')
}
</script>
