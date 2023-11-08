<template>
    <els-slider v-model="selectValue" :range="true" ></els-slider>
</template>

<script setup>
import { ref } from 'vue'
const selectValue = ref('40,77')

</script>