<template>
    <els-form v-model="editData" ref="editForm">
        <els-select label="类型" prop="selectValue" :url="apiUrl" label-field="Name" value-field="ID" required
            clearable></els-select>
        <els-radio-button label="城市" prop="selectValue1" required>
            <els-option :value="1">北京</els-option>
            <els-option :value="2">天津</els-option>
            <els-option :value="3">福州</els-option>
            <els-option :value="4">厦门</els-option>
        </els-radio-button>
        <els-form-item>
            <el-button @click="handleSubmit" type="primary">提交</el-button>
        </els-form-item>
    </els-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const editData = ref({ selectValue: '', selectValue1: '' })
const editForm = ref()
const apiUrl = 'http://manage.ybt2023.com/home/test2'

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