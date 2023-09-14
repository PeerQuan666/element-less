<template>
    <els-autocomplete v-model="selectValue" :data="data" value-field="key"></els-autocomplete>
</template>

<script setup lang="ts">
import { ref ,reactive} from 'vue'
const selectValue = ref('')
const data = reactive([
    { key: '北京', value: 1, group: '分组1' }, 
    { key: '天津', value: 2, group: '分组1' }, 
    { key: '福州', value: 3, group: '分组2' }, 
    { key: '厦门', value: 4, group: '分组2' }
    ])
</script>