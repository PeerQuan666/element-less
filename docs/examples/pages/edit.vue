
<template>
    <els-menu-tool :data="toolData" ></els-menu-tool>
    <els-form v-model="editData" ref="editForm" style="margin-top: 10px;" labelWidth="60">
        <els-input label="名字"></els-input>
        <els-input label="金额"></els-input>
        <els-select label="类型" prop="selectValue" :url="apiUrl" label-field="Name" value-field="ID" require
            clearable></els-select>
        <els-radio-button label="城市" prop="selectValue1" require>
            <els-option>北京</els-option>
            <els-option>天津</els-option>
            <els-option>福州</els-option>
            <els-option>厦门</els-option>
        </els-radio-button>
        <els-input type="textarea" label="备注" width="500" ></els-input>
    </els-form>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const editForm = ref()
const editData = ref({ selectValue: '', selectValue1: '' })
const apiUrl = 'http://manage.ybt2023.com/home/test2'
const toolData = ref<any>(
    [
        {
            "MenuID": "9edf0d1964cc4c22a039fb329bb05e6a",
            "MenuName": "保存",
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
            "MenuName": "返回",
            "FoldName": "",
            "MenuType": 3,
            "ActionType": "Search",
            "ButtonType": "Search",
            "ButtonColor": "info",
            "IsQueryState": 0,
            "ImageUrl": "el-icon-back",
            "TargetUrl": "/PromoteManage/PromoteData/ReadData?Power_MenuID=a2cf21dbbc504b33a8f21bb4b9bf3e98&SignatureMD5=F73A1B3B22EAF4881B73B9872A71EF7A&SignatureStamp=1694506233",
            "SortIndex": 12,

        }
    ]
)
function handleSubmit() {
    editForm.value.validate().then(res => {
        if (res) {
            ElMessage.success(JSON.stringify(editData.value))
        } else {
            ElMessage.error('验证没通过')
        }
    })

}

</script>
