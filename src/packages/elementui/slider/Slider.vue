<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import '../../utlis/lessPrototype.js'
import { FormItemProps } from '../../utlis/interfaceCom'
import { info } from 'console';
defineOptions({ name: 'ElsSlider' })
interface Props extends FormItemProps {
    modelValue?: number | string,
    range?: boolean,
    valueSeparator?: string
}
const emits = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<Props>(), {
    valueSeparator: ','
})
const selectValue = ref()
function handleReturnResult(value) {
    if (value === undefined) { value = ''; }
    if (props.range) {
        emits('update:modelValue', value.toString());
    } else {
        emits('update:modelValue', value);
    }

}
onMounted(() => {

    if (props.range && props.modelValue) {
        selectValue.value = props.modelValue.toString().split(',').map(ele => +ele)
    }
    else if (typeof (props.modelValue) == "string" && !props.range) {
        selectValue.value = parseFloat(props.modelValue)
    }
    else if (props.modelValue) {
        selectValue.value = props.modelValue
    }

})

watch(() => props.modelValue, (val) => {
    if (props.range) {
        selectValue.value = val?.toString().split(props.valueSeparator)
        return
    }
    if (typeof (val) == "string") {
        selectValue.value = parseFloat(val)
        return
    }

    selectValue.value = val

})
watch(selectValue, (val) => {
    handleReturnResult(val);
})
</script>

<template>
    <el-slider v-model="selectValue"  :range="range"></el-slider>
</template>

