<script setup lang="ts">
import { ref, inject, watchEffect, watch, useAttrs, computed } from 'vue'
import '../../utlis/lessPrototype.js'
import lessCom from '../../utlis/lessCom';
interface Props {
    modelValue?: any,
    item: Record<string, any>,
    currDepath?: number,
    parentNode?: Record<string, any>,
    currNode?: Record<string, any>,
    nodeType?: Record<string, any>,
}

defineOptions({
    inheritAttrs: false
})

const controlData = inject<any>("componentData", [])
const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue', 'valueChange'])
const attrs = useAttrs()
const currValue = ref()

watchEffect(() => {
    currValue.value = props.modelValue
})


watch(currValue, (val) => {
    emits('update:modelValue', val)
    emits('valueChange', val)
})

function handleClear() {
    if (props.item.dataTypeName == 'Number' || props.item.arrayDataTypeName == 'Number') {
        currValue.value = 0;
    } if (props.item.dataTypeName == 'Bool' || props.item.arrayDataTypeName == 'Bool') {
        currValue.value = false;
    } else {
        currValue.value = '';
    }
}

const baseAttrs = computed(() => {
    let baseConfig={}
    const currControl = controlData.find(ele => ele.value == props.item.componentType)
    if (currControl?.defaultPropertys) {
        const currBaseConfig = Object.assign({}, currControl?.defaultPropertys, props.item.config.baseConfig)
        for (var key in currBaseConfig) {
            if (key) {
                if (currBaseConfig[key] === undefined || currBaseConfig[key] === '') {
                    delete currBaseConfig[key]
                }
            }
        }
        baseConfig = currBaseConfig
    }
    const currAttrs = Object.assign(lessCom.cloneObj(baseConfig), { 'style': props.item.config.advancedConfig.style }, attrs);
    const parseNumbers=['max','min','precision','step','rows']
    for(const name of parseNumbers){
        if(currAttrs[name]){
            currAttrs[name]=parseInt(currAttrs[name])
        }else{
            delete currAttrs[name]
        }
    }

    if (['Select', 'Radio', 'CheckBox', 'Cascader'].includes(props.item.componentType)) {
        if (props.item.dataTypeName == 'String' || props.item.arrayDataTypeName == 'Number') {
            currAttrs.valueType = 'Number'
        } else if (props.item.dataTypeName == 'Bool' || props.item.arrayDataTypeName == 'Bool') {
            currAttrs.valueType = 'Bool'
        }
    }
    return currAttrs
})
const componentAttrs = ref<any>(baseAttrs)
const componentName = ref('')

watchEffect(() => {
    componentName.value = props.item.componentName

})

</script>

<template>
    <template v-if="componentName">
        <component  :is="componentName"  v-bind="componentAttrs" v-model="currValue" 
            @clear="handleClear">
        </component>
    </template>
</template>