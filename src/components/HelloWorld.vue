<script setup lang="ts">
import { ref,reactive } from 'vue'
defineProps<{ msg: string }>()
import draggable from 'vuedraggable'
const state = reactive({
  enabled: true,
  list: [
    { name: "西瓜", id: 0 },
    { name: "橙子", id: 1 },
    { name: "草莓", id: 2 },
  ],
  dragging: false,
});
const nodeList=reactive([])
const nodeList1=reactive({name:'sss',age:1})
</script>

<template>

<!-- <els-work-flow 
configUrl="http://localhost:5000/WorkflowManage/SearchAuto/StepReadData"
userUrl="http://localhost:5000/WorkflowManage/SearchAuto/PowerUserNameReadData"
userTaskTemplateUrl="http://localhost:5000/WorkflowManage/SearchAuto/UserTaskDataTemplateReadData"
></els-work-flow> -->
<els-form :labelWidth="30">
  <els-input label="aaa"></els-input>
  <els-form v-model="nodeList1">
<els-input prop="name" label="name"></els-input>
<els-input prop="age" label="age"></els-input>

</els-form>
</els-form>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
