<script setup lang="ts">
import { onMounted, ref, inject, watch } from "vue";
import ace from "ace-builds";
import { FormItemProps } from '../../utlis/interfaceCom'
import lessCom from '../../utlis/lessCom.js'

defineOptions({ name: "ElsAceEditor" })
const setModelValue = inject<Function>('setModelValue', () => null)
const getModelValue = inject<Function>('getModelValue', () => null)
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
    language:'javascript'
})

const editorValue = ref()
const tagID = 'els-ace-' + lessCom.generateID()
const editor = ref<any>()
watch(() => props.modelValue, (val) => {
    if (val != editorValue.value) {
        if(props.language==='json'){
            editor.value.setValue(lessCom.jsonFormatter(val))
        }else{
            editor.value.setValue(val)
        }
       
    }

})
function handleReturnResult(val) {

    emits('update:modelValue', val)
    if (props.modelValue === undefined && setModelValue && props.prop !== undefined) {
        setModelValue(props.prop, val, props.aIndex)
    }
}
function initModelValue() {
    if (props.modelValue === undefined && getModelValue && props.prop) {
        return getModelValue(props.prop, props.aIndex)
    }
    return props.modelValue
}
function init(){
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
    const currValue = initModelValue()
    if (currValue) {
        editor.value.setValue(currValue)
    }
    editor.value.getSession().on('change', function () {
        editorValue.value = editor.value.getValue()
        handleReturnResult(editorValue.value)
    });
}
onMounted(() => {
    if(props.language==='json'){
        const currModule =  import("ace-builds/src-noconflict/mode-json")
        currModule.then(res=>{
            ace.config.setModuleUrl('ace/mode/json', res);
            init()
        })
     
    }else if(props.language==='javascript'){
        const currModule =  import("ace-builds/src-noconflict/mode-javascript")
        currModule.then(res=>{
            ace.config.setModuleUrl('ace/mode/javascript', res);
            init()
        })
      
    }
    else if(props.language==='csharp'){
        const currModule =  import("ace-builds/src-noconflict/mode-csharp")
        currModule.then(res=>{
            ace.config.setModuleUrl('ace/mode/csharp', res);
            init()
        })
      
    }
    else if(props.language==='mysql'){
        const currModule =  import("ace-builds/src-noconflict/mode-mysql")
        currModule.then(res=>{
            ace.config.setModuleUrl('ace/mode/mysql', res);
            init()
        })
      
    }
    else if(props.language==='css'){
        const currModule =  import("ace-builds/src-noconflict/mode-css")
        currModule.then(res=>{
            ace.config.setModuleUrl('ace/mode/css', res);
            init()
        })
      
    }
   
})

</script>
<template >
    <div class="convertImage">
        <div class="content">
            <div :id="tagID" :style="[{ 'width': width }, { 'height': height }]" ref="editorContainer"></div>
        </div>
    </div>
</template>
