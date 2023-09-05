<script lang="ts" setup>
import { useSlots } from 'vue';
import BbColumn from '../table-column/TableColumn.vue';

defineOptions({ name: 'BbColumnImage' })

const slots = useSlots()
</script>
<template>
    <bb-column type="image">
        <template #default="{row,$index}" v-if="slots.default">
            <slot name="default" :row="row" :$index="$index"></slot>
        </template>
        <template #edit="{row,$index}" v-if="slots.edit">
            <slot name="edit" :row="row" :$index="$index"></slot>
        </template>
    </bb-column>
</template>