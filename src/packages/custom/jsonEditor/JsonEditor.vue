<script setup lang="ts">
import { ref, watch } from "vue";
import "jsoneditor";
import JsonEditorVue from 'json-editor-vue3'

defineOptions({
    name: 'ElsJsonEditor',
    components: { JsonEditorVue }
})
const emits = defineEmits(['update:modelValue'])

interface Props {
    modelValue?: any
}

const props = defineProps<Props>()
const currData = ref({})
watch(() => props.modelValue, (val) => {
    if (val) {
        if (typeof (val) === 'object') {
            currData.value = val
        } else {
            currData.value = JSON.parse(val)
        }
    }

}, { immediate: true, deep: true })

watch(currData, (val) => {
    if (typeof (props.modelValue) === 'object') {
        emits('update:modelValue', val)
        return
    }
    emits('update:modelValue', JSON.stringify(val))
  
},{deep:true})

const validate = async (editor) => {
    const res = await editor.validate();
    // res 是错误列表，如果是空数组，则表示检测没有错误
    console.log(res);
};
</script>
<template >
    <JsonEditorVue  class="els-jsoneditor" v-model="currData" @blur="validate" />
</template>
<style lang="less">
.els-jsoneditor {
    .full-screen {
        right: 0;
        top: 0;
    }

    .jsoneditor-poweredBy {
        display: none;
    }
}
</style>