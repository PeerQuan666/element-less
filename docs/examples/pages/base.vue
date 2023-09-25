
<template>
    <els-container>
        <els-menu-tool :data="toolData"></els-menu-tool>
        <els-form-query style="margin-top: 10px;" v-model="queryData">
            <els-input label="ID" prop="ID" width="100"></els-input>
            <els-select label="作者" prop="AuthorName" width="100" clearable>
                <els-option>无敌元气妹</els-option>
                <els-option>稚葵</els-option>
                <els-option>伊人妆</els-option>
                <els-option>海浪无声</els-option>
            </els-select>
        </els-form-query>
        <els-table :url="apiUrl" :is-client-page="true" :page-size="10" row-key="WallID" tableName="第一份数据">
            <els-column-checkbox></els-column-checkbox>
            <els-column prop="ID" label="ID" align="left" sortable></els-column>
            <els-column prop="AuthorName" label="作者" align="left"></els-column>
        </els-table>
    </els-container>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
const apiUrl = ref('http://manage.ybt2023.com/home/test')
const queryData = ref()
const toolData = ref<any>(
    [
        {
            "MenuID": "9edf0d1964cc4c22a039fb329bb05e6a",
            "MenuName": "新增数据",
            "FoldName": "",
            "ActionType": "Target",
            "ButtonColor": "primary",
            "ActionScript": "",
            "IsQueryState": 1,
            "ImageUrl": "el-icon-edit",
            "TargetUrl": "/Add",
        },
        {
            "MenuID": "55d5ff6b2bc346c197ddcb8b419788d8",
            "MenuName": "查询",
            "FoldName": "",
            "ActionType": "Search",
            "ButtonColor": "primary",
            "IsQueryState": 0,
            "ImageUrl": "el-icon-search",
            "TargetUrl": "/ReadData",
        }
    ]
)
</script>
