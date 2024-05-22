<script setup lang="ts">
import { ref, nextTick, onBeforeUnmount, onMounted,watch,reactive, provide } from 'vue'
import { lessCom } from '../../utlis/com'
import {useValue,useContainer } from '../../utlis/use';

defineOptions({ name: 'ElsForm' })

interface Props {
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

const emits = defineEmits(['update:isValidate'])
const tagID = 'els-form' + lessCom.generateID();
const dataForm = ref()
const submitButton = ref()
const modelValue =defineModel<any>({default:()=>{return reactive<object>({});}})
const currLabelPosition = ref(getValue<string>('labelPosition','right'))
const currLabelWidth = ref(getValue<string>('labelWidth', '100'))
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
    if (getValue<string>('inline') === undefined && (!lessCom.isDef(currLabelWidth.value)||currLabelWidth.value==="")) {
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
                        props.beforeSave(modelValue.value).then(bres => {
                            if (bres) {
                                currSaveUrl.post(modelValue).then(res => {
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
                        currSaveUrl.post(modelValue).then(res => {
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
                resolve(true)
                emits('update:isValidate',true)
            }).catch(action => {
                resolve(false)
                console.log(action)
                emits('update:isValidate',false)
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
            return new Function('modelValue', `return modelValue.value[${aIndex}].${key};`);
        } else {
            return modelValue.value[aIndex][key]
        }

    }
    if (key.toString().includes('.')) {
        return new Function('modelValue', `return modelValue.value.${key};`);
    } else {
        return modelValue.value[key]
    }
}

function setModelValue(key, value, aIndex = -1) {

    if (key===undefined||key==='') {
        return
    }
    if (aIndex > -1) {
        if (key.toString().includes('.')) {
            new Function('modelValue,value', `modelValue.value[${aIndex}].${key}=value;`);
        } else {
            modelValue.value[aIndex][key] = value
        }
    }
    if (key.toString().includes('.')) {
        new Function('modelValue,value', `modelValue.value.${key}=value;`);
    } else {
        modelValue.value[key] = value
    }
}



setForm({
    'tagContainer':'form',
    setModelValue,
    getModelValue,
    "formData":modelValue
})

defineExpose({
    clearValidate,
    validateField,
    validate,
    handleSubmitButton
})

</script>

<template>
    <el-form :model="modelValue" ref="dataForm" onsubmit="return false;" :label-width="currLabelPosition==='top'?'': currLabelWidth" :label-position="currLabelPosition" v-if="!isMobile">
        <slot></slot>
    </el-form>
    <van-form ref="dataForm" :label-align="currLabelPosition" v-else>
        <slot></slot>
    </van-form>
</template>

<style scoped lang="less">
.van-form{flex-grow: 1}
.el-form:deep{
>.el-form-item{
    margin-bottom: 18px;
}
}
</style>
