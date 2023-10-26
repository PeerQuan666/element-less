<script setup lang="ts">
import { inject, ref, defineAsyncComponent } from 'vue'
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
const getConverToJsonResult = inject<Function>('getConverToJsonResult', ()=>null)
const componentSettingVisible = inject<boolean>('componentSettingVisible', true)
const emits = defineEmits(['update:data', 'removeItem'])
const props = withDefaults(defineProps<Props>(), { depath: 0 })
const currData = useVModel(props, 'data', emits)
const currConfig = ref(props.config ?? {})
function handleRemove() {
  emits("removeItem")
}
function handleAddItem() {
  currData.value.push({
      keyID: "key_" + lessCom.randomNumber().toString(),
      keyName: '',
      keyCode: '',
      data: [],
      required:false,
      config: {
        formConfig: {},
        baseConfig: {},
        advancedConfig: {},
        arrayConfig: {}
      }
    })

}
const jsonVisible=ref(false)
const jsonObj=ref({})
function handleAddJSON(){
  if(getConverToJsonResult){
    const currResult=getConverToJsonResult(jsonObj.value)
    if(currResult.length){
      currData.value.push(...currResult)
    }
  }
  jsonObj.value={}
  jsonVisible.value=false
}

const tagID = inject('tagID')
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
    <div class="els-dynamicc-d-head" >
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

    <els-list v-model="currData"  :sortable="false" :is-remove="false" item :hasForm="false" itemKey="keyID"
      v-bind="{ group: tagID, animation: 300 }">
      <template #default="{ $item, $index }">
        <suspense>
          <template #default>
            <DynamicDesignerInnerItem :data="currData" :item="$item" :depath="depath" :key="$index">
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
       <el-button type="info" icon="edit" @click="jsonVisible=!jsonVisible">JSON导入</el-button>
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
