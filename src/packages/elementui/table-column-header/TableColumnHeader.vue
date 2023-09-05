<script lang="ts" setup>
import { useSlots } from 'vue';
import BbColumn from '../table-column/TableColumn.vue';

defineOptions({ name: 'BbColumnHeader' })

const slots = useSlots()

</script>
<template>
    <bb-column type="header">
        <template #default="{row,$index}" v-if="slots.default">
            <slot name="default" :row="row" :$index="$index"></slot>
        </template>
    </bb-column>
</template>