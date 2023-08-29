<script lang="ts" setup>
import { inject, useAttrs } from 'vue';
interface Props {
    label: string,
}
defineOptions({ name: 'BbOptionGroup' })
defineProps<Props>()
const type = inject('type')
console.info(type)
const attrs = useAttrs()


</script>
<template>
    <el-option-group :label="label" v-if="type == 'select'" v-bind="attrs">
        <slot></slot>
    </el-option-group>
    <div style="width:100%" v-else>
        <div class="bb-radio-group-item" > {{ label }}</div>
        <slot v-bind="attrs"></slot>
    </div>
</template>
<style lang="less" scoped>
.bb-radio-group-item {
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    line-height: 28px;
    text-align: left;
    border-bottom: 1px solid #dcdfe6;
    margin-bottom: 10px;
}

</style>