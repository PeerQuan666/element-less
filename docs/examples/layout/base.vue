<template>
  <els-row :gutter="10">
    <div class="grid-content bg-purple" />
    <div class="grid-content bg-purple-dark" />
    <div class="grid-content bg-purple-light" />
  </els-row>
  <els-row :gutter="10">
    <div class="grid-content bg-purple" />
    <div class="grid-content bg-purple-dark" :span="12" />
    <div class="grid-content bg-purple-light" />
  </els-row>
</template>