<script setup lang="ts">
import { watch, inject ,watchEffect,useAttrs} from 'vue'
import { useVModel } from '@vueuse/core'
import { FormItemProps } from '../../utlis/interfaceCom'

defineOptions({
    name: 'ElsInputNumber',
})
interface Props extends FormItemProps {
    modelValue?: number
}
const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])
const attrs=useAttrs()
const currValue = useVModel(props, 'modelValue', emits)

const getModelValue = inject<Function>('getModelValue', () => null)
function initModelValue() {
    if (!props.modelValue && getModelValue && props.prop) {
        return getModelValue(props.prop,props.aIndex)
    }
    return props.modelValue
}

watchEffect(()=>{
  const val= initModelValue()
  currValue.value=val
})

const setModelValue = inject<Function>('setModelValue', () => { })


watch(currValue, (val) => {
    if (setModelValue && props.prop) {
        setModelValue(props.prop, val,props.aIndex)
    }
})

</script>
<template>
    <ElsFormNode v-bind="props">
        <el-input-number v-model="currValue"  v-bind="attrs"></el-input-number>
    </ElsFormNode>
</template>