<template>
    <bb-form-query  ref="queryForm">
        <bb-select label="城市" field-name="selectValue" require clearable>
            <bb-option :value="1">北京</bb-option>
            <bb-option :value="2">天津</bb-option>
            <bb-option :value="3">福州</bb-option>
            <bb-option :value="4">厦门</bb-option>
        </bb-select>
        <bb-radio-button label="城市1" field-name="selectValue1" require>
            <bb-option :value="1">北京</bb-option>
            <bb-option :value="2">天津</bb-option>
            <bb-option :value="3">福州</bb-option>
            <bb-option :value="4">厦门</bb-option>
        </bb-radio-button>
    </bb-form-query>

    <bb-form v-model="editData" ref="editForm">
        <ElInput label="城市名" field-name="city" require></ElInput>
        <bb-select label="城市" field-name="selectValue" :url="apiUrl" label-field="Name" value-field="ID" require clearable></bb-select>
        <bb-radio-button label="城市1" field-name="selectValue1" require>
            <bb-option :value="1">北京</bb-option>
            <bb-option :value="2">天津</bb-option>
            <bb-option :value="3">福州</bb-option>
            <bb-option :value="4">厦门</bb-option>
        </bb-radio-button>
    </bb-form>
    <el-button @click="handleTest">提交</el-button>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

const editData = reactive({})
const queryForm = ref()
const editForm = ref()
const apiUrl = 'http://dataopenapi.tm.babybus.com/StatTag/GetUserGroupTagData?SysTag=Business&Power_CoteID_ProductID=manage&Power_MenuID=6aef7da4c8434aba886c99fec83e4d51'
function handleTest() {
    editForm.value.validate()
    queryForm.value.validate()
}
</script>