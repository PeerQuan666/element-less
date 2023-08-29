<template>
    <bb-form v-model="editData" ref="editForm">
        <bb-select label="城市" field-name="selectValue" 
        :url="apiUrl" 
        label-field="Name" 
        value-field="ID" 
        require
        clearable></bb-select>
        <bb-radio-button label="城市1" field-name="selectValue1" require>
            <bb-option :value="1">北京</bb-option>
            <bb-option :value="2">天津</bb-option>
            <bb-option :value="3">福州</bb-option>
            <bb-option :value="4">厦门</bb-option>
        </bb-radio-button>
        <bb-form-item>
            <el-button @click="handleSubmit" type="primary">提交</el-button>
        </bb-form-item>
    </bb-form>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import {ElMessage} from 'element-plus'
const editData = reactive({})
const editForm = ref()
const apiUrl = 'http://dataopenapi.tm.babybus.com/StatTag/GetUserGroupTagData?SysTag=Business&Power_CoteID_ProductID=manage&Power_MenuID=6aef7da4c8434aba886c99fec83e4d51'
function handleSubmit() {
    editForm.value.validate().then(res=>{
        if(res){
            ElMessage.success(JSON.stringify(editData))
        }else{
            ElMessage.error('验证没通过')
        }
    })
   
}
</script>