<template>
  {{ fileValue }}
  <els-upload v-model="fileValue" type="File"  ></els-upload>
</template>
<script setup>
import { ref,provide } from 'vue'
const fileValue = ref('saa')
</script>
  
