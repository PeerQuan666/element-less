<script setup lang="ts">
import { 
     computed } from 'vue'
import { useValue } from '../../utlis/use'
import DynamicRenderInner from './DynamicRenderInner.vue'

interface Props {
    nodeItem: Record<string, any>,
    parentNode?: Record<string, any>,
}


const props =defineProps<Props>()
const {getValue}=useValue()
const isMobile=getValue<boolean>('isMobile',false)
const emits = defineEmits(['update:data'])

const getNodeData=getValue<Function>('getNodeData',{})
    const getParentNodeData=getValue<Function>('getParentNodeData',{})


const parentNode=computed(()=>{
    return getParentNodeData()
})
const currNode=computed(()=>{
    return getNodeData()
})

function handleIfExpress(item) {
    try {
        if (item.config.advancedConfig && item.config.advancedConfig.vif) {
            let currEvent = new Function('parentNode,currNode', "return " + item.config.advancedConfig.vif);
            return currEvent(parentNode.value, currNode.value);
        }
    } catch (err) {
        console.error(err)
        debugger
    }

    return true;
}
const componentAttr=computed<any>(()=>{
    const baseConfig=props.nodeItem.config.baseConfig
    if(props.nodeItem.componentTypeName=='Option'){
        return Object.assign({},baseConfig,{label:props.nodeItem.config.baseConfig.label||props.nodeItem.keyName,value:props.nodeItem.config.baseConfig.value||props.nodeItem.keyCode}) 
    }
    return baseConfig
})

</script>
<template>
     <component :is="nodeItem?.componentName"  :style="nodeItem.config.advancedConfig?.style" v-bind="componentAttr" v-if="handleIfExpress(nodeItem)">
        <DynamicRenderInner v-for="item in nodeItem.data" :nodeItem="item" :key="item.keyID"></DynamicRenderInner>
     </component>
</template>
