<script setup lang="ts">
import { lessCom } from "../../utlis/com";
import {ElMessage} from 'element-plus'

defineOptions({ name: "ElsButtonSelect" })
interface Props {
    checkRows?: any
}
const props = defineProps<Props>()
function handleSelect() {
    const currCheckRows = props.checkRows
    let selectTagID = lessCom.getUrlParms("Transfer_SelectTagID");
    var parent = window.parent;
    if (!parent[selectTagID]) {
        ElMessage.error('父页面接收方法不存在')
    }
    parent[selectTagID](currCheckRows)
}
</script>
<template >
    <el-button type="success" icon="Check" @click="handleSelect">
        <slot>选择</slot>
    </el-button>
</template>

