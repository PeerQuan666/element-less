<script setup lang="ts">
import { inject, ref, defineAsyncComponent,computed } from 'vue'
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
    },
    isAdd:true
  })
  setSelectItem(keyID)

}
const tagID = inject('tagID')
const dataTypeData = inject<any>("dataTypeData", null)
const controlData = inject<any>("componentData", null)
const setMouseOverItem=inject<Function>("setMouseOverItem",()=>null)
const getMouseOverItem=inject<Function>("getMouseOverItem",()=>null)
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
  <div :class="[{ 'els-dynamic-d-flat-item-child': depath && depath > 0 }]">
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
    <div class="els-dynamicc-d-head">
      <span class="keyName">名称</span>
      <span class="keyCode">编码</span>
      <span class="dataType">类型</span>
      <template v-if="componentSettingVisible">
        <span class="componentType">组件</span>
        <span class="config">配置</span>
      </template>
      <span class="required">必需</span>
      <span class="description">描述</span>
      <span class="defaultValue">默认值</span>
      <span class="oper">操作</span>
    </div>
    <div v-if="!currData.length" class="els-dynamicc-d-empty">没有数据</div>

    <els-list v-model="currData" :sortable="false" :is-remove="false" item :hasForm="false" itemKey="keyID"
      v-bind="{ group: tagID, animation: 300 }">
      <template #default="{ $item, $index }">
        <suspense>
          <template #default>
            <div class="els-dynamic-d-item-div virtual"
            v-if="getSelectItem()!=$item.keyID&&!$item.isAdd&&!['None','Object'].includes(getDataTypeName($item.dataType)?.type)&&!['None','Object'].includes(getDataTypeName($item.arrayDataType)?.type)"
            @click="setSelectItem($item.keyID)">
              <span class="keyName">
                <div class="el-input__wrapper">
                  <div class="el-input__inner">{{ $item.keyName }}</div>
                </div>
              </span>
              <span class="keyCode">
                <div class="el-input__wrapper">
                  <div class="el-input__inner">{{ $item.keyCode }}</div>
                </div></span>
              <span class="dataType"> 
                <div class="el-input__wrapper">
                  <div class="el-input__inner">{{ getDataTypeName($item.dataType)?.label }}</div>
                </div>
                <div class="el-input__wrapper" v-if="$item.arrayDataType">
                  <div class="el-input__inner">{{ getDataTypeName($item.arrayDataType)?.label }}</div>
                </div>
              </span>
              <template v-if="componentSettingVisible">
                <span class="componentType">
                  <div class="el-input__wrapper">
                  <div class="el-input__inner">{{ getComponentType($item.componentType)?.label }}</div>
                </div>
              </span>
                <span class="config"><el-link type="primary">配置</el-link></span>
              </template>
              <span class="required">
                <els-switch v-model="$item.required"  :active-value="true" :inactive-value="false"></els-switch>
              </span>
              <span class="description">
                <div class="el-input__wrapper">
                  <div class="el-input__inner">{{ $item.description }}</div>
                </div>
              </span>
              <span class="defaultValue">
                <div class="el-input__wrapper">
                  <div class="el-input__inner">{{ $item.defaultValue }}</div>
                </div>
              </span>
              <span class="oper">
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
            <DynamicDesignerInnerItem  v-else :data="currData" :item="$item" :depath="depath" :key="$index">
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
