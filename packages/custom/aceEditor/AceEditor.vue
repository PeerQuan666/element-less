<script setup lang="ts">
import { onMounted, ref ,inject} from "vue";
import ace from "ace-builds";
import { FormItemProps } from '../../utlis/interfaceCom'
import lessCom from '../../utlis/lessCom.js'

defineOptions({ name: "ElsAceEditor" })
const setModelValue=inject<Function>('setModelValue',()=>null)
const getModelValue=inject<Function>('getModelValue',()=>null)
const emits = defineEmits(['update:modelValue', 'formatter'])

interface Props extends FormItemProps {
    modelValue?: string,
    height?: string,
    width?: string,
    theme?: string,
    readonly?: boolean,
    language?: string
}

const props = withDefaults(defineProps<Props>(), {
    height: '300',
    width: '100%',
})
const tagID = 'els-ace-' + lessCom.Guid32()
const editor = ref<any>()
function handleReturnResult(val){

    emits('update:modelValue', val)
    if(props.modelValue===undefined&&setModelValue&&props.prop!==undefined){
        setModelValue(props.prop,val,props.aIndex)
    }
}
function initModelValue(){
    if(props.modelValue===undefined&&getModelValue&&props.prop){
      return  getModelValue(props.prop,props.aIndex)
    }
    return props.modelValue
}
onMounted(() => {
    let options = {
        theme: "ace/theme/" + (props.theme ? props.theme : "xcode"),
        mode: "ace/mode/" + (props.language ? props.language : "javascript"),
        tabSize: 2,
        maxLines: 25,
        minLines: 25,
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
    const currValue=initModelValue()
    if (currValue) {
        editor.value.setValue(currValue)
    }
    editor.value.getSession().on('change', function () {
        handleReturnResult(editor.value.getValue())
    });
})

</script>
<template >
    <div class="convertImage">
        <div class="content">
            <div :id="tagID" :style="[{ 'width': width }, { 'height': height }]" ref="editorContainer"></div>
        </div>
    </div>
</template>
