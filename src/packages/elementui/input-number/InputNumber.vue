<script setup lang="ts">
import { watch, inject ,watchEffect,useAttrs,ref} from 'vue'
import lessCom from '../../utlis/lessCom.js'
import { FormItemProps } from '../../utlis/interfaceCom'

defineOptions({
    name: 'ElsInputNumber',
    inheritAttrs:false
})
interface Props extends FormItemProps {
    width?:string
    modelValue?: Number
}
const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])
const attrs=useAttrs()
const currValue = ref()

const getModelValue = inject<Function>('getModelValue', () => null)
function initModelValue() {
    if (props.modelValue===undefined&& getModelValue && props.prop) {
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
    emits('update:modelValue', val)
    if (props.modelValue===undefined&&setModelValue && props.prop) {
        setModelValue(props.prop, val,props.aIndex)
    }
})

</script>
<template>
    <ElsFormNode v-bind="lessCom.getFormNodeProps(props)">
        <el-input-number v-model="currValue"  :style="[{ width: width?.appendPx() }]"  v-bind="attrs"></el-input-number>
    </ElsFormNode>
</template>