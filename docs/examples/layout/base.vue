<template>
    <bb-row :gutter="10">
        <bb-col><div class="grid-content red" /></bb-col>
        <bb-col><div class="grid-content green" /></bb-col>
        <bb-col><div class="grid-content yellow" /></bb-col>
    </bb-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
</script>
<style lang="scss">
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.red{background-color: red;}
.green{background-color: green;}
.yellow{background-color: yellow;}
</style>