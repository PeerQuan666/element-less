<script setup lang="ts">
import { watch, ref } from 'vue'
import { FormItemProps, DynamicComponentType, DynamicDataType } from '../../../utlis/interfaces'
import { DynamicHandler, dynamicDataTypes, dynamicComponentTypes } from '../../../utlis/dynamic'
import { lessCom } from '../../../utlis/com'
import { ElMessage } from 'element-plus'
import { useValue } from '../../../utlis/use'
import DynamicCreate from '../create/Index.vue'
import DynamicDesignerInner from './Inner.vue'
import DynamicDesignerView from '../designerView/Index.vue'
import { DynamicConfig } from '../../../utlis/interfaces'
defineOptions({
  name: 'ElsDynamicDesigner',
})
interface Props extends FormItemProps {
  modelValue?: Array<DynamicConfig> | string,
  camelCase?: boolean,
  dataTypes?: Array<DynamicDataType>,
  appendDataTypes?: Array<DynamicDataType>,
  componentTypes?: Array<DynamicComponentType>,
  appendComponentTypes?: Array<DynamicComponentType>,
  componentRelateDataType?: Record<string, any>,
  componentSettingVisible?: boolean,
  visibleFields?: Array<string>,
  designerVisible?: boolean,
  isReturnTemplateValue?: boolean,
  templateValue?: any,
  allowCreateType?: boolean,
  createTypeMethod?: Function,
  allowCreateComponent?: boolean,
  createComponentMethod?: Function,
  saveTypeUrl?: string,
  saveComponentUrl?: string,
  ignoreFields?: Array<string>,
  settingDirection?: string,


}
const { $codeField, $messageField, $success } = lessCom.getApiConfig()
const props = withDefaults(defineProps<Props>(), { componentSettingVisible: true, designerVisible: true, settingDirection: 'rtl' })
const emits = defineEmits(['update:modelValue', 'update:templateValue'])
const { setValue } = useValue(props)

const designerJSON = ref()
const importJSON = ref()
const designerContainer = ref()
const designerObj = ref<Array<DynamicConfig>>([])
const actualDom = ref<Array<string>>([])
const designType = ref('精简模式')
const dynamicNewType = ref<any>()
const currItemKey = ref()
const currDynamicDataType = ref<any>([])
const createVisible = ref(false)

if (props.dataTypes) {
  currDynamicDataType.value.push(...props.dataTypes)
} else {
  currDynamicDataType.value.push(...dynamicDataTypes)
}
if (props.appendDataTypes) {
  currDynamicDataType.value.push(...props.appendDataTypes)
}


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

function getConverToJsonResult(obj) {
  return dynamicHandler.jsonToConfig(obj)
}
function initData(data = null) {
  let currData = props.modelValue
  if (data) {
    currData = data
  }
  if (currData && typeof (currData) === 'string') {
    if (currData != JSON.stringify(designerObj.value)) {
      designerJSON.value = currData
      designerObj.value = JSON.parse(currData)

    }
  } else if (currData && typeof (currData) === 'object') {
    designerJSON.value = JSON.stringify(currData)
    designerObj.value = lessCom.cloneObj(currData)
  }
  if (props.ignoreFields) {
    props.ignoreFields.forEach(ele => {
      delete designerObj.value[ele]
    })
  }
  designerObj.value = dynamicHandler.compatibleVersion(designerObj.value)
  dynamicHandler.initConfig(designerObj.value)
}

function handleImportDesigner() {

  let currRenderData = {}
  if (typeof (importJSON.value) === 'string') {
    currRenderData = JSON.parse(importJSON.value)

  } else {
    currRenderData = importJSON.value

  }
  designerObj.value = dynamicHandler.compatibleVersion(currRenderData)

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


function getMouseOverItem() {
  return currItemKey.value
}
function setMouseOverItem(keyID) {
  currItemKey.value = keyID
}
const currSelectItemKey = ref()

function getSelectItem() {
  return actualDom.value
}
function setSelectItem(keyID) {
  currItemKey.value = keyID
  currSelectItemKey.value = keyID
  actualDom.value.push(keyID)
}

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



function closeViewDialog() {
  actualDom.value.length = 0;
  designType.value = '精简模式'
}

function handleSaveNewType(data) {
  return new Promise((resolve, _reject) => {
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

function columnVisible(field) {
  if (!props.visibleFields) {
    return true;
  }
  return props.visibleFields.includes(field)
}

initData()

setValue({
  "tagID": 'els-dynamic-designer-' + lessCom.generateID(),
  'dataTypeData': currDynamicDataType.value,
  'isMobile': false,
  'componentData': currComponentTypes.value,
  columnVisible,
  getMouseOverItem,
  setMouseOverItem,
  getSelectItem,
  setSelectItem,
  openCreateType,
  openCreateComponent,
  getConverToJsonResult
})


defineExpose({
  initData,
  returnTemplateValue
})

</script>
<template>
  <div>
    <ElsFormNode v-bind="lessCom.getFormNodeProps(props)">
      <div class="els-dynamic-config" ref="designerContainer">
        <div class="els-dynamic-config-tool">
          <els-data-modal style="margin-left:5px;margin-bottom:5px;" title="导入配置" buttonLabel="导入配置" icon="Edit"
            :hasInput="false" :open="handleOpenImport" :confirm="handleImportDesigner">
            <ElsJsonEditor v-model="importJSON" style="height: 500px;"></ElsJsonEditor>
          </els-data-modal>
        </div>
        <DynamicDesignerInner v-if="designType === '精简模式'" :children="designerObj"></DynamicDesignerInner>
      </div>
      <template v-if="designType !== '精简模式'">
        <els-dialog :visible="true" @close="closeViewDialog" width="90%" destroy-on-close :append-to-body="true"
          top="10px">
          <DynamicDesignerView :dataTypes="currDynamicDataType" :camelCase="camelCase" :initRootForm="false"
            :componentTypes="currComponentTypes" :appendComponentTypes="appendComponentTypes"
            :componentRelateDataType="componentRelateDataType" v-model="designerObj">
          </DynamicDesignerView>
        </els-dialog>
      </template>
    </ElsFormNode>

    <DynamicCreate :save="handleSaveNewType" v-model:visible="createVisible" v-model="dynamicNewType"
      :camelCase="camelCase" :componentTypes="currComponentTypes" :dataTypes="currDynamicDataType"></DynamicCreate>


  </div>
</template>
<style lang="less" scoped>
.els-dynamic-config {
  --keyNameW: 120px;
  --requiredW: 60px;
  --dataTypeW: 190px;
  --configW: 40px;
  --descriptionW: 200px;
  flex-grow: 1;
  border: 1px solid #dcdfe6;
  padding: 10px;

  .selected {
    border: 1px dashed #aaaaaabf;
  }

  .txt-blue-light {
    .el-input__inner {
      color: #409eff;
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
}
</style>