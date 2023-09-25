<template>
    <els-form v-model="editData">
        <els-input label="名称" prop="name" required ></els-input>
        <els-row :gutter="10">
            <els-input label="电话" required  prop="phone" ></els-input>
            <els-select label="城市" prop="city" placeholder="单选">
                <els-option :value="1">北京</els-option>
                <els-option :value="2">天津</els-option>
                <els-option :value="3">福州</els-option>
                <els-option :value="4">厦门</els-option>
            </els-select>
        </els-row>
        <els-textarea prop="remark" label="备注" width="580"></els-textarea>
    </els-form>
</template>

<script setup lang="ts">

import { ref } from 'vue'
const editData = ref({ name: '', phone: '', city: '',remark:'' })

</script>