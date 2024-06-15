<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import ace from "ace-builds";
import { FormItemProps } from '../../utlis/interfaces'
import { lessCom } from "../../utlis/com";
import { useModel } from '../../utlis/use'
defineOptions({ name: "ElsAceEditor" })

const emits = defineEmits(['update:modelValue', 'formatter'])

interface Props extends FormItemProps {
    modelValue?: string,
    rows?: number,
    width?: string,
    theme?: string,
    readonly?: boolean,
    language?: string
}

const props = withDefaults(defineProps<Props>(), {
    rows: 10,
    width: '100%',
    language: 'javascript',
    validTrigger: 'blur',
})

const editorValue = ref()
const tagID = 'els-ace-' + lessCom.generateID()
const editor = ref<any>()
const {
    currModelValue,
    returnModelValue,
} = useModel(props)
watch(() => props.modelValue, (val) => {
    if (val != editorValue.value) {
        if (props.language === 'json') {
            editor.value.setValue(lessCom.jsonFormatter(val))
        } else {
            editor.value.setValue(val)
        }

    }

})
function handleReturnResult(val) {
    returnModelValue(val)

}

function init() {
    let options = {
        theme: "ace/theme/" + (props.theme ? props.theme : "xcode"),
        mode: "ace/mode/" + (props.language ? props.language : "javascript"),
        tabSize: 2,
        maxLines:props.rows,
        minLines: props.rows,
        showPrintMargin: false,
        fontSize: 14,
        readOnly: props.readonly ? props.readonly : false,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        enableBasicAutocompletion: true,
    };
    editor.value = ace.edit(tagID, options);
    editor.value.getSession().setUseWrapMode(true);
    editor.value.commands.addCommand({
        name: 'formatter',
        bindKey: { win: 'Ctrl-Shift-F', mac: 'Command-Shift-F' },
        exec: () => {
            emits('formatter', editor.value)
        }
    })
    const currValue = currModelValue.value
    if (currValue) {
        editor.value.setValue(currValue)
    }
    editor.value.getSession().on('change', function () {
        editorValue.value = editor.value.getValue()
        handleReturnResult(editorValue.value)
    });
}
onMounted(() => {
    if (props.language === 'json') {
        const currModule = import("ace-builds/src-noconflict/mode-json")
        currModule.then(res => {
            ace.config.setModuleUrl('ace/mode/json', res);
            init()
        })

    } else if (props.language === 'javascript') {
        const currModule = import("ace-builds/src-noconflict/mode-javascript")
        currModule.then(res => {
            ace.config.setModuleUrl('ace/mode/javascript', res);
            init()
        })

    }
    else if (props.language === 'csharp') {
        const currModule = import("ace-builds/src-noconflict/mode-csharp")
        currModule.then(res => {
            ace.config.setModuleUrl('ace/mode/csharp', res);
            init()
        })

    }
    else if (props.language === 'mysql') {
        const currModule = import("ace-builds/src-noconflict/mode-mysql")
        currModule.then(res => {
            ace.config.setModuleUrl('ace/mode/mysql', res);
            init()
        })

    }
    else if (props.language === 'css') {
        const currModule = import("ace-builds/src-noconflict/mode-css")
        currModule.then(res => {
            ace.config.setModuleUrl('ace/mode/css', res);
            init()
        })

    }

})

</script>
<template>
    <div class="els-node">
        <ElsFormNode v-bind="lessCom.getFormNodeProps(props)">
            <div class="convertImage" :style="[{ 'width': width.appendPx() }]">
                <div class="content">
                    <div :id="tagID"    ref="editorContainer"></div>
                </div>
            </div>
        </ElsFormNode>
    </div>
</template>
<style  lang="less" scoped>
.convertImage,.els-node{flex-grow: 1;}
.convertImage{
    border: 1px solid #ccc;
}
</style>