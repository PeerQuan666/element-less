<template>
    <els-autocomplete v-model="selectValue" :url="apiUrl" value-field="Name" width="300"></els-autocomplete>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectValue = ref('')
const apiUrl = 'http://manage.ybt2023.com/home/test2'
</script>