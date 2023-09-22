<script setup lang="ts">
import { ref, inject, nextTick } from 'vue'
import { ElLoading, ElMessage } from 'element-plus';
import lessCom from '../../utlis/lessCom';
defineOptions({ name: "ElsButtonExport" })
interface Props {
    tableRef?: string
}
const props = withDefaults(defineProps<Props>(), {

})
const elsExport = inject<Function>('elsExport')
const elsPageStore = inject<any>('elsPageStore')
const loading = ref(false)
function handleExport() {
    loading.value = true;
    if (!props.tableRef) {
        exportTableDataMutiHtml();
    } else if (elsExport) {
        elsExport(props.tableRef)
    }
    loading.value = false;
}

function exportHtml() {
    return new Promise((resolve) => {
        if(!elsPageStore){
            ElMessage.warning("页面未包含在els-container中无法使用默认导出")
            resolve(false)
            return
        }
        const dataTables=elsPageStore.value.dataTables
   
        let refDatas: any = [];
        let headerCounts: any = [];
        let sheetNames: any = [];
        let exportPageData: any = []
        dataTables.forEach((ele, index) => {
            if (ele.isExport) {
                exportPageData[index] = ele.getPageInfo()
                ele.setPageInfo({ pageSize: 100000, pageIndex: 0 })
                ele.changePageReadData();
            }
        })
        nextTick(() => {
            dataTables.forEach((ele: any,index) => {
                if (ele.isExport) {
                    refDatas.push(ele.table.$el)
                    sheetNames.push(ele.tableName??"表"+index);
                    headerCounts.push(ele.table.$el.querySelector(".el-table__header").querySelectorAll("tr").length)
                }
            })
            lessCom.exportMuti(refDatas, sheetNames, [], headerCounts, {
                font: {
                    bold: true,
                },
                alignment: { horizontal: "center", vertical: "center", wrap_text: true },
                fill: { bgcolor: { rgb: 'F5F7FA' }, fgColor: { rgb: 'F5F7FA' } }
            }, window.document.title)
        })
        nextTick(() => {
            dataTables.forEach((ele, index) => {
                if (ele.isExport) {
                    ele.setPageInfo(exportPageData[index])
                    ele.changePageReadData();
                }
            })
            resolve(true)
        })
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
        exportHtml().then(() => {
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

