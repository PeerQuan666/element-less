<script setup lang="ts">
import { onMounted, ref, watch ,inject} from 'vue'
import { FormItemProps } from '../../utlis/interfaceCom'
import lessCom from '../../utlis/lessCom.js'

import 'md-editor-v3/lib/style.css';
defineOptions({ name: "ElsUEditor" })
const { $serverUrl,$homeUrl } = lessCom.getUEditorConfig()
const emits = defineEmits(['update:modelValue', 'update:html'])
interface Props extends FormItemProps {
    modelValue?: string,
    height?: string,
    width?: string,
    serverUrl?: string,
    resourceCode?: string,
    restrictCode?: string,
    restrictFileCode?: string,
    restrictImgCode?: string,
    restrictMediaCode?: string,
    restrictRemoteImgCode?: string,
    homeUrl?: string,
    showXiumi?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    height: '500',
    width: '100%'
})
const setModelValue=inject<Function>('setModelValue',()=>null)
const getModelValue=inject<Function>('getModelValue',()=>null)
const editorContent = ref()
const currServerUrl = ref<any>(props.serverUrl ?? $serverUrl)
if (currServerUrl.value) {
    currServerUrl.value = currServerUrl.value.addUrlParameter("ResourceCode", props.resourceCode)
        .addUrlParameter("RestrictImgCode", props.restrictImgCode)
        .addUrlParameter("RestrictFileCode", props.restrictFileCode)
        .addUrlParameter("RestrictMediaCode", props.restrictMediaCode)
        .addUrlParameter("RestrictRemoteImgCode", props.restrictRemoteImgCode)
}

const configData = {
    serverUrl: currServerUrl.value,
    initialFrameWidth: props.width,
    initialFrameHeight: props.height,
    UEDITOR_HOME_URL: props.homeUrl??$homeUrl,
}
function addXiumiDialog(editorId) {
    if (props.showXiumi) {
        window['UE'].registerUI(
            'xiumi-dialog',
            (editor, uiName) => {
                // 创建 “秀米弹窗”
                const dialog = new window['UE'].ui.Dialog({
                    // 注意：这是 xiumi-ue-dialog-v5.html 文件的访问链接，这个页面会通过 iframe 的方式嵌入到弹窗里
                    iframeUrl:props.homeUrl+ 'xiumi/xiumi-ue-dialog-v5.html',
                    editor,
                    name: uiName,
                    title: '秀米图文消息助手',
                    cssRules: 'width: ' + (window.innerWidth - 60) + 'px; height: ' + (window.innerHeight - 60) + 'px;',
                });

                // 添加自定义按钮用于唤起“秀米弹窗”
                const btn = new window['UE'].ui.Button({
                    name: 'xiumi-connect',
                    title: '秀米',
                    cssRules: `background-image: url('//dl.xiumi.us/connect/ue/xiumi-connect-icon.png') !important; background-size: contain;`,
                    onclick() {
                        dialog.render();
                        dialog.open();
                    },
                });

                return btn;
            },
            0 /* 指定添加到工具栏上的那个位置，默认时追加到最后 */,
            editorId /* 指定这个UI是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */
        );
    }

}
function initModelValue() {
    if (props.modelValue===undefined && getModelValue && props.prop) {
        return getModelValue(props.prop, props.aIndex)
    }
    return props.modelValue
}

function handleReturnResult(val) {
    emits('update:modelValue', val)
    if (props.modelValue===undefined&&setModelValue && props.prop) {
        setModelValue(props.prop, val, props.aIndex)
    }
}
watch(editorContent, (val) => {
    handleReturnResult(val)
})
onMounted(() => {
    if (props.modelValue) {
        editorContent.value =initModelValue()
    }
})

</script>
<template >
    <vue-ueditor-wrap v-model="editorContent" @before-init="addXiumiDialog" :config="configData"></vue-ueditor-wrap>
</template>
