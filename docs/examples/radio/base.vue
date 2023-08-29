<template>
    <div>
        <bb-radio v-model="selectValue">
        <bb-option :value="1">北京</bb-option>
        <bb-option :value="2">天津</bb-option>
        <bb-option :value="3">福州</bb-option>
        <bb-option :value="4">厦门</bb-option>
    </bb-radio>
    </div>
  
    <div>
        <bb-radio-button v-model="selectValue">
            <bb-option :value="1">北京</bb-option>
            <bb-option :value="2">天津</bb-option>
            <bb-option :value="3">福州</bb-option>
            <bb-option :value="4">厦门</bb-option>
        </bb-radio-button>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectValue = ref('')
</script>