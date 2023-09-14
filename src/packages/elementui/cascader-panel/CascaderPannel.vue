<script setup lang="ts">
import { ref, watch } from 'vue'
import '../../utlis/lessPrototype.js'
defineOptions({ name: 'ElsCascaderPanel' })
interface Props {
    modelValue?: string,
    labelField?: string

}
const props = withDefaults(defineProps<Props>(), {
    labelField: 'label'

})
const emits = defineEmits(['update:modelValue'])
const selectValue = ref()
watch(selectValue, (val) => {
    emits('update:modelValue', val)
})
watch(() => props.modelValue, () => {
    selectValue.value = props.modelValue
})
</script>

<template>
    <els-cascader v-model="selectValue" :isPanel="true">
        <template #default="{ node, data }">
            <slot name="default" :node="node" :data="data">
                {{ data[labelField] }}
            </slot>
        </template>
        <template #empty>
            <slot name="empty">
            </slot>
        </template>
    </els-cascader>
</template>

