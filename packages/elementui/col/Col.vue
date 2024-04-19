<script setup lang="ts">
import { ref,watch, onMounted, onUnmounted } from 'vue'
import { lessCom } from '../../utlis/com'
import { useValue } from '../../utlis/use';
defineOptions({
    name: 'ElsCol',
})
interface Props {
    span?: number,

}
const props = withDefaults(defineProps<Props>(), {
})
const {getValue,setValue}=useValue(props)
const tagID = 'els-col-' + lessCom.generateID()
const currSpan = ref(24)
const colData = getValue<any>("colData", null)
const getSpan = getValue<Function>("getSpan", () => null)
const setSpan = getValue<Function>("setSpan", () => null)
const removeSpan = getValue<Function>("removeSpan", () => null)
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
setValue({'layer':'col'})
</script>
<template>
    <el-col :span="currSpan" ref="col">
        <slot ></slot>
    </el-col>
</template>