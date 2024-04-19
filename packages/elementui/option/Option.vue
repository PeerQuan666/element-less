<script lang="ts" setup>

import { ref, useSlots, reactive, useAttrs, watchEffect } from 'vue';
import { useValue } from '../../utlis/use';
defineOptions({ name: 'ElsOption' })
interface Props {
    type?: string,
    label?: string,
    value?: any
}
const props = defineProps<Props>()
const {getValue}=useValue()
const componentName = ref('')
const currLabel = ref('')
const multiple = ref(getValue('multiple', false))
const provideOption = getValue<any>('provideOption', undefined)
const setExtraOption = getValue<Function>('setExtraOption',()=>null)

const slots = useSlots()
const optionStyle: any = reactive([]);
const attrs = useAttrs()
const currType=ref()



watchEffect(() => {
    if (provideOption&&provideOption.value) { 
        const optionWidth = provideOption.value.optionWidth
        if (optionWidth) {
            optionStyle.push({ 'width': optionWidth.appendPx() })

        }
        currType.value = provideOption.value.type
        if (currType.value != 'tabs' && currType.value != 'dropdown') {
            switch (currType.value) {
                case 'radio':
                    componentName.value = 'el-radio';
                    break;
                case 'radiobutton':
                    componentName.value = 'el-radio-button';
                    break;
                case 'checkbox':
                    componentName.value = 'el-checkbox';
                    break;
                case 'checkboxbutton':
                    componentName.value = 'el-checkbox-button';
                    break;
            }
        }
        currLabel.value = props.label ?? '';
        if (currType.value == "select" || currType.value.indexOf("checkbox") > -1 || currType.value.indexOf("radio") > -1) {
            if (slots.default && slots.default()[0].type?.toString() == "Symbol(v-txt)") {
                currLabel.value = slots.default()[0].children?.toString() ?? ''
            }
        }

    }


})



if (setExtraOption) {
    setExtraOption({ label: currLabel.value, value: props.value ?? currLabel.value });
}
</script>
<template>
  
    <el-option v-if="currType == 'select'" :label="currLabel" :value="value ?? currLabel" v-bind="attrs">
        <i class="check" v-if="multiple"></i>
        <slot name="default">{{ currLabel }}</slot>
    </el-option>
    <el-tab-pane v-else-if="currType == 'tabs'" :label="label" :name="value ?? currLabel" v-bind="attrs">
        <template #default>
            <slot name="default"></slot>
        </template>
        <template #label v-if="slots.label">
            <slot name="label"></slot>
        </template>
    </el-tab-pane>
    <el-dropdown-item v-else-if="currType == 'dropdown'" :command="value ?? currLabel" v-bind="attrs">
        <template #default>
            <slot name="default">{{ value }}</slot>
        </template>
        <template #dropdown v-if="slots.dropdown">
            <slot name="dropdown"></slot>
        </template>
    </el-dropdown-item>
    <component v-else :is="componentName" :style="optionStyle" v-bind="attrs" :label="value ?? currLabel">
        <slot name="default"> {{ provideOption }}</slot>
    </component>
</template>
