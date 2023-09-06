<template>
    <els-select v-model="selectValue" 
    :data="data" 
    label-field="key" 
    value-field="value" 
    group-field="group">
    </els-select>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
const selectValue = ref('')
const data = reactive([
    { key: '北京', value: 1, group: '分组1' }, 
    { key: '天津', value: 2, group: '分组1' }, 
    { key: '福州', value: 3, group: '分组2' }, 
    { key: '厦门', value: 4, group: '分组2' }
    ])
</script>