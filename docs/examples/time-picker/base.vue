<template>
   
    <els-time-picker v-model="time" label="时间"></els-time-picker>

</template>

<script setup lang="ts">
import { ref ,provide} from 'vue'
provide('isMobile',true)
const time = ref()
</script>