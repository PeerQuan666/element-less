
<template>
    <els-table :url="apiUrl"  :is-client-page="true" :page-size="10">
      <els-column prop="ID" label="ID"  align="left" ></els-column>
      <els-column prop="Name" label="名称" align="left" ></els-column>
    </els-table>
  </template>
  
  <script setup lang="ts">
    import { ref, reactive } from 'vue'
  const apiUrl = ref('http://dataopenapi.tm.babybus.com/StatTag/GetUserGroupTagData?SysTag=Business&Power_CoteID_ProductID=manage&Power_MenuID=6aef7da4c8434aba886c99fec83e4d51')

  </script>
