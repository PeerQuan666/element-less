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
const col=ref()
watch(()=>props.span,(val)=>{
    setSpan(tagID, val)

},{immediate:true})

watch(colData.value, () => {
    if(getSpan){
        currSpan.value = getSpan()

    }
}, { deep: true })
onMounted(() => {
    if(col.value.$el.parentNode.className.includes('els-node')){
        col.value.$el.parentNode.style.display='none'
        col.value.$el.parentNode.parentNode.appendChild(col.value.$el)
    }
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
    <el-col :span="currSpan" ref="col">
        <slot ></slot>
    </el-col>
</template>