<script setup lang="ts">
import { ref,watch,inject,provide, onMounted, onUnmounted } from 'vue'
import lessCom from '../../utlis/lessCom';
defineOptions({
    name: 'ElsCol',
})
interface Props {
    span?: number,

}
const props = withDefaults(defineProps<Props>(), {
})
const tagID = 'els-col-' + lessCom.generateID()
provide('layer', 'col')
const currSpan = ref(24)
const colData = inject<any>("colData", null)
const getSpan = inject<Function>("getSpan", () => null)
const setSpan = inject<Function>("setSpan", () => null)
const removeSpan = inject<Function>("removeSpan", () => null)

watch(()=>props.span,(val)=>{
    setSpan(tagID, val)

},{immediate:true})

watch(colData.value, () => {
    if(getSpan){
        currSpan.value = getSpan()

    }
}, { deep: true })
onMounted(() => {
    if (getSpan) {
        currSpan.value = getSpan()
    }
})
onUnmounted(() => {
    if (removeSpan) {
        removeSpan(tagID)

    }
})
</script>
<template>
    <el-col :span="currSpan">
        <slot ></slot>
    </el-col>
</template>