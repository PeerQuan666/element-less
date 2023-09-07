
<template>
    <els-table :url="apiUrl" :is-client-page="true" :page-size="10" row-key="WallID"  :hasContextMenu="false">
        <els-column-checkbox></els-column-checkbox>
        <els-column prop="AppID" label="ID" align="left"></els-column>
        <els-column prop="AppName" label="名称" align="left"></els-column>
        <els-column-operate :isFold="true"></els-column-operate>
    </els-table>
</template>
  
<script setup lang="ts">
import { ref, reactive } from 'vue'
const apiUrl = ref('http://manage.ybt2023.com/home/test')

</script>
