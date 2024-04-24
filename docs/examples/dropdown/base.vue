<template>
    <els-dropdown-group>
        <els-dropdown   v-model="selectValue" @select="handleCommand">
            <template #dropdown>
                <els-option :value="1">北京</els-option>
                <els-option :value="2">天津</els-option>
                <els-option :value="3">福州</els-option>
                <els-option :value="4">厦门</els-option>
            </template>
        </els-dropdown>
        <els-dropdown  title="下拉1" @select="handleCommand">
            <template #dropdown>
                <els-option :value="1">北京</els-option>
                <els-option :value="2">天津</els-option>
                <els-option :value="3">福州</els-option>
                <els-option :value="4">厦门</els-option>
            </template>
        </els-dropdown>
    </els-dropdown-group>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { ref,provide } from 'vue'
const selectValue = ref(2)
function handleCommand(com){
ElMessage.success(com.toString())
}
const value1 = ref(0);
    const value2 = ref('a');
    const option1 = [
      { text: '全部商品', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 },
    ];
    const option2 = [
      { text: '默认排序', value: 'a' },
      { text: '好评排序', value: 'b' },
      { text: '销量排序', value: 'c' },
    ];
</script>