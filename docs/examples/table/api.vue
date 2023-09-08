
<template>
    <els-table :url="apiUrl"  :is-client-page="true" :page-size="10">
      <els-column prop="ID" label="ID" align="left" ></els-column>
        <els-column prop="AuthorName" label="作者" align="left"></els-column>
    </els-table>
  </template>
  
  <script setup lang="ts">
    import { ref, reactive } from 'vue'
  const apiUrl = ref('http://manage.ybt2023.com/home/test')

  </script>
