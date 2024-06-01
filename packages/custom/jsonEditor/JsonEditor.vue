<script setup lang="ts">
import { ref, watch, useAttrs } from "vue";
import JsonEditorVue from 'json-editor-vue'
import { lessCom } from '../../utlis/com'
import { useModel } from '../../utlis/use'
import { FormItemProps } from '../../utlis/interfaces'
defineOptions({
    name: 'ElsJsonEditor',
    inheritAttrs: false
})
const attrs = useAttrs()
const emits = defineEmits(['update:modelValue'])

interface Props extends FormItemProps{
    modelValue?: any
}

const props = defineProps<Props>()
const currData = ref({})
const {
    currModelValue,
    returnModelValue,
} = useModel(props)




watch(currModelValue, (val) => {
    if (val) {
        if (typeof (val) === 'object') {
            currData.value = val
        } else {
            currData.value = JSON.parse(val)
        }
    }
}, { immediate: true, deep: true })




watch(currData, (val) => {
    if (typeof (currModelValue.value) === 'object') {
        if (typeof (val) === 'string') {
            try {
                const currValue = JSON.parse(val)
                handleReturnResult(currValue)
            } catch (err) {

            }
        } else {
            handleReturnResult(val)
        }

        return
    }
    if(typeof(val)==='object'){
        handleReturnResult(JSON.stringify(val))
        return 
    }
    handleReturnResult(val)
    

}, { deep: true })


function handleReturnResult(val) {
    let currValue = val
    returnModelValue(currValue)
}

const jsonEditor = ref()

</script>
<template>
    <div class="els-node">
        <ElsFormNode v-bind="lessCom.getFormNodeProps(props)">
            <div class="els-jsoneditor" >
              <JsonEditorVue v-model="currData" v-bind="attrs" ref="jsonEditor" mode="text" />
            </div>
        </ElsFormNode>
    </div>
</template>
<style lang="less">
.els-jsoneditor {
    flex-grow: 1;
    .full-screen {
        right: 0 !important;
        top: 0 !important;
    }

    .jsoneditor-poweredBy {
        display: none;
    }

    .cm-content {
        padding: 0;
    }
}
</style>