<script setup lang="ts">
import { watch, useAttrs,ref} from 'vue'
import { lessCom } from '../../utlis/com'
import { FormItemProps } from '../../utlis/interfaces'
import {useModel,useValue} from '../../utlis/use'
defineOptions({
    name: 'ElsInputNumber',
    inheritAttrs:false
})
interface Props extends FormItemProps {
    width?:string
    modelValue?: Number
}
const {getValue}=useValue()
const isMobile = getValue<boolean>('isMobile', false)
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
            <el-input-number v-model="currValue" v-if="!isMobile" :style="[{ width: width?.appendPx() }]"  v-bind="attrs"></el-input-number>
            <van-stepper v-else v-model="currValue"   v-bind="attrs"/>
        
        </ElsFormNode>
    </div>
</template>../../utlis/interfaces.js