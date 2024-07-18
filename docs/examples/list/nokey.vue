<template>
    <els-list v-model="data" >
        <template #default="{$index}">
            <els-input label="城市" prop="key" width="200" required clearable :aIndex="$index"></els-input>
            <els-select prop="isRelease" label="状态" width="100"  :aIndex="$index">
                <els-option :value="1">发布</els-option>
                <els-option :value="0">未发布</els-option>
            </els-select>
        </template>

    </els-list>

</template>

<script setup>
import { reactive } from 'vue'
const data = reactive([
    { id: 1, key: '北京', value: 1, group: '分组1', isRelease: 1, valueType: '' },
    { id: 2, key: '天津', value: 2, group: '分组1', isRelease: 0, valueType: 'number' },
    { id: 3, key: '福州', value: 3, group: '分组2', isRelease: 1, valueType: 'string' },
    { id: 4, key: '厦门', value: 4, group: '分组2', isRelease: 0, valueType: 'string' }
])

</script>