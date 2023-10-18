<script setup lang="ts">
import { ref, useAttrs, watch, inject, watchEffect } from 'vue'
import '../../utlis/lessPrototype.js'
import { TimePickerProps } from '../../utlis/interfaceCom'
const emits = defineEmits(['update:modelValue', 'update:start', 'update:end', 'visible-change'])
import lessCom from '../../utlis/lessCom.js'

defineOptions({ name: 'ElsTimePicker' ,
    inheritAttrs:false})

const props = withDefaults(defineProps<TimePickerProps>(), {
    type: 'date',
    valueSeparator: ',',
    width: '120',
    valueFormat: 'HH:mm:ss'
})

const attrs = useAttrs()
const timeValue = ref()
const selectVisible = ref(false)
const lessHour = ref(0)
const lessMinute = ref(0)
const lessSecond = ref(0)
const greaterHour = ref(0)
const greaterMinute = ref(0)
const greaterSecond = ref(0)



const getModelValue = inject<Function>('getModelValue', () => null)
function initModelValue() {
    if (props.modelValue===undefined&&getModelValue && props.prop!==undefined) {
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
watchEffect(() => {
    if (attrs["is-range"]) {
        const startValue = initStartModelValue()
        const endValue = initEndModelValue()
        timeValue.value = [startValue, endValue]
    }

})
watchEffect(() => {
    const val = initModelValue()
    if (val !== undefined) {
        if (attrs["is-range"]) {
            if (val) {
                timeValue.value = val.split(props.valueSeparator)
            }
        } else {
            timeValue.value = val
        }
    }
})


watch(timeValue, (val) => {
    handleReturnResult(val)
})

function makeRange(start, end) {
    const result: any = []
    for (let i = start; i <= end; i++) {
        result.push(i)
    }
    return result
}
function initLessData() {
    if (props.lessThan) {
        lessHour.value = parseInt(props.lessThan.split(':')[0]);
        lessMinute.value = parseInt(props.lessThan.split(':')[1]);
        lessSecond.value = parseInt(props.lessThan.split(':')[2]);
    }

}
function initGreaterData() {
    if (props.greaterThan) {
        greaterHour.value = parseInt(props.greaterThan.split(':')[0]);
        greaterMinute.value = parseInt(props.greaterThan.split(':')[1]);
        greaterSecond.value = parseInt(props.greaterThan.split(':')[2]);
    }

}
function disabledHourFn() {
    if (!selectVisible) {
        return [];
    }
    initLessData();
    initGreaterData();
    if (attrs["is-range"] && !timeValue) { return [] }
    let hours = []
    if (props.lessThan) {
        if (lessMinute.value == 0 && lessSecond.value == 0) {
            hours = makeRange(lessHour.value, 24);
        } else {
            hours = makeRange(lessHour.value + 1, 24);
        }
    }
    if (props.greaterThan) {
        if (greaterMinute.value == 59 && greaterSecond.value == 59) {
            hours = makeRange(0, greaterHour.value);
        } else {

            hours = makeRange(0, greaterHour.value - 1);
        }
    }
    if (typeof (props.disabledHours) === 'function') {
        return props.disabledHours().concat(hours)
    }
    return (props.disabledHours ?? []).concat(hours)
}
function disabledMinutesFn(selectedHour) {
    if (!selectVisible.value) {
        return [];
    }
    initLessData();
    initGreaterData();
    if (attrs["is-range"] && !timeValue) { return [] }
    let minutes = []
    if (props.lessThan) {
        if (selectedHour == lessHour.value && lessHour.value == 0) {
            minutes = makeRange(lessMinute.value, 60);
        } else if (selectedHour == lessHour.value) {
            minutes = makeRange(lessMinute.value + 1, 60);
        }
    }
    if (props.greaterThan) {
        if (selectedHour == greaterHour.value && greaterHour.value == 59) {
            minutes = minutes.concat(makeRange(0, greaterMinute.value));
        } else if (selectedHour == greaterHour.value) {
            minutes = minutes.concat(makeRange(0, greaterMinute.value - 1));
        }
    }
    if (typeof (props.disabledMinutes) === 'function') {
        return props.disabledMinutes().concat(minutes)
    }
    return (props.disabledMinutes ?? []).concat(minutes)
}
function disabledSecondsFn(selectedHour, selectedMinute) {
    if (!selectVisible) {
        return [];
    }
    initLessData();
    initGreaterData();
    if (attrs["is-range"] && !timeValue.value) { return [] }
    let seconds = []
    if (props.lessThan) {
        if (selectedHour == lessHour.value && selectedMinute == lessMinute.value) {
            seconds = makeRange(lessSecond.value, 60);
        }
    }
    if (props.greaterThan) {
        if (selectedHour == greaterHour.value && selectedMinute == greaterMinute.value) {
            seconds = seconds.concat(makeRange(0, greaterSecond.value));
        }
    }
    if (typeof (props.disabledSeconds) === 'function') {
        return props.disabledSeconds().concat(seconds)
    }
    return (props.disabledSeconds ?? []).concat(seconds)
}
function handleVisible(visible) {
    selectVisible.value = visible
    emits('visible-change', visible)
}
const setModelValue = inject<Function>('setModelValue', () => { })
function handleReturnModelValue(value) {
    emits('update:modelValue', value);
    if (props.modelValue===undefined&&setModelValue && props.prop!==undefined) {
        setModelValue(props.prop, value,props.aIndex)
    }
}
function handleReturnStartValue(value) {
    emits('update:start', value);
    if (props.start===undefined&&setModelValue && attrs.propStart!==undefined) {
        setModelValue(attrs.propStart, value,props.aIndex)
    }
}
function handleReturnEndValue(value) {
    emits('update:end', value);
    if (props.end===undefined&&setModelValue && attrs.propEnd!==undefined) {
        setModelValue(attrs.propEnd, value,props.aIndex)
    }
}
function handleReturnResult(val) {
    if (!val) {
        handleReturnStartValue('')
        handleReturnEndValue('')
        handleReturnModelValue('')
    } else {
        if (attrs["is-range"] === true) {
            let startDate = val[0]
            let endDate = val[1]
            handleReturnStartValue(startDate)
            handleReturnEndValue(endDate)

            if (!startDate && !endDate) {
                handleReturnModelValue('')
            } else {
                handleReturnModelValue(startDate + props.valueSeparator + endDate)

            }
        }
        else if (val) {
            handleReturnModelValue(val)
        } else {
            handleReturnModelValue('')
        }
    }
}

if (attrs["is-range"]) {
    if (props.start || props.end) {
        if (props.end) {
            timeValue.value = [props.start, props.end];
        } else {
            timeValue.value = [props.start, props.start];
        }
    } else if (props.modelValue) {
        timeValue.value = props.modelValue.split(',')
    }
} else if (props.modelValue) {
    timeValue.value = props.modelValue
}

const currWidth = ref(props.width)
const pickerStyle = ref<any>([])
if (currWidth.value) {
    pickerStyle.value.push({ width: currWidth.value?.appendPx() })
}
if (attrs['is-range'] !== undefined) {
    pickerStyle.value.push({ "flex-grow": 0 })
}

</script>

<template>
    <ElsFormNode v-bind="lessCom.getFormNodeProps(props)">
        <el-time-picker v-model="timeValue" :value-format="valueFormat" :style="pickerStyle"
            :disabled-hours="disabledHourFn" :disabled-minutes="disabledMinutesFn" :disabled-seconds="disabledSecondsFn"
            @visible-change="handleVisible">
        </el-time-picker>
    </ElsFormNode>
</template>

