<script setup lang="ts">
import { ref ,useAttrs} from 'vue'
import { useContainer,useValue } from '../../utlis/use';
defineOptions({ name: "ElsButtonSearch" })
const emits = defineEmits(['click'])
const loading = ref(false)

const container =useContainer()
const {getValue}=useValue()
const tableRef=getValue<string>('tableRef')
function handleSearch() {
    if(!container){
        emits('click')
        return
    }
    if (tableRef && container) {
        container.$query(false, tableRef)
    }
    else if (container.$query) {
        container.$query()
    }
    emits('click')
}
</script>
<template >
    <el-button type="primary" icon="Search" @click="handleSearch" :loading="loading">
        <slot>查询</slot>
    </el-button>
</template>

