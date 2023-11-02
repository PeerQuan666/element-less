<script setup lang="ts">
import { ref, watch, useAttrs, computed ,inject} from 'vue'
import '../../utlis/lessPrototype.js'
import { TimePickerProps, RangeFormItemProps } from '../../utlis/interfaceCom'
import { QueryDataType } from '../../utlis/enumCom';
import lessCom from '../../utlis/lessCom.js'

const emits = defineEmits(['update:modelValue', 'update:start', 'update:end'])
defineOptions({ name: 'ElsTimePickerRange',inheritAttrs:false })

interface Props extends TimePickerProps, RangeFormItemProps {
    single?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
    type: 'date',
    single: true,
    valueSeparator: ',',
    queryRangeOrEqual: true,
    queryDataType: QueryDataType.Date,
    isRange:true

})

const attrs = useAttrs()
const dateValue = ref<any>()
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
    console.info(val)
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

watch(() => props.modelValue, (val) => {
    if (val) {
        dateValue.value = val
    }
}, { immediate: true })
</script>

<template>
       <div class="els-node">
        {{ dateValue }}
    <ElsFormNode v-bind="lessCom.getFormNodeProps(props)">
        <els-time-picker v-if="single"  v-model="dateValue" v-bind="props" width="200"
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
     </ElsFormNode>
    </div>
</template>

