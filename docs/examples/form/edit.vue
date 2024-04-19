<template>
    <els-form v-model="editData" ref="editForm" >
        <els-input label="aaa" prop="text" required  validExpression="^[A-Za-z0-9]+$" ></els-input>
        <els-date-picker prop="selectValue1" label="时间" required></els-date-picker>
    </els-form>
  
</template>

<script lang="ts" setup>
import { ref ,provide,reactive} from 'vue'
import { ElMessage } from 'element-plus'
const editData = ref({ selectValue: '', selectValue1: '',pic:'' })
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