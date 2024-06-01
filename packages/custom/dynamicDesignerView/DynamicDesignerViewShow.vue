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

const baseAttrs = computed(() => {
    let baseConfig={}
    const currNodeItem=props.nodeItem
    const currControl = controlData.find(ele => ele.value == currNodeItem.componentType)
    
    if (currControl?.defaultPropertys) {
        const currBaseConfig = currNodeItem.config.baseConfig
        for (var key in currBaseConfig) {
            if (key) {
                if (currBaseConfig[key] === undefined || currBaseConfig[key] === '') {
                    delete currBaseConfig[key]
                }
            }
        }
        lessCom.setDefaultPropertys(currBaseConfig,currControl.defaultPropertys)
        baseConfig = currBaseConfig
    }

    const currAttrs = Object.assign({},{ 'style': currNodeItem.config.advancedConfig.style }, attrs,lessCom.cloneObj(baseConfig));

    currAttrs["label"]=currNodeItem.keyName
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
        <component  :is="componentName"  v-bind="componentAttrs"  >
        </component>
    </template>
    <els-tip v-else type="danger">未设置组件名</els-tip>
</template>