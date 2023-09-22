<script setup lang="ts">
import { ref, watch, useAttrs,computed } from 'vue'
import '../../utlis/lessPrototype.js'
import { TimePickerProps, RangeFormItemProps } from '../../utlis/interfaceCom'
import { QueryDataType } from '../../utlis/enumCom';
const emits = defineEmits(['update:modelValue', 'update:start', 'update:end'])
defineOptions({ name: 'ElsTimePickerRange' })

interface Props extends TimePickerProps, RangeFormItemProps {
    single?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
    type: 'date',
    single: true,
    valueSeparator: ',',
    queryRangeOrEqual: true,
    queryDataType: QueryDataType.Date,

})

const attrs = useAttrs()
const dateValue = ref<any>()
const dateStartValue = ref()
const dateEndValue = ref()

watch(dateValue, (val) => {
    emits('update:modelValue', val)
})

watch(() => props.start, (val) => {
    dateStartValue.value = val
})


watch(() => props.end, (val) => {
    dateEndValue.value = val
}, { immediate: true })



watch(dateStartValue, (val) => {
    if (!props.single) {
        if (!val && !dateStartValue.value) {
            dateValue.value = ''
        } else {
            dateValue.value = [val, dateEndValue.value ?? ''].join(props.valueSeparator)


        }
    }
    emits('update:start', val)
})

watch(dateEndValue, (val) => {
    if (!props.single) {
        if (!val && !dateStartValue.value) {
            dateValue.value = ''
        } else {
            dateValue.value = [dateStartValue.value ?? '', val].join(props.valueSeparator)

        }

    }
    emits('update:end', val)
})


watch(() => props.modelValue, (val) => {
    dateValue.value = val

}, { immediate: true })


const startLessThanCpt = computed(() => {
    if (dateEndValue.value) {
        return dateEndValue.value
    }
    if (props.lessThan) {
        return props.lessThan
    }
    return '';
})


const endGreaterThanCpt = computed(() => {
    if (dateStartValue.value) {
        return dateStartValue.value
    }
    if (props.greaterThan) {
        return props.greaterThan
    }
    return '';
})
</script>

<template>
    <els-time-picker v-if="single" :is-range="true" v-model="dateValue" v-bind="props" width="200"
        :defaultValue="defaultValue" v-model:start="dateStartValue" v-model:end="dateEndValue">
        <template #default="cell">
            <slot name="default" :cell="cell"></slot>
        </template>
        <template #range-separator>
            <slot name="range-separator"></slot>
        </template>
    </els-time-picker>
    <el-space class="els-range" v-else>
        <els-time-picker v-bind="attrs" :less-than="startLessThanCpt" :placeholder="attrs['start-placeholder']"
            :defaultValue="defaultValue ? defaultValue[0] : ''" v-model="dateStartValue">
        </els-time-picker>
        <slot name="range-separator">-</slot>
        <els-time-picker v-bind="attrs" :greater-than="endGreaterThanCpt" :placeholder="attrs['end-placeholder']"
            :defaultValue="defaultValue ? defaultValue[1] : ''" v-model="dateEndValue">
        </els-time-picker>
    </el-space>
</template>

