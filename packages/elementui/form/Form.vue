<script setup lang="ts">
import { ref, nextTick, onBeforeUnmount, onMounted,watch } from 'vue'
import { lessCom } from '../../utlis/com'
import { useVModel } from '@vueuse/core'
import {useValue,useContainer } from '../../utlis/use';

defineOptions({ name: 'ElsForm' })

interface Props {
    modelValue?: any,
    saveUrl?: string,
    beforeSave?: Function,
    afterSave?: Function,
    labelWidth?: string,
    labelPosition?:string,
    inputWidth?: string
}
const props = withDefaults(defineProps<Props>(), {
    
})
const {getValue,setForm}=useValue(props)
const container=useContainer()

const emits = defineEmits(['update:modelValue','update:isValidate'])
const tagID = 'els-form' + lessCom.generateID();
const dataForm = ref()
const submitButton = ref()
let modelData: Record<string, any> = useVModel(props, 'modelValue', emits)
const currLabelPosition = ref(getValue<string>('labelPosition','right'))
const currLabelWidth = ref(getValue<string>('labelWidth'))
const isMobile= getValue<boolean>("isMobile",false);
const elsApiResult =container?.$apiResult
const elsPageStore =container?.$pageStore
const validateStore = { id: tagID, validate: validate }
const saveStore = { id: tagID, save: saveData }


watch(()=>props.labelWidth,(val)=>{
    if(val){
        currLabelWidth.value =val
    }
})


watch(()=>props.labelPosition,(val)=>{
    if(val){
        currLabelPosition.value =val
    }
})

onMounted(() => {
    if (getValue<string>('inline') === undefined && !lessCom.isDef(currLabelWidth.value)) {
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
                emits('update:isValidate',true)
                resolve(true)
            }).catch(action => {
                console.log(action)
                emits('update:isValidate',false)
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



setForm({
    'tagContainer':'form',
    setModelValue,
    getModelValue,
    "formData":modelData
})

defineExpose({
    clearValidate,
    validateField,
    validate,
    handleSubmitButton
})

</script>

<template>

    <el-form :model="modelData" ref="dataForm" onsubmit="return false;" :label-width="currLabelWidth" :label-position="currLabelPosition" v-if="!isMobile">
        <slot v-bind="{formData:modelData}"></slot>
    </el-form>
    <van-form ref="dataForm" :label-align="currLabelPosition" v-else>
        <slot v-bind="{formData:modelData}"></slot>
   
    </van-form>
</template>


