<template>
    {{ start }}
    <els-time-picker-range  v-model="time" v-model:start="start" v-model:end="end"  label="时间范围"></els-time-picker-range>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const time = ref()
const start=ref()
const end=ref()
</script>