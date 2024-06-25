<script setup lang="ts">
import { reactive,computed } from 'vue'
import { lessCom } from '../../../utlis/com'
import { useValue } from '../../../utlis/use'
const { getValue } = useValue()
import DynamicRenderInnerObjectArray from './InnerObjectArray.vue'
import DynamicRenderInnerItem from './InnerItem.vue'
import DynamicRenderInnerArray from './InnerArray.vue'
import DynamicRenderInnerWrap from './InnerWrap.vue'
import DynamicRenderShow from './Show.vue'
import DynamicRenderForm from './Form.vue'


interface Props {
    index: number,
}


const props = defineProps<Props>()
const isMobile = getValue<boolean>('isMobile', false)

const nodeItem = defineModel<any>("nodeItem", { default: () => { return reactive<Record<string, any>>([]); } })
const getCurrNode = getValue<Function>('getCurrNode', () => { return {} })
const getParentNode = getValue<Function>('getParentNode', () => { return {} })
const getFormPropIndex = getValue<Function>('getFormPropIndex', () => { return "" })

function handleIfExpress() {
    try {
        if (nodeItem.value.config && nodeItem.value.config.advancedConfig && nodeItem.value.config.advancedConfig.vif) {
            let currEvent = new Function('parentNode,currNode', "return " + nodeItem.value.config.advancedConfig.vif);
            return currEvent(getParentNode(), getCurrNode());
        }
    } catch (err) {
        console.error(err)
    }

    return true;
}
function handleValueChange(val, item) {
    if (item.config.advancedConfig && item.config.advancedConfig.eventChange) {
        let currEvent = new Function('val,parentNode,currNode', item.config.advancedConfig.eventChange)
        currEvent(val, getParentNode(), getCurrNode());
    }
}
function getFormItemAttr() {
    const currFormConfig = lessCom.cloneObj(nodeItem.value.config.formConfig)
    if ((nodeItem.value.dataTypeName == 'None' || nodeItem.value.config.baseConfig?.componentName == 'ElsCaption' || nodeItem.value.componentTypeName === 'Row')) {
        currFormConfig.labelWidth = '0px'
    } else if (nodeItem.value.dataTypeName == 'Array' && nodeItem.value.arrayDataTypeName == 'Object') {
        delete currFormConfig.labelWidth
    }
    if (currFormConfig) {
        if (currFormConfig.validMethod) {
            let currEvent = new Function('parentNode,currNode', "return " + currFormConfig.validMethod);
            currFormConfig.validMethod = currEvent(getParentNode(), getCurrNode());
        } else {
            delete currFormConfig.validMethod
        }
    }
    if (nodeItem.value.required) {
        currFormConfig['required'] = true
    }
    if (nodeItem.value.keyCode) {
        currFormConfig['prop'] = nodeItem.value.keyCode
    }
    if (nodeItem.value.description) {
        currFormConfig['tip'] = nodeItem.value.description
    }
    const currPropsIndex = getFormPropIndex()
    currFormConfig['prop'] = currPropsIndex + `[${props.index}].value`

    currFormConfig['label'] = nodeItem.value.keyName
    return currFormConfig
}

const hasForm=computed(()=>{
    if((nodeItem.value.dataTypeName === 'Object' || nodeItem.value.arrayDataTypeName == 'Object') &&nodeItem.value.config.baseConfig?.componentName == 'ElsCaption'){
        return false
    }
    return true
})

</script>
<template>
    <template v-if="handleIfExpress()">
        <template
            v-if="(nodeItem.dataTypeName === 'Object' || nodeItem.arrayDataTypeName == 'Object') &&nodeItem.config.baseConfig?.componentName == 'ElsCaption'">
            <els-caption v-bind="nodeItem.config.baseConfig"
                :title="nodeItem.config.baseConfig.title || nodeItem.keyName">
            </els-caption>
            
        </template>
        <DynamicRenderShow
            v-if="nodeItem.componentTypeName && nodeItem.componentGroup === 'Show' && nodeItem.keyCode"
            :nodeItem="nodeItem" :style="nodeItem.config.advancedConfig.style" v-model="nodeItem.value"
            :title="nodeItem.keyName">
        </DynamicRenderShow>
        <DynamicRenderShow v-else-if="nodeItem.componentTypeName && nodeItem.componentGroup === 'Show'"
            :nodeItem="nodeItem" :style="nodeItem.config.advancedConfig.style" :title="nodeItem.keyName">
        </DynamicRenderShow>

        <template v-else-if="nodeItem.componentGroup == 'Container'">
            <DynamicRenderInnerWrap :parentNode="nodeItem" :nodeItem="nodeItem" :index="index">
            </DynamicRenderInnerWrap>
        </template>

        <els-form-node :hasFormItem="false" :hasForm="hasForm" v-else-if="
            nodeItem.dataTypeName === 'Array'&&nodeItem.arrayDataType!=='Object'
            ||
            nodeItem.dataTypeName === 'Array'&&nodeItem.componentTypeName" 
            v-bind="getFormItemAttr()"
            :tagName="nodeItem.dataTypeName === 'Array' ? '' : nodeItem.componentTypeName">
            <DynamicRenderInnerArray :nodeItem="nodeItem">
            </DynamicRenderInnerArray>
        </els-form-node>

        <els-form-node :hasFormItem="false" :hasForm="!isMobile&&hasForm"
            v-else-if="nodeItem.dataTypeName == 'Object' || (nodeItem.dataTypeName === 'Array' && nodeItem.arrayDataType === 'Object')"
            v-bind="getFormItemAttr()" :tagName="nodeItem.dataTypeName === 'Array' ? '' : nodeItem.componentTypeName">
            <template v-if="nodeItem.dataTypeName == 'Object' && nodeItem.componentTypeName">
                <template v-if="isMobile">
                    <component :is="'van-cell-group'" :title="nodeItem.keyName">
                        <DynamicRenderInnerItem :nodeItem="nodeItem" v-model="nodeItem.value" 
                            @valueChange="handleValueChange($event, nodeItem)"
                            v-if="nodeItem.dataTypeName == 'Object' && nodeItem.componentTypeName">
                        </DynamicRenderInnerItem>
                    </component>
                </template>
                <DynamicRenderInnerItem v-else :nodeItem="nodeItem" v-model="nodeItem.value" 
                    @valueChange="handleValueChange($event, nodeItem)">
                </DynamicRenderInnerItem>
            </template>
          

            <DynamicRenderForm :nodeItem="nodeItem" v-else-if="nodeItem.dataTypeName == 'Object'"></DynamicRenderForm>
            <DynamicRenderInnerObjectArray v-else :nodeItem="nodeItem">
            </DynamicRenderInnerObjectArray>
        </els-form-node>

        <template v-else-if="isMobile && nodeItem.componentTypeName && nodeItem.componentGroup === 'Form'">
            <DynamicRenderInnerItem :nodeItem="nodeItem" v-model="nodeItem.value" v-bind="getFormItemAttr()"
                @valueChange="handleValueChange($event, nodeItem)">
            </DynamicRenderInnerItem>
        </template>
        <els-form-node :hasFormItem="false" :hasForm="hasForm"  v-else-if="nodeItem.componentTypeName && nodeItem.componentGroup === 'Form'"
            v-bind="getFormItemAttr()" :tagName="nodeItem.componentTypeName">
            <DynamicRenderInnerItem :nodeItem="nodeItem" v-model="nodeItem.value"
                @valueChange="handleValueChange($event, nodeItem)">
            </DynamicRenderInnerItem>
        </els-form-node>
    </template>


</template>

<style scoped lang="less">
.txt-red {
    color: red;
}
</style>