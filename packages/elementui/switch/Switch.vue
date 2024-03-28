<script setup lang="ts">
import { watch,ref,useAttrs} from 'vue'
import { FormItemProps } from '../../utlis/interfaceCom'
import lessCom from '../../utlis/lessCom.js'
import {useModel} from '../../utlis/componentCom.js'
defineOptions({
    name: 'ElsSwitch',
    inheritAttrs:false
})
interface Props extends FormItemProps {
    modelValue?: any
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
    currValue.value=val
}, { immediate: true })
watch(currValue, (val) => {
    returnModelValue(val)

})

</script>
<template>
       <div class="els-node">
    <ElsFormNode v-bind="lessCom.getFormNodeProps(props)">
        <el-switch v-model="currValue" :active-value="1" :inactive-value="0" v-bind="attrs"></el-switch>
     </ElsFormNode>
    </div>
</template>