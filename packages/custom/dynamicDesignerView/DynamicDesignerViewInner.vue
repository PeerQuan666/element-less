<script setup lang="ts">
import { useValue } from '../../utlis/use'
import DynamicDesignerViewItem from './DynamicDesignerViewInnerItem.vue'
import DynamicDesignerViewWrap from './DynamicDesignerViewWrap.vue'
import DynamicDesignerViewForm from './DynamicDesignerViewForm.vue'
import { lessCom } from '../../utlis/com'
interface Props {
    nodeItem: Record<string, any>,
}
const props = defineProps<Props>()
const { getValue } = useValue(props)
const setSelectItem = getValue<Function>('setSelectItem', () => { })
const getSelectItem = getValue<Function>('getSelectItem', () => { })
function handleSelectItem(item,) {
    setSelectItem(item)
}
function getFormItemAttr() {
    const currFormConfig = lessCom.cloneObj(props.nodeItem.config.formConfig)
    if (props.nodeItem.required) {
        currFormConfig['required'] = true
    }
    if (props.nodeItem.description) {
        currFormConfig['tip'] = props.nodeItem.description
    }
    currFormConfig['label']=props.nodeItem.keyName
    return currFormConfig
}


</script>
<template>
   <div class="els-dynamic-d-v-item" >    
        <DynamicDesignerViewWrap  :nodeItem="nodeItem"  v-if="nodeItem.componentGroup == 'Container'"  >
        </DynamicDesignerViewWrap>
        <DynamicDesignerViewItem 
                     v-else-if="nodeItem.componentTypeName && nodeItem.componentGroup === 'Form'"
                    :nodeItem="nodeItem" 
                    :style="nodeItem.config.advancedConfig.style">
        </DynamicDesignerViewItem>
        <template v-else-if="nodeItem.dataTypeName === 'Array' || nodeItem.dataTypeName == 'Object'">
            <template v-if="nodeItem.config.baseConfig?.componentName == 'ElsCaption'">
                <els-caption v-if="nodeItem.config.baseConfig?.componentName == 'ElsCaption'" 
                    v-bind="nodeItem.config.baseConfig" :title="nodeItem.config.baseConfig.title || nodeItem.keyName">
                </els-caption>
                <DynamicDesignerViewForm  :nodeItem="nodeItem"  ></DynamicDesignerViewForm>
            </template>
            <els-form-item v-else v-bind="getFormItemAttr()">
                <DynamicDesignerViewForm  :nodeItem="nodeItem"  ></DynamicDesignerViewForm>
            </els-form-item>
        </template>
    </div>
</template>
<style scoped lang="less">
.els-dynamic-d-v-item{
    position: relative;
    margin-bottom: 5px;
    padding: 5px;
    border: 1px dashed #aaaaaabf;
    .els-node{
        padding:5px
    }
    &:has(>div[class*="el-tab-pane"]){
        border:0px;
    }
    &:has(>div[class*="els-dynamic-designer-empty"]){
        padding: 0;
    }
    &:has(>.el-form-item>.el-form-item__content>.el-form>div[class*="els-dynamic-designer-empty"]){
        padding: 0;
    }

}
.el-form-item:deep>.el-form-item__content {
    >.el-form{
        .el-form-item {
            margin-bottom: 18px !important;
        }
    }
    
}
.el-form-item{
    margin-bottom: 0px;
}
.el-form{
    flex-grow: 1;
}
</style>
