<template>
    <els-time-picker-range  v-model="time"   label="时间范围"></els-time-picker-range>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const time = ref()
</script>