
<template>
    <els-table :data="data">
        <els-column prop="date" label="时间" width="120" :mergeRow="true"></els-column>
        <els-column prop="key" label="城市" :summaryValue="summaryValue"></els-column>
        <els-column prop="area" label="区域" :summary-method="summary"></els-column>
        <els-column prop="revenue" label="收入" mergeRowByFieldname="date" mergeSum showSummary>
        </els-column>

    </els-table>
</template>
  
<script setup lang="ts">
import { ref, reactive } from 'vue'
const summaryValue=ref('字段返回')
const data = reactive([
    { date: '2022-08-10', key: '北京', value: 1, area: '北方', revenue: 10 },
    { date: '2022-08-10', key: '天津', value: 2, area: '北方', revenue: 20 },
    { date: '2022-08-10', key: '福州', value: 3, area: '南方', revenue: 15 },
    { date: '2022-08-11', key: '厦门', value: 4, area: '南方', revenue: 33 }
])
function summary(column) {
    return '方法返回'
}
</script>
  