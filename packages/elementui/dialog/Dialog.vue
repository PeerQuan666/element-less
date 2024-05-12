<script setup lang="ts">
import { ref, useSlots, watch, computed } from 'vue'
import { lessCom } from '../../utlis/com'
import { useValue } from '../../utlis/use';
const emits = defineEmits(['update:modelValue'])
const { $codeField,$success } = lessCom.getApiConfig()
const slots = useSlots()

defineOptions({
    name: 'ElsDialog',
})
interface Props {
    modelValue?: boolean,
    url?: string,
    contentWidth?: string,
    contentHeight?: string,
    loading?: boolean,
    visible?: boolean,
    closeOnClickModal?: boolean,
    showConfirmButton?: boolean,
    showCancelButton?: boolean,
    title?: string,
    confirm?: Function,
    cancel?: Function
}

const props = withDefaults(defineProps<Props>(), {
    contentWidth: "100%",
    contentHeight: "60%",
    closeOnClickModal: true
})
const {getValue}=useValue(props)
const isMobile = getValue<boolean>('isMobile', false);
const tagID = "less_dialog_" + lessCom.generateID()
const pageLoading = ref(false)
const dialogUrl = ref()
const dialogVisible = ref(false)
const confirmLoading = ref(false)
const cancelLoading = ref(false)
const contentStyle = computed(() => {
    const currStyle: any = []
    if (props.contentWidth) {
        currStyle.push({ width: props.contentWidth.appendPx() })
    }
    if (props.contentHeight && props.contentHeight.indexOf('%') > -1) {
        currStyle.push({ minHeight: `calc(${props.contentHeight.replace('%', '')}vh)` })
    } else if (props.contentHeight) {
        currStyle.push({ minHeight: props.contentHeight.appendPx() })
    }
    return currStyle

})
watch(() => props.url, (val) => {
    if (val) {
        dialogUrl.value = val.addUrlParameter("Transfer_DialogTagID", tagID)
        handleRegistEvent()
    }
}, { immediate: true })

watch(() => props.modelValue, (val) => {

    dialogVisible.value = val
    if (props.visible) {
        dialogVisible.value = props.visible
    }
}, { immediate: true })

watch(dialogVisible, (val) => {
    emits("update:modelValue", val)
})

function mobileBeforeClose(action) {
    return new Promise((resolve) => {
        if (action === 'confirm') {
            if (props.confirm) {
                props.confirm().then(res => {
                    if (res === true || res[$codeField] == $success) {
                        resolve(true)
                    } else { resolve(false) }
                })
            } else {
                resolve(true)
            }
        } else {
            if (props.cancel) {
                props.cancel().then(res => {
                    if (res === true || res[$codeField] == $success) {
                        resolve(true)
                    } else { resolve(false) }
                })
            } else {
                resolve(true)
            }
        }
    });

}

function handleRegistEvent() {
    window[tagID] = handleCloseLoading
}

function handleCloseLoading() {
    pageLoading.value = false
}
function handleCancel() {
    if (props.cancel) {
        cancelLoading.value=true
        props.cancel().then(res => {
            if (res === true || res[$codeField] == $success) {
                dialogVisible.value = false
              
            }
            cancelLoading.value=false
        })
    } else {
        dialogVisible.value = false
    }
}
function handleConfirm() {
    if (props.confirm) {
        confirmLoading.value=true
        props.confirm().then(res => {
            if (res === true || res[$codeField] == $success) {
                dialogVisible.value = false
            }
            confirmLoading.value=false
        })
    } else {
        dialogVisible.value = false
    }

}

</script>
<template>
    <van-dialog v-model:show="dialogVisible" :title="title" :beforeClose="mobileBeforeClose"
        :close-on-click-overlay="closeOnClickModal" :showCancelButton="showCancelButton"
        :show-confirm-button="showConfirmButton" v-if="isMobile">
        <template #header v-if="slots.title">
            <slot name="header"></slot>
        </template>
        <div class="dialog-content" v-loading="pageLoading" :style="contentStyle">
            <slot>
                <iframe v-if="url" :src="dialogUrl" frameborder='0' :style="contentStyle"></iframe>
            </slot>
        </div>
        <template #footer v-if="slots.footer">
            <slot name="footer"></slot>
        </template>
    </van-dialog>
    <el-dialog v-model="dialogVisible" :class="tagID" :title="title" :closeOnClickModal="closeOnClickModal"
        :destroy-on-close="true" v-else>
        <template #header v-if="slots.header">
            <slot name="header"></slot>
        </template>
        <div class="dialog-content" v-loading="pageLoading" :style="contentStyle">
            <slot>
            
                    <iframe v-if="url" :src="dialogUrl" frameborder='0' :style="contentStyle"></iframe>
            
            </slot>
         </div>
        <template #footer v-if="slots.footer">
            <slot name="footer"></slot>
        </template>
        <template v-if="!slots.footer && (showCancelButton || showConfirmButton)" #footer>
            <el-button type="info" @click="handleCancel" :loading="cancelLoading">取消</el-button>
            <el-button type="primary" @click="handleConfirm" :loading="confirmLoading">确定</el-button>
        </template>
    </el-dialog>
</template>