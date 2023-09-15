<script setup lang="ts">
import { ref, nextTick, provide, onBeforeUnmount, onMounted, useSlots, useAttrs } from 'vue'

import { ElForm } from 'element-plus'
import ElsFormItem from '../form-item/FormItem.vue';

defineOptions({ name: 'ElsForm' })

interface Props {
    type?: string,
    modelValue?: any,
    formName?: string,
    queryTableRef?: string,
    queryAutoReadData?: boolean,
    queryParameterType?: string,
    labelWidth?: string,
    saveUrl?:string,
    beforeSave?:Function,
    afterSave?:Function
}
const props = withDefaults(defineProps<Props>(), {
    queryParameterType: 'Query',


})
const attrs = useAttrs()
const slots = useSlots()
const dataForm = ref()
const submitButton = ref()
const currLabelWidth = ref(props.labelWidth)

let modelData: Record<string, any> = props.modelValue

if (attrs['inline'] === undefined) {
    currLabelWidth.value = props.labelWidth ?? '100'

}
provide('container', 'form')
provide('labelWidth', currLabelWidth)
provide('formData', modelData)

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
    <el-form :model="modelData" ref="dataForm" onsubmit="return false;" :label-width="currLabelWidth">
        <slot v-if="false"></slot>
        <slot name="edit" v-if="slots.default">
            <template v-for="vnode in slots.default()">
                <component :is="()=>vnode"
                    v-if="!(vnode.type as any).name || (vnode.type as any).name === 'ElFormItem' || (vnode.type as any)?.name === 'ElsFormItem' || !(vnode.type as any).props || !(vnode.type as any).props.hasFormItem || vnode.props && (vnode.props as any)['hasFormItem'] === false">
                </component>
                <ElsFormItem :validationTrigger="(vnode.type as any).props.validationTrigger?.default"
                    v-bind="vnode.props ?? {}" v-else>
                    <template #default="{ key, startKey, endKey }">
                        <component :is="vnode" v-if="(vnode as any).props.hasOwnProperty('modelValue')"></component>
                        <component :is="vnode" v-else-if="modelData && !startKey && !endKey" v-model="modelData[key]">
                        </component>
                        <component :is="vnode"
                            v-else-if="modelData && startKey && endKey && key && (key != startKey && key != endKey)"
                            v-model="modelData[key]" v-model:start="modelData[startKey]" v-model:end="modelData[endKey]">
                        </component>
                        <component :is="vnode"
                            v-else-if="modelData && startKey && endKey && (!key || key == startKey || key == endKey)"
                            v-model:start="modelData[startKey]" v-model:end="modelData[endKey]">
                        </component>
                        <component :is="vnode" v-else></component>
                    </template>
                </ElsFormItem>

            </template>
        </slot>
    </el-form>
</template>


