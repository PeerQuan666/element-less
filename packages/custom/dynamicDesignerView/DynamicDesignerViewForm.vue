<script setup lang="ts">
import {reactive} from 'vue'
import draggable from 'vuedraggable'
interface Props {
}
import DynamicDesignerViewInner from './DynamicDesignerViewInner.vue'
defineProps<Props>()
const nodeItem =defineModel<any>("nodeItem",{default:()=>{return reactive<Record<string, any>>([]);}})

</script>
<template>
    <els-form v-model="nodeItem" >
        <draggable tag="div" :class="[{'els-dynamic-designer-empty':nodeItem.data.length==0}]" :list="nodeItem.data" v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 300 }"
            :style="[{ 'min-height': '50px' }]"
            :sort="true" itemKey="keyID" handle=".els-view-move">
            <template #item="{element}">
                <DynamicDesignerViewInner :nodeItem="element"></DynamicDesignerViewInner>
            </template>
        </draggable>
    </els-form>
</template>
<style lang="less" scoped>

.el-form{position: relative; }
.els-dynamic-designer-empty{

    background: #e5e6e8;
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