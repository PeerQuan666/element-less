
<template>
    <els-container>
        <els-form-query :autoReadData="true">
            <els-input label="ID" prop="ID" width="100"></els-input>
            <els-select label="作者" prop="AuthorName" width="100" clearable>
                <els-option>无敌元气妹</els-option>
                <els-option>稚葵</els-option>
                <els-option>伊人妆</els-option>
                <els-option>海浪无声</els-option>
            </els-select>
        </els-form-query>
        <els-table :url="apiUrl" :is-client-page="true" :isClientSearch="true" :page-size="10" row-key="WallID">
            <els-column-checkbox></els-column-checkbox>
            <els-column prop="ID" label="ID" align="left"></els-column>
            <els-column prop="AuthorName" label="作者" align="left"></els-column>
        </els-table>
    </els-container>
</template>
 
<script setup lang="ts">
import { ref } from 'vue'
const apiUrl = ref('http://manage.ybt2023.com/home/test')
</script>
