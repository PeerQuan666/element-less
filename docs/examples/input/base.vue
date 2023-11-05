<template>
    <els-input v-model="inputValue"></els-input>
   
    <els-textarea v-model="inputValue"></els-textarea>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputValue = ref('')
const num=ref(3)
</script>