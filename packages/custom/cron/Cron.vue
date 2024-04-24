<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { lessCom } from '../../utlis/com';
defineOptions({ name: "ElsCron" })
interface Props {
    modelValue?: any,
}
const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue', 'update:data', 'update:descript'])
const currData = ref()
const visible = ref()
const tip = ref()
const weekOrder = ref([
    { label: '第一周', value: '1' },
    { label: '第二周', value: '2' },
    { label: '第三周', value: '3' },
    { label: '第四周', value: '4' },
    { label: '第五周', value: '5' },
])
const cronTip = ref()

const dayOrWeek = ref('1')
const datetime = ref()
const minute = ref({
    incrementStart: '',
    incrementIncrement: '',
})
const hour = ref({
    incrementStart: '',
    incrementIncrement: '',
})
const day: any = ref({
    incrementStart: '',
    incrementIncrement: '',
    specificSpecific: '',
})
const week: any = ref({
    incrementStart: '',
    incrementIncrement: '',
    specificSpecific: '',
    dayOfWeek: {
        incrementStart: '',
        specificSpecific: '',
    },
})
const month: any = ref({
    incrementStart: '',
    incrementIncrement: '',
    specificSpecific: '',
})
const year = ref({
    incrementStart: '',
    incrementIncrement: '',
})

const options = ([
    {
        value: '1',
        label: '一次性'
    },
    {
        value: '2',
        label: '每分'
    },
    {
        value: '3',
        label: '每时'
    },
    {
        value: '4',
        label: '每日'
    },
    {
        value: '5',
        label: '每周'
    },
    {
        value: '6',
        label: '每月'
    }
])

const dataValue = ref('1')






const minutesText = computed(() => {
    let minutes = ''
    if (minute.value.incrementStart == '0') {
        minutes = '0'
    } else {
        minutes = minute.value.incrementStart
    }
    if (minute.value.incrementIncrement) {
        minutes = minute.value.incrementStart + '/' + minute.value.incrementIncrement
    }
    return minutes
})
const hoursText = computed(() => {
    let hours = ''
    if (hour.value.incrementStart == '0') {
        hours = '0'
    } else {
        hours = hour.value.incrementStart
    }
    if (hour.value.incrementIncrement) {
        hours = hour.value.incrementStart + '/' + hour.value.incrementIncrement
    }
    return hours
})
const daysText = computed(() => {
    let days = ''
    if (day.value.incrementStart) {
        days = day.value.incrementStart
    }
    if (day.value.specificSpecific) {
        days = day.value.specificSpecific.toListNumber().sort((x, y) => { return x - y }).toString()
    }
    if (day.value.incrementIncrement) {
        days = day.value.incrementStart + '/' + day.value.incrementIncrement
    }
    if (
        week.value.incrementStart
        && week.value.incrementStart !== '?'
        || week.value.incrementIncrement
    ) {
        days = '?'
    }
    return days
})
const weeksText = computed(() => {
    let weeks = ''
    if (week.value.specificSpecific) {
        weeks = week.value.specificSpecific.toListNumber().sort((x, y) => { return x - y }).toString()
    }
    if (week.value.dayOfWeek.specificSpecific) {
        weeks = week.value.dayOfWeek.specificSpecific.toListNumber().sort((x, y) => { return x - y }).toString()
    }
    if (week.value.incrementStart === '?') {
        weeks = week.value.incrementStart
    } else if (
        week.value.incrementStart
        && week.value.dayOfWeek.specificSpecific
    ) {
        weeks = weeks + '#' + week.value.incrementStart
    }
    if (week.value.incrementIncrement) {
        weeks = weeks + '/' + week.value.incrementIncrement
    }
    return weeks
})
const monthsText = computed(() => {
    let months = ''
    if (month.value.specificSpecific) {
        months = month.value.specificSpecific.toListNumber().sort((x, y) => { return x - y }).toString()
    }
    if (month.value.incrementStart) {
        months = month.value.incrementStart
    }
    return months
})
const yearsText = computed(() => {
    if (year.value.incrementStart) {
        return year.value.incrementStart;
    } else {
        return '*';
    }
})
const cron = computed(() => {
    return `${'0'} ${minutesText.value || '*'} ${hoursText.value || '*'} ${daysText.value || '*'} ${monthsText.value || '*'} ${weeksText.value || '?'} ${yearsText.value}`
})

const cronTipText = computed(() => {
    cronTip.value = resultProcess(cron.value)
    if (
        cron.value === '0 * * * * ? *'
        || cron.value === '* * * * * ? *'
    ) {
        return ''
    } else {
        realTimeChange()
    }

    return cronTip.value
})




function initData() {
    let resultArr = currData.value.split(' ')
    for (let i = 0; i < resultArr.length; i++) {
        if (1 === i) {
            if (resultArr[1].indexOf('/') > -1) {
                let temporaryArr = resultArr[1].split('/')
                minute.value.incrementStart = temporaryArr[1].toInt();
                minute.value.incrementIncrement = temporaryArr[0].toInt();
                dataValue.value = '2';
            } else {
                minute.value.incrementStart = resultArr[1].toInt();
            }
        }
        if (2 === i) {
            if (resultArr[2].indexOf('*') > -1) {

            }
            else if (resultArr[2].indexOf('/') > -1) {
                let temporaryArr = resultArr[2].split('/')
                hour.value.incrementStart = temporaryArr[0].toInt();
                hour.value.incrementIncrement = temporaryArr[1].toInt();
                dataValue.value = '3';
            } else {
                hour.value.incrementStart = resultArr[2].toInt();
            }
        }
        if (3 === i) {
            if (resultArr[3].indexOf('?') > -1) {

            } else if (resultArr[3].indexOf('*') > -1) {

            } else if (resultArr[3].indexOf('/') > -1) {
                let temporaryArr = resultArr[3].split('/')
                day.value.incrementStart = temporaryArr[0].toInt();
                day.value.incrementIncrement = temporaryArr[1].toInt();
                dataValue.value = '4';
            } else {

                if (resultArr[3].indexOf(',') > -1) {
                    day.value.specificSpecific = resultArr[3]

                } else {

                    day.value.incrementStart = resultArr[3].toInt();
                }

            }
        }
        if (4 === i) {
            if (resultArr[4].indexOf('*') === -1) {
                if (resultArr[6] !== "*") {
                    month.value.incrementStart = resultArr[4]
                } else {
                    if (resultArr[4].indexOf('/') > -1) {
                        let temporaryArr = resultArr[4].split('/')
                        dataValue.value = '6';
                        month.value.incrementStart = temporaryArr[1].toInt();
                        month.value.incrementIncrement = temporaryArr[0].toInt();

                    } else {
                        dataValue.value = '6';
                        month.value.specificSpecific = resultArr[4];

                    }
                }

            }

        }
        if (5 === i) {
            if (resultArr[5].indexOf('?') > -1) {

            }
            else if (resultArr[5].indexOf('/') > -1) {
                let temporaryArr = resultArr[5].split('/')
                week.value.incrementIncrement = temporaryArr[1];
                week.value.dayOfWeek.specificSpecific = temporaryArr[0]
                dataValue.value = '5';
            } else if (resultArr[5].indexOf('#') > -1) {
                let temporaryArr = resultArr[5].split('#')
                week.value.incrementStart = temporaryArr[1];
                week.value.dayOfWeek.specificSpecific = temporaryArr[0]
                dayOrWeek.value = "2";
            }
        }
        if (6 === i) {
            if (resultArr[6] !== "*") {
                year.value.incrementStart = resultArr[6]
                datetime.value = new Date(`${year.value.incrementStart}-${month.value.incrementStart}-${day.value.incrementStart} ${hour.value.incrementStart}:${minute.value.incrementStart}:00`)
                dataValue.value = '1';
            }

        }

    }

}
function resultProcess(result) {
    let resultTipText = ''
    let resultTextArr: any = []
    let resultArr = result.split(' ')
    for (let i = 0; i < resultArr.length; i++) {
        if (0 === i) {
            resultTextArr[0] = '0秒'
        }
        if (1 === i) {
            if (resultArr[1].indexOf('*') > -1) {
                resultTextArr[1] = '每分钟'
            } else if (resultArr[1].indexOf('/') > -1) {
                let temporaryArr = resultArr[1].split('/')
                resultTextArr[1] = '每' + temporaryArr[1] + '分钟，' + '从' + temporaryArr[0] + '分'
            } else {
                resultTextArr[1] = resultArr[1] + '分'
            }
        }
        if (2 === i) {
            if (resultArr[2].indexOf('*') > -1) {
                resultTextArr[2] = ''
            } else if (resultArr[2].indexOf('/') > -1) {
                let temporaryArr = resultArr[2].split('/')
                resultTextArr[2] = '每' + temporaryArr[1] + '小时，' + '从' + temporaryArr[0] + '点'
            } else {
                resultTextArr[2] = resultArr[2] + '点'
            }
        }
        if (3 === i) {
            if (resultArr[3].indexOf('?') > -1) {
                resultTextArr[3] = ''
            } else if (resultArr[3].indexOf('*') > -1) {
                resultTextArr[3] = ''
            } else if (resultArr[3].indexOf('/') > -1) {
                let temporaryArr = resultArr[3].split('/')
                resultTextArr[3] = '每' + temporaryArr[1] + '天，' + '从' + temporaryArr[0] + '号的'
            } else {
                if (resultArr[3].indexOf(',') > -1) {
                    resultTextArr[3] = resultArr[3] + '日的'
                } else {
                    resultTextArr[3] = resultArr[3] + '日'
                }
            }
        }
        if (4 === i) {
            if (resultArr[4].indexOf('*') > -1) {
                resultTextArr[4] = ''
            } else if (resultArr[4].indexOf('/') > -1) {
                let temporaryArr = resultArr[4].split('/')
                resultTextArr[4] = '每' + temporaryArr[1] + '个月执行，' + '从' + temporaryArr[0] + '月'
            } else {
                if (resultArr[4].indexOf(',') > -1) {
                    resultTextArr[4] = resultArr[4] + '月的'
                } else {
                    resultTextArr[4] = resultArr[4] + '月'
                }
            }
        }
        if (5 === i) {
            if (resultArr[5].indexOf('?') > -1) {
                resultTextArr[5] = ''
            } else if (resultArr[5].indexOf('/') > -1) {
                let temporaryArr = resultArr[5].split('/')
                let convertedWeekNum = temporaryArr[0]
                    .toString()
                    .replace(/1/, '周日')
                    .replace(/2/, '周一')
                    .replace(/3/, '周二')
                    .replace(/4/, '周三')
                    .replace(/5/, '周四')
                    .replace(/6/, '周五')
                    .replace(/7/, '周六')
                resultTextArr[5] = '每' + temporaryArr[1] + '周，' + '从' + convertedWeekNum + '的'
            } else if (resultArr[5].indexOf('#') > -1) {
                let temporaryArr = resultArr[5].split('#')
                let convertedWeekNum = temporaryArr[0]
                    .toString()
                    .replace(/1/, '周日')
                    .replace(/2/, '周一')
                    .replace(/3/, '周二')
                    .replace(/4/, '周三')
                    .replace(/5/, '周四')
                    .replace(/6/, '周五')
                    .replace(/7/, '周六')
                resultTextArr[5] = '第' + temporaryArr[1] + '周的' + convertedWeekNum + '的'
            } else if (
                resultArr[5] === 0
                || resultArr[5] === '0'
            ) {
                resultTextArr[5] = ''
            } else if (resultArr[5] && resultArr[5].indexOf('#') === -1) {
                resultTextArr[5] = ''
            }
        }
        if (6 === i) {
            if (resultArr[6] == "*") {
                resultTextArr[6] = ''
            } else {
                resultTextArr[6] = resultArr[6] + "年"
            }

        }
    }
    if (resultArr[5].indexOf('?') > -1) {
        resultTipText = resultTextArr.reverse().join('')
    } else if (resultArr[3].indexOf('?') > -1) {
        resultTipText = resultTextArr[4]
            + resultTextArr[5]
            + resultTextArr[3]
            + resultTextArr[2]
            + resultTextArr[1]
            + resultTextArr[0]
    }
    return resultTipText
}
function dayOrWeekChange() {
    dayOrWeek.value = dayOrWeek.value == '1' ? '1' : '2'
    if (dayOrWeek.value == '1') {
        minute.value.incrementStart = '0'
        hour.value.incrementStart = '0'
        day.value.specificSpecific = '1'
        week.value.incrementStart = '?'
    } else {
        minute.value.incrementStart = '0'
        hour.value.incrementStart = '0'
        day.value.incrementStart = '?'
        week.value.dayOfWeek.specificSpecific = '2'
    }
}
function realTimeChange() {
    currData.value = cron.value
    tip.value = cronTip.value
}
function datetimeChange() {
    if (datetime) {
        const currDatetime=new Date(datetime.value)
        month.value.incrementStart = currDatetime.getMonth() + 1
        day.value.incrementStart = currDatetime.getDate()
        hour.value.incrementStart = currDatetime.getHours().toString()
        minute.value.incrementStart = currDatetime.getMinutes().toString()
        year.value.incrementStart = currDatetime.getFullYear().toString()
    }
}


function reset(val) {
    switch (val) {
        case '1':
            resetCronData()
            datetime.value =lessCom.formatDate(new Date(),'yyyy-MM-dd 00:00:00');
            datetimeChange();
            break
        case '2':
            resetCronData()
            minute.value.incrementStart = '0'
            minute.value.incrementIncrement = '1'
            break
        case '3':
            resetCronData()
            minute.value.incrementStart = '0'
            hour.value.incrementStart = '0'
            hour.value.incrementIncrement = '1'
            break
        case '4':
            resetCronData()
            minute.value.incrementStart = '0'
            hour.value.incrementStart = '0'
            day.value.incrementStart = '1'
            day.value.incrementIncrement = '1'
            day.value.specificSpecific = ''
            week.value.incrementStart = '?'
            break
        case '5':
            resetCronData()
            minute.value.incrementStart = '0'
            hour.value.incrementStart = '0'
            day.value.incrementStart = '?'
            week.value.incrementIncrement = '1'
            week.value.dayOfWeek.specificSpecific = '2'
            break
        case '6':
            resetCronData()
            dayOrWeek.value = "1"
            minute.value.incrementStart = '0'
            hour.value.incrementStart = '0'
            day.value.specificSpecific = ''
            week.value.incrementStart = '?'
            month.value.specificSpecific = ''
            break
    }
}
function resetCronData() {

    minute.value.incrementStart = ''
    minute.value.incrementIncrement = ''
    hour.value.incrementStart = ''
    hour.value.incrementIncrement = ''
    day.value.incrementStart = ''
    day.value.incrementIncrement = ''
    day.value.specificSpecific = ''
    week.value.incrementStart = ''
    week.value.incrementIncrement = ''
    week.value.specificSpecific = ''
    week.value.dayOfWeek.specificSpecific = ''
    month.value.incrementStart = ''
    month.value.incrementIncrement = ''
    month.value.specificSpecific = ''
    year.value.incrementStart = ''
}
watch(currData, (val) => {
    emits('update:modelValue', val)
})
onMounted(() => {
    currData.value = props.modelValue
    if(currData.value){
        initData()
   
    }
   
})

</script>
<template >
    <div class="els-cron">
        <el-popover width="800" :visible="visible">
            <template #default>
                <els-form>
                    <div class="els-cron-core">
                        <els-radio-button label="定时计划" class="cron-el-select" @change="reset" v-model="dataValue">
                            <els-option v-for="item in options" :key="item.value" :value="item.value">{{ item.label }}
                            </els-option>
                        </els-radio-button>
                        <div class="cron-el cron-content-box">
                            <div class="cron-once" v-if="dataValue === '1'">
                                <els-date-picker label="日期" class="cron-el-date-picker" type="datetime" placeholder="选择日期时间"
                                    value-format="YYYY-MM-DD HH:mm:00" text-format="YYYY-MM-DD HH:mm:00" v-model="datetime" @change="datetimeChange"
                                 >
                                </els-date-picker>
                            </div>
                            <els-form-item label="每" class="cron-per-minute" v-else-if="dataValue === '2'">
                                <els-input-number width="100" :min="1" :max="59" controls-position="right"
                                    v-model="minute.incrementIncrement">
                                </els-input-number>
                                分，从
                                <els-input-number width="100" :min="0" :max="59" controls-position="right"
                                    v-model="minute.incrementStart">
                                </els-input-number>
                                分开始
                            </els-form-item>
                            <els-form-item label="每" class="cron-per-hour" v-else-if="dataValue === '3'">
                                <els-input-number width="100" :min="0" :max="23" controls-position="right"
                                    v-model="hour.incrementIncrement">
                                </els-input-number>
                                时，从（时:分）
                                <els-input-number width="100" :min="0" :max="23" controls-position="right"
                                    v-model="hour.incrementStart">
                                </els-input-number>
                                :
                                <els-input-number width="100" :min="0" :max="59" controls-position="right"
                                    v-model="minute.incrementStart">
                                </els-input-number>
                                开始
                            </els-form-item>
                            <els-form-item label="每" class="cron-per-day" v-else-if="dataValue === '4'">
                                <els-input-number width="100" :min="1" :max="31" controls-position="right"
                                    v-model="day.incrementIncrement">
                                </els-input-number>
                                日，从
                                <els-input-number width="100" :min="1" :max="31" controls-position="right"
                                    v-model="day.incrementStart">
                                </els-input-number>
                                日的（时:分）
                                <els-input-number width="100" :min="0" :max="23" controls-position="right"
                                    v-model="hour.incrementStart">
                                </els-input-number>
                                :
                                <els-input-number width="100" :min="0" :max="59" controls-position="right"
                                    v-model="minute.incrementStart">
                                </els-input-number>
                                开始。
                            </els-form-item>
                            <template v-else-if="dataValue === '5'">
                                <els-form-item label="每" class="cron-per-week">
                                    <els-input-number width="100" :min="1" :max="5" controls-position="right"
                                        v-model="week.incrementIncrement">
                                    </els-input-number>
                                    周
                                </els-form-item>
                                <els-checkbox label="从本周的" v-model="week.dayOfWeek.specificSpecific">
                                    <els-option value="2">周一</els-option>
                                    <els-option value="3">周二</els-option>
                                    <els-option value="4">周三</els-option>
                                    <els-option value="5">周四</els-option>
                                    <els-option value="6">周五</els-option>
                                    <els-option value="7">周六</els-option>
                                    <els-option value="1">周日</els-option>
                                </els-checkbox>
                                <els-form-item label="开始">
                                    <els-input-number width="100" :min="0" :max="23" controls-position="right"
                                        v-model="hour.incrementStart">
                                    </els-input-number>：
                                    <els-input-number width="100" :min="0" :max="59" controls-position="right"
                                        v-model="minute.incrementStart">
                                    </els-input-number>

                                </els-form-item>
                            </template>
                            <template v-if="dataValue === '6'">
                                <els-checkbox class="cron-el-checkbox-group" label="月" option-width="18%" width="500"
                                    v-model="month.specificSpecific">
                                    <els-option value="1">01月</els-option>
                                    <els-option value="2">02月</els-option>
                                    <els-option value="3">03月</els-option>
                                    <els-option value="4">04月</els-option>
                                    <els-option value="5">05月</els-option>
                                    <els-option value="6">06月</els-option>
                                    <els-option value="7">07月</els-option>
                                    <els-option value="8">08月</els-option>
                                    <els-option value="9">09月</els-option>
                                    <els-option value="10">10月</els-option>
                                    <els-option value="11">11月</els-option>
                                    <els-option value="12">12月</els-option>
                                </els-checkbox>
                                <els-radio-button label="日期" v-model="dayOrWeek" @change="dayOrWeekChange"
                                    v-if="month.specificSpecific.length">
                                    <els-option value="1">日</els-option>
                                    <els-option value="2">星期中的第几日</els-option>
                                </els-radio-button>
                                <div class="cron-day-or-week-con" v-if="month.specificSpecific.length">
                                    <template v-if="dayOrWeek === '1'">
                                        <els-form-item label="月中第">

                                            <els-select class="cron-el-select" multiple placeholder="请选择" :key="dayOrWeek"
                                                v-model="day.specificSpecific">
                                                <els-option v-for="(val, $index) in 31" :key="$index" :label="val"
                                                    :value="val">{{
                                                        val }}
                                                </els-option>
                                            </els-select>
                                            日（可多选）
                                        </els-form-item>
                                        <els-form-item label="开始时间">
                                            <els-input-number width="100" controls-position="right" :min="0" :max="23"
                                                v-model="hour.incrementStart">
                                            </els-input-number>
                                            :
                                            <els-input-number width="100" controls-position="right" :min="0" :max="59"
                                                v-model="minute.incrementStart">
                                            </els-input-number>
                                        </els-form-item>
                                    </template>
                                    <template v-else>
                                        <els-select :key="dayOrWeek" label="月中第几周" width="100" :hasNoExistOption="false"
                                            class="cron-el-select" placeholder="请选择" v-model="week.incrementStart">
                                            <els-option v-for="item in weekOrder" :key="item.label" :label="item.label"
                                                :value="item.value">
                                            </els-option>
                                        </els-select>
                                        <els-checkbox v-model="week.dayOfWeek.specificSpecific" label="周几">
                                            <els-option value="2">周一</els-option>
                                            <els-option value="3">周二</els-option>
                                            <els-option value="4">周三</els-option>
                                            <els-option value="5">周四</els-option>
                                            <els-option value="6">周五</els-option>
                                            <els-option value="7">周六</els-option>
                                            <els-option value="1">周日</els-option>
                                        </els-checkbox>
                                        <els-form-item label="开始">
                                            <els-input-number width="100" controls-position="right" :min="0" :max="23"
                                                v-model="hour.incrementStart">
                                            </els-input-number>
                                            :
                                            <els-input-number width="100" controls-position="right" :min="0" :max="59"
                                                v-model="minute.incrementStart">
                                            </els-input-number>
                                        </els-form-item>
                                    </template>
                                </div>
                            </template>


                        </div>
                        <div class="cron-el cron-bottom" v-if="cronTipText">
                            <div class="cron-result">
                                <span class="value">{{ cronTipText }}</span>
                            </div>
                        </div>
                    </div>
                </els-form>
            </template>
            <template #reference>
                <el-input @click="visible = !visible" v-model="currData" style="width:250px" placeholder="* * * * * ? *">
                </el-input>
                <el-tag type="primary" v-if="tip">{{ tip }}</el-tag>
            </template>
        </el-popover>
    </div>
</template>
<style lang="less">
.cron-bottom {
    width: 450px;
    padding-top: 13px;
    border-top: 1px solid #5dafff;
    margin: 0 auto;
    margin-top: 28px;

    .cron-result {
        margin-bottom: 20px;
        text-align: center;
    }

    .cron-button-group {
        display: block;
        width: 130px;
        margin: 0 auto;
    }
}
</style>