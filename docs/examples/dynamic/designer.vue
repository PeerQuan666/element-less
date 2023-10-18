<template>
    <ElsDynamicDesigner v-model="config"></ElsDynamicDesigner>
    <ElsDynamicRender v-model="value" :config="config"></ElsDynamicRender>
</template>

<script setup>
import { ref } from 'vue'
const value = ref()
const config=ref()
</script>