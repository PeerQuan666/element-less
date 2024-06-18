<script setup lang="ts">
import { useSlots } from 'vue'

import { watch, ref } from 'vue'
import ElsCheckbox from '../checkbox/Checkbox.vue'
import { CheckboxProps } from '../../utlis/interfaces'
defineOptions({
    name: 'ElsCheckboxButton',
})
const slots = useSlots()
const emits = defineEmits(['update:modelValue'])

const selectValue = ref('')
const props = withDefaults(defineProps<CheckboxProps>(), {
    labelField: 'label',
    valueField: 'value',
    disabledField: 'disabled',
    noExistOptionPrefix: '未知选项',
    hasNoExistOption: true,
    resetValueByChangeData: true,
    type: 'button',
    validTrigger:"change"
})
selectValue.value = props.modelValue ?? ''
watch(() => props.modelValue, (val) => {
    selectValue.value = val ?? ''
})
watch(selectValue, (value) => {
    emits('update:modelValue', value)
})
const slotNames: any = []
for (const slotItem in slots) {
    slotNames.push(slotItem)
}

</script>
<template>
    <els-checkbox  v-bind="props" v-model="selectValue"> 
        <template v-for="item in slotNames" :slot="item">
            <slot :name="item"></slot>
        </template>
    </els-checkbox>
</template>