<template>

    <els-textarea v-model="inputValue"></els-textarea>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref('')

</script>