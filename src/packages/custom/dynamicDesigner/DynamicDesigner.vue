<script setup lang="ts">
import { provide, watch, ref, onMounted } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import '../../utlis/lessPrototype.js'
import { dynamicDataType, dynamicArrayDataType, dynamicControlType } from '../../utlis/lessConfig.js'
import DynamicDesignerInner from './DynamicDesignerInner.vue'
import DynamicDesignerView from '../dynamicDesignerView/DynamicDesignerView.vue'

import lessCom from '../../utlis/lessCom'
defineOptions({
  name: 'ElsDynamicDesigner',
})
interface Props {
  modelValue?: any,
  showConfig?: boolean,
  camelCase?: boolean,
  dataType?: Array<Record<string, any>>,
  arrayDataType?: Array<Record<string, any>>,
  controlType?: Array<Record<string, any>>,
}
const emits = defineEmits(['update:modelValue'])
const designerJSON = ref()
const importJSON = ref()
const designerContainer = ref()
const innerClass = ref('')
const designerObj = ref([])
const props = defineProps<Props>()

function initData(){
  if (props.modelValue && typeof (props.modelValue) === 'string') {
    if (props.modelValue != JSON.stringify(designerObj.value)) {
      designerJSON.value = props.modelValue
      designerObj.value = JSON.parse(props.modelValue)
    }
  } else if (props.modelValue && typeof (props.modelValue) === 'object') {
    designerJSON.value = JSON.stringify(props.modelValue)
    designerObj.value = props.modelValue
  }
}

initData()
provide("tagID", 'els-dynamic-designer-' + lessCom.Guid32())
provide('dataTypeData', !props.dataType ? dynamicDataType : props.dataType)
provide('arrayObjectType', !props.arrayDataType ? dynamicArrayDataType : props.arrayDataType)
provide('controlData', !props.controlType ? dynamicControlType : props.controlType)

provide('camelCase', props.camelCase)

function handleImportDesigner() {
  designerObj.value = JSON.parse(importJSON.value)

  return Promise.resolve(true)
}
function handleOpenImport() {
  importJSON.value =JSON.stringify(designerObj.value) 
}
watch(designerObj, (val) => {
  if (val) {
    if (typeof (props.modelValue) === 'object') {
      emits('update:modelValue', val)

    } else {
      emits('update:modelValue', JSON.stringify(val))

    }
  }

}, { deep: true })
onMounted(() => {
  useResizeObserver(designerContainer, (entries) => {
    const entry = entries[0]
    const { width } = entry.contentRect
    if (width < 700) {
      innerClass.value = 'min'
    } else if (width < 1200) {
      innerClass.value = 'mid'

    } else {
      innerClass.value = 'max'

    }
  })
})
const designType = ref('精简模式')
function closeViewDialog() {
  designType.value = '精简模式'
}
</script>
<template>
  <div class="els-dynamic-config" ref="designerContainer">
    <div style="display: flex;">
      <ElsRadioButton v-model="designType">
        <ElsOption value="精简模式"><el-icon><MoreFilled /></el-icon></ElsOption>
        <ElsOption value="设计模式"><el-icon><Grid /></el-icon></ElsOption>
      </ElsRadioButton>
      <els-data-modal style="margin-left:5px;margin-bottom:5px;" title="导入配置" buttonLabel="导入配置" icon="Edit" :hasInput="false"
        :open="handleOpenImport" :confirm="handleImportDesigner">
        <ElsJsonEditor v-model="importJSON" style="height: 500px;"></ElsJsonEditor>
      </els-data-modal>
    </div>
    <DynamicDesignerInner v-if="designType === '精简模式'" :data="designerObj" :class="innerClass"></DynamicDesignerInner>
  </div>
  <template v-if="designType !== '精简模式'">
    <ElsDialog v-if="innerClass !== 'max'" :visible="true" @close="closeViewDialog" width="90%">
      <DynamicDesignerView v-model="designerObj"></DynamicDesignerView>
    </ElsDialog>
    <DynamicDesignerView v-else v-model="designerObj"></DynamicDesignerView>
  </template>
</template>
<style lang="less">
.els-dynamicc-d-head {
  padding-left: 5px;
  font-weight: bold;
  margin-bottom: 8px;
  display: flex;
  font-size: 14px;
  justify-content: space-between;

}

.els-dynamic-config {
  border: 1px solid #dcdfe6;
  padding: 10px;

  .leo-list-add {
    margin-left: 5px
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
  }

  .ruleDataType {
    width: 110px;
  }

  .dateType-select {
    display: flex;
    flex-wrap: nowrap;
  }

  .controlType {
    width: 120px;
  }

  .defaultValue {

    width: 120px;
  }

  .config {
    width: 40px;
  }

  .configInput {
    width: 120px;
  }

  .checkEmpty {
    width: 60px;
  }

  .regex {
    width: 130px;
  }

  .desc {
    width: 200px;
  }

  .matchType {
    width: 200px;
  }

  .ruleParameter {
    width: 120px;
  }

  .isOnce {
    width: 70px;
  }

  .oper {
    width: 60px;
  }

  .min {

    .checkEmpty,
    .regex,
    .desc {
      display: none;
    }
  }

  .mid {

    .checkEmpty,
    .regex {
      display: none;
    }
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
  }
}

.els-dynamic-d-item-div {
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
    padding: 10px 5px !important;
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