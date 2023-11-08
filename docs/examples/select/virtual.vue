<template>
    <els-select 
    isVirtual
    filterable
    multiple
    :multiple-limit="2"
    v-model="selectValue" 
    :url="apiUrl" 
    label-field="Name" 
    value-field="ID"
    width="500"
    ></els-select>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const apiUrl = 'http://manage.ybt2023.com/home/test2'
const selectValue = ref('0952CC0FDF6244F49613861BA5F2623A')
</script>