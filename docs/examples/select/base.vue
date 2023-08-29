<template>
    <bb-select v-model="selectValue" placeholder="单选">
        <bb-option :value="1">北京</bb-option>
        <bb-option :value="2">天津</bb-option>
        <bb-option :value="3">福州</bb-option>
        <bb-option :value="4">厦门</bb-option>
    </bb-select>
    <bb-select style="margin-left: 10px;" v-model="mutiValue" multiple placeholder="多选">
        <bb-option :value="1">北京</bb-option>
        <bb-option :value="2">天津</bb-option>
        <bb-option :value="3">福州</bb-option>
        <bb-option :value="4">厦门</bb-option>
    </bb-select>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectValue = ref('')
const mutiValue=ref('')
</script>