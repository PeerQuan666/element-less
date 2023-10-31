<template>
  <els-aceEditor v-model="mdValue"></els-aceEditor>
</template>

<script setup>
import { ref } from 'vue'
const mdValue=ref()
</script>