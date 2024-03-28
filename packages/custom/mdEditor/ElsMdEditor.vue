<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { FormItemProps } from '../../utlis/interfaceCom'
import lessCom from '../../utlis/lessCom.js'
import 'md-editor-v3/lib/style.css';
import { MdEditor } from 'md-editor-v3';
import {useModel} from '../../utlis/componentCom.js'
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
const {
    currModelValue,
    returnModelValue,
} = useModel(props)

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

watch(markDownContent, (val) => {
    returnModelValue(val)
})


onMounted(() => {
    if (props.modelValue) {
        markDownContent.value = currModelValue.value
    }
})

</script>
<template >
    <MdEditor v-model="markDownContent" @htmlChanged="returnHtml"></MdEditor>
</template>
