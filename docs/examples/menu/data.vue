<template>
        <els-radio-button v-model="isCollapse">
        <els-option :value="false">展开</els-option>
        <els-option :value="true">缩起</els-option>
    </els-radio-button>
    <els-menu 
    width="200"
    :collapse="isCollapse"
    :data="menuData" 
    idField="MenuID"
    labelField="MenuName"
    parentIdField="ParentID"
    iconField="Icon"
    ></els-menu>

</template>

<script setup lang="ts">
import { ref } from 'vue'
const isCollapse=ref(false)
const menuData=ref([
    {MenuID:1,MenuName:'菜单1',ParentID:'',Icon:'edit'},
    {MenuID:2,MenuName:'菜单1-1',ParentID:1,Icon:'remove'},
    {MenuID:3,MenuName:'菜单1-2',ParentID:1,Icon:'delete'},
    {MenuID:4,MenuName:'菜单2',ParentID:'',Icon:'edit'},
    {MenuID:5,MenuName:'菜单3',ParentID:'',Icon:'edit'},
])
</script>