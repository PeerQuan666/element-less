<script setup lang="ts">
import { reactive } from 'vue'
import { useValue } from '../../../utlis/use'
import DynamicRenderInner from './Inner.vue'
interface Props {
    isRoot?: boolean
}
defineProps<Props>()
const nodeItem = defineModel<any>("nodeItem", { default: () => { return reactive<Record<string, any>>([]); } })
const { getValue, setValue } = useValue()
const getCurrNode = getValue<Function>('getCurrNode', () => { return {} })
const getNodeValue = getValue<Function>('getNodeValue', () => { return {} })
const isMobile = getValue<boolean>('isMobile', false)
setValue({
    getCurrNode: () => {
        return getNodeValue(nodeItem.value.children)
    },
    getParentNode: () => {
        return getCurrNode()
    }
})

</script>
<template>
    <template v-if="isMobile&&!isRoot">
        <els-form v-model="nodeItem.children" v-bind="nodeItem.config.baseConfig">
            <component :is="'van-cell-group'" :title="nodeItem.keyName" >
                <DynamicRenderInner v-for="(item, index) in nodeItem.children" :index="index" :nodeItem="item"
                    :key="item.keyID"></DynamicRenderInner>
            </component>
        </els-form>
    </template>
    <template v-else>
        <els-form v-model="nodeItem.children" v-bind="nodeItem.config.baseConfig">
            <DynamicRenderInner v-for="(item, index) in nodeItem.children" :index="index" :nodeItem="item" :key="item.keyID">
            </DynamicRenderInner>
        </els-form>
    </template>
</template>
<style scoped lang="less">
.el-form:deep{
    .el-form-item {
        margin-bottom: 18px;
    }
}
</style>
