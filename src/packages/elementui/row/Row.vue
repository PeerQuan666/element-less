<script setup lang="ts">
import { ref, provide } from 'vue'

defineOptions({
    name: 'ElsRow',
})
const colData = ref<any>([])
const spanCount = ref(24)
provide('layer', 'row')
provide('colData', colData)
provide('getSpan', getSpan)
provide('setSpan', setSpan)
provide('removeSpan', removeSpan)
function setSpan(id, span) {
    if(colData.value.find(ele=>ele.id==id)){
        removeSpan(id)
    }
    colData.value.push({ 'id': id, 'span': span })
}
function removeSpan(id) {
    colData.value.splice(colData.value.findIndex(ele => ele.id == id), 1)
}

function getSpan() {
    const autoSpan = colData.value.filter(ele => !ele.span).length
    if (autoSpan)
        return spanCount.value / autoSpan
}

</script>
<template>
    <el-row>
        <slot ></slot>
    </el-row>
</template>