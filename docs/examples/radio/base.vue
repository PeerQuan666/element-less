<template>
    <div>
        <els-radio v-model="selectValue">
        <els-option :value="1">北京</els-option>
        <els-option :value="2">天津</els-option>
        <els-option :value="3">福州</els-option>
        <els-option :value="4">厦门</els-option>
    </els-radio>
    </div>
  
    <div>
        <els-radio-button v-model="selectValue">
            <els-option :value="1">北京</els-option>
            <els-option :value="2">天津</els-option>
            <els-option :value="3">福州</els-option>
            <els-option :value="4">厦门</els-option>
        </els-radio-button>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectValue = ref('')
</script>