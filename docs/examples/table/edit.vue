
<template>
  <div style="margin-bottom:10px">
    <el-button @click="handleEdit" type="primary" v-if="!eidtStatus">批量编辑</el-button>
    <el-button @click="handleUnEdit" type="info" v-else>取消编辑</el-button>
  </div>
  <els-table :data="data" rowKey="value" :showEditColumn="true" saveUrl="save" ref="dataTable" v-model:editStatus="eidtStatus">
    <els-column-checkbox></els-column-checkbox>
    <els-column prop="key" label="默认类型" :is-edit="true" :require="true" ></els-column>
    <els-column-bool prop="isRelease" label="Bool类型" width="130" :is-edit="true" :require="true" >
      <template #edit>
       <els-select  >
        <els-option :value="1">发布</els-option>
        <els-option :value="0">未发布</els-option>
       </els-select>
      </template>
    </els-column-bool>
    <els-column-enum prop="valueType" label="枚举类型" width="100" :enumData="ValueType"></els-column-enum>
  </els-table>
</template>

<script setup lang="ts">
import { ValueType } from '../../../src/packages/utlis/enumCom'
import { ref, reactive } from 'vue'
const data = reactive([
  { key: '北京', value: 1, group: '分组1', isRelease: 1, valueType: '' },
  { key: '天津', value: 2, group: '分组1', isRelease: 0, valueType: 'number' },
  { key: '福州', value: 3, group: '分组2', isRelease: 1, valueType: 'string' },
  { key: '厦门', value: 4, group: '分组2', isRelease: 0, valueType: 'string' }
])
const eidtStatus=ref(false)
const dataTable=ref()
const tableEdit=ref(false)
function handleEdit(){
  dataTable.value.editTable()
}
function handleUnEdit(){
  dataTable.value.unEditTable()

}
</script>
<style >
table {
  margin: auto !important;
}

th,
td {
  border-color: var(--border-color-dark);
  border: 0px solid #dfe2e5;
}

.txt-red {
  color: red;
}</style>
