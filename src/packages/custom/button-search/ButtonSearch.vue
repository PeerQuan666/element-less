<script setup lang="ts">
import { ref, inject } from 'vue'
defineOptions({ name: "ElsButtonSearch" })
const emits = defineEmits(['search'])
const loading = ref(false)
const tableRef = inject<string>('queryTableRef')
const elsQuery = inject<Function>('elsQuery')
function handleSearch() {
    if (tableRef && elsQuery) {
        elsQuery(false, tableRef)
    }
    else if (elsQuery) {
        elsQuery()
    } else {
        emits('search')
    }
}
</script>
<template >
    <el-button type="primary" icon="Search" @click="handleSearch" :loading="loading">
        <slot>查询</slot>
    </el-button>
</template>

