<template>
    <els-slider v-model="selectValue" range ></els-slider>
</template>

<script setup>
import { ref } from 'vue'
const selectValue = ref('40,77')

</script>