<script setup lang="ts">
import { inject, ref, computed, watch, nextTick,watchEffect } from 'vue'
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
const settingDirection=inject<string>('settingDirection');
const allowCreateType = inject<boolean>('allowCreateType', false)
const allowCreateComponent = inject<boolean>('allowCreateComponent', false)
const openCreateType = inject<Function>('openCreateType', () => null)
const openCreateComponent = inject<Function>('openCreateComponent', () => null)
const componentSettingVisible = inject<boolean>('componentSettingVisible', true)
const columnVisible = inject<Function>('columnVisible', ()=>{return true;})
const props = defineProps<Props>()
const dataTypeData = inject<any>("dataTypeData", null)
const controlData = inject<any>("componentData", null)
const currDepath = ref(props.depath + 1)
const currData = useVModel(props, 'data', emits)
const currItem = useVModel(props, 'item', emits)
const selectDataTypeItem = ref()
const selectArrayDataTypeItem = ref()
const attrDrawVisible=ref(false)
const formRender=ref()

function handleRemove(item) {
  var index = currData.value.indexOf(item)
  currData.value.splice(index, 1)

}
function handleChangeKeyCode() {
  if (camelCase && currItem.value.keyCode) {
    const keyCode = currItem.value.keyCode
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
    return controlData.filter(ele => !currDataType.value || ele.dataTypes.includes(currDataType.value?.value) || ele.dataTypes.includes(currDataType.value?.type))

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
        keyID: lessCom.generateID(),
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
  if (currItem.value.arrayDataType) {
    currItem.value.arrayDataType = undefined;
  }
  currItem.value.componentType = undefined;
  nextTick(() => {
    if (currComponentTypeData.value.length) {
      if (isObject.value) {
        currItem.value.componentType = ''
      }
      else if (currDataType.value && currDataType.value.type !== 'Array') {

        currItem.value.componentType = currComponentTypeData.value[0].value;


      } else if (currItem.value.arrayDataType) {

        currItem.value.componentType = currComponentTypeData.value[0].value;

      }
    }

  })
  if (isObject.value) {
    currItem.value.data.length = 0
    currItem.value.data.push({
      keyID: lessCom.generateID(),
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

watch(dataTypeData,(val)=>{
if(currItem.value.dataType){
  selectDataTypeItem.value=val.find(ele=>ele.value===currItem.value.dataType)
}
if(currItem.value.arrayDataType){
  selectArrayDataTypeItem.value=val.find(ele=>ele.value===currItem.value.arrayDataType)
}
})

function handleChangeRequired(val){
    if(currItem.value.config.formConfig&& currItem.value.config.formConfig.required!=val){
      currItem.value.config.formConfig.required=val
      formRender.value.initData()
    }
}
watch(()=>currItem.value.config.formConfig.required,(val)=>{
  if(currItem.value.required!==val){
    currItem.value.required=val
  }
})
function validationCode(rule, value, callback) {
  console.log(rule)
  if (value === '') {
    callback(new Error('keyCode不能为空'))
  } else if (props.data.filter(ele => ele.keyCode == value).length > 1) {
    ElMessage.warning(`[${value}]重复`)
    callback(new Error('keyCode重复'))
  } else {
    callback()
  }
}



</script>
<template>
  <els-form v-model="currItem" labelWidth="0" inputWidth="100%"
    :class="[{ 'els-dynamic-d-item-parentdiv': isObject && !currItem.componentType }, { 'els-dynamic-d-item-container': isRow }]"
    :show-message="false">
    <div class="els-dynamic-d-item-div" v-if="!isRow" :class="[{'setting':attrDrawVisible}]">
      <span class="keyName" v-if="columnVisible('keyName')">
        <els-input clearable v-if="itemDataType.type != 'None'||item.componentType==='Caption'" placeholder="请输入名称" prop="keyName"></els-input>
        <span v-else-if="currItem.config.baseConfig">{{ currItem.config.baseConfig.title}}</span>
      </span>
      <span class="keyCode" v-if="columnVisible('keyCode')">
        <els-input placeholder="编码" v-if="itemDataType.type != 'None'" :validMethod="validationCode" required clearable @blur="handleChangeKeyCode" prop="keyCode"></els-input>
      </span>
      <span class="dataType" v-if="columnVisible('dataType')">

        <el-popover v-if="selectDataTypeItem && selectDataTypeItem.id"  width="400" placement="right">
          <div >
            <div class="dataType-detail-t"><span>{{ selectDataTypeItem.type==='Enum'?'Enum':'Object' }}</span><span
                @click="openCreateType(selectDataTypeItem.id)">查看详细</span></div>
            <div v-if="selectDataTypeItem.type === 'Enum'">
              <el-table :data="selectDataTypeItem.componentType.defaultPropertys.data"  max-height="250">
                <el-table-column prop="label" label="label"></el-table-column>
                <el-table-column prop="value" label="value"></el-table-column>
              </el-table>
            </div>
            <div v-else>
              <el-table :data="selectDataTypeItem.componentType.defaultPropertys.config"  max-height="250">
                <el-table-column prop="keyName" label="keyName"></el-table-column>
                <el-table-column prop="keyCode" label="keyCode"></el-table-column>
                <el-table-column prop="dataType" label="类型"></el-table-column>
              </el-table>
            </div>
          </div>
          <template #reference>
            <els-select  @click-option="handleChangeDataType" class="txt-blue-light" filterable v-model:select="selectDataTypeItem" required
              :initSelect="false" :data="dataTypeData" valueField="value" labelField="label" placeholder="值类型"
              prop="dataType">
              <template #extra v-if="allowCreateType">
                <li class="dynamic-create-dtype" @click="openCreateType()">创建类型</li>
              </template>
              <template #default="{ item }">
                <span :title="item.description"> {{ item.label }}</span>
              </template>
            </els-select>
          </template>
        </el-popover>

        <els-select v-else @click-option="handleChangeDataType" filterable v-model:select="selectDataTypeItem" required
          :initSelect="false" :data="dataTypeData" valueField="value" labelField="label" placeholder="值类型"
          prop="dataType">
          <template #extra v-if="allowCreateType">
            <li class="dynamic-create-dtype" @click="openCreateType()">创建类型</li>
          </template>
          <template #default="{ item }">
            <span :title="item.description"> {{ item.label }}</span>
          </template>
        </els-select>

        <template v-if="itemDataType.type == 'Array'">

          <el-popover v-if="selectArrayDataTypeItem && selectArrayDataTypeItem.id" placement="right" width="400">
            <div>
              <div class="dataType-detail-t"><span>{{ selectArrayDataTypeItem.type==='Enum'?'Enum':'Object' }}</span><span
                  @click="openCreateType(selectArrayDataTypeItem.id)">查看详细</span></div>
              <div v-if="selectArrayDataTypeItem.type === 'Enum'">
                <el-table :data="selectArrayDataTypeItem.componentType.defaultPropertys.data"  max-height="250">
                  <el-table-column prop="label" label="label"></el-table-column>
                  <el-table-column prop="value" label="value"></el-table-column>
                </el-table>
              </div>
              <div v-else>
                <el-table :data="selectArrayDataTypeItem.componentType.defaultPropertys.config"  max-height="250">
                  <el-table-column prop="keyName" label="keyName"></el-table-column>
                  <el-table-column prop="keyCode" label="keyCode"></el-table-column>
                  <el-table-column prop="dataType" label="类型"></el-table-column>
                </el-table>
              </div>
            </div>
            <template #reference>

              <els-select @click-option="handleChangeDataType"  filterable class="txt-blue-light"  v-model:select="selectArrayDataTypeItem" required
                :data="dataTypeData.filter(ele => ele.type != 'None' && ele.type != 'Array')" valueField="value"
                labelField="label" prop="arrayDataType">
                <template #extra v-if="allowCreateType">
                  <li class="dynamic-create-dtype" @click="openCreateType()">创建类型</li>
                </template>
                <template #default="{ item }">
                  <span :title="item.description"> {{ item.label }}</span>
                </template>
              </els-select>
            </template>
          </el-popover>

          <els-select v-else @click-option="handleChangeDataType" filterable v-model:select="selectArrayDataTypeItem" required
            :data="dataTypeData.filter(ele => ele.type != 'None' && ele.type != 'Array')" valueField="value"
            labelField="label" prop="arrayDataType">
            <template #extra v-if="allowCreateType">
              <li class="dynamic-create-dtype" @click="openCreateType()">创建类型</li>
            </template>
            <template #default="{ item }">
              <span :title="item.description"> {{ item.label }}</span>
            </template>
          </els-select>

        </template>
      </span>
      <template v-if="componentSettingVisible">
        <span class="componentType" v-if="columnVisible('componentType')">
          <els-select
            v-if="itemDataType.type != 'Object' && currArrayDataType.type != 'Object' || (isObject && currComponentTypeData.length)"
            filterable :disabled="currItem.dataType === undefined" placeholder="组件" clearable prop="componentType"
            :data="currComponentTypeData" valueField="value" labelField="label">
            <template #extra v-if="allowCreateComponent">
              <li class="dynamic-create-dtype" @click="openCreateComponent()">创建组件</li>
            </template>
          </els-select>
        </span>
        <span class="config"  v-if="columnVisible('config')">
          <el-link type="primary" @click="attrDrawVisible=true;">配置</el-link>
        </span>
      </template>
      <span class="required" v-if="columnVisible('required')">
        <els-switch v-if="itemDataType.type !== 'None'" :active-value="true" :inactive-value="false" @change="handleChangeRequired"
          prop="required"></els-switch>
      </span>
      <span class="description"  v-if="columnVisible('description')">
        <els-input v-if="itemDataType.type !== 'None'" placeholder="描述" clearable prop="description"></els-input>
      </span>
      <span class="defaultValue" v-if="columnVisible('defaultValue')">
        <el-popover placement="top-start" width="400" trigger="click"   v-if="!isObject && itemDataType.type !== 'None'">
          <els-textarea placeholder="默认值" clearable prop="defaultValue" :rows="3"></els-textarea>
              <template #reference>
                <els-input placeholder="默认值" clearable prop="defaultValue"></els-input>
              </template>
          </el-popover>
      </span>
      <span class="oper" v-if="columnVisible('oper')">
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
    <DynamicDesignerInner :data="currItem.data" @removeItem="handleRemove(item)"
      v-if="(isObject && !currItem.componentType) || isRow" :config="currItem.config.advancedConfig" :is-container="isRow"
      :depath="currDepath">
    </DynamicDesignerInner>
  </els-form>
  <els-drawer v-model="attrDrawVisible"  :title="'设置属性'" :direction="settingDirection" :initBody="true" class="work-flow-drawer" size="30%" :show-close="false" append-to-body :lock-scroll="false">
    <els-form labelWidth="120">
          <el-tabs>
            <el-tab-pane label="组件属性" v-if="currItem.componentType">
              <ElsDynamicRender v-model="currItem.config.baseConfig"
                :nodeType="{ dataType: currDataType?.type, componentName: currComponentType?.componentName }"
                :config="currPropertys" inputWidth="100%">
              </ElsDynamicRender>
            </el-tab-pane>
            <el-tab-pane label="数组属性" v-if="itemDataType.type == 'Array'">
              <ElsDynamicRender v-model="currItem.config.arrayConfig" :config="property_array" inputWidth="100%">
              </ElsDynamicRender>
            </el-tab-pane>
            <el-tab-pane label="表单属性" v-if="itemDataType.type != 'None'">
              <ElsDynamicRender ref="formRender"  v-model="currItem.config.formConfig" :config="property_form" inputWidth="100%">
              </ElsDynamicRender>
            </el-tab-pane>
            <el-tab-pane label="高级属性">
              <ElsDynamicRender v-model="currItem.config.advancedConfig" :config="property_advanced"
                inputWidth="100%">
              </ElsDynamicRender>
            </el-tab-pane>
          </el-tabs>
        </els-form>
  </els-drawer>
</template>
<style lang="less" scoped>
//has影响性能
.el-select-dropdown__list:has(>li[class^=dynamic-create-dtype]) {

  padding-bottom: 30px !important;

}

.dynamic-create-dtype {
  cursor: pointer;
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 1;
  background: #fff;
  display: flex;
  justify-content: center;
  color: #409eff;
  padding: 5px 0;
  border-top: 1px solid #e8e8e8;
}
.els-dynamic-d-item-div{
  padding-top: 3px;
}
.els-dynamic-d-item-div.setting{
  background: #b1deff;
}
.els-dynamic-d-oper{
  .el-icon-remove{
                color: red !important;
            }
}
</style>