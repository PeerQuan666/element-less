<script lang="ts" setup>
import { inject, useAttrs ,ref,watchEffect} from 'vue';
interface Props {
    label: string,
}
defineOptions({ name: 'ElsOptionGroup' })
defineProps<Props>()
const provideOption = inject<any>('provideOption', undefined)
const attrs = useAttrs()
const currType = ref()
watchEffect(() => {
    currType.value = provideOption.value.type


})

</script>
<template>
    <el-option-group :label="label" v-if="currType == 'select'" v-bind="attrs">
        <slot></slot>
    </el-option-group>
    <div style="width:100%" v-else>
        <div class="els-radio-group-item"> {{ label }}</div>
        <slot v-bind="attrs"></slot>
    </div>
</template>
<style lang="less" scoped>
.els-radio-group-item {
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    line-height: 28px;
    text-align: left;
    border-bottom: 1px solid #dcdfe6;
    margin-bottom: 10px;
}
</style>