<template>  
    <els-form v-model="editData">
        <els-date-picker-range type="date" v-model="editData.date2" v-model:start="editData.start"  prop="start" required  label="日期范围" :single="false"></els-date-picker-range>
        <els-date-picker-range type="datetime" prop="date4"   label="日期时间范围" :single="false"></els-date-picker-range>
    </els-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const editData = ref({ date1: '', date2: '', date3: '', date4: '', start: '', end: '' })

</script>