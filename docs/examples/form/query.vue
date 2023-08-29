<template>
    <bb-form-query  ref="queryForm" v-model="queryData">
        <bb-select label="城市" field-name="selectValue" require clearable>
            <bb-option :value="1">北京</bb-option>
            <bb-option :value="2">天津</bb-option>
            <bb-option :value="3">福州</bb-option>
            <bb-option :value="4">厦门</bb-option>
        </bb-select>
        <bb-radio-button label="城市1" field-name="selectValue1" require>
            <bb-option :value="1">北京</bb-option>
            <bb-option :value="2">天津</bb-option>
        </bb-radio-button>
        <el-button @click="handleSearch" type="primary">查询</el-button>
    </bb-form-query>
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