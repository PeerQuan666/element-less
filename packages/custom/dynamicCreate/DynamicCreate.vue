<script setup lang="ts">
import { watch, ref, watchEffect, inject } from 'vue'
import '../../utlis/lessPrototype.js'
import { useVModel } from '@vueuse/core'
import ElsContainer from '../container/Container.vue'
import { DynamicComponentType, DynamicDataType } from '../../utlis/interfaceCom.js'
import lessCom from '../../utlis/lessCom'

defineOptions({
    name: 'ElsDynamicCreate',


})
const emits = defineEmits(["save", "close", 'visible'])
interface Props {
    visible: boolean,
    modelValue?: any,
    camelCase?: boolean,
    dataTypes?: Array<DynamicDataType>,
    componentTypes?: Array<DynamicComponentType>,
    save?: Function
}
const props = defineProps<Props>()
const currData = ref()
watch(()=>props.modelValue,(val)=>{
    if(val){
    currData.value =lessCom.cloneObj(val) 
        currData.value.type=currData.value.type==='Enum'?'Enum':'Object'
        if(!currData.value.defaultPropertys.config){
            currData.value.defaultPropertys.config=[]
        }
        if(!currData.value.defaultPropertys.data){
            currData.value.defaultPropertys.data=[]
        }
}
})
if (!currData.value) {
    currData.value = {
        id:'',
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
    if (!createVisible.value) {
        currData.value = {
            id:'',
            label: '',
            value: '',
            type: 'Object',
            description:'',
            dataTypes: [],
            defaultPropertys: { config: [], data: [] },
            templateValue: {}
        }
    }

})
const dataTypeData=inject<any>("dataTypeData",[])
const saveLoading=ref(false)
const elsContainer = ref()
const editForm = ref()
const createResult = ref()
const createResultVisible = ref(false)
function handleSaveType() {
    elsContainer.value.validate().then(res => {
        if (res) {
            saveLoading.value=true
            let { label, type, templateValue,description,id } = currData.value
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
                currComponentType.componentName = 'ElsDynamicRender'
                currComponentType.type='DynamicRender'
                delete currComponentType.defaultPropertys.data

            }
            currComponentType.group = "Form"

            const currDataType={
                    id:id,
                    label: label, 
                    value: label,
                    type: type === 'Object' ? label : type,
                    defaultValue: templateValue,description:description,
                    componentType:currComponentType
                }
            createResult.value = currDataType
            if (props.save) {
                props.save(createResult.value).then(res => {
                    if (res) {
                        createVisible.value = false
                        emits('close', false)
                    }
                    saveLoading.value=false

                })
            } else {
                createVisible.value = false
                emits('close', false)
                saveLoading.value=false

            }
        }
    })


}
function handleAddEnum() {
    return { label: '', value: '' }
}
function validConfig(rules, value, callback) {
    if (!currData.value.defaultPropertys.config.length) {
        callback(new Error('请添加配置'))
    }
    callback()
}
function validData(rules, value, callback) {
    if (!currData.value.defaultPropertys.data.length) {
        callback(new Error('请添加枚举'))
    }
    callback()
}
function validName(rules, value, callback) {
    if (!currData.value.label) {
        callback(new Error('请输入类型名称'))
    }
    if (dataTypeData&&dataTypeData.find(ele=>ele.value===currData.value.label&&ele.id!=currData.value.id)) {
        callback(new Error('类型已存在'))
    }
    callback()
}
</script>
<template>
    <ElsContainer ref="elsContainer">
        <els-dialog v-model="createVisible" width="70%" :append-to-body="true" title="类型"  destroy-on-close :close-on-click-modal="false">
            <div class="els-dynamic-create">
                <els-form v-model="currData" v-if="!createResultVisible" ref="editForm">
                    <els-input label="名称" prop="label" :disabled="currData.id!==''" required :validMethod="validName" v-model="currData.label"></els-input>
                    <els-radio-button label="类型" prop="type">
                        <els-option>Object</els-option>
                        <els-option>Enum</els-option>
                    </els-radio-button>
                    <els-textarea label="描述" prop="description" :rows="3"></els-textarea>
                    <ElsDynamicDesigner required :validMethod="validConfig" prop="defaultPropertys"
                        v-if="currData.type === 'Object'" label="配置" v-model="currData.defaultPropertys.config"
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
                    <el-button type="primary" :loading="saveLoading" @click="handleSaveType">
                        提交
                    </el-button>
                </span>
            </template>
        </els-dialog>

    </ElsContainer>
</template>