<script setup lang="ts">
import { ref, watch,useAttrs } from "vue";
import JsonEditorVue from 'json-editor-vue'


defineOptions({
    name: 'ElsJsonEditor',
    inheritAttrs:false
})
const attrs=useAttrs()
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


</script>
<template >
    <div class="els-jsoneditor">
        <JsonEditorVue v-model="currData" v-bind="attrs"  mode="text" />
    </div>
</template>
<style lang="less">
.els-jsoneditor {
    .full-screen {
        right: 0 !important;
        top: 0 !important;
    }

    .jsoneditor-poweredBy {
        display: none;
    }
}
</style>