<template>
    <els-slider v-model="selectValue" showInput controls-position="right"></els-slider>
</template>

<script setup>
import { ref } from 'vue'
const selectValue = ref(33)
</script>