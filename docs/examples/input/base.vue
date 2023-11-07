<template>
    <els-input v-model="inputValue" style="margin-bottom: 10px;"></els-input>
   
    <els-textarea v-model="inputValue"></els-textarea>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputValue = ref('')
</script>