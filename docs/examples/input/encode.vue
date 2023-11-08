<template>
    {{inputValue  }}
    <els-input v-model="inputValue" :encode="true" width="500"></els-input>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputValue = ref('')
</script>