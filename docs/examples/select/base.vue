<template>
    <els-select v-model="selectValue" placeholder="单选">
        <els-option :value="1">北京</els-option>
        <els-option :value="2">天津</els-option>
        <els-option :value="3">福州</els-option>
        <els-option :value="4">厦门</els-option>
    </els-select>
    <els-select style="margin-left: 10px;" v-model="mutiValue" multiple placeholder="多选">
        <els-option :value="1">北京</els-option>
        <els-option :value="2">天津</els-option>
        <els-option :value="3">福州</els-option>
        <els-option :value="4">厦门</els-option>
    </els-select>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectValue = ref('')
const mutiValue=ref('')
</script>