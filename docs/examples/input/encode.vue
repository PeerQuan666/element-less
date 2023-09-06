<template>
    {{inputValue  }}
    <els-input v-model="inputValue" encode></els-input>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputValue = ref('')
</script>