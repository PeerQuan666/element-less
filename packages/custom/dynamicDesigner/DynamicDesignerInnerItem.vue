<script setup lang="ts">
import { inject, ref, computed, watch } from 'vue'
import lessCom from '../../utlis/lessCom'
import { useVModel } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { DynamicConfig } from '../../utlis/interfaceCom.js'
import DynamicDesignerInner from './DynamicDesignerInner.vue'
import property_form from '../../utlis/dynamicPropertys/form'
import property_array from '../../utlis/dynamicPropertys/array'
import property_advanced from '../../utlis/dynamicPropertys/advanced'
import property_arrayAndObject from '../../utlis/dynamicPropertys/arrayAndObject'
import '../../utlis/lessPrototype.js'
defineOptions({
  name: 'ElsDynamicDesigner',
})
interface Props {
  depath: number,
  data: Array<DynamicConfig>,
  item: DynamicConfig
}

const emits = defineEmits(['update:item', 'update:data'])
const camelCase = inject<boolean>('camelCase', false)
const props = defineProps<Props>()
const dataTypeData = inject<any>("dataTypeData", null)
const controlData = inject<any>("componentData", null)
const currDepath = ref(props.depath + 1)
const currData = useVModel(props, 'data', emits)
const currItem = useVModel(props, 'item', emits)




function handleRemove(item) {
  var index = currData.value.indexOf(item)
  currData.value.splice(index, 1)

}
function handleChangeKeyCode(keyCode) {
  if (camelCase) {
    currItem.value.keyCode = keyCode.replace(keyCode[0], keyCode[0].toLowerCase())
  }
}





const itemDataType = computed(() => {
  if (dataTypeData) {
    const currVal = dataTypeData.find(ele => ele.value == currItem.value.dataType)
    return currVal ?? {}
  }
  return {}
})
const currArrayDataType = computed(() => {
  if (dataTypeData) {
    const currVal = dataTypeData.find(ele => ele.value == currItem.value.arrayDataType)
    return currVal ?? {}
  }
  return {}
})

const currDataType = computed(() => {
  if (dataTypeData) {
    if (itemDataType && itemDataType.value.type == 'Array') {
      return currArrayDataType.value
    }
    return itemDataType.value
  }
  return {}
})

const currComponentType = computed(() => {
  if (controlData) {
    const currVal = controlData.find(ele => ele.value == currItem.value.componentType)
    return currVal ?? {}
  }
  return {}
})

const currComponentTypeData = computed(() => {
  if (controlData) {
    return controlData.filter(ele => !currDataType.value || ele.dataTypes.includes(currDataType.value?.type))

  }
  return []
})

const isObject = computed(() => {
  return itemDataType.value.type == 'Object' || currArrayDataType.value.type == 'Object'
})
const isRow = computed(() => {
  return currComponentType.value.type == 'Row'
})



const currPropertys = computed(() => {
  if (currItem.value.dataType !== undefined) {
    if (!currItem.value.componentType) {
      const currVal = dataTypeData.find(ele => ele.value == currItem.value.dataType)
      const arrayVal = dataTypeData.find(ele => ele.value == currItem.value.arrayDataType)

      if (currVal?.type == 'Array' && arrayVal?.type === 'Object' || currVal?.type == 'Object') {
        return lessCom.cloneObj(property_arrayAndObject)
      }
    } else {
      if (controlData) {
        const currControlData = controlData.find(ele => ele.value == currItem.value.componentType)
        if (currControlData) {
          return currControlData.propertys
        }
      }
    }
  }
  else {

    if (!currItem.value.componentType) {
      currItem.value.config = {
        formConfig: {},
        baseConfig: {},
        advancedConfig: {},
        arrayConfig: {}
      }
    }
    return null

  }

})


watch(() => currItem.value.componentType, () => {
  if (isRow.value) {
    currItem.value.data.length = 0
    currItem.value.dataType = 0;
    currItem.value.data.push(
      {
        keyID: lessCom.Guid32(),
        keyName: '',
        keyCode: '',
        data: [],
        config: {
          formConfig: {},
          baseConfig: {},
          advancedConfig: {},
          arrayConfig: {}
        },
      })
  } else {
    currItem.value.data.length = 0

  }
})

function handleChangeDataType() {
  if(currItem.value.arrayDataType){
    currItem.value.arrayDataType=undefined;
  }
  currItem.value.componentType = undefined;
  if (isObject.value) {
    currItem.value.data.length = 0
    currItem.value.data.push({
      keyID: lessCom.Guid32(),
      keyName: '',
      keyCode: '',
      data: [],
      config: {
        formConfig: {},
        baseConfig: {},
        advancedConfig: {},
        arrayConfig: {},
      },
    })
  } else {
    currItem.value.data.length = 0;
  }
}

function validationCode(rule, value, callback) {
          console.log(rule)
            if (value === '') {
                callback(new Error('keyCode不能为空'))
            } else if (props.data.filter(ele => ele.keyCode == value).length>1) {
              ElMessage.warning(`[${value}]重复`)
                callback(new Error('keyCode重复'))
            } else {
                callback()
            }
        }
</script>
<template>
  <els-form v-model="currItem" labelWidth="0" inputWidth="100%"
    :class="[{ 'els-dynamic-d-item-parentdiv': isObject }, { 'els-dynamic-d-item-container': isRow }]"
    :show-message="false">
    <div class="els-dynamic-d-item-div" v-if="!isRow">
      <span class="keyName">
        <els-input clearable v-if="itemDataType.type != 'None'" placeholder="请输入名称" prop="keyName"></els-input>
      </span>
      <span class="keyCode">
        <els-input placeholder="编码" v-if="itemDataType.type != 'None'" :validMethod="validationCode" required clearable :disabled="currItem.isModify"
          @input="handleChangeKeyCode" prop="keyCode"></els-input>
      </span>
      <span class="dataType">
        <els-select @click-option="handleChangeDataType" :initSelect="false" :data="dataTypeData" valueField="value"
          labelField="label" placeholder="值类型" prop="dataType"></els-select>
        <els-select @click-option="handleChangeDataType" v-if="itemDataType.type == 'Array'" :data="dataTypeData.filter(ele=>ele.type!='None'&&ele.type!='Array')"
          valueField="value" labelField="label" prop="arrayDataType"></els-select>
      </span>
      <span class="componentType">
        <els-select v-if="itemDataType.type != 'Object' && currArrayDataType.type != 'Object'" filterable required
          :disabled="currItem.dataType === undefined" placeholder="控件" prop="componentType" :data="currComponentTypeData"
          valueField="value" labelField="label">
        </els-select>
      </span>
      <span class="config">
        <el-popover placement="right-start" trigger="click" width="600">
          <els-form labelWidth="120">
            <el-tabs>
              <el-tab-pane label="组件属性">
                <ElsDynamicRender  v-model="currItem.config.baseConfig"
                  :nodeType="{ dataType: currDataType?.type, componentName: currComponentType?.componentName }"
                  :config="currPropertys" inputWidth="100%">
                </ElsDynamicRender>
              </el-tab-pane>
              <el-tab-pane label="数组属性" v-if="itemDataType.type == 'Array'">
                <ElsDynamicRender v-model="currItem.config.arrayConfig" :config="property_array" inputWidth="100%">
                </ElsDynamicRender>
              </el-tab-pane>
              <el-tab-pane label="表单属性" v-if="itemDataType.type != 'None'">
                <ElsDynamicRender v-model="currItem.config.formConfig" :config="property_form" inputWidth="100%">
                </ElsDynamicRender>
              </el-tab-pane>
              <el-tab-pane label="高级属性">
                <ElsDynamicRender v-model="currItem.config.advancedConfig" :config="property_advanced" inputWidth="100%">
                </ElsDynamicRender>
              </el-tab-pane>
            </el-tabs>
          </els-form>
          <template #reference>
            <el-link type="primary">配置</el-link>
          </template>
        </el-popover>
      </span>
      <span class="defaultValue">
        <els-input v-if="!isObject && itemDataType.type !== 'None'" placeholder="默认值" clearable
          v-model="currItem.defaultValue"></els-input>
      </span>
      <span class="oper">
        <span class="els-dynamic-d-oper">
          <el-icon class="el-icon-rank">
            <Rank />
          </el-icon>
          <el-popconfirm title="确定删除吗？" @confirm="handleRemove(item)">
            <template #reference> <el-icon class="el-icon-remove">
                <Remove />
              </el-icon></template>
          </el-popconfirm>
        </span>
      </span>
    </div>
    <DynamicDesignerInner :data="currItem.data" @removeItem="handleRemove(item)" v-if="isObject || isRow"
      :config="currItem.config.advancedConfig" :is-container="isRow" :depath="currDepath">
    </DynamicDesignerInner>
  </els-form>
</template>../../utlis/dynamicPropertys/form.js