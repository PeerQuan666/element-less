<template>
    <ElsDynamicDesigner v-model="config"></ElsDynamicDesigner>
</template>

<script setup>
import { ref } from 'vue'
const value = ref()
const config=ref()
</script>