<script setup lang="ts">
import { ref, useAttrs,inject,watchEffect } from 'vue'
import '../../utlis/lessPrototype.js'
import { RangeFormItemProps } from '../../utlis/interfaceCom'
import lessCom from '../../utlis/lessCom';
const emits = defineEmits(['update:modelValue', 'update:start', 'update:end'])
defineOptions({ name: 'ElsInputRange',
    inheritAttrs:false })

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
const setModelValue=inject<Function>('setModelValue',()=>{})
const attrs = useAttrs()
const currValue = ref<any>([])
const currStartValue = ref()
const currEndValue = ref()


const getModelValue = inject<Function>('getModelValue', () => null)
function initModelValue() {
    if (props.modelValue===undefined&& getModelValue && props.prop!==undefined) {
        return getModelValue(props.prop,props.aIndex)
    }
    return props.modelValue
}

function initStartModelValue() {
    if (props.start===undefined && getModelValue && attrs.propStart!==undefined) {
        return getModelValue(attrs.propStart)
    }
    return props.start
}
function initEndModelValue() {
    if (props.end===undefined && getModelValue && attrs.propEnd!==undefined) {
        return getModelValue(attrs.propEnd)
    }
    return props.modelValue
}

watchEffect(()=>{
   const startValue=initStartModelValue()
   const endValue=initEndModelValue()
   currStartValue.value=startValue;
   currEndValue.value=endValue
})


watchEffect(()=>{
   const currValue=initModelValue()
   currValue.value.length = 0
   currValue.value.push(...currValue.split(props.valueSeparator))
})



function handleChange() {
    if (props.onChange) {
        props.onChange([currStartValue.value, currEndValue.value])

    }
}
function handleBlur() {
    currStartValue.value = currStartValue.value?.toString().trim()
    currEndValue.value = currEndValue.value?.toString().trim()
    currValue.value.length = 0
    currValue.value.push(currStartValue.value)
    currValue.value.push(currEndValue.value)

    handleReturnResult()

}

function handleReturnResult() {
    if (currStartValue.value && !lessCom.isNumber(currStartValue.value)) {
        currStartValue.value = 0
    }
    if (currEndValue.value && !lessCom.isNumber(currEndValue.value)) {
        currEndValue.value = 0
    }
    let startValue:any=currStartValue.value
    let endValue:any=currEndValue.value
    let currValue=''

    if (props.isNumber) {
        startValue=lessCom.isNumber(currStartValue.value) ? parseFloat(currStartValue.value ?? 0) : 0
        endValue=lessCom.isNumber(currEndValue.value) ? parseFloat(currEndValue.value ?? 0) : 0
        emits('update:start', startValue)
        emits('update:end',endValue )
    } else {
        emits('update:start', currStartValue.value)
        emits('update:end', currEndValue.value)
    }
    if (currStartValue.value || currEndValue.value) {
        currValue=currStartValue.value + props.valueSeparator + currEndValue.value
        emits('update:modelValue',currValue )

    } else {
        emits('update:modelValue', '')
    }

    if(props.modelValue===undefined&&setModelValue&&props.prop!==undefined){
        setModelValue(props.prop,currValue,props.aIndex)
        setModelValue(props.propStart,startValue,props.aIndex)
        setModelValue(props.propEnd,endValue,props.aIndex)
    }
}





</script>

<template>
       <div class="els-node">
    <ElsFormNode v-bind="lessCom.getFormNodeProps(props)">
        <el-space class="els-range">
            <els-input auto-complete="on" :placeholder="startPlaceholder" :width="width" v-bind="attrs"
                v-model="currStartValue" @blur="handleBlur" @change="handleChange">
            </els-input>
            <slot name="range-separator">-</slot>
            <els-input auto-complete="on" :placeholder="endPlaceholder" :width="width" v-bind="attrs" v-model="currEndValue"
                @blur="handleBlur" @change="handleChange">
            </els-input>
        </el-space>
     </ElsFormNode>
    </div>
</template>

