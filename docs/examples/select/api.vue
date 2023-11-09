<template>
    <els-select v-model="selectValue" 
    :url="apiUrl" 
    multiple
    label-field="Name" 
    value-field="ID"
    ></els-select>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const apiUrl = 'http://manage.ybt2023.com/home/test2'
const selectValue = ref('0952CC0FDF6244F49613861BA5F2623A')
</script>