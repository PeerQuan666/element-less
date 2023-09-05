<template>
    <bb-form v-model="editData">
        <bb-input label="标签1" fieldName="inputValue" prefixTag="http://" suffixTag=".com"></bb-input>
        <bb-row :gutter="10">
            <bb-col>
                <bb-input label="标签2" required fieldName="inputValue2"></bb-input>
            </bb-col>
            <bb-col>
                <bb-select label="标签3" fieldName="selectValue" placeholder="单选">
                    <bb-option :value="1">北京</bb-option>
                    <bb-option :value="2">天津</bb-option>
                    <bb-option :value="3">福州</bb-option>
                    <bb-option :value="4">厦门</bb-option>
                </bb-select>
            </bb-col>
        </bb-row>
    </bb-form>
</template>

<script setup lang="ts">

import { ref } from 'vue'
const editData = ref({ inputValue: '', inputValue1: '', selectValue: '' })

</script>