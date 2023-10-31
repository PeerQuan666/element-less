<template>
    <els-form v-model="editData">
        <els-date-picker prop="date1" label="日期"></els-date-picker>
        <els-date-picker type="datetime" prop="date3" label="日期时间"></els-date-picker>
    </els-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const editData = ref({ date1: '', date2: '', date3: '', date4: '', start: '', end: '' })
</script>