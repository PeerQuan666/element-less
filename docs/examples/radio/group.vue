<template>
    <bb-radio v-model="selectValue">
        <bb-option-group label="分组1">
            <bb-option :value="1">北京</bb-option>
            <bb-option :value="2">天津</bb-option>
        </bb-option-group>
        <bb-option-group label="分组2">
            <bb-option :value="3">福州</bb-option>
            <bb-option :value="4">厦门</bb-option>
        </bb-option-group>
    </bb-radio>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const selectValue = ref('')
</script>