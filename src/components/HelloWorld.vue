<script setup lang="ts">
import {ref} from 'vue'
defineProps<{ msg: string }>()
const editData={"Id":100,"ExternalId":"测试003","Version":1,"Definition":"{\"Id\":\"测试003\",\"Version\":1,\"Description\":\"\",\"DefaultErrorBehavior\":0,\"DefaultErrorRetryInterval\":\"00:01:00\",\"Steps\":[{\"StepType\":\"UserTask\",\"PId\":\"\",\"Id\":\"Ty1tSUHsO\",\"Name\":\"用户动作\",\"CancelCondition\":\"1\",\"ErrorBehavior\":0,\"RetryInterval\":null,\"Do\":[[{\"StepType\":\"When\",\"PId\":\"\",\"Id\":\"hxoItItiI\",\"Name\":\"判断允许\",\"CancelCondition\":\"\",\"ErrorBehavior\":0,\"RetryInterval\":null,\"Do\":[],\"CompensateWith\":[],\"Saga\":false,\"NextStepId\":\"\",\"Inputs\":{\"ExpectedOutcome\":\"'approve'\"},\"Outputs\":{},\"SelectNextStep\":{}}],[{\"StepType\":\"When\",\"PId\":\"\",\"Id\":\"E_AqnJb_wI\",\"Name\":\"判断拒绝\",\"CancelCondition\":\"\",\"ErrorBehavior\":0,\"RetryInterval\":null,\"Do\":[],\"CompensateWith\":[],\"Saga\":false,\"NextStepId\":\"\",\"Inputs\":{\"ExpectedOutcome\":\"'deny'\"},\"Outputs\":{},\"SelectNextStep\":{}}],[{\"StepType\":\"When\",\"PId\":\"\",\"Id\":\"zljniyQ7E\",\"Name\":\"新增条件\",\"CancelCondition\":\"\",\"ErrorBehavior\":0,\"RetryInterval\":null,\"Do\":[],\"CompensateWith\":[],\"Saga\":false,\"NextStepId\":\"\",\"Inputs\":{\"ExpectedOutcome\":\"'approve1'\"},\"Outputs\":{},\"SelectNextStep\":{}}]],\"CompensateWith\":[],\"Saga\":false,\"NextStepId\":\"\",\"Inputs\":{\"AssignedPrincipal\":\"1\",\"Prompt\":\"1\",\"Options\":{\"判断允许\":\"approve\",\"判断拒绝\":\"deny\",\"新增条件\":\"approve1\"}},\"Outputs\":{},\"SelectNextStep\":{}}]}"}
const test=ref('')
</script>

<template>
  <h1>{{ msg }}</h1>
  <els-caption>工作流</els-caption>

  <els-work-flow v-model="test" configUrl="http://localhost:5000/WorkflowManage/SearchAuto/StepReadData" userUrl="http://localhost:5000/WorkflowManage/SearchAuto/PowerUserNameReadData" :showTreeData="true"></els-work-flow>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
