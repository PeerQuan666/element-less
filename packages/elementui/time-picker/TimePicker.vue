<script setup lang="ts">
import { ref, useAttrs, watch } from 'vue'

import { TimePickerProps } from '../../utlis/interfaces'
const emits = defineEmits(['update:modelValue', 'update:start', 'update:end', 'visible-change'])
import { lessCom } from '../../utlis/com'
import {useModel,useMobile} from '../../utlis/use'
defineOptions({ name: 'ElsTimePicker' ,
    inheritAttrs:false})

const props = withDefaults(defineProps<TimePickerProps>(), {
    valueSeparator: ',',
    width: '120',
    valueFormat: 'HH:mm:ss'
})


const attrs = useAttrs()
const timeValue = ref()
const mobileTimeValue=ref<any>()
const selectVisible = ref(false)
const lessHour = ref(0)
const lessMinute = ref(0)
const lessSecond = ref(0)
const greaterHour = ref(0)
const greaterMinute = ref(0)
const greaterSecond = ref(0)
const formNode=ref()


const {
    currModelValue,
    returnModelValue,
    returnStartValue,
    returnEndValue
} = useModel(props)

const {isMobile,onMobileConfirm,onMobileHiddenPopup} =useMobile(formNode)

watch(timeValue, (val,oldVal) => {

    if(val==undefined||oldVal==undefined||val.toString()!=oldVal.toString()){
        handleReturnResult(val)
    }

})


watch(currModelValue,(val)=>{
    if (val !== undefined) {
        if (props.isRange) {
            if (val) {
                if(timeValue.value.toString()!=val.toString()){
                    timeValue.value = val.split(props.valueSeparator)
                }
            }
        } else {
            timeValue.value = val
        }
    }
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
    if (props.isRange && !timeValue) { return [] }
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
    if (props.isRange && !timeValue) { return [] }
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
    if (props.isRange && !timeValue.value) { return [] }
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
        returnStartValue('')
        returnEndValue('')
        returnModelValue('')
    } else {
        if (props.isRange === true) {
            let startDate = val[0]
            let endDate = val[1]
            returnStartValue(startDate)
            returnEndValue(endDate)

            if (!startDate && !endDate) {
                returnModelValue('')
            } else {
                returnModelValue(startDate + props.valueSeparator + endDate)

            }
        }
        else if (val) {
           returnModelValue(val)
        } else {
            returnModelValue('')
        }
    }
}

if (props.isRange) {
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
    mobileTimeValue.value=timeValue.value.split(':')   
}

const currWidth = ref(props.width)
const pickerStyle = ref<any>([])
if (currWidth.value) {
    pickerStyle.value.push({ width: currWidth.value?.appendPx() })
}
if (props.isRange !== undefined) {
    pickerStyle.value.push({ "flex-grow": 0 })
}



function onConfirm(){
    timeValue.value=`${mobileTimeValue.value.join(':')}`
    onMobileConfirm(timeValue.value)
}

</script>

<template>
       <div class="els-node">
        <ElsFormNode v-bind="lessCom.getFormNodeProps(props)" tagName="Timepicker" ref="formNode">
            <el-time-picker v-model="timeValue" v-if="!isMobile" :value-format="valueFormat" v-bind="attrs" :isRange="isRange" :style="pickerStyle"
                :disabled-hours="disabledHourFn" :disabled-minutes="disabledMinutesFn" :disabled-seconds="disabledSecondsFn"
                @visible-change="handleVisible">
            </el-time-picker>
            <van-time-picker v-else v-model="mobileTimeValue"  @confirm="onConfirm" @cancel="onMobileHiddenPopup"  />
        </ElsFormNode>
    </div>
</template>
