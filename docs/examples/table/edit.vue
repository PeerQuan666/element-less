
<template>
  <div style="margin-bottom:10px">
    <el-button @click="handleSave" type="primary" v-if="eidtStatus">批量保存</el-button>
    <el-button @click="handleEdit" type="primary" v-if="!eidtStatus">批量编辑</el-button>
    <el-button @click="handleUnEdit" type="info" v-else>取消编辑</el-button>
  </div>
  <els-table :data="data" rowKey="value" :showEditColumn="true" saveUrl="save" ref="dataTable"
    v-model:editStatus="eidtStatus">
    <els-column-checkbox></els-column-checkbox>
    <els-column prop="key" label="默认类型" isEdit required></els-column>
    <els-column-bool prop="isRelease" label="Bool类型" width="130" :is-edit="true" :require="true">
      <template #edit>
        <els-select required clearable>
          <els-option :value="1">发布</els-option>
          <els-option :value="0">未发布</els-option>
        </els-select>
      </template>
    </els-column-bool>
    <els-column prop="valueType" label="类型" width="100"></els-column>
  </els-table>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const data = reactive([
  { key: '北京', value: 1, group: '分组1', isRelease: 1, valueType: '城市' },
  { key: '天津', value: 2, group: '分组1', isRelease: 0, valueType: '城市' },
  { key: '福州', value: 3, group: '分组2', isRelease: 1, valueType: '城市' },
  { key: '厦门', value: 4, group: '分组2', isRelease: 0, valueType: '城市' }
])
const eidtStatus = ref(false)
const dataTable = ref()
const tableEdit = ref(false)
function handleSave() {
  dataTable.value.saveTableData()
}
function handleEdit() {
  dataTable.value.editTable()
}
function handleUnEdit() {
  dataTable.value.unEditTable()

}
</script>

