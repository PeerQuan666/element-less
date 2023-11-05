<script setup lang="ts">
import { ref, useAttrs,inject,computed,watch } from 'vue'
import '../../utlis/lessPrototype.js'
import { RangeFormItemProps } from '../../utlis/interfaceCom'
import lessCom from '../../utlis/lessCom';
import {useRangeModel} from '../../utlis/componentCom.js'
const emits = defineEmits(['update:modelValue', 'update:start', 'update:end'])
defineOptions({ name: 'ElsInputRange',
    inheritAttrs:false })

interface Props extends RangeFormItemProps {
    modelValue?: string,
    start?: number | string,
    end?: number | string,
    startPlaceholder?: string,
    endPlaceholder?: string,
    isNumber?: boolean,
    onChange?: Function,
    width?: string,
    valueSeparator: ',',
}

const props = withDefaults(defineProps<Props>(), {
    valueSeparator: ',',
    queryRangeOrEqual: true,
    isNumber: true,
    width: '100'
})
const attrs = useAttrs()
const currValue = ref<any>('')
const currStartValue = ref()
const currEndValue = ref()

useRangeModel(props,currValue,currStartValue,currEndValue)

function handleChange() {
    if (props.onChange) {
        props.onChange([currStartValue.value, currEndValue.value])

    }
}


</script>

<template>
       <div class="els-node">
    <ElsFormNode v-bind="lessCom.getFormNodeProps(props)">
        <el-space class="els-range">
            <els-input auto-complete="on" :placeholder="startPlaceholder" :width="width" v-bind="attrs"
                v-model="currStartValue" @change="handleChange">
            </els-input>
            <slot name="range-separator">-</slot>
            <els-input auto-complete="on" :placeholder="endPlaceholder" :width="width" v-bind="attrs" v-model="currEndValue"
                 @change="handleChange">
            </els-input>
        </el-space>
     </ElsFormNode>
    </div>
</template>

