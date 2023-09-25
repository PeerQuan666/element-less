<script setup lang="ts">
import { ref, inject } from 'vue'
defineOptions({ name: "ElsButtonExport" })
interface Props {
    tableRef?: string
}
const props = withDefaults(defineProps<Props>(), {

})
const elsExport = inject<Function>('elsExport')
 const elsExportAll = inject<Function>('elsExportAll')
const loading = ref(false)
function handleExport() {
    loading.value = true;
    if (!props.tableRef&&elsExportAll) {
        elsExportAll();
    } else if (elsExport) {
        elsExport(props.tableRef)
    }
    loading.value = false;
}


</script>
<template >
    <el-button type="danger" icon="Download" @click="handleExport" :loading="loading">
        <slot>导出</slot>
    </el-button>
</template>

