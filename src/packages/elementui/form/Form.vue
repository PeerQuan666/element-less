<script setup lang="ts">
import { ref, nextTick, provide, onBeforeUnmount, onMounted, useSlots, useAttrs, inject } from 'vue'
import lessCom from '../../utlis/lessCom.js'
import { ElForm } from 'element-plus'
import ElsFormNode from '../../custom/form-node/FormNode.vue';
defineOptions({ name: 'ElsForm' })

interface Props {
    type?: string,
    modelValue?: any,
    formName?: string,
    queryTableRef?: string,
    queryAutoReadData?: boolean,
    queryParameterType?: string,
    labelWidth?: string,
    saveUrl?: string,
    beforeSave?: Function,
    afterSave?: Function
}
const props = withDefaults(defineProps<Props>(), {
    queryParameterType: 'Query',


})
const tagID = 'els-form' + lessCom.Guid32();
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
const elsApiResult = inject<Function>("elsApiResult") ?? function () { }
const elsPageStore = inject<any>('elsPageStore')
const validateStore = { id: tagID, validate: validate }
const saveStore = { id: tagID, save: saveData }

onMounted(() => {
    if (elsPageStore) {
        elsPageStore.value.saveForms.push(saveStore)
        elsPageStore.value.validates.push(validateStore)
    }
})

onBeforeUnmount(() => {
    if (elsPageStore) {
        elsPageStore.value.saveForms.remove(saveStore)
        elsPageStore.value.validates.remove(validateStore)
    }
})
function saveData(url) {
    return new Promise((resolve, reject) => {
        let currSaveUrl = props.saveUrl
        if (!currSaveUrl) {
            currSaveUrl = url
        }
        currSaveUrl = currSaveUrl.replacePowerUrl()
        if (currSaveUrl) {
            validate().then((valid) => {
                if (valid) {
                    if (props.beforeSave) {
                        props.beforeSave(modelData.value).then(bres => {
                            if (bres) {
                                currSaveUrl.post(modelData).then(res => {
                                    if (props.afterSave) {
                                        props.afterSave(res)
                                    }
                                    elsApiResult(res)
                                    resolve(res)
                                }).catch((error) => {
                                    reject(error)
                                })
                            }
                        })
                    } else {
                        currSaveUrl.post(modelData).then(res => {
                            if (props.afterSave) {
                                props.afterSave(res)
                            }
                            elsApiResult(res)
                            resolve(res)
                        }).catch((error) => {
                            reject(error)
                        })

                    }
                } else { resolve(false) }
            })
        } else {
            resolve(false)
        }
    })


}

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
                <ElsFormNode :vnode="vnode"></ElsFormNode>
            </template>
        </slot>
    </el-form>
</template>


