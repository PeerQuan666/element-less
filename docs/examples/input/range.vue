<template>
    <els-form v-model="editData">
        <els-input-range  label="测试" prop="inputValue" require></els-input-range>

    </els-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const editData=ref({inputValue:''})
const inputValue = ref('')
</script>