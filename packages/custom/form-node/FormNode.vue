<script setup lang="ts">
import { ref, useAttrs } from 'vue'
import { FormItemProps } from '../../utlis/interfaces'
import { useValue } from '../../utlis/use'

defineOptions({ name: "ElsFormNode" })
const props = withDefaults(defineProps<FormItemProps>(),{
  
})
const {getValue}=useValue(props)
const hasForm = ref(false)
const container = getValue<string>('tagContainer', '')
const layer = getValue<string>('layer', '')
const formItem=ref()

function confirmMobile(val){
    if(formItem.value){
        formItem.value.confirmMobile(val)
    }
}
function hiddenMobile(){
    if(formItem.value){
        formItem.value.hiddenMobile()
    }
}
if (container == 'form') {
    hasForm.value = true
}

const attrs = useAttrs()
defineExpose({
    confirmMobile,
    hiddenMobile
})
</script>
<template >
    <els-col v-if="layer == 'row'">
        <els-form-item v-if="hasForm" v-bind="props" ref="formItem">
            <slot v-bind="attrs"></slot>
        </els-form-item>
        <slot v-bind="attrs" v-else></slot>
    </els-col>
    <template v-else>
        <els-form-item v-if="hasForm" v-bind="props"  ref="formItem">
            <slot v-bind="attrs"></slot>
        </els-form-item>
        <slot v-bind="attrs" v-else></slot>
    </template>
</template>
<style>
.van-form{
    .van-cell:last-child::after {
        display: unset;
    }


}

.els-node:last-child>div::after{
    position:relative
}


</style>../../utlis/interfaces