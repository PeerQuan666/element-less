<script setup lang="ts">
import { watch, ref, useAttrs } from 'vue'
import { FormItemProps } from '../../utlis/interfaces'
import { lessCom } from '../../utlis/com'
import { useModel } from '../../utlis/use'
defineOptions({
    name: 'ElsColorPicker',
    inheritAttrs: false
})
interface Props extends FormItemProps {
    modelValue?: string,
    showInput?: boolean,
    inputWidth?: string | number
}
const props = withDefaults(defineProps<Props>(), {
    showInput: false,
    inputWidth: '150px'
})

const attrs = useAttrs()
const currValue = ref()
const formNode = ref()


const {
    currModelValue,
    returnModelValue,
} = useModel(props)

watch(currModelValue, (val) => {
    currValue.value = val
}, { immediate: true })
watch(currValue, (val) => {
    returnModelValue(val)
})

</script>
<template>
    <div class="els-node">
        <ElsFormNode v-bind="lessCom.getFormNodeProps(props)" ref="formNode">
            <div class="els-color-picker">
                <el-input v-model="currValue" :style="[{ width: inputWidth.appendPx() }]"></el-input>
                <el-color-picker v-model="currValue" v-bind="attrs"></el-color-picker>
            </div>
        </ElsFormNode>
    </div>
</template>
<style scoped lang="less">
.els-color-picker {
    display: flex;
    column-gap:5px;
}

</style>