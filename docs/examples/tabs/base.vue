<template>
  <els-tabs v-model="selectValue">
    <els-option :value="1" label="北京"></els-option>
    <els-option :value="2" label="天津"></els-option>
    <els-option :value="3" label="福州"></els-option>
    <els-option :value="4" label="厦门"></els-option>
  </els-tabs>
  <div>

  </div>



</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectValue = ref(2)
</script>