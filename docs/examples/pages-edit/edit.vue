
<template>
    <els-container>
        <els-menu-tool :data="toolData"></els-menu-tool>
        <els-form v-model="editData" style="margin-top: 10px;" labelWidth="60">
            <els-input label="名字" prop="name" required></els-input>
            <els-input label="金额" prop="revenue" required validType="Price"></els-input>
            <els-select label="类型" prop="type" :url="apiUrl" label-field="Name" value-field="ID" required
                clearable></els-select>
            <els-radio-button label="城市" prop="city" required>
                <els-option>北京</els-option>
                <els-option>天津</els-option>
                <els-option>福州</els-option>
                <els-option>厦门</els-option>
            </els-radio-button>
            <els-textarea type="textarea" prop="remark" label="备注" width="500"></els-textarea>
        </els-form>
    </els-container>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
const editData = ref({ name:'',revenue:'',type: '', city: '',remark:''})
const apiUrl = 'http://manage.ybt2023.com/home/test2'
const toolData = ref<any>(
    [
        {
            "MenuID": "9edf0d1964cc4c22a039fb329bb05e6a",
            "MenuName": "保存",
            "FoldName": "",
            "ActionType": "Save",
            "ButtonColor": "primary",
            "ActionScript": "",
            "IsQueryState": 1,
            "ImageUrl": "el-icon-edit",
            "TargetUrl": "/Add",
            "SortIndex": 1,
        },
        {
            "MenuID": "55d5ff6b2bc346c197ddcb8b419788d8",
            "MenuName": "返回",
            "FoldName": "",
            "ActionType": "Search",
            "ButtonColor": "info",
            "IsQueryState": 0,
            "ImageUrl": "el-icon-back",
            "TargetUrl": "/ReadData",
            "SortIndex": 12,
        }
    ]
)
</script>
