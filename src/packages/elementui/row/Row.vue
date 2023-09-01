<script setup lang="ts">
import { ref,useSlots, provide } from 'vue'
defineOptions({
    name: 'BbRow',
})
const slots = useSlots()
const colData = ref({ count: 24 })
provide('getSpan', getSpan)
provide('colData', colData)
function getSpan() {
    if (slots.default) {
        if (slots.default().length == 1 && slots.default()[0].type.toString() == 'Symbol(Fragment)') {
            let cols = (slots.default()[0].children as any).filter(ele => ele.type && ele.type.name == 'BbCol')
            colData.value.count = cols.length
            return 24 / cols.length;
        }
        let cols = slots.default().filter(ele => ele.type && (ele.type as any).name == 'BbCol')
        colData.value.count = cols.length
        return 24 / cols.length;
    }
    return 24
}
</script>
<template>
    <el-row>
        <slot />
    </el-row>
</template>