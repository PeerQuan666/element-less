<script setup lang="ts">
import { watch, inject ,ref,watchEffect,useAttrs} from 'vue'
import { useVModel } from '@vueuse/core'
import { FormItemProps } from '../../utlis/interfaceCom'
import lessCom from '../../utlis/lessCom.js'

defineOptions({
    name: 'ElsSwitch',
    inheritAttrs:false
})
interface Props extends FormItemProps {
    modelValue?: any
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
    if (props.modelValue===undefined&&setModelValue && props.prop) {
        setModelValue(props.prop, val,props.aIndex)
    }else{
        emits('update:modelValue',val)
    }
})

</script>
<template>
       <div class="els-node">
    <ElsFormNode v-bind="lessCom.getFormNodeProps(props)">
        <el-switch v-model="currValue" :active-value="1" :inactive-value="0" v-bind="attrs"></el-switch>
     </ElsFormNode>
    </div>
</template>