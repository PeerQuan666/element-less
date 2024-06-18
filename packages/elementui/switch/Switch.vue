<script setup lang="ts">
import { watch,ref,useAttrs} from 'vue'
import { FormItemProps } from '../../utlis/interfaces'
import { lessCom } from '../../utlis/com'
import {useModel,useMobile} from '../../utlis/use'
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
const formNode=ref()





const {
    currModelValue,
    returnModelValue,
} = useModel(props)
const {isMobile}=useMobile(formNode)

watch(currModelValue,(val)=>{
    currValue.value=val
}, { immediate: true })
watch(currValue, (val) => {
    returnModelValue(val)

})

</script>
<template>
       <div class="els-node">
    <ElsFormNode v-bind="lessCom.getFormNodeProps(props)" ref="formNode">
        <el-switch v-model="currValue" v-if="!isMobile" :active-value="1" :inactive-value="0" v-bind="attrs"></el-switch>
        <van-switch v-model="currValue" :active-value="1" :inactive-value="0"  v-bind="attrs"  v-else />
     </ElsFormNode>
    </div>
</template>