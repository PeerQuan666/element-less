<script setup lang="ts">
import { inject, ref, defineAsyncComponent,watchEffect } from 'vue'
import { useVModel } from '@vueuse/core'
import { DynamicConfig } from '../../utlis/interfaceCom.js'
const DynamicDesignerInnerItem = defineAsyncComponent(() => {
  return import('./DynamicDesignerInnerItem.vue')
})
import lessCom from '../../utlis/lessCom'
import '../../utlis/lessPrototype.js'
defineOptions({
  name: 'ElsDynamicDesigner',

})
interface Props {
  isContainer?: boolean,
  depath?: number,
  data: Array<DynamicConfig>,
  config?: Record<string, any>

}
const getConverToJsonResult = inject<Function>('getConverToJsonResult', () => null)
const componentSettingVisible = inject<boolean>('componentSettingVisible', true)
const columnVisible = inject<Function>('columnVisible', ()=>{return true;})
const emits = defineEmits(['update:data', 'removeItem'])
const props = withDefaults(defineProps<Props>(), { depath: 0 })
const currData = useVModel(props, 'data', emits)
const currConfig = ref(props.config ?? {})
function handleRemove() {
  emits("removeItem")
}

function handleAddItem() {
  const keyID="key_" + lessCom.randomNumber().toString()
  currData.value.push({
    keyID: keyID,
    keyName: '',
    keyCode: '',
    data: [],
    required: false,
    config: {
      formConfig: {},
      baseConfig: {},
      advancedConfig: {},
      arrayConfig: {}
    }
  })
  setSelectItem(keyID)

}
const tagID = inject('tagID')
const dataTypeData = inject<any>("dataTypeData", null)
const controlData = inject<any>("componentData", null)
const setSelectItem=inject<Function>("setSelectItem",()=>null)
const getSelectItem=inject<Function>("getSelectItem",()=>null)
  
const jsonVisible = ref(false)
const jsonObj = ref({})
function handleAddJSON() {
  if (getConverToJsonResult) {
    const currResult = getConverToJsonResult(jsonObj.value)
    if (currResult.length) {
      currData.value.push(...currResult)
    }
  }
  jsonObj.value = {}
  jsonVisible.value = false
}


function getDataTypeName(val){
  if(dataTypeData){
   return dataTypeData.find(ele=>ele.value==val)
  }
  return ''
}

function getComponentType(val){
  if(controlData){
   return controlData.find(ele=>ele.value==val)
  }
  return ''
}

</script>
<template>
  <div  :class="[{'els-dynamic-config-root':depath==0},{ 'els-dynamic-d-flat-item-child': depath && depath > 0 },{'els-dynamic-d-flat-item-container':isContainer&&depath-1==0}]">
    <span class="tag-name" v-if="isContainer">
      <el-popover placement="top-start" width="500" trigger="click">
        <els-form-item label="样式" label-width="60px">
          <el-input v-model="currConfig.style"></el-input>
        </els-form-item>
        <els-form-item label="v-if" label-width="60px">
          <el-input v-model="currConfig.vif"></el-input>
        </els-form-item>
        <template #reference> <span>(1行{{ currData.length }}列)</span></template>
      </el-popover>
      <el-icon class="el-icon-rank">
        <Rank />
      </el-icon>
      <el-popconfirm title="确定删除吗？" @confirm="handleRemove">
        <template #reference>
          <el-icon class="el-icon-remove">
            <Remove />
          </el-icon>
        </template>
      </el-popconfirm>
    </span>
    <div class="els-dynamicc-d-head" v-if="!isContainer">
      <span class="keyName" v-if="columnVisible('keyName')">名称</span>
      <span class="keyCode" v-if="columnVisible('keyCode')">编码</span>
      <span class="dataType" v-if="columnVisible('dataType')">类型</span>
      <template v-if="componentSettingVisible">
        <span class="componentType" v-if="columnVisible('componentType')">组件</span>
        <span class="config" v-if="columnVisible('config')">配置</span>
      </template>
      <span class="required" v-if="columnVisible('required')">必需</span>
      <span class="description" v-if="columnVisible('description')">描述</span>
      <span class="defaultValue"  v-if="columnVisible('defaultValue')">默认值</span>
      <span class="oper" v-if="columnVisible('oper')">操作</span>
    </div>
    <div v-if="!currData.length" class="els-dynamicc-d-empty">没有数据</div>

    <els-list v-model="currData" :sortable="false" :is-remove="false" item :hasForm="false" itemKey="keyID"
      v-bind="{ group: tagID, animation: 300 }">
      <template #default="{ $item, $index }">
        <suspense>
          <template #default>
            <div class="els-dynamic-d-item-div virtual"
            v-if="!getSelectItem().includes($item.keyID)&&!['None','Object'].includes(getDataTypeName($item.dataType)?.type)&&!['None','Object'].includes(getDataTypeName($item.arrayDataType)?.type)"
            @click="setSelectItem($item.keyID)">
              <span class="keyName"  v-if="columnVisible('keyName')">
                  <div class="el-input__wrapper">
                    <div class="el-input__inner">{{ $item.keyName }}</div>
                  </div>
                </span>
                <span class="keyCode"  v-if="columnVisible('keyCode')">
                  <div class="el-input__wrapper">
                    <div class="el-input__inner">{{ $item.keyCode }}</div>
                  </div></span>
                <span class="dataType" v-if="columnVisible('dataType')"> 
                  <div class="el-input__wrapper">
                    <div class="el-input__inner">{{ getDataTypeName($item.dataType)?.label }}</div>
                  </div>
                  <div class="el-input__wrapper" v-if="$item.arrayDataType">
                    <div class="el-input__inner">{{ getDataTypeName($item.arrayDataType)?.label }}</div>
                  </div>
                </span>
                <template v-if="componentSettingVisible" >
                  <span class="componentType" v-if="columnVisible('componentType')">
                    <div class="el-input__wrapper">
                    <div class="el-input__inner">{{ getComponentType($item.componentType)?.label }}</div>
                  </div>
                </span>
                  <span class="config" v-if="columnVisible('config')"><el-link type="primary">配置</el-link></span>
                </template>
                <span class="required" v-if="columnVisible('required')">
                  <els-switch v-model="$item.required"  :active-value="true" :inactive-value="false"></els-switch>
                </span>
                <span class="description" v-if="columnVisible('description')">
                  <div class="el-input__wrapper">
                    <div class="el-input__inner">{{ $item.description }}</div>
                  </div>
                </span>
                <span class="defaultValue" v-if="columnVisible('defaultValue')">
                  <div class="el-input__wrapper">
                    <div class="el-input__inner">{{ $item.defaultValue }}</div>
                  </div>
                </span>
                <span class="oper" v-if="columnVisible('oper')">
                  <span class="els-dynamic-d-oper">
                    <el-icon class="el-icon-rank">
                      <Rank />
                    </el-icon>
                    <el-icon class="el-icon-remove">
                            <Remove />
                          </el-icon>
                  </span>
                </span>
            </div>

            <DynamicDesignerInnerItem v-else  :data="currData" :item="$item" :depath="depath" :key="$item.keyID">
            </DynamicDesignerInnerItem>
          </template>
          <template #fallback>
            <el-skeleton animated>
              <template #template>
                <el-skeleton-item variant="text" style="width: 100%;" />
              </template>
            </el-skeleton>
          </template>
        </suspense>
      </template>
      <template #add>
        <el-button type="info" icon="edit" @click="handleAddItem">添加</el-button>
        <el-button type="info" icon="edit" @click="jsonVisible = !jsonVisible">JSON导入</el-button>
      </template>
    </els-list>
  </div>
  <els-dialog v-model="jsonVisible" title="JSON导入" destroy-on-close>
    <ElsJsonEditor :mainMenuBar="false" v-model="jsonObj" style="height: 500px;"></ElsJsonEditor>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="jsonVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAddJSON">
          提交
        </el-button>
      </span>
    </template>
  </els-dialog>
</template>
<style scoped lang="less">

.el-icon-remove{color:red;}
.els-dynamic-d-flat-item-container{padding-left:5px !important;}
.els-dynamic-config-root>::v-deep(.els-list)>.els-list-add{padding-left: 5px;}
</style>
