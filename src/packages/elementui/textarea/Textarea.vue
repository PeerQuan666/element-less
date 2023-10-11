<script setup lang="ts">
import { ref, watch, useSlots } from 'vue'
import { FormItemProps } from '../../utlis/interfaceCom'
defineOptions({
    name: 'ElsTextarea',
})
interface Props extends FormItemProps {
    modelValue?: ''
    width?: number | string,
    encode?: boolean,
    encodeType?: string,
}
const props = withDefaults(defineProps<Props>(), {
    encode: false,
    encodeType: 'url',
    validTrigger: 'blur',
})
const emits = defineEmits(['update:modelValue'])
const slots = useSlots()
const slotNames: any = []
for (const slotItem in slots) {
    slotNames.push(slotItem)
}
const inputValue = ref()

watch(() => props.modelValue, (val) => {
    inputValue.value = val
}, { immediate: true })

watch(inputValue, (val) => {
    emits('update:modelValue', val)
})
</script>
<template>
    <els-input v-model="inputValue" type="textarea" v-bind="props" >
    </els-input>
</template>