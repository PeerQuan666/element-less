<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'

import { useVModel } from '@vueuse/core'
import { lessCom } from '../../utlis/com'
import { useValue } from '../../utlis/use'

import DynamicRenderInnerItem from './DynamicRenderInnerItem.vue'
import DynamicRenderInner from './DynamicRenderInner.vue'
import DynamicRenderInnerArray from './DynamicRenderInnerArray.vue'

interface Props {
    nodeItem?: Record<string, any>,
    data: Array<Record<string, any>> | Record<string, any>,
    depath?: number,
    containerName?: string,
    parentNode?: Record<string, any>,
}


const props =defineProps<Props>()
const {getValue}=useValue()
const isMobile=getValue<boolean>('isMobile',false)
const emits = defineEmits(['update:data'])

const currData = useVModel(props, 'data', emits)

const labelWidth = ref(getValue<any>('labelWidth', undefined))
const currDepath = ref(0)
const itemClassName = ref('')

const currNode = computed(() => {
    let currData = {}
    props.data.forEach(ele => {
        if (ele.componentTypeName == 'Row') {
            ele.data.forEach(cele => {
                currData[cele.keyCode] = cele
            })
        } else {
            currData[ele.keyCode] = ele
        }
    })
    return currData
})

function handleDisabledExpress(item) {
    
    if (item.config.baseConfig && item.config.advancedConfig.disabled) {
        let currEvent = new Function('parentNode,currNode', "return " + item.config.advancedConfig.disabled);
        return currEvent(props.parentNode, currNode.value);
    }
    return false;
}
function handleIfExpress(item) {
    try {
        if (item.config.advancedConfig && item.config.advancedConfig.vif) {
            let currEvent = new Function('parentNode,currNode', "return " + item.config.advancedConfig.vif);
            return currEvent(props.parentNode, currNode.value);
        }
    } catch (err) {
        console.error(err)
        debugger
    }

    return true;
}
function handleValueChange(val, item) {
    if (item.config.advancedConfig && item.config.advancedConfig.eventChange) {
        let currEvent = new Function('val,parentNode,currNode', item.config.advancedConfig.eventChange)
        currEvent(val, props.parentNode, currNode.value);
    }
}
function getFormItemAttr(item) {
    const currFormConfig = lessCom.cloneObj(item.config.formConfig)
    if ((item.dataTypeName == 'None' || item.config.baseConfig?.componentName == 'ElsCaption' || item.componentTypeName === 'Row')) {
        currFormConfig.labelWidth = '0px'
    } else if (item.dataTypeName == 'Array' && item.arrayDataTypeName == 'Object') {
        delete currFormConfig.labelWidth
    }
    if (currFormConfig) {
        if (currFormConfig.validMethod) {
            let currEvent = new Function('parentNode,currNode', "return " + currFormConfig.validMethod);
            currFormConfig.validMethod = currEvent(props.parentNode, currNode.value);
        } else {
            delete currFormConfig.validMethod
        }
    } 
    if(item.required){
        currFormConfig['required']=true
    }
    if(item.description){
        currFormConfig['tip']=item.description
    }
    return currFormConfig
}

function handleAddItem(item) {
    return lessCom.cloneObj(item.arrayObjData)
}


if (props.depath && props.depath > 0) {
    itemClassName.value = "els-dynamic-r-item-child";

} else {
    itemClassName.value = "els-dynamic-r-item";
}
watchEffect(() => {
    const formConfig = props.nodeItem?.config.formConfig
    if (props.nodeItem && formConfig&&formConfig.labelWidth) {
        labelWidth.value = formConfig.labelWidth
    }

})
function handleRemove(item,index) {
    item.data.splice(index, 1)
}
currDepath.value += 1;



</script>
<template>
    <els-form v-model="currData" :label-width="labelWidth" v-bind="nodeItem?.config?.formConfig">
        <component :is="nodeItem?.componentTypeName=='Row'?'ElsRow':'div'" :class="itemClassName"
            :style="nodeItem?.componentTypeName === 'Row' ? nodeItem ? nodeItem.config.advancedConfig?.style : '' : ''">

            <component :is="nodeItem?.componentTypeName==='Row'?'els-col':'div'" v-for="(item, index) in currData">

                <template v-if="handleIfExpress(item)">

                    <DynamicRenderInner v-if="item.componentTypeName == 'Row'" :data="item.data" :parentNode="currNode"
                        :node-item="item" :depath="currDepath">
                    </DynamicRenderInner>
                    <template v-else>
                     
                            <template v-if="isMobile">
                                <els-caption v-if="item.componentTypeName== 'Caption'"
                                    v-bind="item.config.baseConfig"
                                    :title="!item.config.baseConfig.title ? item.keyName : item.config.baseConfig.title"></els-caption>

                                  <DynamicRenderInnerItem :key="item.keyID"
                                        v-if="item.dataTypeName !== 'Array' && item.componentTypeName && item.componentGroup === 'Form'"
                                        :disabled="handleDisabledExpress(item)" :parent-node="parentNode" :curr-node="currNode"
                                        :item="item" v-model="item.value" :style="item.config.advancedConfig.style"
                                        @valueChange="handleValueChange($event, item)" 
                                        v-bind="getFormItemAttr(item)" 
                                        :label="item.config.baseConfig?.componentName == 'ElsCaption' ? '' : item.keyName">
                                    </DynamicRenderInnerItem>
                                    <van-cell-group  :title="item.keyName" v-else-if="item.dataTypeName == 'Object'" >
                                    <DynamicRenderInner  :data="item.data"
                                        :parentNode="currNode" :node-item="item" :depath="currDepath">
                                    </DynamicRenderInner>
                                    </van-cell-group>
                                    
                                    <els-form-item 
                                     class="els-dynamic-s-array-m-container"
                                     :label="item.config.baseConfig?.componentName == 'ElsCaption' ? '' : item.keyName"
                                  :required="item.config.formConfig.required"
                                     v-else-if="item.dataTypeName == 'Array' && item.arrayDataType && item.componentTypeName"
                                     >
                                    
                                        <DynamicRenderInnerArray
                                            :parent-node="parentNode" :item="item" :depath="currDepath">
                                        </DynamicRenderInnerArray>
                                    </els-form-item>
                                    <div  v-else-if="item.dataTypeName == 'Array' && item.arrayDataTypeName == 'Object'"
                                        class="els-dynamic-r-array-m-container">
                                        <els-list  :labelWidth="item.config.formConfig.labelWidth" v-model="item.data"
                                            @add="handleAddItem(item)"  :hasForm="false" itemKey="keyID"
                                            :isRemove="false" :sortable="false"
                                            >
                                            <template #default="{ $item ,$index}">
                                                <van-cell-group  :title="item.keyName+' '+($index+1)">
                                                    <template #title>
                                                        <div class="els-dynamic-r-mobile-title"><span>{{ item.keyName+' '+($index+1) }}</span><span class="txt-red" @click="handleRemove(item,$index)">删除</span></div>
                                                    </template>
                                                    <DynamicRenderInner :parent-node="currNode" :node-item="item" :data="$item"
                                                        :depath="currDepath">
                                                    </DynamicRenderInner>
                                              </van-cell-group>
                                            </template>
                                        </els-list>
                                    </div>
                            </template>
                            <template v-else>
                                <els-caption v-if="item.config.baseConfig?.componentName == 'ElsCaption'"
                                    v-bind="item.config.baseConfig"
                                    :title="!item.config.baseConfig.title ? item.keyName : item.config.baseConfig.title"></els-caption>

                                <els-form-item
                                    v-if="item.componentGroup === 'Form' || item.dataTypeName === 'Array' || item.dataTypeName == 'Object'"
                                    :hasFormItem="false" :key="item.keyID" v-bind="getFormItemAttr(item)"
                                    :class="item.dataTypeName == 'Object' ? 'els-dynamic-obj' : ''"
                                    :style="item.config.baseConfig?.componentName == 'ElsCaption' || item.dataTypeName == 'Object' ? 'margin-bottom:0 !important' : ''"
                                    :label="item.config.baseConfig?.componentName == 'ElsCaption' ? '' : item.keyName"
                                    :prop="`[${index}].value`">
                                    <DynamicRenderInnerItem :key="item.keyID"
                                        v-if="item.dataTypeName !== 'Array' && item.componentTypeName && item.componentGroup === 'Form'"
                                        :disabled="handleDisabledExpress(item)" :parent-node="parentNode" :curr-node="currNode"
                                        :item="item" v-model="item.value" :style="item.config.advancedConfig.style"
                                        @valueChange="handleValueChange($event, item)">
                                    </DynamicRenderInnerItem>

                                    <DynamicRenderInner v-else-if="item.dataTypeName == 'Object'" :data="item.data"
                                        :parentNode="currNode" :node-item="item" :depath="currDepath">
                                    </DynamicRenderInner>
                                    <DynamicRenderInnerArray
                                        v-else-if="item.dataTypeName == 'Array' && item.arrayDataType && item.componentTypeName"
                                        :parent-node="parentNode" :item="item" :depath="currDepath">
                                    </DynamicRenderInnerArray>
                                    <div v-else-if="item.dataTypeName == 'Array' && item.arrayDataTypeName == 'Object'"
                                        class="els-dynamic-r-array-container">
                                        <els-list  :labelWidth="item.config.formConfig.labelWidth" v-model="item.data"
                                            @add="handleAddItem(item)" item-class-name="els-dynamic-r-array" :hasForm="false"
                                            :style="item.config.advancedConfig.style ? item.config.advancedConfig.style : 
                                            [{ 'max-width': (item.config.arrayConfig.maxWidth ? item.config.arrayConfig.maxWidth + 'px' : '') },
                                            { 'max-height': (item.config.arrayConfig.maxHeight ? item.config.arrayConfig.maxHeight + 'px' : '') }, 
                                            { 'display': item.config.arrayConfig.arrangementType === 'Horizontal' ? 'flex' : '' },
                                            { 'flex-wrap': 'wrap' }, { 'gap': '5px' }, { 'overflow': 'scroll' },{'padding-right':'20px'}]">
                                            <template #default="{ $item }">
                                                <DynamicRenderInner :parent-node="currNode" :node-item="item" :data="$item"
                                                    :depath="currDepath">
                                                </DynamicRenderInner>
                                            </template>
                                        </els-list>
                                    </div>
                                </els-form-item>
                                <els-caption v-if="item.componentGroup === 'Desc' && item.componentTypeName == 'Caption'"
                                    v-bind="item.config.baseConfig" :title="!item.config.baseConfig.title ? item.keyName : item.config.baseConfig.title"></els-caption>
                        </template>
                  
                    </template>
                </template>
            </component>

        </component>
    </els-form>
</template>

<style scoped lang="less">
.txt-red{
    color:red;
}
.els-dynamic-r-array-m-container{
    ::v-deep(.els-list-bottom){text-align: center;line-height: 24px;
    padding: 5px 0;}
   
    ::v-deep(.listitem){display: unset !important;}
    .els-dynamic-r-item-child{display: unset !important;}

}
.els-dynamic-r-mobile-title{
    display: flex;
    justify-content: space-between;
}

//has影响性能
.el-row:has(div[class^=el-form-item]) {
    margin-bottom: 0px;
}

.el-form-item:has(div[class^=els-dynamic-render]) {
    margin-bottom: 0 !important;
}

.els-dynamic-render {
    .el-form-item__content {
        >.el-form {
            flex-grow: 1;
        }
    }

    .el-col>.el-form-item {
        margin-bottom: 18px;
    }
}

.els-dynamic-r-item-child {
    .el-form-item__content {
        .el-form {
            flex-grow: 1;

            .el-row:last-child {
                margin-bottom: 0px;
            }
        }

        .els_upload_container {
            flex-grow: 1;
        }
    }
    .el-form-item:has(form) {
        .el-form-item {
            margin-bottom: 18px;
        }
    }

}

.els-dynamic-obj {
    .el-form-item {
        margin-bottom: 18px !important;
    }

    .el-form-item .el-form-item {
        margin-bottom: 0px !important;
    }
}

.els-dynamic-r-array {
    border: 1px solid #dcdfe6;
    padding: 5px 60px 5px 5px;
    position: relative;

    >.els-list-operate {
        position: absolute;
        right: 0;
        top: 0;
        background: #e5efff;
        margin-left: 0px !important;
    }
}

.els-dynamic-r-array-container {
    overflow: scroll;
    flex-grow: 1;
}

.els-dynamic-r-item,
.els-dynamic-r-array {
    .el-form-item__content>.els-caption {
        margin-bottom: 0px;
    }

    .els-caption {
        flex-grow: 1;
    }

    .listitem {
        .els-list-operate {
            margin-bottom: 0;
        }

        >form {
            flex-grow: 1;

           //has影响性能
            .els-dynamic-r-item-child:has(label[class^=el-form-item__label]) {
                display: inherit
            }

            .els-dynamic-r-item-child {
                display: flex;
                gap: 5px;
            }
        }

        .els-dynamic-r-item-child {
            display: flex;
            gap: 5px;
        }

        .els-dynamic-r-item {
            display: flex;
        }
    }

}


.el-form-item__content>.els-dynamic-render>form>.els-dynamic-r-item {
    display: unset;

}

.el-form-item__content>.els-dynamic-render {
    flex-grow: 1;

}
.els-dynamic-r-array-item {
    >form>.els-dynamic-r-item {
        display: unset !important;
    }

    flex-grow: 1;

}

.els-dynamic-render>form>div>div:has([class^=el-form-item]) {
    margin-bottom: 18px;
}

.els-dynamic-render>form>div>div:has(form) {
    margin-bottom: 0px !important;
}



</style>