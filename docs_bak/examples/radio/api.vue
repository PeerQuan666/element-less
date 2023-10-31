<template>
    <els-radio v-model="selectValue" 
    :url="apiUrl" 
    label-field="Name" 
    value-field="ID"
    height="600"
    option-width="40%"
    filterable
    ></els-radio>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const apiUrl = 'http://manage.ybt2023.com/home/test2'
const selectValue = ref('')
</script>