<script setup lang="ts">

import { ElMessage } from 'element-plus'
import { reactive,ref} from 'vue';


const data=reactive([{key:'北京',value:1,group:'分组1'},{key:'天津',value:2,group:'分组1'},{key:'福州',value:3,group:'分组2'},{key:'厦门',value:4,group:'分组2'}])

const selectValue=ref('')
const apiValue=ref('')
const multipleValue=ref('')

const apiUrl='http://dataopenapi.tm.babybus.com/StatTag/GetUserGroupTagData?SysTag=Business&Power_CoteID_ProductID=manage&Power_MenuID=6aef7da4c8434aba886c99fec83e4d51'
function handleSelect(item:any){
  ElMessage.success('点击事件')
  console.info(item)
}
</script>

<template>
  <div>普通单选框拉框</div>
  <bb-radio-button v-model="selectValue" >
        <bb-option :value="1">北京</bb-option>
        <bb-option :value="2">天津</bb-option>
        <bb-option :value="3">福州</bb-option>
        <bb-option :value="4">厦门</bb-option>
  </bb-radio-button>
  <div>分组</div>
  <bb-radio v-model="selectValue" >
    <bb-option-group label="分组1" >
        <bb-option :value="1">北京</bb-option>
        <bb-option :value="2">天津</bb-option>
    </bb-option-group>
    <bb-option-group label="分组2"  >
        <bb-option :value="3">福州</bb-option>
        <bb-option :value="4">厦门</bb-option>
    </bb-option-group>
  </bb-radio>
  <div>读取数据源</div>
  <bb-radio v-model="selectValue"  width="600"  option-width="45%" :data="data" label-field="key" value-field="value" group-field="group" ></bb-radio>
  <div>读取接口</div>
  <bb-radio v-model="apiValue"  :url="apiUrl" height="300" label-field="Name" value-field="ID" :filterable="true"  :width="800"  option-width="45%"></bb-radio>
  <div>混合</div>
  <bb-radio v-model="apiValue"  :url="apiUrl" label-field="Name" value-field="ID"   >
    <template #extra>
          <bb-option value="1">北京</bb-option>
          <bb-option value="2">天津</bb-option>
    </template>
  </bb-radio>
  <div>事件</div>
  <bb-radio v-model="apiValue" @select="handleSelect"  :url="apiUrl" label-field="Name" value-field="ID"  :width="300" >
  </bb-radio>
  <div>多选</div>
  <bb-radio v-model="multipleValue"   clearable filterable :url="apiUrl" label-field="Name" value-field="ID"  :width="300" >
  </bb-radio>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
