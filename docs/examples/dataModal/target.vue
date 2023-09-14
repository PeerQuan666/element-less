<template>
    <els-data-modal v-model="selectValue" title="新页面选择数据" valueField="value" labelField="key" width="50%" url="http://localhost:8080/element-less/test/test.html">
    </els-data-modal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const selectValue = ref('')
</script>