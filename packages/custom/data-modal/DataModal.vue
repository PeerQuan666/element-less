<script setup lang="ts">
import { ref, computed, watch, useAttrs, inject,watchEffect} from 'vue'
import { FormItemProps } from '../../utlis/interfaceCom'
import lessCom from '../../utlis/lessCom.js'
import '../../utlis/lessPrototype.js'
import {useModel} from '../../utlis/componentCom.js'
defineOptions({ name: "ElsDataModal" })
const emits = defineEmits(['update:select', 'update:modelValue', 'update:select-label'])

interface Props extends FormItemProps {
    modelValue?: string,
    selectLabel?: string,
    select?: Record<string, any>,
    inputWidth?: string,
    url?: string,
    dataUrl?: string,
    buttonLabel?: string,
    hasInput?: boolean,
    hasButton?: boolean,
    title?: string,
    width?: string,
    height?: string,
    labelField?: string,
    valueField?: string,
    multiple?: boolean,
    open?:Function,
    close?:Function,
    confirm?: Function,
    componentName?:string
}
const props = withDefaults(defineProps<Props>(), {
    inputWidth: '200',
    buttonLabel: '选择',
    hasInput: true,
    hasButton: true,
    width: '50%',
    height: '500px',
    componentName:'el-button'

})

const tagID = ref('data-modal-' + lessCom.generateID())
const currSelectValue = ref('')
const currSelectLabel = ref()
const currSelectData = ref<any>()

const dialogVisible = ref(false)
const attrs = useAttrs()
const {
    currModelValue,
    returnModelValue,
} = useModel(props)
 
watchEffect(()=>{
    const currValue=currModelValue.value
    currSelectValue.value = currValue ?? ''
})



watch(() => props.selectLabel, (val) => {
    currSelectLabel.value = val

}, { immediate: true })

watch(() => props.dataUrl, (val) => {
    if (val) {
        val.post({ idString: currSelectValue }).then(res => {
            if (res.ResultCode == '0') {
                currSelectData.value = res.Data
                handleReturnResult()
            }
        })
    }

}, { immediate: true })


function registEvent() {
    window[tagID.value] = handleSelect
}
function handleOpenModal() {
    if(props.open){
        props.open()
    }
    dialogVisible.value = true
}
function handleCloseModal(){
    if(props.close){
        props.close()
    }
}
const confirmLoading=ref(false)
function handleConfirm() {
    confirmLoading.value=true
    if (props.confirm) {
        props.confirm().then(res => {
            if (res) {
                dialogVisible.value = false
             
            }
            confirmLoading.value=false
        })

    }
}

function handleReturnResult() {
    if (currSelectData.value) {
        if (props.valueField && props.labelField) {
            if (Array.isArray(currSelectData.value)) {
                currSelectValue.value = currSelectData.value.map(ele => ele[props.valueField ?? '']).toString()
                currSelectLabel.value = currSelectData.value.map(ele => ele[props.labelField ?? '']).toString()

            } else {
                currSelectValue.value = currSelectData.value[props.valueField]
                currSelectLabel.value = currSelectData.value[props.labelField]
            }
            returnModelValue(currSelectValue.value)
            emits("update:select-label", currSelectLabel.value)
        } else {
            currSelectValue.value = currSelectData.value
            returnModelValue(currSelectValue.value)
        }
        emits("update:select", currSelectData.value)
    }
    else {
        currSelectValue.value=''
        currSelectLabel.value=''
        emits("update:select-label", '')
        returnModelValue('')
        emits("update:select", null)

    }

}

function handleSelect(row) {
    currSelectData.value = row;
    handleReturnResult()
    dialogVisible.value = false
}

const modalUrl = computed(() => {
    if (!props.url) { return '' }
    registEvent()
    let cUrl = props.url
    let currFieldValue = encodeURIComponent(currSelectValue.value)
    return cUrl.addUrlParameter("Transfer_ModalFieldValue", currFieldValue).addUrlParameter("Transfer_SelectIds", currFieldValue).addUrlParameter("Transfer_Multiple", props.multiple ? 'True' : 'False').addUrlParameter("Transfer_SelectTagID", tagID.value)
})

</script>
<template >
    
    <span class="els-datamodal">
        <el-input v-model="currSelectValue" v-if="hasInput" 
            :style="(inputWidth ? 'width:' + inputWidth.appendPx() : '')"></el-input>
        <component :is="componentName" type="primary" v-bind="attrs" v-if="hasButton" @click.native="handleOpenModal" >{{ buttonLabel?buttonLabel:'选择' }}</component>
        <el-tag v-if="currSelectLabel">{{ currSelectLabel }}</el-tag>
    </span>
    <els-dialog :title="title" :width="width" :contentHeight="height" v-model="dialogVisible" :url="modalUrl" @close="handleCloseModal">
            <slot></slot>
            <template #footer v-if="!modalUrl">
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" :loading="confirmLoading" @click="handleConfirm">
                        提交
                    </el-button>
                </span>
            </template>
        </els-dialog>
</template>

<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
.els-datamodal{display: flex;align-items: center;gap: 5px;}
</style>