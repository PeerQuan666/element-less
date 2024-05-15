<script setup lang="ts">
import { useValue } from '../../utlis/use'
import {reactive} from 'vue'
import draggable from 'vuedraggable'
import { lessCom,ElsMessage } from '../../utlis/com'
interface Props {
    isRoot?:boolean
}
import DynamicDesignerViewInner from './DynamicDesignerViewInner.vue'
const props =defineProps<Props>()
const { getValue,setValue } = useValue(props)
 const recordComponent = getValue<Function>('recordComponent', () => { })
const nodeItem =defineModel<any>("nodeItem",{default:()=>{return reactive<Record<string, any>>([]);}})
const setSelectItem = getValue<Function>('setSelectItem', () => { })
const getSelectItem = getValue<Function>('getSelectItem', () => { })
function handleAddComponent(e) {
    recordComponent()
    setSelectItem(nodeItem.value.data[e.newIndex], nodeItem.value.data)
    initArrayChild()

}
function initArrayChild() {
    if(nodeItem.value.dataTypeName==='Array'&&!nodeItem.value.arrayDataTypeName){
        if(nodeItem.value.data.length>0){
            const child = nodeItem.value.data[0];
            if (child.dataTypeName === 'Array') {
                ElsMessage.warning('数组不能嵌套数组')
                nodeItem.value.data.splice(0, 1)
                return
            }
            if (nodeItem.value.dataTypeName == 'None') {
                ElsMessage.warning('数组中不能展示组件')
                nodeItem.value.data.splice(0, 1)
                return
            }
            nodeItem.value.arrayDataType = child.dataType
            nodeItem.value.arrayDataTypeName = child.dataTypeName
            nodeItem.value.componentName = child.componentName
            nodeItem.value.componentGroup = child.componentGroup
            nodeItem.value.componentType = child.componentType
            nodeItem.value.componentTypeName = child.componentTypeName
            nodeItem.value.data = child.data
        }
        recordComponent()
    }
}
function handleAddArrayComponent() {

    recordComponent()


}
function handleRemove(item) {
    var index = nodeItem.value.data.indexOf(item)
    nodeItem.value.data.splice(index, 1)
    setSelectItem(null)
    recordComponent()

}
setValue({
    removeItem:(item)=>{
        lessCom.removeArrayItem(nodeItem.value.data,item)
    }
})

</script>
<template>
     <els-form v-if="isRoot" v-model="nodeItem"  :class="{ 'selected': getSelectItem()?.keyID == nodeItem.keyID }"  @click="setSelectItem(nodeItem)">
        <draggable tag="div" :class="[{'els-dynamic-designer-empty':nodeItem.data.length==0&&!isRoot}]" :list="nodeItem.data" v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 300 }"
            :style="[{ 'min-height': '650px' }]"
            :data-type="nodeItem.dataTypeName"
            :sort="true" itemKey="keyID" handle=".els-view-move"
            @add="handleAddComponent"
            >
            <template #item="{element}" >
                <DynamicDesignerViewInner  :nodeItem="element" :key="element.keyID"></DynamicDesignerViewInner>
            </template>
        </draggable>
    </els-form>
    <els-form v-else v-model="nodeItem" >
        <draggable tag="div" :class="[{'els-dynamic-designer-empty':nodeItem.data.length==0}]" :list="nodeItem.data" v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 300 }"
            :style="[{ 'min-height': '50px' }]"
            :data-type="nodeItem.dataTypeName"
            :sort="true" itemKey="keyID" handle=".els-view-move"
            @add="handleAddComponent"
            >
            <template #item="{element}" >
                <DynamicDesignerViewInner  :nodeItem="element" :key="element.keyID"></DynamicDesignerViewInner>
            </template>
        </draggable>
    </els-form>
</template>
<style lang="less" scoped>

.el-form{position: relative; 
    padding:5px;
    &.selected{
        border: 2px solid #409EFF;
      
    }
}
.els-dynamic-designer-empty{

    height: 50px;
    color: #a7b1bd;
    justify-content: center;
    display: flex;
    line-height: 50px;
    &::after{
        content: '拖动组件到此处';
        position: absolute;
        top: 0;
    }
}
</style>