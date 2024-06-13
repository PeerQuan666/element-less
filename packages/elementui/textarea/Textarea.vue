<script setup lang="ts">
import { ref, watch, useSlots } from 'vue'
import { FormItemProps } from '../../utlis/interfaces'
import { useModel } from '../../utlis/use'
defineOptions({
    name: 'ElsTextarea',
})
interface Props extends FormItemProps {
    modelValue?: any,
    width?: number | string,
    encode?: boolean,
    encodeType?: string,
}
const props = withDefaults(defineProps<Props>(), {
    encode: false,
    encodeType: 'url',
    validTrigger: 'blur',
})
const {
    currModelValue,
    returnModelValue,
} = useModel(props)

const inputValue = ref()

watch(currModelValue, (val) => {
  
  inputValue.value = val
}, { immediate: true })




watch(inputValue, (val) => {
    handleReturnResult(val)
})


function handleReturnResult(val) {
    let currValue = val
  
    returnModelValue(currValue)
}

</script>
<template>
    <els-input type="textarea" v-bind="props"  v-model="inputValue" >
    </els-input>
</template>
<style scoped lang="less">
.els-node:has(>div[class^=el-textarea]){
    display: inline-flex;
    position: relative;
    width: 100%;
}
</style>