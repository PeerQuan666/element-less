<template>
    <els-input v-model="inputValue"></els-input>
    <div style="margin-bottom: 10px;"></div>
    <els-input v-model="inputValue" type="textarea"></els-input>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputValue = ref('')
</script>