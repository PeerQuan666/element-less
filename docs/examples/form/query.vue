<template>
    <els-form-query  ref="queryForm" v-model="queryData">
        <els-select label="城市" field-name="selectValue" require clearable>
            <els-option :value="1">北京</els-option>
            <els-option :value="2">天津</els-option>
            <els-option :value="3">福州</els-option>
            <els-option :value="4">厦门</els-option>
        </els-select>
        <els-radio-button label="城市1" field-name="selectValue1" require>
            <els-option :value="1">北京</els-option>
            <els-option :value="2">天津</els-option>
        </els-radio-button>
        <el-button @click="handleSearch" type="primary">查询</el-button>
    </els-form-query>
</template>

<script lang="ts" setup>
import { ref ,reactive} from 'vue'
import {ElMessage} from 'element-plus'
const queryForm = ref()
const queryData=ref({})
function handleSearch() {
    queryForm.value.validate().then(res=>{
        if(res){
            ElMessage.success(JSON.stringify(queryData.value))
        }else{
            ElMessage.error('验证没通过')
        }
    })
   
}
</script>