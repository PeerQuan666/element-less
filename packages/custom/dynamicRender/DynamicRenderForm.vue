<script setup lang="ts">
import { reactive } from 'vue'
import { useValue } from '../../utlis/use'
import DynamicRenderInner from './DynamicRenderInner.vue'
interface Props {
    isRoot?:boolean
}
defineProps<Props>()
const nodeItem = defineModel<any>("nodeItem", { default: () => { return reactive<Record<string, any>>([]); } })
const { getValue, setValue } = useValue()
const getCurrNode = getValue<Function>('getCurrNode', () => { return {}})
const getNodeValue = getValue<Function>('getNodeValue', () => { return {}})
const isMobile = getValue<boolean>('isMobile', false)
setValue({
    getCurrNode: () => {
        return getNodeValue(nodeItem.value.data)
    },
    getParentNode: () => {
        return getCurrNode()
    }
})

</script>
<template>
    <els-form v-model="nodeItem" v-bind="nodeItem.config.baseConfig">
        <component :is="isMobile&&!isRoot?'van-cell-group':'div'" :title="nodeItem.keyName">
          <DynamicRenderInner v-for="item in nodeItem.data" :nodeItem="item" :key="item.keyID"></DynamicRenderInner>
       </component>
    </els-form>
</template>
<style scoped lang="less">
:deep(.el-form){
    .el-form-item{
        margin-bottom: 18px;
    }
}
</style>
