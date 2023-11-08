<template>
    <els-slider v-model="selectValue" :showInput="true" controlsPosition="right"></els-slider>
</template>

<script setup>
import { ref } from 'vue'
const selectValue = ref(33)
</script>