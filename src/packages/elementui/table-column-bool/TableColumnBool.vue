<script lang="ts" setup>
import { useSlots } from 'vue';
import ElsColumn from '../table-column/TableColumn.vue';

interface Props{
    trueLabel?:string,
    falseLabel?:string,
    trueValue?:string|number|boolean
}

const props= withDefaults(defineProps<Props>(), {
    trueLabel: '是',
    falseLabel: '否',
    trueValue: 1,
    falseClass:'txt-red',
})
defineOptions({ name: 'ElsColumnBool' })

const slots = useSlots()

</script>
<template>
    <els-column type="bool" v-bind="props">
        <template #default="{row,$index}" v-if="slots.default">
            <slot name="default" :row="row" :$index="$index"></slot>
        </template>
        <template #edit="{row,$index}" v-if="slots.edit">
            <slot name="edit" :row="row" :$index="$index"></slot>
        </template>
    </els-column>
</template>