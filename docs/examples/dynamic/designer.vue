<template>
<<<<<<< HEAD
  <el-tabs>
    <el-tab-pane label="配置">
      <ElsDynamicDesigner style="overflow: scroll;" v-model="config" allowCreateType :componentSettingVisible="false"
        isReturnTemplateValue v-model:templateValue="initValue" :camelCase="true">
      </ElsDynamicDesigner>
=======
    <el-tabs>
        <el-tab-pane label="配置">
            <ElsDynamicDesigner style="overflow: scroll;" v-model="config" 
            allowCreateType
             v-model:initValue="initValue" 
             :dataTypes="dataTypes" :camelCase="true" 
             :appendComponentTypes="appendComponentTypes" 
             :componentRelateDataType="componentRelateDataType"
             :componentSettingVisible="false"
             saveTypeUrl="sss"
             >
            </ElsDynamicDesigner>
>>>>>>> master

    </el-tab-pane>

    <el-tab-pane label="表单属性">
      <els-json-viewer :data="initValue"></els-json-viewer>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { ref } from 'vue'
const config = ref()
const initValue = ref()
</script>