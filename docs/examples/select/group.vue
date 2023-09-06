<template>
    <els-select v-model="selectValue">
        <els-option-group label="分组1">
            <els-option :value="1">北京</els-option>
            <els-option :value="2">天津</els-option>
        </els-option-group>
        <els-option-group label="分组2">
            <els-option :value="3">福州</els-option>
            <els-option :value="4">厦门</els-option>
        </els-option-group>
    </els-select>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const selectValue = ref('')
</script>