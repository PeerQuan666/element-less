
<template>
    <els-table :url="apiUrl" :is-client-page="true" :page-size="10" row-key="WallID"  :hasContextMenu="false">
        <els-column-checkbox></els-column-checkbox>
        <els-column prop="ID" label="ID" align="left" sortable></els-column>
        <els-column prop="AuthorName" label="作者" align="left"></els-column>
        <els-column-image prop="ThumUrl" label="图标"  ></els-column-image>
        <els-column-operate :isFold="true"></els-column-operate>
    </els-table>
</template>
  
<script setup lang="ts">
import { ref, reactive } from 'vue'
const apiUrl = ref('http://manage.ybt2023.com/home/test')

</script>
