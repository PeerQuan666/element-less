<script setup lang="ts">
import draggable from 'vuedraggable'
import {computed} from 'vue'
interface Props {
    nodeItem: Record<string, any>,
}
import DynamicDesignerViewInner from './DynamicDesignerViewInner.vue'
const props=defineProps<Props>()
const componentAttr=computed<any>(()=>{
    if(props.nodeItem.componentTypeName=='Option'){
        return {label:props.nodeItem.config.baseConfig.label||props.nodeItem.keyName,value:props.nodeItem.config.baseConfig.value||props.nodeItem.keyCode}
    }
    return {}
})

</script>
<template>
    <draggable :tag="nodeItem.componentName" :filter="'.el-row'"   :componentData="Object.assign(componentAttr,nodeItem.config.baseConfig) "
        v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 300 }"
        class="els-dynamic-designer-wrap"
        :class="[{ 'els-dynamic-designer-empty': nodeItem.data.length == 0 }]"
        :data-restrict="nodeItem.restrictChild"
        :data-type="nodeItem.componentType"
        :list="nodeItem.data"
        :style="[{ 'min-height': nodeItem.data.length?'60px':'50px' }, { 'width': '100%' }]" itemKey="keyID" :sort="true" handle=".els-view-move">
        <template #item="{ element }">
            <DynamicDesignerViewInner :nodeItem="element"></DynamicDesignerViewInner>
        </template>
    </draggable>
</template>
<style lang="less" scoped>
.els-dynamic-designer-wrap:deep{
    align-items: center;
    .el-form-item{
        .el-tabs__content{
            &>.els-dynamic-d-v-item{
                margin-bottom: 0px;
            }
        }
    }
}
.el-tab-pane{
    border: 1px dashed #aaaaaabf;
    margin-bottom: 5px;
    padding: 5px;
}


.el-row:deep{
    >.el-col {
        padding-top: 5px;
        border-top: 1px;
        border-right: 0px;
        border-bottom: 1px;
        border-left: 1px;
        border-style: dashed;
        border-color: #aaaaaabf;
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
            border-left: 1px dashed #aaaaaabf;

        }
    }
}

.els-dynamic-designer-empty {
    background: #e5e6e8;
    height: 50px;
    color: #a7b1bd;
    line-height: 50px;
    justify-content: center;
    display: flex;

    &::after {
        content: '拖动组件到此处';
        position: absolute;
        top: 0;
    }
}
</style>