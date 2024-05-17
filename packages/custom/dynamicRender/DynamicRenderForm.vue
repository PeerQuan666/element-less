<script setup lang="ts">
import { reactive } from 'vue'
import { useValue } from '../../utlis/use'
import DynamicRenderInner from './DynamicRenderInner.vue'
const nodeItem = defineModel<any>("nodeItem", { default: () => { return reactive<Record<string, any>>([]); } })
const { getValue, setValue } = useValue()
const getCurrNode = getValue<Function>('getCurrNode', () => { return {}})
const getNodeValue = getValue<Function>('getNodeValue', () => { return {}})

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
       <DynamicRenderInner v-for="item in nodeItem.data" :nodeItem="item" :key="item.keyID"></DynamicRenderInner>
    </els-form>
</template>
<style scoped lang="less">
.el-form:deep{
    .el-form-item{
        margin-bottom: 18px;
    }
}
</style>
