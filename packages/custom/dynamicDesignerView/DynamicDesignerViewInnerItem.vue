<script setup lang="ts">
import { ref, inject, watchEffect, watch, useAttrs, computed } from 'vue'
import { dynamicComponentType } from '../../utlis/lessConfig.js'
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

const props = withDefaults(defineProps<Props>(), {

})
const emits = defineEmits(['update:modelValue', 'valueChange'])

const attrs = useAttrs()
const currValue = ref()

watchEffect(() => {
    currValue.value = props.modelValue
})


const getUploadUrl = inject<Function>('getUploadUrl', () => null)


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
    const currControl = dynamicComponentType.find(ele => ele.value == props.item.componentType)
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

    if (currAttrs?.max) {
        currAttrs.max = parseInt(currAttrs.max)
    } else {
        delete currAttrs.max
    }
    if (currAttrs?.min) {
        currAttrs.min = parseInt(currAttrs.min)
    } else {
        delete currAttrs.min
    }

    if (currAttrs?.precision) {
        currAttrs.precision = parseFloat(currAttrs.precision)
    } else {
        delete currAttrs.precision
    }
    if (currAttrs?.step) {
        currAttrs.step = parseFloat(currAttrs.step)
    } else {
        delete currAttrs.step
    }

    if (currAttrs?.rows) {
        currAttrs.rows = parseFloat(currAttrs.rows)
    } else {
        delete currAttrs.rows
    }

    if (['Select', 'Radio', 'CheckBox', 'Cascader'].includes(props.item.componentType)) {
        if (props.item.dataTypeName == 'String' || props.item.arrayDataTypeName == 'Number') {

            currAttrs.valueType = 'Number'
        } else if (props.item.dataTypeName == 'Bool' || props.item.arrayDataTypeName == 'Bool') {
            currAttrs.valueType = 'Bool'
        }
    }

    //移除未设置字段
    if (!currAttrs.labelField) {
        delete currAttrs.labelField
    }
    if (!currAttrs.valueField) {
        delete currAttrs.valueField
    }
    return currAttrs
})
const componentAttrs = ref<any>(baseAttrs)
const showText = ref('')

const componentName = ref('')
watchEffect(() => {
    componentName.value = props.item.componentName

})









function getFileUploadUrl() {
    let currUrl = props.item.config.baseConfig.url || props.item.config.baseConfig.modalUrl
    if (currUrl) {
        if (currUrl.startsWith(":")) {
            currUrl = currUrl.substr(1);
            let currEvent = new Function('parentNode,currNode', "return " + currUrl);
            currUrl = currEvent(props.parentNode, props.currNode);
        }
        if (props.item.componentType === 'Upload') {
            return getUploadUrl(currUrl, props.item);

        } else {
            return currUrl.setPowerPublicQuery()
        }
    }
}



</script>

<template>

    <template v-if="componentName">
        <el-tag v-if="showText">{{ showText }}</el-tag>
        <component v-else :is="componentName"  v-bind="componentAttrs" v-model="currValue" :url="getFileUploadUrl()"
            @clear="handleClear">
        </component>
    </template>
</template>