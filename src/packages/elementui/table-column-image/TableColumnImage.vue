<script lang="ts" setup>
import { useSlots } from 'vue';
import ElsColumn from '../table-column/TableColumn.vue';

defineOptions({ name: 'ElsColumnImage' })

const slots = useSlots()
</script>
<template>
    <els-column type="image" width="100">
        <template #default="{row,$index}" v-if="slots.default">
            <slot name="default" :row="row" :$index="$index"></slot>
        </template>
        <template #edit="{row,$index}" v-if="slots.edit">
            <slot name="edit" :row="row" :$index="$index"></slot>
        </template>
    </els-column>
</template>