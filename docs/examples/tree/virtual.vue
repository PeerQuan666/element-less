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
    :expandDepth="2"
    :height="208"
    ></els-tree>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const selectValue = ref('a1abf82a846c43b89deea3b0f0e625ed,9ec7cfca288646a9a6d38f8c08e8dcb5,6e03174cb49641408e688beef68cc165,50e97e0a88594195be421eb8c66ff1e4')
</script>