<script setup lang="ts">
import { reactive, ref } from 'vue'
import { lessCom } from '../../../utlis/com'
import { useValue } from '../../../utlis/use'
import DynamicRenderInner from './Inner.vue'

interface Props {
}

withDefaults(defineProps<Props>(), {
})
const { getValue, setValue } = useValue()
const list = ref()
const nodeItem = defineModel<any>("nodeItem", { default: () => { return reactive<Record<string, any>>([]); } })
const getCurrNode = getValue<Function>('getCurrNode', () => { return {} })
const getNodeValue = getValue<Function>('getNodeValue', () => { return {} })
const getParentNode = getValue<Function>('getParentNode', () => { return {} })
const isMobile = getValue<boolean>('isMobile', false)
function handleAddItem() {
    return lessCom.cloneObj(nodeItem.value.arrayObjData)
}


function handleRemove(index) {
    list.value.remove(index)
}
function getItemTitle(item) {
    try{
        const currItemValue=getNodeValue(item.value)
        let currEvent = new Function('parentNode,currNode,item', "return " + nodeItem.value.config.arrayConfig.itemComponentTitle);
        return currEvent(getParentNode(), getCurrNode(), currItemValue)||'请设置标题';
    }catch(err){
        console.log(err)
        return '标题语法错误'
    }
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
    <div class="els-dynamic-array">
        <els-list v-model="nodeItem.data" ref="list" @add="handleAddItem" :sortable="!isMobile" :isRemove="!isMobile"
            :hasForm="false" :wrapComponent="nodeItem.config.arrayConfig.wrapComponent"
            :itemComponent="nodeItem.config.arrayConfig.itemComponent"
            :item-class-name="[{ 'els-dynamic-r-array': nodeItem.arrayDataTypeName === 'Object' || nodeItem.componentTypeName === 'DynamicRender' }, { 'els-dynamic-r-array-mobile': isMobile }]"
            :style="[
            { 'max-width': (nodeItem.config.arrayConfig.maxWidth ? nodeItem.config.arrayConfig.maxWidth + 'px' : '') },
            { 'max-height': (nodeItem.config.arrayConfig.maxHeight ? nodeItem.config.arrayConfig.maxHeight + 'px' : '') },
            { 'display': nodeItem.config.arrayConfig.arrangementType === 'Horizontal' ? 'flex' : '' },
        ]" class="els-dynamic-array-render"
            :class="{ 'horizontal': nodeItem.config.arrayConfig.arrangementType === 'Horizontal' }">
            <template #itemTitle="{ element, $item, $index }" v-if="nodeItem.config.arrayConfig.itemComponentTitle">
                <div v-html="getItemTitle(element)"></div>
            </template>
            <template #default="{ element, $item, $index }">
                <div :key="element.keyID" class="els-dynamic-array-inner">
                    <els-form v-model="nodeItem.data[$index]" v-bind="Object.assign({}, nodeItem.config.baseConfig)">
                        <van-cell-group :title="nodeItem.keyName" v-if="isMobile" :key="element.itemKey">
                            <template #title>
                                <div class="els-dynamic-r-mobile-title"><span>{{ nodeItem.keyName + ' ' + ($index + 1)
                                        }}</span><span class="els-dynamic-remove"
                                        @click="handleRemove($index)">删除</span></div>
                            </template>
                            <DynamicRenderInner v-for="item, index in $item" :nodeItem="item" :key="item.keyID"
                                :index="index">
                            </DynamicRenderInner>
                        </van-cell-group>
                        <template v-else>
                            <DynamicRenderInner v-for="item, index in $item" :nodeItem="item" :key="item.keyID"
                                :index="index">
                            </DynamicRenderInner>
                        </template>
                    </els-form>
                </div>
            </template>
        </els-list>
    </div>
</template>
<style scoped lang="less">
.els-dynamic-array:deep {
    & {
        flex-grow: 1
    }

    .els-dynamic-array-inner {
        flex-grow: 1;

        .els-dynamic-r-mobile-title {
            display: flex;
            justify-content: space-between;
        }
    }

    .els-dynamic-remove {
        color: var(--el-color-danger);
    }
}
</style>