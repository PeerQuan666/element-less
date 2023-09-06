<script lang="ts" setup>
import { useSlots } from 'vue';
import ElsColumn from '../table-column/TableColumn.vue';
defineOptions({ name: 'ElsColumnEnum' })

interface Props{
    enumData?:any,
    enumShowType?:string,
    enumEqualType?:string,
    enumNoneLabel?:string
}

const props=withDefaults(defineProps<Props>(), {
    enumShowType: 'Description',
    enumEqualType: 'Value',
    enumNoneLabel: '未知'
})

const slots = useSlots()

</script>
<template>
    <els-column  type="enum" v-bind="props">
        <template #default="{row,$index}" v-if="slots.default">
            <slot name="default" :row="row" :$index="$index"></slot>
        </template>
        <template #edit="{row,$index}" v-if="slots.edit">
            <slot name="edit" :row="row" :$index="$index"></slot>
        </template>
    </els-column>
</template>