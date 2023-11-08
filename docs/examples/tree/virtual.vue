<template>
    <els-tree 
    isVirtual
    width="200"
    multiple
    v-model="selectValue"
    url="http://manage.ybt2023.com/home/TestTree" 
    valueField="MenuID"
    labelField="MenuName"
    parentIdField="ParentID"
    filterable
    :expandDepth="1"
    :height="208"
    ></els-tree>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const selectValue = ref('0952CC0FDF6244F49613861BA5F2623A')
</script>