<script setup lang="ts">
import { ref, inject, useAttrs,provide } from 'vue'
import { FormItemProps } from '../../utlis/interfaceCom'
defineOptions({ name: "ElsFormNode" })

const props = defineProps<FormItemProps>()
const hasForm = ref(false)
const container = inject<string>('container', '')
const layer = inject<string>('layer', '')
const formItem=ref()

function confirmMobile(val){
    formItem.value.confirmMobile(val)
 
}
function hiddenMobile(){
    formItem.value.hiddenMobile()
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
    <ElsCol v-if="layer == 'row'">
        <els-form-item v-if="hasForm" v-bind="props" ref="formItem">
            <slot v-bind="attrs"></slot>
        </els-form-item>
        <slot v-bind="attrs" v-else></slot>
    </ElsCol>
    <template v-else>
        <els-form-item v-if="hasForm" v-bind="props"  ref="formItem">
            <slot v-bind="attrs"></slot>
        </els-form-item>
        <slot v-bind="attrs" v-else></slot>
    </template>
</template>