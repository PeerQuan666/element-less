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

const { setValue } = useValue(props)

setValue({
    isMobile: props.isMobile
})
</script>
<template>
    <DynamicDesignerViewForm :nodeItem="renderData[0]" :isRoot="true"
        v-if="renderData && renderData.length && renderData[0].componentType === 'Form'"></DynamicDesignerViewForm>
        <els-form v-model="renderData" v-else>
            <draggable tag="div" :list="renderData" v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 300 }"
                :style="[{ 'min-height': '650px' }]" :sort="true" itemKey="keyID" handle=".els-view-move">
                <template #item="{ element }">
                    <DynamicDesignerViewInner :nodeItem="element" :key="element.keyID">
                    </DynamicDesignerViewInner>
                </template>
            </draggable>
        </els-form>
</template>
<style lang="less" scoped></style>