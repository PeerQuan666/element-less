<template>
    <els-input v-model="inputValue" prefixTag="前标签" width="500" ></els-input>
    <div style="margin-bottom: 10px;"></div>
    <els-input v-model="inputValue" suffixTag="后标签" width="500" ></els-input>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputValue = ref('')
</script>