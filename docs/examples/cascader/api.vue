<template>
    {{ selectValue }}
    <els-cascader 
    width="200"
    multiple
    v-model="selectValue"
    url="http://manage.ybt2023.com/home/TestTree" 
    idField="MenuID"
    valueField="MenuName"
    labelField="MenuName"
    parentIdField="ParentID"
    ></els-cascader>

</template>
<script setup lang="ts">
import { ref } from 'vue'
const selectValue=ref('人资系统,试卷管理,新增试卷,保存$人资系统,试卷管理,新增试卷,返回')

</script>
