<script setup lang="ts">
import {ref,computed} from 'vue'
import draggable from 'vuedraggable'
import { useValue } from '../../../utlis/use'
import { lessCom ,ElsMessage} from '../../../utlis/com'
import DynamicDesignerViewOperate from './Operate.vue'
import DynamicDesignerViewInner from './Inner.vue'
interface Props {
    nodeItem: Record<string, any>,
    parentNode:Record<string, any>
}

const props=defineProps<Props>()
const { getValue,setValue } = useValue(props)
const recordComponent = getValue<Function>('recordComponent', () => { })
const getSelectItem = getValue<Function>('getSelectItem', () => { })
const setSelectItem = getValue<Function>('setSelectItem', () => { })
const handleMove = getValue<Function>('handleMove', () => { })
const wrapStyle=computed(()=>{
    return "min-height:30px;width:100%;padding:10px 0px;"+props.nodeItem.config.advancedConfig?.style
    
}) 
const componentAttr=computed<any>(()=>{
    if(props.nodeItem.componentTypeName=='Option'){
        return {label:props.nodeItem.config.baseConfig.label||props.nodeItem.keyName,value:props.nodeItem.config.baseConfig.value||props.nodeItem.keyID}
    }else if(props.nodeItem.componentTypeName==='CollapseItem'){
        return {name:props.nodeItem.config.baseConfig.name||props.nodeItem.keyID}
    }
    return {}
})

function handleAddComponent(e) {
    recordComponent()
    setSelectItem(props.nodeItem.children[e.newIndex])
}


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
        :class="[{ 'selected': getSelectItem()?.keyID == nodeItem.keyID },{ 'els-dynamic-designer-empty': nodeItem.children.length == 0 }]"
        :data-restrict="nodeItem.restrictChild"
        :data-type="nodeItem.componentType"
        :list="nodeItem.children"
        :move="handleMove"
        :style="wrapStyle" itemKey="keyID" :sort="true"  handle=".els-view-move" @add="handleAddComponent">
        <template #item="{ element }">
            <els-col   class="create" v-if="nodeItem.componentTypeName==='Row'&&element.componentTypeName!=='Col'" :key="'col'+element.keyID">
                <DynamicDesignerViewInner :nodeItem="element"></DynamicDesignerViewInner>
            </els-col>
            <Wrap v-else  :data-type="element.componentType"     :data-restrict="element.restrictParent" :parentNode="nodeItem" :nodeItem="element" :key="element.keyID"></Wrap>
        </template>
    </draggable>
    <component v-else :is="nodeItem.componentName" 
       :class="{ 'selected': getSelectItem()?.keyID == nodeItem.keyID }"
       :style="nodeItem.config.advancedConfig?.style"
       v-bind="Object.assign(nodeItem.config.baseConfig,componentAttr)"
       @click.stop="setSelectItem(nodeItem)">
        <DynamicDesignerViewOperate :nodeItem="nodeItem" ></DynamicDesignerViewOperate>
        <draggable   :key="nodeItem.keyID" 
            v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 300 }"
            class="els-dynamic-designer-wrap"
            :class="[{ 'selected': getSelectItem()?.keyID == nodeItem.keyID },{ 'els-dynamic-designer-empty': nodeItem.children.length == 0 }]"
            :data-restrict="nodeItem.restrictChild"
            :data-type="nodeItem.componentType"
            :list="nodeItem.children"
            :move="handleMove"
            :style="wrapStyle" itemKey="keyID" :sort="true" handle=".els-view-move" @add="handleAddComponent" >
            <template #item="{ element }">
                <DynamicDesignerViewInner  :data-type="element.componentType"  :data-restrict="element.restrictParent" :nodeItem="element"  :key="'wrap'+element.keyID"></DynamicDesignerViewInner>
            </template>
        </draggable>
    </component>
    
</template>
<style lang="less" scoped>
.el-collapse-item:deep{
    .el-collapse-item__wrap{
        padding: 0;
        border: 1px dashed #aaaaaabf;
        margin-bottom: 5px;
        padding: 5px;
    
    }
    &.selected{
        .el-collapse-item__wrap{
            border: 2px solid #409EFF;

            >.el-collapse-item__content{
                position: relative;
                >.els-dynamic-d-v-item-type,
                >.els-dynamic-d-v-item-move {
                    background: #409effbd;
                    display: flex;
                }
            }
        }
    }
}
.el-tab-pane{
    border: 1px dashed #aaaaaabf;
    margin-bottom: 5px;
    padding: 5px;
    &.selected{
        border: 2px solid #409EFF;
    }
}

.els-dynamic-designer-wrap{
    &[data-type="FormItem"]{
        display:flex;
    }
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
    &:has(>div[class*='ghost']){
        flex-wrap: unset !important;
        column-gap: 20px;
        >.el-col{
            flex:auto;
            
        }
    }

    >.ghost{
        width: 1px !important;
        min-height: 85px;
    }
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

.els-dynamic-designer-empty:deep{
    height: 50px;
    color: #a7b1bd;
    justify-content: center;
    display: flex;
    >.ghost{
        width: 100% !important; 
        min-height: 1px;
    }
    &::after {
        content: '拖动组件到此处';
        margin: auto;
    }
    &:has(>[class*="ghost"]){
        &::after{content: '';}
    }
    
}
</style>