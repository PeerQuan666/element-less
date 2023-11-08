<template>
    <els-form-query ref="queryForm" v-model="formData">
        <els-select label="城市" prop="selectValue" required clearable>
            <els-option :value="1">北京</els-option>
            <els-option :value="2">天津</els-option>
            <els-option :value="3">福州</els-option>
            <els-option :value="4">厦门</els-option>
        </els-select>
        <els-date-picker-range label="时间" prop="date"></els-date-picker-range>
        <els-button-search @click="handleSearch">查询</els-button-search>
    </els-form-query>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import lessCom from '../../../packages/utlis/lessCom'
const queryForm = ref()
const formData = ref({})
function handleSearch() {
    queryForm.value.query().then(res => {
        console.info(lessCom.getQueryParameters(res))
    })


}
</script>