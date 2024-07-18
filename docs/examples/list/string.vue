<template>
     <els-list v-model="data1">
        <template #default="{ element,$index }">
            <els-input label="城市" :aIndex="$index" v-model="element.value" width="200" required clearable ></els-input>
        </template>
    </els-list>
</template>

<script setup>
import { reactive } from 'vue'
const data1 = reactive([
   '字符串1',
   '字符串2'
])
</script>