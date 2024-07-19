<template>
  <el-tabs>
    <el-tab-pane label="配置">
      <els-dynamic-designer v-model="config" allowCreateType isReturnTemplateValue  v-model:templateValue="templateValue">
      </els-dynamic-designer>
    </el-tab-pane>
    <el-tab-pane label="表单属性">
      <!-- <els-dynamic-render v-model="initValue" :config="config"></els-dynamic-render> -->
    </el-tab-pane>
    <el-button @click="show=true">点击</el-button>
    <els-dialog v-model="show" title="请输入数据" @confirm="test" show-confirm-button show-cancel-button :confirm="test"><els-input></els-input></els-dialog>
  </el-tabs>
</template>

<script setup>
import { ref,provide } from 'vue'
const config = ref([])
const show=ref()
const templateValue=ref()
const initValue = ref()
provide('isMobile',true)

function test(action){
  return new Promise((resolve) => {
    setTimeout(() => {
      // action !== 'confirm'  拦截取消操作
      resolve(false);
    }, 1000);
  });
}

</script>