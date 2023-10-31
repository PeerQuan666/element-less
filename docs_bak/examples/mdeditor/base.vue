<template>
  <els-md-editor v-model="mdValue" v-model:html="mdValueHtml" ></els-md-editor>
</template>

<script setup>
import { ref } from 'vue'
const mdValue=ref()
const mdValueHtml=ref()
</script>