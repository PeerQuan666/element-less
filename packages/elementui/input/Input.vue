<script setup lang="ts">
import { ref, watch, useAttrs, useSlots, watchEffect } from 'vue'
import { useValue } from '../../utlis/use';
import { FormItemProps } from '../../utlis/interfaces'
import { lessCom } from '../../utlis/com'
import { useModel,useFormValidation } from '../../utlis/use'
defineOptions({
    name: 'ElsInput',
    inheritAttrs: false
})
interface Props extends FormItemProps {
    modelValue?: any,
    prefixTag?: string
    suffixTag?: string
    width?: number | string,
    encode?: boolean,
    encodeType?: string,
}
const props = withDefaults(defineProps<Props>(), {
    encode: false,
    encodeType: 'url',
    validTrigger: 'blur',
})
const {
    currModelValue,
    returnModelValue,
} = useModel(props)
const {getValue}=useValue()
const formInputWidth = getValue<string>('inputWidth', '')
const isMobile = getValue<boolean>('isMobile', false)

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

watch(currModelValue, (val) => {
    const currValue = val
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
}, { immediate: true })




watch(inputValue, (val) => {
    handleReturnResult(val)
})

function handleReturnResult(val) {
    let currValue = val
    if (props.encode) {
        currValue = encodeURIComponent(val)
    }
    returnModelValue(currValue)
}

const placeholder=ref()
if(isMobile){
placeholder.value='请输入'+(props.label??'')
}else{
    placeholder.value=attrs.placeholder
}
</script>
<template>
    
    <div class="els-node">
        <ElsFormNode  tagName="Input" v-bind="lessCom.getFormNodeProps(props)">
            <el-input  v-model="inputValue"  v-if="!isMobile" :style="[{ width: currWidth.appendPx() }]" v-bind="attrs">
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
            <van-field v-else v-model="inputValue"  :required="props.required" :label="label" :rules="useFormValidation(props,attrs).initRules()"   v-bind="attrs" :placeholder="placeholder" ></van-field>

        </ElsFormNode>
    </div>
</template>
<style scoped lang="less">
.els-node:has(>div[class*=el-input]) {
    display: inline-flex;
    position: relative;
    width: 100%;
}
</style>