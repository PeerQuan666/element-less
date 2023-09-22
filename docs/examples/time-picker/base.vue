<template>
{{ time }}
    <els-time-picker v-model="time" label="时间"></els-time-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const time = ref()
const time1 = ref()

</script>