<script setup lang="ts">
import { ref, nextTick, provide, onBeforeUnmount, onMounted, useSlots} from 'vue'

import {ElForm } from 'element-plus'
import BbFormItem from '../form-item/FormItem.vue';

defineOptions({ name: 'BbForm' })

interface Props {
    type?: string,
    modelValue?: any,
    formName?: string,
    queryTableRef?: string,
    queryAutoReadData?: boolean,
    queryParameterType?: string,
    labelWidth?:string
}
const props = withDefaults(defineProps<Props>(), {
    queryParameterType: 'Query',
    labelWidth:'100'

})

const slots = useSlots()
const dataForm = ref()
const submitButton = ref()
let modelData: Record<string, any> =props.modelValue

provide('labelWidth', props.labelWidth)

onMounted(() => {
   console.info('加载完成')
})

onBeforeUnmount(() => {
    console.info('卸载')
})

function clearValidate() {
    nextTick(() => {
        dataForm.value.clearValidate()
    })
}
function validate() {
    return new Promise((resolve) => {
        if (!dataForm.value) {
            resolve(true)
        } else {
            dataForm.value.validate().then(res => {
                resolve(res)
            }).catch(action => {
                console.log(action)
                resolve(false)
            })
        }

    })
}
function validateField(fields) {
    return dataForm.value.validateField(fields)
}
function handleSubmitButton() {
    submitButton.value.$el.trigger("click")
}

defineExpose({
    clearValidate,
    validateField,
    validate,
    handleSubmitButton
})

</script>

<template>
      <el-form :model="modelData" ref="dataForm"  onsubmit="return false;" :label-width="labelWidth" >
       <slot v-if="false"></slot>
       <slot name="edit" v-if="slots.default">
            <template v-for="vnode in slots.default()">
              
                <component :is="()=>vnode"  v-if="!(vnode.type as any).name||(vnode.type as any).name==='ElFormItem'||(vnode.type as any)?.name==='BbFormItem'||(vnode.props as any)['hasFormItem']?.toCamel()===false"></component>
                <BbFormItem  :validationTrigger="(vnode.type as any).props.validationTrigger?.default" v-bind="vnode.props??{}"   v-else>
                    <template #default="{key}">
                        <component :is="vnode" v-if="(vnode as any).props.hasOwnProperty('modelValue')" ></component>
                        <component :is="vnode" v-else   v-model="modelData[key]"></component>
                    </template>
                </BbFormItem>
            </template>
        </slot>
    </el-form>
</template>


