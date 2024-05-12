<script setup lang="ts">
import { ref, watchEffect, useAttrs, computed } from 'vue'
import { lessCom } from '../../utlis/com'
import { useValue } from '../../utlis/use'
interface Props {
    nodeItem: Record<string, any>,
}

defineOptions({
    inheritAttrs: false
})

const {getValue} =useValue()
const controlData = getValue<any>("componentData", [])
const props = defineProps<Props>()
const attrs = useAttrs()
const currValue = ref()


const baseAttrs = computed(() => {
    let baseConfig={}
    const currNodeItem=props.nodeItem
    const currControl = controlData.find(ele => ele.value == currNodeItem.componentType)
    
    if (currControl?.defaultPropertys) {
        const currBaseConfig = Object.assign({}, currControl?.defaultPropertys, currNodeItem.config.baseConfig)
        for (var key in currBaseConfig) {
            if (key) {
                if (currBaseConfig[key] === undefined || currBaseConfig[key] === '') {
                    delete currBaseConfig[key]
                }
            }
        }
        baseConfig = currBaseConfig
    }

    const currAttrs = Object.assign(lessCom.cloneObj(baseConfig),lessCom.cloneObj(currNodeItem.config.formConfig),{ 'style': currNodeItem.config.advancedConfig.style }, attrs);

    currAttrs["label"]=currNodeItem.keyName

    const parseNumbers=['max','min','precision','step','rows']
    for(const name of parseNumbers){
        if(currAttrs[name]){
            currAttrs[name]=parseInt(currAttrs[name])
        }else{
            delete currAttrs[name]
        }
    }
    

    if (['Select', 'Radio', 'CheckBox', 'Cascader'].includes(currNodeItem.componentTypeName)) {
        if (currNodeItem.dataTypeName == 'String' || currNodeItem.arrayDataTypeName == 'Number') {
            currAttrs.valueType = 'Number'
        } else if (currNodeItem.dataTypeName == 'Bool' || currNodeItem.arrayDataTypeName == 'Bool') {
            currAttrs.valueType = 'Bool'
        }
    }
    return currAttrs
})
const componentAttrs = ref<any>(baseAttrs)
const componentName = ref('')

watchEffect(() => {
    componentName.value = props.nodeItem.componentName

})

</script>

<template>
    <template v-if="componentName">
        <component  :is="componentName"  v-bind="componentAttrs" v-model="currValue" >
        </component>
    </template>
    <els-tip v-else type="danger">未设置组件名</els-tip>
</template>