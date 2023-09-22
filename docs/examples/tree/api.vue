<template>
    <els-tree 
    width="200"
    multiple
    v-model="selectValue"
    url="http://manage.ybt2023.com/home/TestTree" 
    valueField="MenuID"
    labelField="MenuName"
    parentIdField="ParentID"
    filterable
    :expandDepth="1"
    ></els-tree>

</template>
<script setup lang="ts">
import { ref } from 'vue'
const selectValue=ref()

</script>
