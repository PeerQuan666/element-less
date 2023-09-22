<script setup lang="ts">
import { ref, useAttrs, watch } from 'vue'
import '../../utlis/lessPrototype.js'
import { TimePickerProps } from '../../utlis/interfaceCom'
const emits = defineEmits(['update:modelValue', 'update:start', 'update:end', 'visible-change'])
defineOptions({ name: 'ElsTimePicker' })

const props = withDefaults(defineProps<TimePickerProps>(), {
    type: 'date',
    valueSeparator: ',',
    width: '120',
    valueFormat:'HH:mm:ss'
})

const attrs = useAttrs()
console.info(props)
const timeValue = ref()
const selectVisible = ref(false)
const lessHour = ref(0)
const lessMinute = ref(0)
const lessSecond = ref(0)
const greaterHour = ref(0)
const greaterMinute = ref(0)
const greaterSecond = ref(0)


watch(() => props.start, (val) => {
    if (attrs["is-range"]&&val) {
        if(props.end){
            timeValue.value = [val, props.end]
        }
    }
}, { immediate: true })

watch(() => props.end, (val) => {
    if (attrs["is-range"]&&val) {
        if (props.start) {
            timeValue.value = [props.start, val]
        }
    }
}, { immediate: true })

watch(() => props.modelValue, (val) => {
    if (val !== undefined) {
        if (attrs["is-range"]) {
            if (val) {
                timeValue.value = val.split(props.valueSeparator)
            }
        } else {
            timeValue.value = val
        }
    }

}, { immediate: true })

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

function handleReturnResult(val) {
    if (!val) {
        emits('update:start', '')
        emits('update:end', '')
        emits('update:modelValue', '')
    } else {
        if (attrs["is-range"] === true) {
            let startDate=val[0]
            let endDate=val[1]
            emits('update:start', startDate)
            emits('update:end', endDate)
            if(!startDate&&!endDate){
                emits('update:modelValue', '')
            }else{
                emits('update:modelValue', startDate + props.valueSeparator + endDate)

            }
        }
        else if(val){
            emits('update:modelValue', val)
        }else{
            emits('update:modelValue', '')

        }
    }
}

if (attrs["is-range"]) {
    if (props.start || props.end) {
        if (props.end) {
            timeValue.value = [props.start, props.end];
        } else {
            timeValue.value = [props.start,props.start];
        }
    } else if (props.modelValue) {
        timeValue.value = props.modelValue.split(',')
    }
} else if(props.modelValue){
    timeValue.value = props.modelValue
}

const currWidth=ref(props.width)
const pickerStyle = ref<any>([])
if (currWidth.value) {
    pickerStyle.value.push({ width: currWidth.value?.appendPx() })
}
if (attrs['is-range']!==undefined) {
    pickerStyle.value.push({ "flex-grow": 0 })
}

</script>

<template>
    <el-time-picker v-model="timeValue"  :value-format="valueFormat" :style="pickerStyle" 
    :disabled-hours="disabledHourFn"
        :disabled-minutes="disabledMinutesFn" :disabled-seconds="disabledSecondsFn" @visible-change="handleVisible">
    </el-time-picker>
</template>

