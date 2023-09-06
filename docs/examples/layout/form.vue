<template>
    <els-form v-model="editData">
        <els-input label="标签1" fieldName="inputValue" prefixTag="http://" suffixTag=".com"></els-input>
        <els-row :gutter="10">
            <els-col>
                <els-input label="标签2" required fieldName="inputValue2"></els-input>
            </els-col>
            <els-col>
                <els-select label="标签3" fieldName="selectValue" placeholder="单选">
                    <els-option :value="1">北京</els-option>
                    <els-option :value="2">天津</els-option>
                    <els-option :value="3">福州</els-option>
                    <els-option :value="4">厦门</els-option>
                </els-select>
            </els-col>
        </els-row>
    </els-form>
</template>

<script setup lang="ts">

import { ref } from 'vue'
const editData = ref({ inputValue: '', inputValue1: '', selectValue: '' })

</script>