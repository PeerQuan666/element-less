<template>
  
    <els-list :data="data" >
        <template #default="{ index }">
            <els-form v-model="data[index]" inline>
                <els-input label="城市" prop="key" width="200" required clearable></els-input>
                <els-select prop="isRelease">
                    <els-option :value="1">发布</els-option>
                    <els-option :value="0">未发布</els-option>
                </els-select>
            </els-form>
        </template>
    </els-list>
</template>

<script setup>
import { ref, reactive } from 'vue'
const data = reactive([
    { key: '北京', value: 1, group: '分组1', isRelease: 1, valueType: '' },
    { key: '天津', value: 2, group: '分组1', isRelease: 0, valueType: 'number' },
    { key: '福州', value: 3, group: '分组2', isRelease: 1, valueType: 'string' },
    { key: '厦门', value: 4, group: '分组2', isRelease: 0, valueType: 'string' }
])

</script>