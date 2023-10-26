<script setup lang="ts">
import { watch, ref, watchEffect ,nextTick} from 'vue'
import '../../utlis/lessPrototype.js'
import { useVModel } from '@vueuse/core'
import ElsContainer from '../container/Container.vue'
import { DynamicComponentType, DynamicDataType } from '../../utlis/interfaceCom.js'
import lessCom from '../../utlis/lessCom'
defineOptions({
    name: 'ElsDynamicCreate',


})
const emits = defineEmits(["save","close",'visible'])
interface Props {
    visible: boolean,
    modelValue?: any,
    camelCase?: boolean,
    dataTypes?: Array<DynamicDataType>,
    componentTypes?: Array<DynamicComponentType>
}
const props = defineProps<Props>()
const currData = ref()
if (props.modelValue) {
    currData.value = props.modelValue
}
if (!currData.value) {
    currData.value = {
        componentName: 'ElsDynamicRender',
        label: '',
        value: '',
        type: 'Object',
        dataTypes: [],
        defaultPropertys: { config: [], data: [] },
        templateValue: {}
    }
} else if (!currData.value.defaultPropertys) {
    currData.value.defaultPropertys = { config: [], data: [] }
}

const createVisible = useVModel(props, 'visible', emits)

watchEffect(() => {
    if(!createVisible.value){
        currData.value = {
        componentName: 'ElsDynamicRender',
        label: '',
        value: '',
        type: 'Object',
        dataTypes: [],
        defaultPropertys: { config: [], data: [] },
        templateValue: {}
    }
    }

})
const elsContainer=ref()
const editForm=ref()
const createResult = ref()
const createResultVisible = ref(false)
function handleSaveType() {
    elsContainer.value.validate().then(res=>{
        if(res){
            let { label, type, templateValue } = currData.value

            const currComponentType = lessCom.cloneObj(currData.value)
            currComponentType.dataTypes = [label]
            currComponentType.value = label
            delete currComponentType.templateValue

            if (currData.value.type === 'Enum') {
                delete currComponentType.defaultPropertys.config
                templateValue = ''
                currComponentType.componentName = 'ElsSelect'
                currComponentType.type = 'Select'

            } else {
                delete currComponentType.defaultPropertys.data

            }
            currComponentType.group = "Form"
            createResult.value = { dataType: { label: label, value: label, type: type === 'Object' ? label : type, defaultValue: templateValue }, componentType: currComponentType }
            emits('save', createResult.value)
            createVisible.value=false
            emits('close',false)
        }
    })
  

}
function handleAddEnum() {
    return { label: '', value: '' }
}
function validConfig(rules,value,callback){
    if(!currData.value.defaultPropertys.config.length){
        callback(new Error('请添加配置'))
    }
    callback()
}
function validData(rules,value,callback){
    if(!currData.value.defaultPropertys.data.length){
        callback(new Error('请添加枚举'))
    }
    callback()
}
</script>
<template>
    <ElsContainer ref="elsContainer">

    <els-dialog v-model="createVisible" width="60%" :append-to-body="true" title="创建类型" >
        <div class="els-dynamic-create">
            <els-form v-model="currData" v-if="!createResultVisible" ref="editForm">
                <els-input label="名称" prop="label" required v-model="currData.label"></els-input>
                <els-radio-button label="类型" prop="type">
                    <els-option>Object</els-option>
                    <els-option>Enum</els-option>
                </els-radio-button>
                <ElsDynamicDesigner required :validMethod="validConfig" prop="defaultPropertys" v-if="currData.type === 'Object'" label="配置" v-model="currData.defaultPropertys.config"
                    isReturnTemplateValue v-model:templateValue="currData.templateValue" :dataTypes="dataTypes"
                    :componentTypes="componentTypes" :camelCase="camelCase" :componentSettingVisible="false">
                </ElsDynamicDesigner>
                <els-form-item label="配置" prop="defaultPropertys" :validMethod="validData" v-else>
                    <els-list v-model="currData.defaultPropertys.data" @add="handleAddEnum">
                        <template #default="{ item }">
                            <els-input v-model="item.label"></els-input>
                            <els-input v-model="item.value"></els-input>
                        </template>
                    </els-list>
                </els-form-item>
            </els-form>
            <template v-else>
                <div style="margin-bottom: 10px;"><el-link type="primary"
                        @click="createResultVisible = !createResultVisible">《返回</el-link></div>
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
            
</ElsContainer>
</template>