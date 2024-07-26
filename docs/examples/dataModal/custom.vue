<template>
    <els-data-modal v-model="selectValue" title="选择数据" width="30%" :confirm="handleConfim" buttonLabel="编辑" style="margin-bottom: 10px;" >
        <template #custom>
          <div>数据1:{{ editData.input1 }}</div>
          <div>数据2:{{ editData.input2 }}</div>
        </template>
        <els-form v-model="editData" ref="editForm">
            <els-input prop="input1" label="开始" required width="200"></els-input>
            <els-input prop="input2" label="结束" width="200"></els-input>
        </els-form>
    </els-data-modal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const selectValue = ref('')
const editData = reactive({
    input1: '',
    input2: ''
})
const editForm = ref()
function handleConfim() {
    return editForm.value.validate().then(res => {
        if (res) {
            selectValue.value = editData.input1 + '-' + editData.input2
        }
        return res
    })
}
</script>