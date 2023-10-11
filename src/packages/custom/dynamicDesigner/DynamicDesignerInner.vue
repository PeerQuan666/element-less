<script setup lang="ts">
import { inject, ref } from 'vue'
import { useVModel } from '@vueuse/core'
import { DynamicConfig } from '../../utlis/interfaceCom.js'
import DynamicDesignerInnerItem from './DynamicDesignerInnerItem.vue'

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

const emits = defineEmits(['update:data'])
const props = withDefaults(defineProps<Props>(),{depath:0})
const currData = useVModel(props, 'data', emits)
const currConfig = ref(props.config ?? {})
function handleRemove() {

}
function handleAddItem(item) {
  if (!item.type) {
    currData.value.push(
      {
        keyID:lessCom.Guid32(),
        keyName: '',
        keyCode: '',
        data: [],
        config:{
          validConfig:{},
          baseConfig:{},
          advancedConfig:{}
        },
      })
  }
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
        <els-form-item label="V-If" label-width="60px">
          <el-input v-model="currConfig.vif"></el-input>
        </els-form-item>
        <template #reference> <span>(1行{{ data.length }}列)</span></template>
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
    <div class="els-dynamicc-d-head" v-else-if="data.length > 0">
      <span class="keyName">名称</span>
      <span class="keyCode">编码</span>
      <span class="dataType">类型</span>
      <span class="controlType">控件</span>
      <span class="config">配置</span>
      <span class="checkEmpty">必输</span>
      <span class="regex">正则</span>
      <span class="defaultValue">默认值</span>
      <span class="desc">说明</span>
      <span class="oper">操作</span>
    </div>
    <els-list :data="data" @add="handleAddItem" :sortable="false" :is-remove="false" item :hasForm="false" itemKey="keyID"
      v-bind="{ group: tagID, animation: 300 }" >
      <template #default="{ $item, $index }">
        <DynamicDesignerInnerItem :data="data" :item="$item" :depath="depath" :key="$index"></DynamicDesignerInnerItem>
      </template>
    </els-list>
  </div>
</template>
