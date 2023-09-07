
<template>
  <els-table :data="data">
    <els-column prop="key" label="城市" width="100"  ></els-column>
    <els-column prop="value" label="值" ></els-column>
  </els-table>
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
