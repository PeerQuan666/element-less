<template>
    <el-tabs>
        <el-tab-pane label="配置">
            <ElsDynamicDesigner v-model="config"></ElsDynamicDesigner>

        </el-tab-pane>
        <el-tab-pane label="预览">
            <ElsDynamicRender v-model="value" :config="config"></ElsDynamicRender>
        </el-tab-pane>
        <el-tab-pane label="表单属性">
            {{ value }}
        </el-tab-pane>
    </el-tabs>

</template>

<script setup>
import { ref } from 'vue'
const value = ref()
const config=ref()
</script>