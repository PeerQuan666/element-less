<script lang="ts" setup>
import ElsColumn from '../table-column/TableColumn.vue';
import { useSlots } from 'vue';
interface Props{
    unFoldCount?:number,
    isFold?:boolean
}

withDefaults(defineProps<Props>(), {
    isFold:false,
    unFoldCount:0
})
defineOptions({ name: 'ElsColumnOperate' })
const slots = useSlots()
</script>
<template>
    <els-column label="操作" type="operate" width="100" :unFoldCount="unFoldCount" :isFold="isFold"  :isExport="false">
        <template #default="{row,$index}" v-if="slots.default">
            <slot name="default" :row="row" :$index="$index"></slot>
        </template>
    </els-column>
</template>