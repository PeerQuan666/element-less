<script setup lang="ts">
import { ref,  useAttrs } from 'vue'

import { DatePickerProps, RangeFormItemProps } from '../../utlis/interfaces'
import { QueryDataType } from '../../utlis/enums';
import { lessCom } from '../../utlis/com'
import {useRangeModel} from '../../utlis/use'
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

const currType = props.single ? props.type + 'range' : props.type
const dateValue = ref<any>('')
const dateStartValue = ref()
const dateEndValue = ref()

 useRangeModel(props, dateValue, dateStartValue, dateEndValue)



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

../../utlis/interfaces.js