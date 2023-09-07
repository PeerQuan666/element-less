
<template>
  <div style="margin-bottom: 10px;">
    <el-button @click="handleExport" type="warning">导出</el-button>
    <el-button @click="handleReadExport" type="warning">接口导出</el-button>
  </div>
  <els-table :url="apiUrl" :is-client-page="true" ref="dataTable" :page-size="10">
    <els-column-header label="多头">
      <els-column prop="ID" label="ID" align="left"></els-column>
    <els-column prop="Name" label="名称" align="left"></els-column>
    </els-column-header>

  </els-table>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const dataTable = ref()
const apiUrl = ref('http://dataopenapi.tm.babybus.com/StatTag/GetUserGroupTagData?SysTag=Business&Power_CoteID_ProductID=manage&Power_MenuID=6aef7da4c8434aba886c99fec83e4d51')

function handleExport() {
  dataTable.value.exportClientDataHtml()
}
function handleReadExport() {
  dataTable.value.exportReadDataHtml()

}
</script>
