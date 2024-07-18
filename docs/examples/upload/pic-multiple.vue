<template>
  <els-upload v-model="fileValue" type="Pic" multiple ></els-upload>
</template>
<script setup>
import { ref ,provide} from 'vue'
const fileValue = ref()
</script>
  
