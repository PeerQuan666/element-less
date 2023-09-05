
<template>
    <bb-table :url="apiUrl"  :is-client-page="true" :page-size="10">
      <bb-column prop="ID" label="ID"  align="left" ></bb-column>
      <bb-column prop="Name" label="名称" align="left" ></bb-column>
    </bb-table>
  </template>
  
  <script setup lang="ts">
    import { ref, reactive } from 'vue'
  const apiUrl = ref('http://dataopenapi.tm.babybus.com/StatTag/GetUserGroupTagData?SysTag=Business&Power_CoteID_ProductID=manage&Power_MenuID=6aef7da4c8434aba886c99fec83e4d51')

  </script>
  <style >
  table{
    margin: auto !important;
  }
  th, td {
      border-color: var(--border-color-dark);
      border: 0px solid #dfe2e5;
  }
  </style>
  