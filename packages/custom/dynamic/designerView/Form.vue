<script setup lang="ts">
import { useValue } from '../../../utlis/use'
import { reactive, computed } from 'vue'
import draggable from 'vuedraggable'
import { lessCom, ElsMessage } from '../../../utlis/com'
interface Props {
    isRoot?: boolean
}
import DynamicDesignerViewInner from './Inner.vue'
const props = defineProps<Props>()
const { getValue, setValue } = useValue(props)
const recordComponent = getValue<Function>('recordComponent', () => { })
const nodeItem = defineModel<any>("nodeItem", { default: () => { return reactive<Record<string, any>>([]); } })
const setSelectItem = getValue<Function>('setSelectItem', () => { })
const getSelectItem = getValue<Function>('getSelectItem', () => { })
const getCurrNode = getValue<Function>('getCurrNode', () => { return {}})
const getNodeValue = getValue<Function>('getNodeValue', () => { return {}})
const isMobile = getValue<boolean>('isMobile', false)
const handleMove = getValue<Function>('handleMove', () => { })
function handleAddComponent(e) {
    recordComponent()
    setSelectItem(nodeItem.value.children[e.newIndex])
    initArrayChild()

}
function initArrayChild() {
    if (nodeItem.value.dataTypeName === 'Array' && !nodeItem.value.arrayDataTypeName) {
        if (nodeItem.value.children.length > 0) {
            const child = nodeItem.value.children[0];
            if (child.dataTypeName === 'Array') {
                ElsMessage.warning('数组不能嵌套数组')
                nodeItem.value.children.splice(0, 1)
                setSelectItem()
                return
            }
            if (child.componentGroup == 'Container' || child.componentGroup == 'Show') {
                ElsMessage.warning('请先拖入固定类型的组件')
                nodeItem.value.children.splice(0, 1)
                setSelectItem()
                return
            }
            nodeItem.value.arrayDataType = child.dataType
            nodeItem.value.arrayDataTypeName = child.dataTypeName
            nodeItem.value.componentName = child.componentName
            nodeItem.value.componentGroup = child.componentGroup
            nodeItem.value.componentType = child.componentType
            nodeItem.value.componentTypeName = child.componentTypeName
            nodeItem.value.children = child.children
        }
        recordComponent()
    }
}


setValue({
    getCurrNode: () => {
        return getNodeValue(nodeItem.value.children)
    },
    getParentNode: () => {
        return getCurrNode()
    },
    removeItem: (item) => {
        lessCom.removeArrayItem(nodeItem.value.children, item)
    }
})

</script>
<template>
    <els-form v-if="isRoot" v-model="nodeItem" v-bind="nodeItem.config.baseConfig"
        :class="{ 'selected': getSelectItem()?.keyID == nodeItem.keyID }" @click.stop="setSelectItem(nodeItem)">
        <draggable tag="div" class="els-dynamic-root-form" :class="[{ 'els-dynamic-designer-empty': nodeItem.children.length == 0 && !isRoot }]"
            :list="nodeItem.children" v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 300 }"
             :data-type="nodeItem.arrayDataTypeName||nodeItem.dataTypeName" :sort="true" itemKey="keyID"
            handle=".els-view-move" @add="handleAddComponent"      :move="handleMove" >
            <template #item="{ element }">
                <DynamicDesignerViewInner :nodeItem="element" :key="element.keyID" ></DynamicDesignerViewInner>
            </template>
        </draggable>
    </els-form>
    <els-form v-else v-model="nodeItem" v-bind="nodeItem.config.baseConfig">
        <component :is="isMobile?'van-cell-group':'div'" :title="nodeItem.keyName">
            <draggable  :class="[{ 'els-dynamic-designer-empty': nodeItem.children.length == 0 }]" :list="nodeItem.children"
                v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 300 }" :style="[{ 'min-height': '50px' }]"
                :data-type="nodeItem.arrayDataTypeName||nodeItem.dataTypeName" :sort="true" itemKey="keyID" handle=".els-view-move"
                @add="handleAddComponent">
                <template #item="{ element }"      :move="handleMove" >              
                    <DynamicDesignerViewInner  :nodeItem="element" :key="element.keyID"></DynamicDesignerViewInner>
                </template>
            </draggable>
        </component>

            
    </els-form>
</template>
<style lang="less" scoped>
.el-form {
    position: relative;
    padding: 5px;

    &.selected {
        border: 2px solid #409EFF;

    }
}
.van-form{
    &.selected {
        border: 2px solid #409EFF;

    }
}
.els-dynamic-root-form{
    height: var(--mainHeight);
}

.els-dynamic-designer-empty {

    height: 50px;
    color: #a7b1bd;
    justify-content: center;
    display: flex;
    line-height: 50px;

    &::after {
        content: '拖动组件到此处';
        position: absolute;
        top: 0;
    }
}
</style>