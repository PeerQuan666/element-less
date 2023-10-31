<template>
  <els-uEditor v-model="mdValue" :showXiumi="true" homeUrl="/element-less/UEditor/"></els-uEditor>
</template>

<script setup>
import { ref } from 'vue'
const mdValue=ref()
</script>