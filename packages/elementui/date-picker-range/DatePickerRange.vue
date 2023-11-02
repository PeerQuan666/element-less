<script setup lang="ts">
import { ref, watch, useAttrs, inject, watchEffect } from 'vue'
import '../../utlis/lessPrototype.js'
import { DatePickerProps, RangeFormItemProps } from '../../utlis/interfaceCom'
import { QueryDataType } from '../../utlis/enumCom';
const emits = defineEmits(['update:modelValue', 'update:start', 'update:end'])
import lessCom from '../../utlis/lessCom.js'

defineOptions({ name: 'ElsDatePickerRange', inheritAttrs: false })

interface Props extends DatePickerProps, RangeFormItemProps {
    single?: boolean,
    modelValue?: string,
}

const props = withDefaults(defineProps<Props>(), {

    type: 'date',
    single: true,
    valueSeparator: ',',
    queryRangeOrEqual: true,
    queryDataType: QueryDataType.Date
})

const attrs = useAttrs()
const currDefaultTime = ref(props.defaultTime)
if (props.type == 'datetime' && !currDefaultTime.value) {
    currDefaultTime.value = ['00:00:00', '23:59:59']
}
if (!currDefaultTime.value) {
    currDefaultTime.value = ['', '']
}
const currType = props.single ? props.type + 'range' : props.type
const dateValue = ref<any>('')
const dateStartValue = ref()
const dateEndValue = ref()


const setModelValue = inject<Function>('setModelValue', () => { })

function handleReturnModelValue(value) {
    emits('update:modelValue', value);
    if (props.modelValue === undefined && setModelValue && props.prop !== undefined) {
        setModelValue(props.prop, value, props.aIndex)
    }
}
function handleReturnStartValue(value) {
    emits('update:start', value);
    if (props.start === undefined && setModelValue && props.propStart !== undefined) {
        setModelValue(props.propStart, value, props.aIndex)
    }
}
function handleReturnEndValue(value) {
    emits('update:end', value);
    if (props.end === undefined && setModelValue && props.propEnd !== undefined) {
        setModelValue(props.propEnd, value, props.aIndex)
    }
}


watch(dateValue, (val) => {
    handleReturnModelValue(val)
})

watch(() => props.start, (val) => {
    dateStartValue.value = val
}, { immediate: true })

watch(() => props.end, (val) => {
    dateEndValue.value = val
}, { immediate: true })

watch(dateStartValue, (val) => {
    if (!props.single) {

        dateValue.value = [val, dateEndValue.value ?? ''].join(props.valueSeparator)

    }
    handleReturnStartValue(val)
})

watch(dateEndValue, (val) => {
    if (!props.single) {
        dateValue.value = [dateStartValue.value ?? '', val].join(props.valueSeparator)

    }
    handleReturnEndValue(val)
})


watch(() => props.modelValue, (val) => {
    if (val) {
        dateValue.value = val
    }
}, { immediate: true })

</script>

<template>
    <div class="els-node">
        <ElsFormNode v-bind="lessCom.getFormNodeProps(props)">
            <els-date-picker v-if="single" v-model="dateValue" v-bind="props" :defaultTime="currDefaultTime"
                :type="currType" v-model:start="dateStartValue" v-model:end="dateEndValue">
                <template #default="cell">
                    <slot name="default" :cell="cell"></slot>
                </template>
                <template #range-separator>
                    <slot name="range-separator"></slot>
                </template>
            </els-date-picker>
            <el-space class="els-range" v-else>
                <els-date-picker v-bind="attrs" :type="currType" :defaultTime="currDefaultTime ? currDefaultTime[0] : ''"
                    v-model="dateStartValue">
                </els-date-picker>
                <slot name="range-separator">-</slot>
                <els-date-picker v-bind="attrs" :type="currType" :defaultTime="currDefaultTime ? currDefaultTime[1] : ''"
                    v-model="dateEndValue">
                </els-date-picker>
            </el-space>
        </ElsFormNode>
    </div>
</template>

