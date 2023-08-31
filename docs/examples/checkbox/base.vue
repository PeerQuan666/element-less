<template>
    <bb-checkbox v-model="singleValue">单个</bb-checkbox>
    <bb-checkbox v-model="selectValue" >
        <bb-option :value="1">北京</bb-option>
        <bb-option :value="2">天津</bb-option>
        <bb-option :value="3">福州</bb-option>
        <bb-option :value="4">厦门</bb-option>
    </bb-checkbox>
    <bb-checkbox-button v-model="selectValue" >
        <bb-option :value="1">北京</bb-option>
        <bb-option :value="2">天津</bb-option>
        <bb-option :value="3">福州</bb-option>
        <bb-option :value="4">厦门</bb-option>
    </bb-checkbox-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectValue = ref('')
const singleValue = ref()
</script>