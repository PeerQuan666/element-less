<script setup lang="ts">
import { reactive,ref,watch } from 'vue'
import { useValue } from '../../../utlis/use'
import DynamicDesignerViewForm from './Form.vue'
import DynamicDesignerViewInner from './Inner.vue'
import draggable from 'vuedraggable'
interface Props {
    isMobile?: boolean,

}
const renderData = defineModel<any>("renderData", { default: () => { return reactive<Array<Record<string, any>>>([]); } })
const props = withDefaults(defineProps<Props>(), {})

const { setValue, getValue } = useValue(props)
const handleMove = getValue<Function>('handleMove', () => { })
const setSelectItem = getValue<Function>('setSelectItem', () => { })
const recordComponent = getValue<Function>('recordComponent', () => { })
function handleAddComponent(e) {
    recordComponent()
    setSelectItem(renderData.value[e.newIndex])
}
setValue({
    isMobile: props.isMobile
})
const scroll=ref()
watch(renderData,()=>{

    scroll.value&&scroll.value.update()
},{deep:true})
</script>
<template>

    <ElScrollbar style="height: calc(var(--mainHeight) - 20px);"
       ref="scroll"
        v-if="renderData && renderData.length && renderData[0].componentType === 'Form'">
        <DynamicDesignerViewForm :nodeItem="renderData[0]" :isRoot="true"
            v-if="renderData && renderData.length && renderData[0].componentType === 'Form'"></DynamicDesignerViewForm>
    </ElScrollbar>
    <els-form v-model="renderData" v-else>
        <draggable tag="div" :list="renderData" v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 300 }"
            :style="[{ 'min-height': '350px' }, { 'overflow': 'scroll' }, { 'max-height': 'calc(var(--mainHeight) - 20px)' }]"
            :sort="true" itemKey="keyID" handle=".els-view-move" @add="handleAddComponent" :move="handleMove">
            <template #item="{ element }">
                <DynamicDesignerViewInner :nodeItem="element" :key="element.keyID">
                </DynamicDesignerViewInner>
            </template>
        </draggable>
    </els-form>
</template>
