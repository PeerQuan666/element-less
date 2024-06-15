<template>
 <els-dynamic-designer-view v-model="config" >
</els-dynamic-designer-view>

</template>

<script setup>
import { ref } from 'vue'
const test=ref('<p>sadasdsadsa</p>')
const config = ref([])
</script>