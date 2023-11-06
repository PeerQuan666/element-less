<template>
  <els-work-plan v-model="val"></els-work-plan>
</template>
<script setup>
import {ref} from 'vue'
const val=ref({ "PlanType": 1, "ExecuteDate": "2023-11-30 00:00:00", "StartDate": "2023-11-16", "EndDate": "2023-11-09", "FrequencyType": 1, "Interval": 1, "MonthFrequencyType": 1, "DayNumber": "", "WeekIndex": "", "WeekNumber": "", "DayFrequencyConfig": { "FrequencyType": 2, "ExecuteTime": "", "Interval": 3, "IntervalType": 1, "StartTime": "15:23:52", "EndTime": "15:23:55" } })
</script>