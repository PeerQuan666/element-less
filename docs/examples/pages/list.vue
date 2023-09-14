
<template>
    <els-container>
        <els-menu-tool :data="toolData" logUrl="https://element-plus.org/zh-CN/component/button.html"
            docUrl="https://element-plus.org/zh-CN/guide/design.html"></els-menu-tool>
        <els-form-query ref="queryForm"  style="margin-top: 10px;">
            <els-input label="ID" prop="ID" width="100"></els-input>
            <els-select label="作者" prop="AuthorName" width="100" clearable>
                <els-option>无敌元气妹</els-option>
                <els-option>稚葵</els-option>
                <els-option>伊人妆</els-option>
                <els-option>海浪无声</els-option>
            </els-select>
        </els-form-query>
        <els-table :url="apiUrl" :is-client-page="true" :page-size="10" row-key="WallID">
            <els-column-checkbox></els-column-checkbox>
            <els-column prop="ID" label="ID" align="left"></els-column>
            <els-column prop="AuthorName" label="作者" align="left"></els-column>
        </els-table>
    </els-container>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
const apiUrl = ref('http://manage.ybt2023.com/home/test')
const toolData = ref<any>(
    [
        {
            "MenuID": "9edf0d1964cc4c22a039fb329bb05e6a",
            "MenuName": "新增数据",
            "FoldName": "",
            "MenuType": 3,
            "ActionType": "Target",
            "ButtonType": "Add",
            "ButtonColor": "primary",
            "ActionScript": "",
            "IsQueryState": 1,
            "ImageUrl": "el-icon-edit",
            "TargetUrl": "/PromoteManage/PromoteData/Add?Power_MenuID=a2cf21dbbc504b33a8f21bb4b9bf3e98&SignatureMD5=F73A1B3B22EAF4881B73B9872A71EF7A&SignatureStamp=1694506233",
            "SortIndex": 1,
        },
        {
            "MenuID": "55d5ff6b2bc346c197ddcb8b419788d8",
            "MenuName": "查询",
            "FoldName": "",
            "MenuType": 3,
            "ActionType": "Search",
            "ButtonType": "Search",
            "ButtonColor": "primary",
            "IsQueryState": 0,
            "ImageUrl": "el-icon-search",
            "TargetUrl": "/PromoteManage/PromoteData/ReadData?Power_MenuID=a2cf21dbbc504b33a8f21bb4b9bf3e98&SignatureMD5=F73A1B3B22EAF4881B73B9872A71EF7A&SignatureStamp=1694506233",
            "SortIndex": 12,

        }
    ]
)

</script>
