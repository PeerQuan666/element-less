<script setup lang="ts">
import { ref } from 'vue'
import { ElLoading } from 'element-plus';
defineOptions({ name: "ElsButtonExport" })
interface Props {
    type?: string
}
const props = withDefaults(defineProps<Props>(), {
    type: 'All'
})
const loading = ref(false)
function handleExport() {
    loading.value = true;
    if (props.type === 'All') {
        exportTableDataMutiHtml();

    } else {

    }
    loading.value = false;

}

function exportHtml() {
    return new Promise((resolve, reject) => {

    })
}
function exportTableDataMutiHtml() {


    const exportLoading = ElLoading.service({
        lock: true,
        text: '数据导出中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
    setTimeout(() => {
        exportHtml().then(res => {
            exportLoading.close()
        })

    }, 300);


}
</script>
<template >
    <el-button type="danger" icon="Download" @click="handleExport" :loading="loading">
        <slot>导出</slot>
    </el-button>
</template>

