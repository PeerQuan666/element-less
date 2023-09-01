<template>
    <bb-input v-model="inputValue"></bb-input>
    <div style="margin-bottom: 10px;"></div>
    <bb-input v-model="inputValue" type="textarea"></bb-input>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputValue = ref('')
</script>