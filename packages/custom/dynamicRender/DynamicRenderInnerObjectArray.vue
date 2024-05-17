<script setup lang="ts">
import { watch, computed, reactive } from 'vue'
import { lessCom } from '../../utlis/com'
import { useValue } from '../../utlis/use'

import DynamicRenderInner from './DynamicRenderInner.vue'

interface Props {
}

const props = withDefaults(defineProps<Props>(), {
})
const { getValue, setValue } = useValue()
const nodeItem = defineModel<any>("nodeItem", { default: () => { return reactive<Record<string, any>>([]); } })
const getCurrNode = getValue<Function>('getCurrNode', () => { return {} })
const getNodeValue = getValue<Function>('getNodeValue', () => { return {} })

function handleAddItem() {
    return lessCom.cloneObj(nodeItem.value.arrayObjData)
}

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
    <div style=" flex-grow:1">
        <els-list v-model="nodeItem.data" @add="handleAddItem" :sortable="false"
            :item-class-name="{ 'els-dynamic-r-array': nodeItem.arrayDataTypeName === 'Object' || nodeItem.componentTypeName === 'DynamicRender' }"
            :style="[

            { 'max-width': (nodeItem.config.arrayConfig.maxWidth ? nodeItem.config.arrayConfig.maxWidth + 'px' : '') },
            { 'max-height': (nodeItem.config.arrayConfig.maxHeight ? nodeItem.config.arrayConfig.maxHeight + 'px' : '') },
            { 'display': nodeItem.config.arrayConfig.arrangementType === 'Horizontal' ? 'flex' : '' },
        ]" class="els-dynamic-array-render"
            :class="{ 'horizontal': nodeItem.config.arrayConfig.arrangementType === 'Horizontal' }">
            <template #default="{ element, $item }">
                <div :key="element.itemKey" class="els-dynamic-array-inner">
                    <DynamicRenderInner v-for="item in element.value" :nodeItem="item" :key="item.keyID">
                    </DynamicRenderInner>
                </div>
            </template>
        </els-list>
    </div>
</template>
<style scoped lang="less">
.els-dynamic-array-render {
    flex-grow: 1;
    flex-wrap: 'wrap';
    gap: 5px;
    overflow: scroll
}

.els-dynamic-array-inner {
    flex-grow: 1;
}
</style>