<template>
  <els-upload v-model="fileValue" type="Pic"  ></els-upload>
</template>
<script setup>
import { ref } from 'vue'
const fileValue = ref()
</script>
  
