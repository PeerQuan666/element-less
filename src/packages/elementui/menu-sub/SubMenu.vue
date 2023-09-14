
<script setup lang="ts">
defineOptions({ name: 'ElsSubMenu' })
import { ElSubMenu } from 'element-plus'
interface Props {
    title?: string,
    index:any
}
defineProps<Props>()
</script>
<template>
    <el-sub-menu :index="index">
        <template #title>
            <slot name="title">
                {{ title ?? '' }}
            </slot>
        </template>
        <slot></slot>
    </el-sub-menu>
</template>
