<script setup lang="ts">
import { ref, watch, useAttrs, useSlots } from 'vue'
import { FormItemProps } from '../../utlis/interfaceCom'
defineOptions({
    name: 'ElsInput',
})
interface Props extends FormItemProps {
    modelValue?: ''
    prefixTag?: string
    suffixTag?: string
    width?: number|string,
    encode?: boolean,
    encodeType?: string
}
const props = withDefaults(defineProps<Props>(), {
    encode: false,
    encodeType: 'url',
    validationTrigger:'blur',
})
const emits = defineEmits(['update:modelValue'])
const currWidth=ref(props.width??'')
const slots = useSlots()
const attrs = useAttrs()
const slotNames: any = []
for (const slotItem in slots) {
    slotNames.push(slotItem)
}
const encodeValue = ref()
const inputValue = ref()
if(!currWidth.value){
    if(attrs['type']==='textarea'){
        currWidth.value='500'
    }else{
        currWidth.value='220'

    }
}



watch(() => props.modelValue, (val) => {
    if (props.encode) {
        encodeValue.value = val;
        if (props.encodeType == "url") {
            inputValue.value = decodeURIComponent(encodeValue.value);
        }
    } else {
        inputValue.value = val
    }
}, { immediate: true })

watch(inputValue, (val) => {
    if (props.encode) {
        emits('update:modelValue', encodeURIComponent(val))
    }else{
        emits('update:modelValue', val)

    }
})
</script>
<template>
    <el-input v-model="inputValue" :style="[{width:currWidth.appendPx()}]" v-bind="attrs">
        <template v-for="item in slotNames" :slot="item">
            <slot :name="item"></slot>
        </template>
        <template #prepend v-if="!slots.prepend && prefixTag">{{prefixTag}}</template>
        <template #append v-if="!slots.prepend && suffixTag">{{suffixTag}}</template>
    </el-input>
</template>