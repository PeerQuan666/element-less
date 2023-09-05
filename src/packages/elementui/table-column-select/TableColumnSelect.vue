<script lang="ts" setup>
import { useSlots } from 'vue';
import BbColumn from '../table-column/TableColumn.vue';
defineOptions({ name: 'BbColumnSelect' })

interface Props{
    selectButtonLabel?:string
}

withDefaults(defineProps<Props>(), {
  type:'select',
  selectButtonLabel: '选择'

})
const slots = useSlots()

</script>
<template>
    <bb-column type="select" label="操作" width="120" :selectButtonLabel="selectButtonLabel" :isExport="false">
        <template #default="{row,$index}" v-if="slots.default">
            <slot name="default" :row="row" :$index="$index"></slot>
        </template>
    </bb-column>
</template>