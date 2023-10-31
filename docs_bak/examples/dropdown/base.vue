<template>
    <els-dropdown v-model="selectValue" title="下拉">
        <template #dropdown>
            <els-option :value="1">北京</els-option>
            <els-option :value="2">天津</els-option>
            <els-option :value="3">福州</els-option>
            <els-option :value="4">厦门</els-option>
        </template>
    </els-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectValue = ref('')
</script>