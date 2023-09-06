<script lang="ts" setup>
import ElsColumn from '../table-column/TableColumn.vue';
import { useSlots } from 'vue';
interface Props{
    menusFieldname?:string
}

withDefaults(defineProps<Props>(), {
  menusFieldname: 'PowerMenu',
})
defineOptions({ name: 'ElsColumnOperate' })
const slots = useSlots()
</script>
<template>
    <els-column label="操作" type="operate" :menusFieldname="menusFieldname" :isExport="false">
        <template #default="{row,$index}" v-if="slots.default">
            <slot name="default" :row="row" :$index="$index"></slot>
        </template>
    </els-column>
</template>