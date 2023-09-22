<template>
  <els-upload v-model="fileValue" type="File" multiple ></els-upload>
</template>
<script setup>
import { ref } from 'vue'
const fileValue = ref()
</script>
  
