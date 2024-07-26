<template>
    <els-form v-model="editData" ref="editForm" labelPosition="top">
        <ElsInput label="名称" prop="name" required validExpression="^[A-Za-z0-9]+$"></ElsInput>
        <ElsDatePicker label="日期" prop="birth" required></ElsDatePicker>
        <ElsUpload type="Pic" label="图片" prop="pic" required></ElsUpload>
        <ElsTextarea label="备注" prop="remark"></ElsTextarea>
    </els-form>
</template>

<script lang="ts" setup>
import { ref, provide, reactive } from 'vue'
import { ElMessage } from 'element-plus'
const editData = ref({ name: '', birth: '', pic: '', remark: '' })
const editForm = ref()
const apiUrl = 'http://manage.ybt2023.com/home/test2'
const data = reactive([
    { key: '北京', value: 1, group: '分组1' },
    { key: '天津', value: 2, group: '分组1' },
    { key: '福州', value: 3, group: '分组2' },
    { key: '厦门', value: 4, group: '分组2' }
])


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