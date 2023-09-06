
<template>
  <els-table :data="data" rowKey="value">
    <els-column-checkbox></els-column-checkbox>
    <els-column prop="key" label="默认类型"  ></els-column>
    <els-column-bool prop="isRelease" label="Bool类型" width="100"></els-column-bool>
    <els-column-enum prop="valueType" label="枚举类型" width="100" :enumData="ValueType"></els-column-enum>
    <els-column-select></els-column-select>
  </els-table>
</template>

<script setup lang="ts">
import  {ValueType} from '../../../src/packages/utlis/enumCom'
import { ref, reactive } from 'vue'
const data = reactive([
  { key: '北京', value: 1, group: '分组1',isRelease:1,valueType:'' },
  { key: '天津', value: 2, group: '分组1',isRelease:0,valueType:'number' },
  { key: '福州', value: 3, group: '分组2',isRelease:1,valueType:'string' },
  { key: '厦门', value: 4, group: '分组2',isRelease:0,valueType:'string' }
])
</script>
<style >
table{
  margin: auto !important;
}
th, td {
    border-color: var(--border-color-dark);
    border: 0px solid #dfe2e5;
}
.txt-red{color: red;}
</style>
