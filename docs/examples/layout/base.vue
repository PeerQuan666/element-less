<template>
  <els-row :gutter="10">
    <els-col>
      <div class="grid-content bg-purple" />
    </els-col>
    <els-col>
      <div class="grid-content bg-purple-dark" />
    </els-col>
    <els-col>
      <div class="grid-content bg-purple-light" />
    </els-col>
  </els-row>
  <els-row :gutter="10">
    <els-col>
      <div class="grid-content bg-purple" />
    </els-col>
    <els-col>
      <div class="grid-content bg-purple-dark" :span="12" />
    </els-col>
    <els-col>
      <div class="grid-content bg-purple-light" />
    </els-col>
  </els-row>
</template>
<style scoped>
.el-row{margin-bottom: 10px;}
</style>