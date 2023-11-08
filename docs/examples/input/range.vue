<template>
    <els-input-range v-model="inputValue"></els-input-range>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputValue = ref('')
</script>