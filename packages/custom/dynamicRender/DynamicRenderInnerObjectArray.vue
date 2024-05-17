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
    const isMobile = getValue<boolean>('isMobile', false)
function handleAddItem() {
    return lessCom.cloneObj(nodeItem.value.arrayObjData)
}


function handleRemove(index) {
    nodeItem.value.data.splice(index, 1)

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
    <div  class="els-dynamic-array">
        <els-list v-model="nodeItem.data" @add="handleAddItem"
            :sortable="!isMobile"
            :isRemove="!isMobile"
            itemKey="keyID"
            :innerFormData="Object.assign({}, nodeItem.config.baseConfig)"
            :item-class-name="[{ 'els-dynamic-r-array':nodeItem.arrayDataTypeName === 'Object' || nodeItem.componentTypeName === 'DynamicRender'  },{'els-dynamic-r-array-mobile':isMobile}]"
            :style="[
            { 'max-width': (nodeItem.config.arrayConfig.maxWidth ? nodeItem.config.arrayConfig.maxWidth + 'px' : '') },
            { 'max-height': (nodeItem.config.arrayConfig.maxHeight ? nodeItem.config.arrayConfig.maxHeight + 'px' : '') },
            { 'display': nodeItem.config.arrayConfig.arrangementType === 'Horizontal' ? 'flex' : '' },
        ]" class="els-dynamic-array-render"
            :class="{ 'horizontal': nodeItem.config.arrayConfig.arrangementType === 'Horizontal' }">
            <template #default="{ element, $item,$index }">
                <div :key="element.keyID" class="els-dynamic-array-inner">
                    <van-cell-group  :title="nodeItem.keyName" v-if="isMobile" :key="element.itemKey" >
                        <template #title>
                            <div class="els-dynamic-r-mobile-title"><span>{{ nodeItem.keyName+' '+($index+1) }}</span><span class="txt-red" @click="handleRemove($index)">删除</span></div>
                        </template>
                        <DynamicRenderInner v-for="item in $item" :nodeItem="item" :key="item.keyID">
                       </DynamicRenderInner>
                    </van-cell-group>
                    <template v-else>
                        <DynamicRenderInner v-for="item in $item" :nodeItem="item" :key="item.keyID">
                       </DynamicRenderInner>
                    </template>
                   
                </div>
            </template>
        </els-list>
    </div>
</template>
<style scoped lang="less">
.els-dynamic-array:deep {
    &{
        flex-grow:1
    }
    
    .els-dynamic-array-render {
        flex-grow: 1;
        flex-wrap: 'wrap';
        gap: 5px;
        overflow-y: scroll;
        .els-dynamic-r-array {
            border: 1px solid #dcdfe6;
            padding: 5px 60px 5px 5px;
            position: relative;
            margin-bottom: 10px;
            >.els-list-operate {
                position: absolute;
                right: 0;
                top: 0;
                background: #e5efff;
                margin-left: 0px !important;
            }
            .els-dynamic-array-inner {
                flex-grow: 1;
                >.van-cell-group__title>.els-dynamic-r-mobile-title{
                    display:flex;justify-content: space-between;
                }
            }
        }
        .els-dynamic-r-array-mobile{
            border:unset;
            padding:5px;
            margin-bottom: 0px;
        }
    }

   

}
</style>