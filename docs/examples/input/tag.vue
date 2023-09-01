<template>
    <bb-input v-model="inputValue" prefixTag="前标签" ></bb-input>
    <div style="margin-bottom: 10px;"></div>
    <bb-input v-model="inputValue" suffixTag="后标签"></bb-input>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputValue = ref('')
</script>