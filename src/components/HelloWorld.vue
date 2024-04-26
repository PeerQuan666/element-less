<script setup lang="ts">
import { ref } from 'vue'
defineProps<{ msg: string }>()
const editData = { "Id": 100, "ExternalId": "测试003", "Version": 1, "Definition": "{\"Id\":\"测试003\",\"Version\":1,\"Description\":\"\",\"DefaultErrorBehavior\":0,\"DefaultErrorRetryInterval\":\"00:01:00\",\"Steps\":[{\"StepType\":\"UserTask\",\"PId\":\"\",\"Id\":\"Ty1tSUHsO\",\"Name\":\"用户动作\",\"CancelCondition\":\"1\",\"ErrorBehavior\":0,\"RetryInterval\":null,\"Do\":[[{\"StepType\":\"When\",\"PId\":\"\",\"Id\":\"hxoItItiI\",\"Name\":\"判断允许\",\"CancelCondition\":\"\",\"ErrorBehavior\":0,\"RetryInterval\":null,\"Do\":[],\"CompensateWith\":[],\"Saga\":false,\"NextStepId\":\"\",\"Inputs\":{\"ExpectedOutcome\":\"'approve'\"},\"Outputs\":{},\"SelectNextStep\":{}}],[{\"StepType\":\"When\",\"PId\":\"\",\"Id\":\"E_AqnJb_wI\",\"Name\":\"判断拒绝\",\"CancelCondition\":\"\",\"ErrorBehavior\":0,\"RetryInterval\":null,\"Do\":[],\"CompensateWith\":[],\"Saga\":false,\"NextStepId\":\"\",\"Inputs\":{\"ExpectedOutcome\":\"'deny'\"},\"Outputs\":{},\"SelectNextStep\":{}}],[{\"StepType\":\"When\",\"PId\":\"\",\"Id\":\"zljniyQ7E\",\"Name\":\"新增条件\",\"CancelCondition\":\"\",\"ErrorBehavior\":0,\"RetryInterval\":null,\"Do\":[],\"CompensateWith\":[],\"Saga\":false,\"NextStepId\":\"\",\"Inputs\":{\"ExpectedOutcome\":\"'approve1'\"},\"Outputs\":{},\"SelectNextStep\":{}}]],\"CompensateWith\":[],\"Saga\":false,\"NextStepId\":\"\",\"Inputs\":{\"AssignedPrincipal\":\"1\",\"Prompt\":\"1\",\"Options\":{\"判断允许\":\"approve\",\"判断拒绝\":\"deny\",\"新增条件\":\"approve1\"}},\"Outputs\":{},\"SelectNextStep\":{}}]}" }
const test = ref('')
const test1 = ref()
const test2 = ref()
const form1 = ref({ name: '' })
const form2 = ref({ name: '' })
const form1_1 = ref({ name: '' })
const form1_1_1 = ref({ name: '' })
const hide=ref(true)
function valid() {
  
  test1.value.validate()
}
function hideF(){
  hide.value=!hide.value
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <el-button @click="valid">验证</el-button>
  <el-button @click="hideF">取消一个</el-button>
  <els-form-query ref="queryForm" >
   <els-input prop="test" label="test"></els-input>
        <els-select label="城市" prop="selectValue" required clearable>
            <els-option :value="1">北京</els-option>
            <els-option :value="2">天津</els-option>
            <els-option :value="3">福州</els-option>
            <els-option :value="4">厦门</els-option>
        </els-select>
        <els-date-picker-range label="时间" prop="date"></els-date-picker-range>
    </els-form-query>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
