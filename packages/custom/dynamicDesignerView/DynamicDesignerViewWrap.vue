<script setup lang="ts">
import {ref} from 'vue'
import draggable from 'vuedraggable'
import {computed} from 'vue'
import { useValue } from '../../utlis/use'
import { lessCom } from '../../utlis/com'
import DynamicDesignerViewOperate from './DynamicDesignerViewOperate.vue'
interface Props {
    nodeItem: Record<string, any>,
    parentNode:Record<string, any>
}
import DynamicDesignerViewInner from './DynamicDesignerViewInner.vue'
const props=defineProps<Props>()
const { getValue,setValue } = useValue(props)
const getSelectItem = getValue<Function>('getSelectItem', () => { })
const setSelectItem = getValue<Function>('setSelectItem', () => { })
const handleMove = getValue<Function>('handleMove', () => { })
const componentAttr=computed<any>(()=>{
    if(props.nodeItem.componentTypeName=='Option'){
        return {label:props.nodeItem.config.baseConfig.label||props.nodeItem.keyName,value:props.nodeItem.config.baseConfig.value||props.nodeItem.keyID}
    }
    return {}
})
setValue({
    removeItem:(item)=>{
        lessCom.removeArrayItem(props.parentNode.data,item)
    }
})

</script>
<template>
    <draggable v-if="nodeItem.componentName==='ElsRow'" :tag="nodeItem.componentName" @click.stop="setSelectItem(nodeItem)" :key="nodeItem.keyID" :componentData="Object.assign(nodeItem.config.baseConfig??{},componentAttr)"
        v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 300 }"
        class="els-dynamic-designer-wrap"
        :class="[{ 'selected': getSelectItem()?.keyID == nodeItem.keyID },{ 'els-dynamic-designer-empty': nodeItem.data.length == 0 }]"
        :data-restrict="nodeItem.restrictChild"
        :data-type="nodeItem.componentType"
        :list="nodeItem.data"
        :move="handleMove"
        :style="[{ 'min-height': '30px' }, { 'width': '100%' },{'padding':'10px 0px'}]" itemKey="keyID" :sort="true"  handle=".els-view-move">
        <template #item="{ element }">
            <els-col   class="create" v-if="nodeItem.componentTypeName==='Row'&&element.componentTypeName!=='Col'" :key="'col'+element.keyID">
                <DynamicDesignerViewInner :nodeItem="element"></DynamicDesignerViewInner>
            </els-col>
            <DynamicDesignerViewWrap v-else  :data-type="element.componentType"     :data-restrict="element.restrictParent" :parentNode="nodeItem" :nodeItem="element" :key="element.keyID"></DynamicDesignerViewWrap>
        </template>
    </draggable>

    <component v-else :is="nodeItem.componentName" :class="{ 'selected': getSelectItem()?.keyID == nodeItem.keyID }"  v-bind="Object.assign(nodeItem.config.baseConfig,componentAttr)" @click.stop="setSelectItem(nodeItem)">
        <DynamicDesignerViewOperate :nodeItem="nodeItem" ></DynamicDesignerViewOperate>
        <draggable   :key="nodeItem.keyID" 
            v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 300 }"
            class="els-dynamic-designer-wrap"
            :class="[{ 'selected': getSelectItem()?.keyID == nodeItem.keyID },{ 'els-dynamic-designer-empty': nodeItem.data.length == 0 }]"
            :data-restrict="nodeItem.restrictChild"
            :data-type="nodeItem.componentType"
            :list="nodeItem.data"
            :move="handleMove"
            :style="[{ 'min-height': '30px' }, { 'width': '100%' },{'padding':'10px 0px'}]" itemKey="keyID" :sort="true" handle=".els-view-move" >
            <template #item="{ element }">
                <DynamicDesignerViewInner  :data-type="element.componentType"     :data-restrict="element.restrictParent" :nodeItem="element"  :key="'wrap'+element.keyID"></DynamicDesignerViewInner>
            </template>
        </draggable>
    </component>
    
</template>
<style lang="less" scoped>

.el-tab-pane{
    border: 1px dashed #aaaaaabf;
    margin-bottom: 5px;
    padding: 5px;
    &.selected{
        border: 2px solid #409EFF;
    }
}

.els-dynamic-designer-wrap:deep{
    .el-form-item{
        .el-tabs__content{
            &>.els-dynamic-d-v-item{
                margin-bottom: 0px;
                padding-top: 0px;
                padding-bottom: 0px;
            }
        }
    }

}

.el-row:deep{
    >.el-col {
        position: relative;
        padding-top: 5px;
        border-top: 1px;
        border-right: 0px;
        border-bottom: 1px;
        border-left: 1px;
        border-style: dashed;
        border-color: #aaaaaabf;
        padding: 5px 5px 0 5px;
        >.el-form-item{
            margin-right: 5px;
        }
        .els-node {
            padding: 5px
        }

        &:has(>div[class*="els-dynamic-designer-empty"]) {
            padding: 0;
        }

        &:has(>.el-form-item>.el-form-item__content>.el-form>div[class*="els-dynamic-designer-empty"]) {
            padding: 0;
        }
        &:last-of-type{
            border-right: 1px dashed #aaaaaabf;

        }
        &.selected{
            border: 2px solid #409EFF;
            >.els-dynamic-d-v-item-type,
            >.els-dynamic-d-v-item-move {
                background: #409effbd;
                display: flex;
            }
        }
        &.create{
            border: unset;
        }
        
    }
}

.els-dynamic-designer-empty:deep {
    height: 50px;
    color: #a7b1bd;
    justify-content: center;
    display: flex;

    &::after {
        content: '拖动组件到此处';
        margin: auto;
    }
    &:has(>[class*="ghost"]){
        &::after{content: '';}
    }
    
}
</style>