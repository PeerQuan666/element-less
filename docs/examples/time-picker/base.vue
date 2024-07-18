<template>
   
    <els-time-picker v-model="time" label="时间"></els-time-picker>

</template>

<script setup lang="ts">
import { ref ,provide} from 'vue'
const time = ref()
</script>