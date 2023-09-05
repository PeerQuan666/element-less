
<template>
  <bb-table :data="data">
    <bb-column prop="key" label="城市" width="100"  ></bb-column>
    <bb-column prop="value" label="值" ></bb-column>
  </bb-table>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const data = reactive([
  { key: '北京', value: 1, group: '分组1' },
  { key: '天津', value: 2, group: '分组1' },
  { key: '福州', value: 3, group: '分组2' },
  { key: '厦门', value: 4, group: '分组2' }
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
</style>
