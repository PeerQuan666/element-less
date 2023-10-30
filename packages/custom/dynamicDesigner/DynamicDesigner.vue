<script setup lang="ts">
import { provide, watch, ref, nextTick } from 'vue'
import { FormItemProps } from '../../utlis/interfaceCom'
import '../../utlis/lessPrototype.js'
import { dynamicDataTypes, dynamicComponentTypes } from '../../utlis/lessConfig.js'
import { DynamicHandler } from '../../utlis/lessConfig.js'
import DynamicDesignerInner from './DynamicDesignerInner.vue'
import DynamicDesignerView from '../dynamicDesignerView/DynamicDesignerView.vue'
import DynamicCreate from '../dynamicCreate/DynamicCreate.vue'
import { DynamicComponentType, DynamicDataType } from '../../utlis/interfaceCom.js'

import lessCom from '../../utlis/lessCom'
import { reject } from 'lodash'
import { ElMessage } from 'element-plus'
defineOptions({
  name: 'ElsDynamicDesigner',
})
interface Props extends FormItemProps {
  modelValue?: any,
  camelCase?: boolean,
  dataTypes?: Array<DynamicDataType>,
  appendDataTypes?: Array<DynamicDataType>,
  componentTypes?: Array<DynamicComponentType>,
  appendComponentTypes?: Array<DynamicComponentType>,
  componentRelateDataType?: Record<string, any>,
  componentSettingVisible: boolean,
  designerVisible: boolean,
  isReturnTemplateValue?: boolean,
  templateValue?: any,
  allowCreateType?: boolean,
  createTypeMethod?: Function,
  allowCreateComponent?: boolean,
  createComponentMethod?: Function,
  saveTypeUrl?: string,
  saveComponentUrl?: string,

}
const emits = defineEmits(['update:modelValue', 'update:templateValue'])
const designerJSON = ref()
const importJSON = ref()
const designerContainer = ref()
const designerObj = ref([])
const props = withDefaults(defineProps<Props>(), { componentSettingVisible: true, designerVisible: true })



const currDynamicDataType = ref<any>([])
if (props.dataTypes) {
  currDynamicDataType.value.push(...props.dataTypes)
} else {
  currDynamicDataType.value.push(...dynamicDataTypes)
}
if (props.appendDataTypes) {
  currDynamicDataType.value.push(...props.appendDataTypes)
}
const { $codeField, $messageField, $success } = lessCom.getApiConfig()
provide("tagID", 'els-dynamic-designer-' + lessCom.generateID())
provide('dataTypeData', currDynamicDataType.value)
provide('allowCreateType', props.allowCreateType)
provide('allowCreateComponent', props.allowCreateComponent)
provide('getConverToJsonResult', getConverToJsonResult)



const currComponentTypes = ref<any>([])

if (props.componentTypes) {
  currComponentTypes.value.push(...props.componentTypes)
} else {
  currComponentTypes.value.push(...dynamicComponentTypes)
}

if (props.appendComponentTypes) {
  currComponentTypes.value.push(...props.appendComponentTypes)
}

if (props.componentRelateDataType) {
  currComponentTypes.value.forEach(ele => {
    const currRelate = props.componentRelateDataType ? props.componentRelateDataType[ele.type] : undefined
    if (currRelate) {
      ele.dataTypes = currRelate
    }
  })
}
const dynamicHandler = new DynamicHandler(currDynamicDataType.value, currComponentTypes.value)
const createVisible = ref(false)

provide('componentData', currComponentTypes.value)
provide('componentSettingVisible', props.componentSettingVisible)
provide('camelCase', props.camelCase)
function initData() {
  if (props.modelValue && typeof (props.modelValue) === 'string') {
    if (props.modelValue != JSON.stringify(designerObj.value)) {
      designerJSON.value = props.modelValue
      designerObj.value = JSON.parse(props.modelValue)

    }
  } else if (props.modelValue && typeof (props.modelValue) === 'object') {
    designerJSON.value = JSON.stringify(props.modelValue)
    designerObj.value = props.modelValue
  }
  dynamicHandler.initConfig(designerObj.value)
}

initData()

function getConverToJsonResult(obj) {
  return dynamicHandler.jsonToConfig(obj)
}
function handleImportDesigner() {
  if (typeof (importJSON.value) === 'string') {
    designerObj.value = JSON.parse(importJSON.value)

  } else {
    designerObj.value = importJSON.value

  }
  dynamicHandler.initConfig(designerObj.value)
  return Promise.resolve(true)
}
function handleOpenImport() {
  importJSON.value = designerObj.value
}

function openCreateType(typeID) {
  dynamicNewType.value = null
  if (props.createTypeMethod) {
    props.createTypeMethod(typeID)
  } else {
    if (typeID) {
      const cDataType = currDynamicDataType.value.find(ele => ele.id === typeID)
      if (cDataType) {
        const { label, value, type, description } = cDataType
        const { defaultPropertys } = cDataType.componentType
        dynamicNewType.value = {
          id: typeID,
          label: label,
          value: value,
          type: type,
          description: description,
          defaultPropertys: defaultPropertys
        }
      }
    }
  }
  createVisible.value = true
}
function openCreateComponent(typeValue) {
  if (props.createComponentMethod) {
    props.createComponentMethod(typeValue)
  }
}

const dynamicNewType = ref<any>()

provide('openCreateType', openCreateType)
provide('openCreateComponent', openCreateComponent)
watch(designerObj, (val) => {
  if (val) {

    if (typeof (props.modelValue) === 'object') {
      emits('update:modelValue', val)

    } else {
      emits('update:modelValue', JSON.stringify(val))

    }
    returnTemplateValue()
  }
}, { deep: true, immediate: true })

function returnTemplateValue() {

  if (props.isReturnTemplateValue) {
    if (typeof (props.modelValue) === 'object') {
      emits('update:templateValue', dynamicHandler.configResult(designerObj.value))

    } else {
      emits('update:templateValue', JSON.stringify(dynamicHandler.configResult(designerObj.value)))

    }
  }
}


const designType = ref('精简模式')
function closeViewDialog() {
  designType.value = '精简模式'
}
function handleSaveNewType(data) {
  return new Promise((resolve, reject) => {
    const id = lessCom.generateID()
    if (!props.saveTypeUrl) {

      if (data.id) {
        const index = currDynamicDataType.value.findIndex(ele => ele.id == data.id)
        if (index > -1) {
          currDynamicDataType.value.splice(index, 1)
        }
      } else {
        data.id = id
      }
      if (data.componentType.id) {
        const index = currComponentTypes.value.findIndex(ele => ele.id == data.componentType.id)
        if (index > -1) {
          currComponentTypes.value.splice(index, 1)
        }
      } else {
        data.componentType.id = id
      }
      currDynamicDataType.value.push(data)
      currComponentTypes.value.push(data.componentType)
      resolve(true)

    } else {
      const { label, type, description, id } = data
      props.saveTypeUrl.setPowerPublicQuery().post({
        id: id,
        name: label,
        type: type === 'Enum' ? 'Enum' : 'Object',
        description: description,
        data: JSON.stringify(data)
      }).then(res => {
        if (res[$codeField] == $success) {
          //判断是否返回主键ID
          if (res.Data?.ID) {
            data.id = res.Data?.ID
            data.componentType.id = res.Data?.ID
          } else {
            data.id = id
            data.componentType.id = id
          }
          if (data.id) {
            const index = currDynamicDataType.value.findIndex(ele => ele.id == data.id)
            if (index > -1) {
              currDynamicDataType.value.splice(index, 1)
            }
          }
          if (data.componentType.id) {
            const index = currComponentTypes.value.findIndex(ele => ele.id == data.componentType.id)
            if (index > -1) {
              currComponentTypes.value.splice(index, 1)
            }
          }
          currDynamicDataType.value.push(data)
          currComponentTypes.value.push(data.componentType)
          resolve(true)
        } else {
          ElMessage.warning(res[$messageField])
          resolve(false)
        }
      }).catch(res => {
        console.log(res)
        resolve(false)
      })
    }
  })

}
defineExpose({
  returnTemplateValue
})

</script>
<template>
  <div>
    <ElsFormNode v-bind="lessCom.getFormNodeProps(props)">
      <div class="els-dynamic-config" ref="designerContainer">
        <div class="els-dynamic-config-tool">
          <ElsRadioButton v-model="designType" v-if="designerVisible">
            <ElsOption value="精简模式"><el-icon>
                <MoreFilled />
              </el-icon></ElsOption>
            <ElsOption value="设计模式"><el-icon>
                <Grid />
              </el-icon></ElsOption>
          </ElsRadioButton>
          <els-data-modal style="margin-left:5px;margin-bottom:5px;" title="导入配置" buttonLabel="导入配置" icon="Edit"
            :hasInput="false" :open="handleOpenImport" :confirm="handleImportDesigner">
            <ElsJsonEditor v-model="importJSON" style="height: 500px;"></ElsJsonEditor>
          </els-data-modal>
        </div>
        <DynamicDesignerInner v-if="designType === '精简模式'" :data="designerObj"></DynamicDesignerInner>
      </div>
      <template v-if="designType !== '精简模式'">
        <els-dialog :visible="true" @close="closeViewDialog" width="90%" destroy-on-close :append-to-body="true">
          <DynamicDesignerView :dataTypes="currDynamicDataType" :camelCase="camelCase"
            :componentTypes="currComponentTypes" :appendComponentTypes="appendComponentTypes"
            :componentRelateDataType="componentRelateDataType" v-model="designerObj"></DynamicDesignerView>
        </els-dialog>
      </template>
    </ElsFormNode>

    <DynamicCreate :save="handleSaveNewType" v-model:visible="createVisible" v-model="dynamicNewType"
      :camelCase="camelCase" :componentTypes="currComponentTypes" :dataTypes="currDynamicDataType"></DynamicCreate>


  </div>
</template>
<style lang="less">
.els-dynamic-config {
  flex-grow: 1;

  .leo-list-add {
    button {
      height: 24px;
      font-size: 12px;
      padding: 7px;
      background: #fff;
      color: #575757;
    }
  }

  .els-dynamicc-d-empty {
    text-align: center;
    font-size: 12px;
    background: #f8f8f8;
    padding: 5px;
    font-style: italic;
    margin-bottom: 5px;
  }
}

.els-dynamic-config-tool {
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  button {
    margin-bottom: 0px !important;
  }
}

.els-dynamicc-d-head {
  padding-left: 5px;
  font-weight: bold;
  margin-bottom: 8px;
  display: flex;
  font-size: 14px;

}

.dataType-detail-t {
  display: flex;
  justify-content: space-between;

  span+span {
    cursor: pointer;
  }

}

.els-dynamic-config {

  :has(div[class^='el-form-item']) {
    .leo-list-add {
      margin-left: 5px
    }
  }

  border: 1px solid #dcdfe6;
  padding: 10px;

  .txt-blue-light {
    .el-input__inner {
      color: #409eff;
    }
  }

  .keyName {
    width: 120px;
  }

  .keyCode {
    width: 120px;
  }

  .dataType {
    width: 190px;
    display: flex;

    .els-node {
      flex-grow: 1;
    }
  }

  .componentType {
    width: 120px;
  }

  .defaultValue {

    width: 120px;
  }

  .config {
    width: 40px;
  }

  .required {
    width: 60px;

  }

  .description {
    width: 200px;
  }

  .oper {
    width: 60px;

  }

  .listitem {
    display: initial;
  }
}


.els-dynamic-d-oper {
  display: flex;
  gap: 5px;

  .el-icon-rank {
    cursor: all-scroll;
  }

  .el-icon-remove {
    cursor: pointer;
    color: red;
  }
}

.els-dynamic-d-item-div {
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;

  .el-form-item {
    padding: 0;
  }

  .oper {
    font-size: 13px;
  }

}


.els-dynamic-d-item-div .el-form-item {

  margin-bottom: 2px !important;
  margin-right: 5px !important;
}

.els-dynamic-d-item-parentdiv {
  background: #f5f5f5;
  border: solid 1px #e6e6e6;
  padding: 5px 5px 5px 0px;
  margin-bottom: 5px;

  .els-dynamic-d-flat-item-child {
    margin-left: 26px !important;
    background: #fff;
    padding: 5px !important;
    border: 1px solid #e4e4e4;
    padding-top: 5px !important;

  }
}

.els-dynamic-d-flat-item-child {
  .leo-list-add {
    margin-left: 0px;
  }

  .els-dynamic-d-item-div {
    padding-left: 0;
    padding-right: 0;
  }


}


.els-dynamic-d-item-container {
  border: dashed 1px #409eff;
  margin-bottom: 5px;

  .els-dynamic-d-item-container {
    border-left: 0;
  }

  .els-dynamic-d-flat-item-child {
    margin-left: 0px !important;
    border: 0 !important;
    padding: 10px 60px 5px 5px !important;
    position: relative;
  }

  .tag-name {
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0px;
    background: #d8f0ff;
    font-size: 13px;
    display: flex;
    align-items: center;
    column-gap: 3px;
    z-index: 1;
  }
}

.els-dynamic-d-item-container>.els-dynamic-d-item-div {
  background: #b7daff;
}


.els-dynamic-d-item-container>.els-dynamic-d-flat-item-child {
  margin-left: 0 !important;
}
</style>