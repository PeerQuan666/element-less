<template>
    {{ selectValue }}
    <els-tree 
    width="200"
    multiple
    v-model="selectValue"
    url="http://manage.ybt2023.com/home/TestTree" 
    valueField="MenuName"
    idField="MenuID"
    labelField="MenuName"
    parentIdField="ParentID"
    filterable
    :expandDepth="1"
    :valueInOrder="true"
    ></els-tree>

</template>
<script setup lang="ts">
import { ref } from 'vue'
const selectValue=ref('人资系统,用户管理,分类管理,试卷管理,题库管理')

</script>
