<script lang="ts" setup>
import { useSlots } from 'vue';
import BbColumn from '../table-column/TableColumn.vue';
defineOptions({ name: 'BbColumnCheckbox' })

const slots = useSlots()

</script>
<template>
    <bb-column type="selection" :isExport="false">
        <template #default="{row,$index}" v-if="slots.default">
            <slot name="default" :row="row" :$index="$index"></slot>
        </template>
        <template #edit="{row,$index}" v-if="slots.edit">
            <slot name="edit" :row="row" :$index="$index"></slot>
        </template>
    </bb-column>
</template>