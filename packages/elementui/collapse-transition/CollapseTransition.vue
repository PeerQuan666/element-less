<script setup lang="ts">
defineOptions({ name: 'ElsCollapseTransition' })
interface Props {
    visible?: boolean,
}
defineProps<Props>()
</script>

<template>
    <el-collapse-transition>
        <div v-if="visible">
            <slot></slot>
        </div>
    </el-collapse-transition>
</template>

