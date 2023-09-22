<script setup lang="ts">
import { ref, watch, useAttrs } from 'vue'
import '../../utlis/lessPrototype.js'
import { DatePickerProps,RangeFormItemProps } from '../../utlis/interfaceCom'
import { QueryDataType } from '../../utlis/enumCom';
const emits = defineEmits(['update:modelValue', 'update:start', 'update:end'])
defineOptions({ name: 'ElsDatePickerRange' })

interface Props extends DatePickerProps, RangeFormItemProps {
    single?: boolean,
    
}

const props = withDefaults(defineProps<Props>(), {
    type: 'date',
    single: true,
    valueSeparator: ',',
    queryRangeOrEqual:true,
    queryDataType:QueryDataType.Date
})

const attrs = useAttrs()
const currDefaultTime=ref(props.defaultTime)
if(props.type=='datetime'&&!currDefaultTime.value){
    currDefaultTime.value=['00:00:00','23:59:59']
}
 if(!currDefaultTime.value){
    currDefaultTime.value= ['','']
}
const currType =props.single? props.type + 'range':props.type 
const dateValue = ref()
const dateStartValue = ref()
const dateEndValue = ref()

watch(dateValue, (val) => {
    emits('update:modelValue', val)
})

watch(() => props.start, (val) => {
    dateStartValue.value = val
}, { immediate: true })

watch(() => props.end, (val) => {
    dateEndValue.value = val
}, { immediate: true })

watch(dateStartValue, (val) => {
    if (!props.single) {
        if(!val&&!dateStartValue.value){
            dateValue.value=''
        }else{
            dateValue.value = [val, dateEndValue.value??''].join(props.valueSeparator)


        }
    }
    emits('update:start', val)
})

watch(dateEndValue, (val) => {
    if (!props.single) {
        if(!val&&!dateStartValue.value){
            dateValue.value=''
        }else{
            dateValue.value = [dateStartValue.value??'', val].join(props.valueSeparator)

        }
        
    }
    emits('update:end', val)
})

watch(() => props.modelValue, (val) => {
    dateValue.value = val
}, { immediate: true })





</script>

<template>
    <els-date-picker v-if="single" v-model="dateValue" v-bind="props" :defaultTime="currDefaultTime" :type="currType" v-model:start="dateStartValue"
        v-model:end="dateEndValue">
        <template #default="cell">
            <slot name="default" :cell="cell"></slot>
        </template>
        <template #range-separator>
            <slot name="range-separator"></slot>
        </template>
    </els-date-picker>
    <el-space class="els-range" v-else>
        <els-date-picker v-bind="attrs" :type="currType"  :defaultTime="currDefaultTime?currDefaultTime[0]:''" v-model="dateStartValue">
        </els-date-picker>
        <slot name="range-separator">-</slot>
        <els-date-picker v-bind="attrs" :type="currType"  :defaultTime="currDefaultTime?currDefaultTime[1]:''" v-model="dateEndValue">
        </els-date-picker>
    </el-space>
</template>

