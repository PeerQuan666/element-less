<script setup lang="ts">
import { ref, watch, useAttrs, useSlots, inject,watchEffect } from 'vue'
import { FormItemProps } from '../../utlis/interfaceCom'
defineOptions({
    name: 'ElsInput',
})
interface Props extends FormItemProps {
    modelValue?: ''
    prefixTag?: string
    suffixTag?: string
    width?: number | string,
    encode?: boolean,
    encodeType?: string,
    textarea?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    encode: false,
    encodeType: 'url',
    validTrigger: 'blur',
})
const setModelValue=inject<Function>('setModelValue',()=>null)
const getModelValue=inject<Function>('getModelValue',()=>null)
const formInputWidth = inject<string>('inputWidth','')
const emits = defineEmits(['update:modelValue'])
const currWidth = ref(props.width ?? '')
const slots = useSlots()
const attrs = useAttrs()
const slotNames: any = []
for (const slotItem in slots) {
    slotNames.push(slotItem)
}
const encodeValue = ref()
const inputValue = ref()
if (!currWidth.value) {
    if (formInputWidth) {
        currWidth.value = formInputWidth
    } 

}


function initModelValue(){
    if(!props.modelValue&&getModelValue&&props.prop){
      return  getModelValue(props.prop,props.aIndex)
    }
    return props.modelValue
}

watchEffect(()=>{
    const currValue=initModelValue()
    if(currValue){
        if (props.encode) {
                encodeValue.value = currValue;
                if (props.encodeType == "url") {
                    inputValue.value = decodeURIComponent(encodeValue.value);
                }
            } else {
                inputValue.value = currValue
            }
    }
})



watch(inputValue, (val) => {
    handleReturnResult(val)
})
function handleReturnResult(val){
    let currValue=val
    if (props.encode) {
        currValue=encodeURIComponent(val)
    } 
    emits('update:modelValue', currValue)
    if(setModelValue&&props.prop){
        setModelValue(props.prop,currValue,props.aIndex)
    }
}
</script>
<template>

    <ElsFormNode v-bind="props">
        <el-input v-model="inputValue" :style="[{ width: currWidth.appendPx() }]"  v-bind="attrs">
            <template v-for="item in slotNames" :slot="item">
                <slot :name="item"></slot>
            </template>
            <template #prepend v-if="!slots.prepend && prefixTag">{{ prefixTag }}</template>
            <template #append v-if="!slots.prepend && suffixTag">{{ suffixTag }}</template>
        </el-input>
    </ElsFormNode>
</template>