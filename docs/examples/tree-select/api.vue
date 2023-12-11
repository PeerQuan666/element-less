<template>
    <els-tree-select 
    width="200"
    multiple
    v-model="selectValue"
    url="http://manage.ybt2023.com/home/TestTree" 
    idField="MenuID"
    valueField="MenuName"
    labelField="MenuName"
    parentIdField="ParentID"
    :expandDepth="1"
    filterable
    ></els-tree-select>

</template>
<script setup lang="ts">
import { ref } from 'vue'
const selectValue=ref()

</script>
