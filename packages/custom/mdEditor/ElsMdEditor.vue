<script setup lang="ts">
import { onMounted, ref, watch, inject } from 'vue'
import { FormItemProps } from '../../utlis/interfaceCom'
import lessCom from '../../utlis/lessCom.js'
import { MdEditor } from 'md-editor-v3';
defineOptions({ name: "ElsMdEditor" })
const { $uploadUrl } = lessCom.getUploadConfig()
const emits = defineEmits(['update:modelValue', 'update:html'])
interface Props extends FormItemProps {
    modelValue?: string,
    height?: string,
    width?: string,
    url?: string,
    resourceCode?: string,
    restrictCode?: string,
    fileTypes?: string,
}

const props = withDefaults(defineProps<Props>(), {
    fileTypes: "jpeg,gif,bmp,jpg,png,svga,svg,webp,bundle,tif,pag",
    width: '100%',
    height: '500'


})
const setModelValue = inject<Function>('setModelValue', () => null)
const getModelValue = inject<Function>('getModelValue', () => null)

const htmlContent = ref()
const markDownContent = ref()
const uploadUrl = ref($uploadUrl)
if (props.url) {
    uploadUrl.value = props.url;
}
if (props.resourceCode) {
    uploadUrl.value = uploadUrl.value.addUrlParameter("ResourceCode", props.resourceCode)
}
if (props.restrictCode) {
    uploadUrl.value = uploadUrl.value.addUrlParameter("RestrictCode", props.restrictCode)
}
function returnHtml(res) {
    htmlContent.value = res
    emits("update:html", htmlContent.value)

}
function handleReturnResult(val) {
    emits('update:modelValue', val)
    if (props.modelValue===undefined&&setModelValue && props.prop) {
        setModelValue(props.prop, val, props.aIndex)
    }
}
watch(markDownContent, (val) => {
    handleReturnResult(val)
})
function initModelValue() {
    if (props.modelValue===undefined && getModelValue && props.prop) {
        return getModelValue(props.prop, props.aIndex)
    }
    return props.modelValue
}

onMounted(() => {
    if (props.modelValue) {
        markDownContent.value = initModelValue()
    }
})

</script>
<template >
    <MdEditor v-model="markDownContent" @htmlChanged="returnHtml"></MdEditor>
</template>
