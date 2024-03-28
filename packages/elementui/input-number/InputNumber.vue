<script setup lang="ts">
import { watch, useAttrs,ref} from 'vue'
import lessCom from '../../utlis/lessCom.js'
import { FormItemProps } from '../../utlis/interfaceCom'
import {useModel} from '../../utlis/componentCom.js'
defineOptions({
    name: 'ElsInputNumber',
    inheritAttrs:false
})
interface Props extends FormItemProps {
    width?:string
    modelValue?: Number
}
const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])
const attrs=useAttrs()
const currValue = ref()




const {
    currModelValue,
    returnModelValue,
} = useModel(props)

watch(currModelValue,(val)=>{
    if(currValue.value!==val){
        currValue.value=val
    }

},{immediate:true})
watch(currValue, (val) => {
    emits('update:modelValue', val)
    returnModelValue(val)
})

</script>
<template>
       <div class="els-node">
    <ElsFormNode v-bind="lessCom.getFormNodeProps(props)">
        <el-input-number v-model="currValue"  :style="[{ width: width?.appendPx() }]"  v-bind="attrs"></el-input-number>
     </ElsFormNode>
    </div>
</template>