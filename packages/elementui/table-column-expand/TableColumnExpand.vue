<script lang="ts" setup>
import { useSlots } from 'vue';
import ElsColumn from '../table-column/TableColumn.vue';

defineOptions({ name: 'ElsColumnExpand' })

const slots = useSlots()

</script>
<template>
    <els-column type="expand" :isExport="false">
        <template #default="{row,$index}" v-if="slots.default">
            <slot name="default" :row="row" :$index="$index"></slot>
        </template>
    </els-column>
</template>