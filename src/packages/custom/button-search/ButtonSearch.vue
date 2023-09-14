<script setup lang="ts">
import { ref } from 'vue'
defineOptions({ name: "ElsButtonSearch" })
const loading=ref(false)
function handleSearch() {
    

}
</script>
<template >
    <el-button type="primary" icon="Search" @click="handleSearch" :loading="loading">
        <slot>查询</slot>
    </el-button>
</template>

