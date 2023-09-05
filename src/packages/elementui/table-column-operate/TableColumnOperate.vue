<script lang="ts" setup>
import BbColumn from '../table-column/TableColumn.vue';
import { useSlots } from 'vue';
interface Props{
    menusFieldname?:string
}

withDefaults(defineProps<Props>(), {
  menusFieldname: 'PowerMenu',
})
defineOptions({ name: 'BbColumnOperate' })
const slots = useSlots()
</script>
<template>
    <bb-column label="操作" type="operate" :menusFieldname="menusFieldname" :isExport="false">
        <template #default="{row,$index}" v-if="slots.default">
            <slot name="default" :row="row" :$index="$index"></slot>
        </template>
    </bb-column>
</template>