<script setup lang="ts">
import { watch, ref, watchEffect } from 'vue'
import '../../utlis/lessPrototype.js'
import { useVModel } from '@vueuse/core'
import { DynamicComponentType, DynamicDataType } from '../../utlis/interfaceCom.js'
import lessCom from '../../utlis/lessCom'
defineOptions({
    name: 'ElsDynamicCreate',


})
interface Props {
    visible: boolean,
    modelValue?: any,
    camelCase?: boolean,
    dataTypes?: Array<DynamicDataType>,
    componentTypes?: Array<DynamicComponentType>
}
const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])
const currData = useVModel(props, 'modelValue', emits)
if (!currData.value) {
    currData.value = {
        componentName: 'ElsDynamicRender',
        label: '',
        value: '',
        type: 'Object',
        dataTypes: [],
        defaultPropertys: { config: [] },
        templateValue: {}
    }
} else if (!currData.value.defaultPropertys) {
    currData.value.defaultPropertys = { config: [] }
}


const createVisible=ref(false)
watchEffect(() => {
    createVisible.value=props.visible
    if (currData.value) {
        currData.value.value = currData.value?.label ?? ''
        currData.value.type = currData.value?.label ?? ''
        currData.value.dataTypes = [currData.value.value]
    }
})

const createResult = ref()
const createResultVisible = ref(false)
function handleSaveType(){
  createResultVisible.value=true
  const {label,value,type,templateValue}=currData.value
  const currComponentType=lessCom.cloneObj(currData.value)
  delete currComponentType.templateValue
  createResult.value={dataType:{label:label,value:value,type:type,defaultValue:templateValue},componentType:currComponentType}
}

</script>
<template>
    <els-dialog v-model="createVisible" width="60%" :append-to-body="true" title="创建类型">
        <div class="els-dynamic-create">
            <els-form v-model="currData" v-if="!createResultVisible">
                <els-input label="名称" prop="label" required></els-input>
                <ElsDynamicDesigner label="配置" v-model="currData.defaultPropertys.config" isReturnTemplateValue
                    v-model:templateValue="currData.templateValue" :dataTypes="dataTypes" :componentTypes="componentTypes"
                    :camelCase="camelCase" :componentSettingVisible="false">
                </ElsDynamicDesigner>
            </els-form>
            <template  v-else >
                <div style="margin-bottom: 10px;"><el-link type="primary" @click="createResultVisible=!createResultVisible">《返回</el-link></div>
            <ElsJsonEditor :mainMenuBar="false" v-model="createResult" style="height: 500px;"></ElsJsonEditor>
                
            </template>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="createVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSaveType">
                    提交
                </el-button>
            </span>
        </template>
    </els-dialog>
</template>