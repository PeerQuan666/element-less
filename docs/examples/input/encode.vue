<template>
    {{inputValue  }}
    <bb-input v-model="inputValue" encode></bb-input>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputValue = ref('')
</script>