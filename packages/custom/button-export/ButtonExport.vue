<script setup lang="ts">
import { ref } from 'vue'
import { useContainer } from '../../utlis/use';
defineOptions({ name: "ElsButtonExport" })

interface Props {
    tableRef?: string
}
const emits = defineEmits(['click'])
const props = withDefaults(defineProps<Props>(), {
})

const container =useContainer()

const loading = ref(false)
function handleExport() {
    loading.value = true;
    if (!props.tableRef&&container) {
        container.$exportAll();
    } else if (container) {
        container.$export(props.tableRef)
    }
    emits('click')
    loading.value = false;
}


</script>
<template >
    <el-button type="danger" icon="Download" @click="handleExport" :loading="loading">
        <slot>导出</slot>
    </el-button>
</template>

