<script setup lang="ts">
import { useValue } from '../../../utlis/use'
import { lessCom } from '../../../utlis/com'
import DynamicDesignerViewInnerItem from './InnerItem.vue'
import DynamicDesignerViewWrap from './Wrap.vue'
import DynamicDesignerViewForm from './Form.vue'
import DynamicDesignerViewShow from './Show.vue'
import DynamicDesignerViewOperate from './Operate.vue'

interface Props {
    nodeItem: Record<string, any>,
}
const props = defineProps<Props>()
const { getValue } = useValue(props)
const setSelectItem = getValue<Function>('setSelectItem', () => { })
const getSelectItem = getValue<Function>('getSelectItem', () => { })
const getCurrNode = getValue<Function>('getCurrNode', () => { return {} })
const getParentNode = getValue<Function>('getParentNode', () => { return {} })
const isMobile = getValue<boolean>('isMobile', false)
function handleSelectItem() {
    setSelectItem(props.nodeItem)
}
function getFormItemAttr() {
    const currFormConfig = lessCom.cloneObj(props.nodeItem.config.formConfig)
    if (props.nodeItem.required) {
        currFormConfig['required'] = true
    }
    if (props.nodeItem.description) {
        currFormConfig['tip'] = props.nodeItem.description
    }
    currFormConfig['label'] = props.nodeItem.keyName
    return currFormConfig
}


function handleDisabledExpress() {

    if (props.nodeItem.config.baseConfig && props.nodeItem.config.advancedConfig.disabled) {
        try {
            let currEvent = new Function('parentNode,currNode', "return " + props.nodeItem.config.advancedConfig.disabled);
            return currEvent(getParentNode(), getCurrNode());
        } catch (err) {
            console.log(props.nodeItem.keyName + '|Disabled错误', err)
        }

    }
    return false;
}

function handleValueChange(val) {
    if (props.nodeItem.config.advancedConfig && props.nodeItem.config.advancedConfig.eventChange) {
        try {
            let currEvent = new Function('val,parentNode,currNode', props.nodeItem.config.advancedConfig.eventChange)
            currEvent(val, getParentNode(), getCurrNode());
        } catch (err) {
            console.log(props.nodeItem.keyName + '|Change错误', err)
        }
    }
}



</script>
<template>
    <div class="els-dynamic-d-v-item" :style="nodeItem.config.advancedConfig?.style" :data-restrict="nodeItem.restrictChild" :data-type="nodeItem.componentType"
        :class="{ 'selected': getSelectItem()?.keyID == nodeItem.keyID }" @click.stop="handleSelectItem">
        <DynamicDesignerViewOperate :nodeItem="nodeItem"></DynamicDesignerViewOperate>

        <template v-if="nodeItem.componentGroup == 'Container'">
            <DynamicDesignerViewWrap  :parentNode="nodeItem" :nodeItem="nodeItem">
            </DynamicDesignerViewWrap>
        </template>
        
        <DynamicDesignerViewShow v-else-if="nodeItem.componentTypeName && nodeItem.componentGroup === 'Show'&&nodeItem.keyCode"
            :nodeItem="nodeItem" :style="nodeItem.config.advancedConfig.style" :title="nodeItem.keyName" v-model="nodeItem.value">
        </DynamicDesignerViewShow>
        <DynamicDesignerViewShow v-else-if="nodeItem.componentTypeName && nodeItem.componentGroup === 'Show'"
            :nodeItem="nodeItem" :style="nodeItem.config.advancedConfig.style" :title="nodeItem.keyName">
        </DynamicDesignerViewShow>


        <template v-else-if="isMobile&&(nodeItem.componentTypeName==='Input'||nodeItem.componentTypeName==='Textarea')">
            <DynamicDesignerViewInnerItem :disabled="handleDisabledExpress()"   v-bind="getFormItemAttr()" @valueChange="handleValueChange($event)"
                :nodeItem="nodeItem" :style="nodeItem.config.advancedConfig.style">
            </DynamicDesignerViewInnerItem>
        </template> 
        <els-form-node v-else-if="nodeItem.componentTypeName && nodeItem.componentGroup === 'Form'" :hasFormItem="false" :tagName="nodeItem.componentTypeName"
            v-bind="getFormItemAttr()">
            <DynamicDesignerViewInnerItem :disabled="handleDisabledExpress()" @valueChange="handleValueChange($event)"
                :nodeItem="nodeItem" :style="nodeItem.config.advancedConfig.style">
            </DynamicDesignerViewInnerItem>
        </els-form-node>
        <template v-else-if="nodeItem.dataTypeName === 'Array' || nodeItem.dataTypeName == 'Object'">
            <template v-if="nodeItem.config.baseConfig?.componentName == 'ElsCaption'">
                <els-caption v-if="nodeItem.config.baseConfig?.componentName == 'ElsCaption'"
                    v-bind="nodeItem.config.baseConfig" :title="nodeItem.config.baseConfig.title || nodeItem.keyName">
                </els-caption>
                <DynamicDesignerViewForm :nodeItem="nodeItem"></DynamicDesignerViewForm>
            </template>
            <els-form-node :hasForm="!isMobile"  v-else v-bind="getFormItemAttr()">
                <DynamicDesignerViewForm :nodeItem="nodeItem"></DynamicDesignerViewForm>
            </els-form-node>
        </template>
        
    </div>
</template>
<style scoped lang="less">
.els-dynamic-d-v-item:deep {
    position: relative;
    margin-bottom: 5px;
    padding: 20px 5px 5px 5px;
    border: 1px dashed #aaaaaabf;

    &.selected {
        border: 2px solid #409EFF;
        >.els-dynamic-d-v-item-type,
        >.els-dynamic-d-v-item-move {
            background: #409effbd;
            display: flex;
        }
    }

    .els-node {
        padding: 5px
    }

    &:has(>div[class*="el-tab-pane"]),&:has(>div[class*="el-collapse-item"])  {
        border: 0px;
        padding: 0px;
        margin: 0px;
    }
    &:has(>div[class*="el-collapse-item"]) {
        >.els-dynamic-d-v-item-move {
            display: none;
        }
    }
    &:has(>div[class*="els-dynamic-designer-empty"]) {
        padding: 0;
    }

    &:has(>div[data-type="Tabs"]) {
        padding: 0;
    }
}
.el-form-item:deep{
    >.el-form-item__content {
    >.el-form {
        .el-form-item {
            margin-bottom: 18px !important;
        }
    }

}
}


.el-form-item {
    margin-bottom: 0px;
}

.el-form {
    flex-grow: 1;
}
</style>
