<template>
    <els-menu 
    width="200"
    :data="menuData" 
    idField="MenuID"
    labelField="MenuName"
    parentIdField="ParentID"
    ></els-menu>

</template>

<script setup lang="ts">
import { ref } from 'vue'
const menuData=ref([
    {MenuID:1,MenuName:'菜单1',ParentID:''},
    {MenuID:2,MenuName:'菜单1-1',ParentID:1},
    {MenuID:3,MenuName:'菜单1-2',ParentID:1},
    {MenuID:4,MenuName:'菜单2',ParentID:''},
    {MenuID:5,MenuName:'菜单3',ParentID:''},
])
</script>