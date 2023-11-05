<script setup lang="ts">
import { ref, reactive, watch, nextTick, onMounted } from 'vue'
defineOptions({ name: "ElsWorkPlan" })
interface Props {
    modelValue?: any,
}
const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue', 'update:data', 'update:descript'])
const planDesc = ref('')
const workPlanData = ref({
    PlanType: 1,
    ExecuteDate: '',
    StartDate: '',
    EndDate: '',
    FrequencyType: 1,
    Interval: 1,
    MonthFrequencyType: 1,
    DayNumber: '',
    WeekIndex: '',
    WeekNumber: '',
    DayFrequencyConfig: {
        FrequencyType: 1,
        ExecuteTime: '',
        Interval: 1,
        IntervalType: 1,
        StartTime: '',
        EndTime: ''
    }
})
const weekIndexData = reactive([
    { WeekNumber: 1, WeekIndexName: '第一周' },
    { WeekNumber: 2, WeekIndexName: '第二周' },
    { WeekNumber: 3, WeekIndexName: '第三周' },
    { WeekNumber: 4, WeekIndexName: '第四周' },
    { WeekNumber: 0, WeekIndexName: '最后一周' }
])
const weekNumberData = reactive([
    { WeekNumber: 1, WeekName: '星期一' },
    { WeekNumber: 2, WeekName: '星期二' },
    { WeekNumber: 3, WeekName: '星期三' },
    { WeekNumber: 4, WeekName: '星期四' },
    { WeekNumber: 5, WeekName: '星期五' },
    { WeekNumber: 6, WeekName: '星期六' },
    { WeekNumber: 0, WeekName: '星期日' }
]
)

function initData() {
    let jsonData =props.modelValue
    if (props.modelValue && typeof (props.modelValue)==='string') {
        jsonData = JSON.parse(props.modelValue);
    }
    if (jsonData.Interval === 0) {
        jsonData.Interval = 1;
    }
    if (jsonData.MonthFrequencyType === 0) {
        jsonData.MonthFrequencyType = 1;
    }
    if (jsonData.DayFrequencyConfig.IntervalType === 0) {
        jsonData.DayFrequencyConfig.IntervalType = 1;
    }
    if (jsonData.DayFrequencyConfig.Interval === 0) {
        jsonData.DayFrequencyConfig.Interval = 1;
    }
    workPlanData.value = jsonData
}


function handleChangeFrequencyType() {
    workPlanData.value.WeekNumber = "";
}
function initPlanDesc() {
    planDesc.value = "";
    var headDesc = "";
    var midDesc = "";
    var endDesc = "";
    var value = workPlanData.value;
    if (value.PlanType == 1) {
        if (value.ExecuteDate) {
            headDesc = `在${value.ExecuteDate}执行`;
        }
    } else {
        if (value.EndDate) {
            endDesc = `将在 ${value.StartDate} 到 ${value.EndDate}之间使用计划`
        } else {
            endDesc = `将从 ${value.StartDate} 开始使用计划。`
        }

        if (value.FrequencyType == 1) {
            headDesc = `每${value.Interval}天`;
        } else if (value.FrequencyType == 2) {
            headDesc = `在每${value.Interval}周 ${weekNumberData.filter((ele) => { return value.WeekNumber.split(',').indexOf(ele.WeekNumber.toString()) > -1 }).map(obj => { return obj.WeekName }).toString()}`;
        }
        else {
            if (value.MonthFrequencyType == 1) {
                headDesc = `每${value.Interval}个月于当月第 ${value.DayNumber} 天的`;
            } else {
                var currWeekData = weekIndexData.filter(ele => { return ele.WeekNumber.toString() == value.WeekIndex.toString() && value.WeekIndex !== '' })[0];

                var currWeekNumberData = weekNumberData.filter(ele => { return ele.WeekNumber.toString() == value.WeekNumber.toString() && value.WeekNumber !== '' })[0];
                headDesc = `每 ${value.Interval} 个月于 ${currWeekData ? currWeekData.WeekIndexName : ''} ${currWeekNumberData ? currWeekNumberData.WeekName : ''}`;
            }

        }
        if (value.DayFrequencyConfig.FrequencyType == 1) {
            midDesc = `的${value.DayFrequencyConfig.ExecuteTime}执行。`
        } else {
            midDesc = `${value.DayFrequencyConfig.StartTime} 和 ${value.DayFrequencyConfig.EndTime} 之间、每 ${value.DayFrequencyConfig.Interval} ${value.DayFrequencyConfig.IntervalType == 1 ? '分' : '时'} 执行。`;
        }
    }

    planDesc.value = headDesc + midDesc + endDesc;
    emits("update:descript", planDesc.value)

}

watch(workPlanData, (value) => {
    initPlanDesc();
    if (typeof (props.modelValue) === 'object') {
        emits('update:modelValue', value)

    } else {
        emits('update:modelValue', JSON.stringify(value))

    }
    emits('update:data', value)
}, { deep: true })
onMounted(()=>{
    initData()
})
</script>
<template >
    <div class="els-workpain">
        <els-form v-model="workPlanData">
            <els-radio-button required v-model="workPlanData.PlanType" prop="PlanType" label="计划类型">
                <els-option :value="1">执行一次</els-option>
                <els-option :value="2">重复执行</els-option>
            </els-radio-button>
            <els-date-picker label="执行时间" prop="ExecuteDate" type='datetime' required v-if="workPlanData.PlanType == 1"
                value-format="YYYY-MM-DD HH:mm:ss"></els-date-picker>


            <template v-if="workPlanData.PlanType == 2">
                <els-date-picker-range label="持续时间" :single="false" value-format="YYYY-MM-DD" propStart="StartDate"
                    propEnd="EndDate" required>
                </els-date-picker-range>
                <els-radio-button required prop="FrequencyType" label="执行频率" @change="handleChangeFrequencyType">
                    <els-option :value="1">每天</els-option>
                    <els-option :value="2">每周</els-option>
                    <els-option :value="3">每月</els-option>
                </els-radio-button>
                <els-form-item required v-if="workPlanData.FrequencyType == 1" prop="Interval" label="间隔">
                    <els-input-number controls-position="right" clearable placeholder="间隔几天" style="width: 100px;"
                        v-model="workPlanData.Interval"></els-input-number>
                    <span class="el-form-suffix-content">天</span>
                </els-form-item>
                <els-form-item required v-if="workPlanData.FrequencyType == 2" prop="Interval" label="间隔">
                    <el-input-number controls-position="right" clearable placeholder="间隔几周" style="width: 100px;"
                        v-model="workPlanData.Interval"></el-input-number> <span class="el-form-suffix-content">周</span>
                </els-form-item>
                <els-checkbox :data="weekNumberData" label="星期几" v-if="workPlanData.FrequencyType == 2"
                    label-field="WeekName" required prop="WeekNumber" value-field="WeekNumber">
                </els-checkbox>
                <els-radio-button prop="MonthFrequencyType" required label="月执频率" v-if="workPlanData.FrequencyType == 3">
                    <els-option :value="1">天执行</els-option>
                    <els-option :value="2">周执行</els-option>
                </els-radio-button>
                <els-form-item label="执行时间" v-if="workPlanData.FrequencyType == 3 && workPlanData.MonthFrequencyType == 1">
                    <div style="display:flex;">
                        <els-select :clearable="true" required :filterable="true" style="width: 100px;" placeholder="第几天"
                            prop="DayNumber">
                            <els-option v-for="item in 31" :key="item" :label="item" :value="item"></els-option>
                        </els-select>
                        <span>天</span>
                        <span>- 每</span>
                        <els-select :clearable="true" required :filterable="true" style="width: 100px;" placeholder="第几月"
                            prop="Interval">
                            <els-option v-for="item in 12" :key="item" :label="item" :value="item"></els-option>
                        </els-select>
                        <span>个月</span>
                    </div>
                </els-form-item>
                <els-form-item label="执行日" v-if="workPlanData.FrequencyType == 3 && workPlanData.MonthFrequencyType == 2">
                    <div style="display:flex;">
                        <els-select :clearable="true" required filterable style="width: 100px;" placeholder="第几周"
                            :data="weekIndexData" label-field="WeekIndexName" value-field="WeekNumber" prop="WeekIndex">
                        </els-select>
                        <els-select :clearable="true" required filterable :data="weekNumberData" style="width: 100px;"
                            label-field="WeekName" placeholder="星期几" prop="WeekNumber"
                            value-field="WeekNumber"></els-select>
                        <span>- 每</span>
                        <els-select :clearable="true" filterable style="width: 100px;" placeholder="第几月" required
                            prop="Interval">
                            <els-option v-for="item in 12" :key="item" :label="item" :value="item"></els-option>
                        </els-select>
                        <span>个月</span>
                    </div>
                </els-form-item>
                <els-caption>每天频率</els-caption>

                <els-form v-model="workPlanData.DayFrequencyConfig">
                    <template #default="{ formData }">

                        <els-radio-button prop="FrequencyType" required label="天执行类型">
                            <els-option :value="1">执行一次</els-option>
                            <els-option :value="2">重复执行</els-option>
                        </els-radio-button>
                        <els-time-picker prop="ExecuteTime" value-format="HH:mm:ss" required label="执行时间"
                            v-if="formData.FrequencyType == 1"></els-time-picker>
                        <els-form-item label="天执行间隔" required validType="Number" v-if="formData.FrequencyType == 2"
                            prop="Interval">
                            <els-input-number controls-position="right" clearable style="width: 100px;" prop="Interval">
                            </els-input-number>
                            <els-select prop="IntervalType" style="width:70px;margin-left:5px;">
                                <els-option :value="1">分钟</els-option>
                                <els-option :value="2">小时</els-option>
                            </els-select>
                        </els-form-item>
                        <els-time-picker-range v-if="formData.FrequencyType == 2" :single="false" label="时间范围" required
                            value-format="HH:mm:ss" propStart="StartTime" propEnd="EndTime"></els-time-picker-range>

                    </template>
                </els-form>
            </template>
            <els-form-item label="计划说明" v-if="planDesc">
                <el-tag>{{ planDesc }}</el-tag>
            </els-form-item>
        </els-form>
    </div>
</template>
