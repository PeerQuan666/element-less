<template>
    <els-input-range v-model="inputValue" startPlaceholder="开始" endPlaceholder="结束" :isNumber="false"></els-input-range>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputValue = ref('')
</script>