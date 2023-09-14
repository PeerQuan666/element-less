<script setup lang="ts">
import { ref, useSlots, watch, computed } from 'vue'
import lessCom from '../../utlis/lessCom.js'
const emits = defineEmits(['update:modelValue'])
const slots = useSlots()

defineOptions({
    name: 'ElsDialog',
})
interface Props {
    modelValue?: boolean,
    url?: string,
    contentWidth?: string,
    contentHeight?: string,
    loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    contentWidth: "100%",
    contentHeight: "60%"
})

const tagID = "less_dialog_" + lessCom.Guid32()
const pageLoading = ref(false)
const dialogUrl = ref()
const dialogVisible = ref(false)
const contentStyle = computed(() => {
    const currStyle: any = []
    if (props.contentWidth) {
        currStyle.push({ width: props.contentWidth.appendPx() })
    }
    if (props.contentHeight && props.contentHeight.indexOf('%') > -1) {
        currStyle.push({ height: `calc(${props.contentHeight.replace('%', '')}vh)` })
    } else if (props.contentHeight) {
        currStyle.push({ height: props.contentHeight.appendPx() })
    }
    return currStyle

})
watch(() => props.url, (val) => {
    if (val) {
        dialogUrl.value = val.addUrlParameter("Transfer_DialogTagID", tagID)
        handleRegistEvent()
    }
}, { immediate:true})

watch(() => props.modelValue, (val) => {
    dialogVisible.value = val
}, { immediate: true })
watch(dialogVisible, (val) => {
    emits("update:modelValue", val)
})


function handleRegistEvent() {
    window[tagID] = handleCloseLoading
}

function handleCloseLoading() {
    pageLoading.value = false
}

</script>
<template>
    <el-dialog v-model="dialogVisible" :class="tagID" :destroy-on-close="true">
        <template #header v-if="slots.header">
            <slot name="header"></slot>
        </template>
        <slot>
            <div class="dialog-content" v-loading="pageLoading">
                <iframe v-if="url" :src="dialogUrl" frameborder='0' :style="contentStyle"></iframe>
            </div>
        </slot>
        <template #footer v-if="slots.footer">
            <slot name="footer"></slot>
        </template>
    </el-dialog>
</template>