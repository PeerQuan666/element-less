<script setup lang="ts">
import { ref, computed, watch, useAttrs, } from 'vue'
import lessCom from '../../utlis/lessCom.js'
import '../../utlis/lessPrototype.js'
defineOptions({ name: "ElsDataModal" })
const emits = defineEmits(['update:select', 'update:modelValue', 'update:select-label'])

interface Props {
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
    confirm?: Function
}
const props = withDefaults(defineProps<Props>(), {
    inputWidth: '200',
    buttonLabel: '选择',
    hasInput: true,
    hasButton: true,
    modalWidth: '50%',
    modalHeight: '500px',

})

const tagID = ref('data-modal-' + lessCom.Guid32())
const currSelectValue = ref('')
const currSelectLabel = ref()
const currSelectData = ref<any>()

const dialogVisible = ref(false)
const attrs = useAttrs()

watch(() => props.modelValue, (val) => {
    currSelectValue.value = val ?? ''

}, { immediate: true })


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
    dialogVisible.value = true
}
function handleConfirm() {
    if (props.confirm) {
        props.confirm().then(res => {
            if (res) {
                dialogVisible.value = false
            }
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
            emits("update:modelValue", currSelectValue.value)
            emits("update:select-label", currSelectLabel.value)
        } else {
            currSelectValue.value = currSelectData.value
            emits("update:modelValue", currSelectData.value)
        }
        emits("update:select", currSelectData.value)
    }
    else {
        currSelectValue.value=''
        currSelectLabel.value=''
        emits("update:select-label", '')
        emits("update:modelValue", '')
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
    <el-space>
        <el-input v-model="currSelectValue" v-if="hasInput" v-bind="attrs"
            :style="(inputWidth ? 'width:' + inputWidth : '')"></el-input>
        <el-button type="primary" v-if="hasButton" @click="handleOpenModal">{{ buttonLabel }}</el-button>
        <el-tag v-if="currSelectLabel">{{ currSelectLabel }}</el-tag>
        <els-dialog :title="title" :width="width" :contentHeight="height" v-model="dialogVisible" :url="modalUrl">
            <slot></slot>
            <template #footer v-if="!modalUrl">
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleConfirm">
                        提交
                    </el-button>
                </span>
            </template>
        </els-dialog>
    </el-space>
</template>

<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>