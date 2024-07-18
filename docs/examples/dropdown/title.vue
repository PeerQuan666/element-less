<template>
    <els-dropdown title="标题" @select="handleCommand">
        <template #dropdown>
            <els-option :value="1">北京</els-option>
            <els-option :value="2">天津</els-option>
            <els-option :value="3">福州</els-option>
            <els-option :value="4">厦门</els-option>
        </template>
    </els-dropdown>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
function handleCommand(com) {
    ElMessage.success(com.toString())
}

</script>