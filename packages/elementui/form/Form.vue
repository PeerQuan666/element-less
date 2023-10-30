<script setup lang="ts">
import { ref, nextTick, provide, onBeforeUnmount, onMounted, useAttrs, inject,watch } from 'vue'
import lessCom from '../../utlis/lessCom.js'
import { ElForm } from 'element-plus'
import { useVModel } from '@vueuse/core'
import '../../utlis/lessPrototype.js'
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
    afterSave?: Function,
    inputWidth?: string
}
const props = withDefaults(defineProps<Props>(), {
    queryParameterType: 'Query',


})
const emits = defineEmits(['update:modelValue'])
const tagID = 'els-form' + lessCom.generateID();
const attrs = useAttrs()
const dataForm = ref()
const submitButton = ref()

let modelData: Record<string, any> = useVModel(props, 'modelValue', emits)


provide('container', 'form')
provide('setModelValue', setModelValue)
provide('getModelValue', getModelValue)

provide('formData', modelData)

const parentLabelWidth = inject<string>('labelWidth', '')
const currLabelWidth = ref()
const parentInputWidth = inject<string>('inputWidth', '')
const elsApiResult = inject<Function>("elsApiResult", () => null)
const elsPageStore = inject<any>('elsPageStore', null)
const validateStore = { id: tagID, validate: validate }
const saveStore = { id: tagID, save: saveData }
if (props.labelWidth) {
    provide('labelWidth', props.labelWidth)
}
if (props.inputWidth) {
        provide('inputWidth', props.inputWidth)
    } else {
        provide('inputWidth', parentInputWidth)
    }

watch(()=>props.labelWidth,(val)=>{
    if(val){
        currLabelWidth.value = props.labelWidth
    }
})

onMounted(() => {
    if (props.labelWidth) {
        currLabelWidth.value = props.labelWidth
    }
    if ((currLabelWidth.value === undefined || currLabelWidth.value === '') && parentLabelWidth) {
        currLabelWidth.value = parentLabelWidth
    }

    if (attrs['inline'] === undefined && currLabelWidth.value === undefined || currLabelWidth.value === '') {
        currLabelWidth.value = '100'
    }
 
    if (currLabelWidth.value) {
        currLabelWidth.value = currLabelWidth.value.appendPx()
    }

  

    if (elsPageStore) {
        elsPageStore.value.saveForms.push(saveStore)
        elsPageStore.value.validates.push(validateStore)
    }
})

onBeforeUnmount(() => {
    if (elsPageStore) {
        lessCom.removeArrayItem(elsPageStore.value.saveForms,saveStore)
        lessCom.removeArrayItem(elsPageStore.value.validates,validateStore)
    }
})
function saveData(url) {
    return new Promise((resolve, reject) => {
        let currSaveUrl = props.saveUrl ?? ''
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

function getModelValue(key, aIndex = -1) {
    if (key===undefined||key==='') {
        return
    }
    if (aIndex > -1) {
        if (key.toString().includes('.')) {
            return new Function('modelData', `return modelData.value[${aIndex}].${key};`);
        } else {
            return modelData.value[aIndex][key]
        }

    }
    if (key.toString().includes('.')) {
        return new Function('modelData', `return modelData.value.${key};`);
    } else {
        return modelData.value[key]
    }
}

function setModelValue(key, value, aIndex = -1) {

    if (key===undefined||key==='') {
        return
    }
    if (aIndex > -1) {
        if (key.toString().includes('.')) {
            new Function('modelData,value', `modelData.value[${aIndex}].${key}=value;`);
        } else {
            modelData.value[aIndex][key] = value
        }
    }
    if (key.toString().includes('.')) {
        new Function('modelData,value', `modelData.value.${key}=value;`);
    } else {
        modelData.value[key] = value
    }
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
        <slot></slot>
    </el-form>
</template>


