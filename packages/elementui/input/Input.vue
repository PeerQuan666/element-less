<script setup lang="ts">
import { ref, watch, useAttrs, useSlots, inject, watchEffect, Fragment } from 'vue'
import { FormItemProps } from '../../utlis/interfaceCom'
import lessCom from '../../utlis/lessCom.js'

defineOptions({
    name: 'ElsInput',
    inheritAttrs: false
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
const setModelValue = inject<Function>('setModelValue', () => null)
const getModelValue = inject<Function>('getModelValue', () => null)
const formInputWidth = inject<string>('inputWidth', '')
const emits = defineEmits(['update:modelValue'])

const slots = useSlots()
const attrs = useAttrs()
const slotNames: any = []
for (const slotItem in slots) {
    slotNames.push(slotItem)
}
const encodeValue = ref()
const inputValue = ref()

const currWidth = ref()
watchEffect(() => {
    currWidth.value = props.width ?? ''
    if (!currWidth.value) {
        if (formInputWidth) {
            currWidth.value = formInputWidth
        }

    }
})



function initModelValue() {
    if (props.modelValue === undefined && getModelValue && props.prop) {
        return getModelValue(props.prop, props.aIndex)
    }
    return props.modelValue
}

watchEffect(() => {
    const currValue = initModelValue()
    if (currValue) {
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
function handleReturnResult(val) {
    let currValue = val
    if (props.encode) {
        currValue = encodeURIComponent(val)
    }
    emits('update:modelValue', currValue)
    if (props.modelValue === undefined && setModelValue && props.prop !== undefined) {
        setModelValue(props.prop, currValue, props.aIndex)
    }
}
</script>
<template>
       <div class="els-node">
    <ElsFormNode v-bind="lessCom.getFormNodeProps(props)">
        <el-input v-model="inputValue" :style="[{ width: currWidth.appendPx() }]" v-bind="attrs">
            <template v-for="item in slotNames" :slot="item">
                <slot :name="item"></slot>
            </template>
            <template #prepend v-if="!slots.prepend && prefixTag">{{ prefixTag }}</template>
            <template #prepend v-else="slots.prepend">
                <slot name="prepend"></slot>
            </template>
            <template #append v-if="!slots.append && suffixTag">{{ suffixTag }}</template>
            <template #prepend v-else="slots.append">
                <slot name="append"></slot>
            </template>
        </el-input>
     </ElsFormNode>
    </div>
</template>
<style lang="less">
.els-node:has(>div[class*=el-input]){
    display: inline-flex;
    position: relative;
    width: 100%;
}
</style>