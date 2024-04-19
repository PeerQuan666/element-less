<script setup lang="ts">
import { ref, useAttrs, computed } from 'vue'

import {useRangeModel} from '../../utlis/use'
import { TimePickerProps, RangeFormItemProps } from '../../utlis/interfaces'
import { QueryDataType } from '../../utlis/enums';
import { lessCom } from '../../utlis/com'

defineOptions({ name: 'ElsTimePickerRange', inheritAttrs: false })

interface Props extends TimePickerProps, RangeFormItemProps {
    single?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
    single: true,
    valueSeparator: ',',
    queryRangeOrEqual: true,
    queryDataType: QueryDataType.Date,
    isRange: true

})

const attrs = useAttrs()
const dateValue = ref<any>()
const dateStartValue = ref()
const dateEndValue = ref()
useRangeModel(props,dateValue,dateStartValue,dateEndValue)


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
    <div class="els-node">
        <ElsFormNode v-bind="lessCom.getFormNodeProps(props)">
            <els-time-picker v-if="single" v-model="dateValue" v-bind="props" width="200" :defaultValue="defaultValue"
                v-model:start="dateStartValue" v-model:end="dateEndValue">
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

../../utlis/interfaces.js