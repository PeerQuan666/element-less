<script setup lang="ts">
import { ref, useAttrs, watch, watchEffect } from 'vue'
import '../../utlis/lessPrototype.js'
import { DatePickerProps } from '../../utlis/interfaceCom'
import lessCom from '../../utlis/lessCom.js'
import {useModel} from '../../utlis/componentCom.js'
defineOptions({ name: 'ElsDatePicker', inheritAttrs: false })

const props = withDefaults(defineProps<DatePickerProps>(), {
    type: 'date',
    valueSeparator: ','
})

const attrs = useAttrs()
const currValueFormat = ref()
const dateValue = ref()
const currDefaultTime = ref()
const currWidth = ref(props.width)
if (props.defaultTime) {
    if (typeof (props.defaultTime) === 'string') {
        currDefaultTime.value = new Date('1991-08-28 ' + props.defaultTime)
    } else if (Array.isArray(props.defaultTime)) {
        currDefaultTime.value = props.defaultTime.map(ele => { return new Date('1991-08-28 ' + ele) })
    }
}
let pickerOptions = ref<Array<{ text: string, value: Date | Function }>>([])
const {
    currModelValue,
    returnModelValue,
    returnStartValue,
    returnEndValue
} = useModel(props)

function initValue() {
    if (props.type == "daterange" || props.type == "datetimerange" || props.type == "monthrange" || props.type == 'dates') {
        let currValue = ['', '']
        if (!currModelValue.value) {
            if (props.start && props.end) {
                currValue = [props.start.toString(), props.end.toString()]
            } else if (props.start) {
                currValue = [props.start.toString(), props.start.toString()]
            }
            if (!dateValue.value) {
                dateValue.value = currValue;
            }
        }
    } else {
        if (dateValue.value != currModelValue.value) {
            dateValue.value =  currModelValue.value
        }
    }

}
function converToDate(val) {
    if (currValueFormat.value.indexOf('-') > -1 || currValueFormat.value == 'x') {
        return new Date(val);
    } else {
        var pattern = /(\d{4})(\d{2})(\d{2})/;
        if (pattern.test(val)) {
            var formatedDate = val.replace(pattern, '$1-$2-$3');
            return new Date(formatedDate);
        }
        pattern = /(\d{4})(\d{2})/;
        if (pattern.test(val)) {
            var formatedDate = val.replace(pattern, '$1-$2');
            return new Date(formatedDate);
        }
        pattern = /(\d{4})/;
        if (pattern.test(val)) {
            var formatedDate = val.replace(pattern, '$1');
            return new Date(formatedDate);
        }
        return new Date()
    }
}
function addDate(date, days) {
    if (days == undefined || days == '') {
        days = 1;
    }
    const currDate = new Date(date);
    currDate.setDate(date.getDate() + days);
    var month = currDate.getMonth() + 1;
    var day = currDate.getDate();
    return new Date(currDate.getFullYear() + '-' + getFormatDate(month) + '-' + getFormatDate(day));
}
function getFormatDate(arg) {
    if (arg == undefined || arg == '') {
        return '';
    }
    var re = arg + '';
    if (re.length < 2) {
        re = '0' + re;
    }
    return re;
}

let currDisabledDate: Function = function (time) {
    if (props.lessThan && props.greaterThan) {
        return time.getTime() >= converToDate(props.lessThan).getTime() || time.getTime() <= addDate(converToDate(props.greaterThan), -1).getTime();
    }
    else if (props.lessThan && !props.greaterThan) {
        return time.getTime() >= converToDate(props.lessThan).getTime();
    } else if (!props.lessThan && props.greaterThan) {
        return time.getTime() <= addDate(converToDate(props.greaterThan), -1).getTime();
    }
}
if (props.disabledDate) {
    currDisabledDate = props.disabledDate
}

if (props.shortcuts) {
    pickerOptions.value = props.shortcuts
} else if (props.isShortcuts) {
    if (props.type.indexOf('range') == -1) {
        pickerOptions.value = [{
            text: '今天',
            value: new Date(),
        }, {
            text: '昨天',
            value: () => {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                return date;
            }
        }, {
            text: '七天前  ',
            value: () => {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                return date;
            }
        }]
    } else {
        let end = new Date();
        let start = new Date();
        if (props.shortcutsDate) {
            end = new Date(props.shortcutsDate)
            start = new Date(props.shortcutsDate)
        }
        pickerOptions.value = [
            {
                text: '今日',
                value: () => {
                    end = new Date();
                    start = new Date();
                    if (props.shortcutsDate) {
                        end = new Date(props.shortcutsDate)
                        start = new Date(props.shortcutsDate)
                    }
                    return [start, end];
                }
            },
            {
                text: '昨日',
                value: () => {
                    end = new Date();
                    start = new Date();
                    if (props.shortcutsDate) {
                        end = new Date(props.shortcutsDate)
                        start = new Date(props.shortcutsDate)
                    }
                    end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                    return [start, end];
                }
            },
            {
                text: '近7日',
                value: () => {
                    end = new Date();
                    start = new Date();
                    if (props.shortcutsDate) {
                        end = new Date(props.shortcutsDate)
                        start = new Date(props.shortcutsDate)
                    }
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
                    return [start, end];
                }
            }, {
                text: '近14日',
                value: () => {
                    end = new Date();
                    start = new Date();
                    if (props.shortcutsDate) {
                        end = new Date(props.shortcutsDate)
                        start = new Date(props.shortcutsDate)
                    }
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 13);
                    return [start, end];
                }
            }, {
                text: '近30日',
                value: () => {
                    end = new Date();
                    start = new Date();
                    if (props.shortcutsDate) {
                        end = new Date(props.shortcutsDate)
                        start = new Date(props.shortcutsDate)
                    }
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 29);
                    return [start, end];
                }
            }, {
                text: '近60日',
                value: () => {
                    end = new Date();
                    start = new Date();
                    if (props.shortcutsDate) {
                        end = new Date(props.shortcutsDate)
                        start = new Date(props.shortcutsDate)
                    }
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 59);
                    return [start, end];
                }
            }, {
                text: '近90日',
                value: () => {
                    end = new Date();
                    start = new Date();
                    if (props.shortcutsDate) {
                        end = new Date(props.shortcutsDate)
                        start = new Date(props.shortcutsDate)
                    }
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 89);
                    return [start, end];
                }
            },
            {
                text: '本月',
                value: () => {
                    end = new Date();
                    start = new Date();
                    if (props.shortcutsDate) {
                        end = new Date(props.shortcutsDate)
                        start = new Date(props.shortcutsDate)
                    }
                    start = new Date((end.getFullYear() + "-" + (end.getMonth() + 1) + "-01"));
                    return [start, end];
                }
            },
            {
                text: '上个月',
                value: () => {
                    end = new Date();
                    start = new Date();
                    if (props.shortcutsDate) {
                        end = new Date(props.shortcutsDate)
                        start = new Date(props.shortcutsDate)
                    }
                    end = new Date((new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-01"));
                    end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                    start = new Date((end.getFullYear() + "-" + (end.getMonth() + 1) + "-01"));
                    return [start, end];
                }
            },
        ]
    }
}



function handleReturnResult(val) {
    if (!val) {
       returnStartValue('')
       returnEndValue('')
       returnModelValue('')
    } else {
        if (props.type.indexOf('range') > -1) {
            returnStartValue(val[0])
            returnEndValue(val[1])
            if (!val[0] && !val[1]) {
                returnModelValue('')
            } else {
                returnModelValue(val.join(props.valueSeparator))
            }
        }
        else if (props.type == 'dates' && Array.isArray(val)) {
            returnModelValue(val.join(props.valueSeparator))
        }
        else {
            returnModelValue(val)
        }
    }
}


watch(dateValue, (val) => {
    handleReturnResult(val)
})

watch(currModelValue, (currValue) => {
    if (typeof (currValue) === 'string' && (props.type.indexOf('range') > -1 || props.type == 'dates')) {
        if (!dateValue.value || currValue.toString() != dateValue.value.toString()) {
            dateValue.value = currValue.split(props.valueSeparator)
        }

    } else {
        dateValue.value = currValue
    }
}, { immediate: true })


const pickerStyle = ref<any>([])
watchEffect(() => {
    currValueFormat.value = props.valueFormat;
    if (currValueFormat.value == "timestamp") {
        currValueFormat.value = "x";
    }
    currWidth.value = props.width
    if (!currValueFormat.value) {
        switch (props.type) {
            case 'year':
                currValueFormat.value = "YYYY"
                if (!currWidth.value) {
                    currWidth.value = '100'
                }

                break;
            case 'monthrange':
            case 'month':
                currValueFormat.value = "YYYY-MM"
                if (!currWidth.value) {
                    currWidth.value = '120'
                }
                break;
            case 'daterange':
            case 'dates':
            case 'date':
                currValueFormat.value = "YYYY-MM-DD"
                if (!currWidth.value) {
                    currWidth.value = '140'
                }

                if (props.defaultTime) {
                    currValueFormat.value = "YYYY-M M-DD HH:mm:ss"
                }
                break;
            case 'datetimerange':
                currValueFormat.value = "YYYY-MM-DD HH:mm:ss"
                if (!props.defaultTime) {
                    currDefaultTime.value = [new Date('1991-08-28 00:00:00'), new Date('1991-08-28 23:59:59')]
                }
                if (!currWidth.value) {
                    currWidth.value = '180'
                }
                break;
            case 'datetime':
                currValueFormat.value = "YYYY-MM-DD HH:mm:ss"
                if (!currWidth.value) {
                    currWidth.value = '200'
                }
                break;
            case 'week':
                currValueFormat.value = "YYYY-MM-DD"
                if (!currWidth.value) {
                    currWidth.value = '80'
                }
                break;
            default:
                break;
        }
        if (props.type.indexOf('range') > -1 && currWidth.value) {
            currWidth.value = (parseInt(currWidth.value) * 2).toString()
        }
    }

    if (currWidth.value) {
        pickerStyle.value.push({ width: currWidth.value?.appendPx() })
    }
    if (props.type.indexOf('range') > -1) {
        pickerStyle.value.push({ "flex-grow": 0 })
    }

})

initValue();

</script>

<template>
    <div class="els-node">
        <ElsFormNode v-bind="lessCom.getFormNodeProps(props)">
            <el-date-picker v-model="dateValue" v-bind="attrs" :type="type" :value-format="currValueFormat"
                :defaultTime="currDefaultTime" :disabled-date="currDisabledDate" :shortcuts="pickerOptions"
                :style="pickerStyle">
                <template #default="cell">
                    <slot name="default" :cell="cell"></slot>
                </template>
                <template #range-separator>
                    <slot name="range-separator"></slot>
                </template>
            </el-date-picker>
        </ElsFormNode>
    </div>
</template>

