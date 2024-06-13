<script setup lang="ts">
import {reactive} from 'vue'
import { useValue } from '../../utlis/use'
import DynamicDesignerViewForm from './DynamicDesignerViewForm.vue'
import DynamicDesignerViewInner from './DynamicDesignerViewInner.vue'
import draggable from 'vuedraggable'
interface Props {
    isMobile?: boolean,

}
const renderData = defineModel<any>("renderData", { default: () => { return reactive<Array<Record<string, any>>>([]); } })
const props = withDefaults(defineProps<Props>(), {  })

const { setValue ,getValue} = useValue(props)
const setSelectItem = getValue<Function>('setSelectItem', () => { })
const recordComponent = getValue<Function>('recordComponent', () => { })
function handleAddComponent(e) {
    recordComponent()
    setSelectItem(renderData.value[e.newIndex])
}
setValue({
    isMobile: props.isMobile
})
</script>
<template>
   <ElScrollbar style="height: calc(100vh - 100px);" v-if="renderData && renderData.length && renderData[0].componentType === 'Form'">
    <DynamicDesignerViewForm :nodeItem="renderData[0]" :isRoot="true"
        ></DynamicDesignerViewForm>
    </ElScrollbar>
        <els-form v-model="renderData" v-else>
            <draggable tag="div" :list="renderData" v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 300 }"
                :style="[{ 'min-height': '650px'},{'overflow':'scroll'},{'max-height':'calc(100vh - 100px)'}]" :sort="true" itemKey="keyID" handle=".els-view-move" @add="handleAddComponent">
                <template #item="{ element }">
                    <DynamicDesignerViewInner :nodeItem="element" :key="element.keyID">
                    </DynamicDesignerViewInner>
                </template>
            </draggable>
        </els-form>
</template>
<style lang="less" scoped></style>