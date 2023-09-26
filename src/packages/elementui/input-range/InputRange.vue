<script setup lang="ts">
import { ref, watch, useAttrs } from 'vue'
import '../../utlis/lessPrototype.js'
import { RangeFormItemProps } from '../../utlis/interfaceCom'
import lessCom from '../../utlis/lessCom';
const emits = defineEmits(['update:modelValue', 'update:start', 'update:end'])
defineOptions({ name: 'ElsInputRange' })

interface Props extends RangeFormItemProps {
    modelValue?: string,
    start?: number | string,
    end?: number | string,
    startPlaceholder?: string,
    endPlaceholder?: string,
    isNumber?: boolean,
    onChange?: Function,
    width?: string,
    valueSeparator: ',',
}

const props = withDefaults(defineProps<Props>(), {
    valueSeparator: ',',
    queryRangeOrEqual: true,
    isNumber: true,
    width: '100'
})

const attrs = useAttrs()
const currValue = ref<any>([])
const currStartValue = ref()
const currEndValue = ref()


watch(() => props.start, (val) => {
    if(val){
        currStartValue.value = val

    }
}, { immediate: true })

watch(() => props.end, (val) => {
    if(val){
        currEndValue.value = val

    }
}, { immediate: true })


watch(() => props.modelValue, (val) => {
    if(val){
        currValue.value.length=0
        currValue.value.push(...val.split(props.valueSeparator)) 
    }
}, { immediate: true })


function handleChange() {
    if (props.onChange) {
        props.onChange([currStartValue.value, currEndValue.value])

    }
}
function handleBlur() {
    currStartValue.value = currStartValue.value?.toString().trim()
    currEndValue.value = currEndValue.value?.toString().trim()
    currValue.value.length=0
    currValue.value.push(currStartValue.value)
    currValue.value.push(currEndValue.value)

    handleReturnResult()

}

function handleReturnResult() {
    if(currStartValue.value&&!lessCom.isNumber(currStartValue.value)){
        currStartValue.value=0
    }
    if(currEndValue.value&&!lessCom.isNumber(currEndValue.value)){
        currEndValue.value=0
    }

    if (props.isNumber) {
       
        emits('update:start',  lessCom.isNumber(currStartValue.value)?parseFloat(currStartValue.value ?? 0):0)
        emits('update:end', lessCom.isNumber(currEndValue.value)?parseFloat(currEndValue.value ?? 0):0)
    } else {
        emits('update:start', currStartValue.value)
        emits('update:end', currEndValue.value)
    }
    if (currStartValue.value || currEndValue.value) {
        emits('update:modelValue', currStartValue.value + props.valueSeparator + currEndValue.value)

    } else {
        emits('update:modelValue', '')
    }
}



</script>

<template>
    <el-space class="els-range">
        <els-input auto-complete="on" :placeholder="startPlaceholder" :width="width" v-bind="attrs" v-model="currStartValue"
            @blur="handleBlur" @change="handleChange">
        </els-input>
        <slot name="range-separator">-</slot>
        <els-input auto-complete="on" :placeholder="endPlaceholder" :width="width" v-bind="attrs" v-model="currEndValue"  @blur="handleBlur"
            @change="handleChange">
        </els-input>
    </el-space>
</template>

