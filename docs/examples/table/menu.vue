
<template>
    <els-table :url="apiUrl" :is-client-page="true" :page-size="10" row-key="WallID" >
        <els-column-checkbox></els-column-checkbox>
        <els-column-header label="右键菜单，请点击右键试试">
            <els-column prop="AppID" label="ID" align="left"></els-column>
            <els-column prop="AppName" label="名称" align="left"></els-column>
        </els-column-header>
    </els-table>
</template>
  
<script setup lang="ts">
import { ref, reactive } from 'vue'
const apiUrl = ref('http://manage.ybt2023.com/home/test')

</script>
