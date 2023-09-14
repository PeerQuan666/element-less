<script setup lang="ts">

defineOptions({ name: "ElsTip" })
interface Props {
    title?:string,
    type?: string
}
defineProps<Props>()
</script>
<template >
    <div class="custom-block" :class="type == 'warning' ? 'warning' : 'tip'">
        <p class="custom-block-title">
            <slot name="title">{{ title??(type == 'warning' ? 'WARNING' : 'TIP') }}</slot>
        </p>
        <slot></slot>
    </div>
</template>

<style lang="less" scoped>
.custom-block .custom-block-title {
    font-weight: 700
}

.custom-block p:not(.custom-block-title) {
    font-size: .9rem
}

.custom-block.tip {
    padding: 8px 16px;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid var(--el-color-primary);
    margin: 20px 0
}

.custom-block.warning {
    padding: 8px 16px;
    background-color: #f56c6c1a;
    border-radius: 4px;
    border-left: 5px solid var(--el-color-danger);
    margin: 20px 0
}
.custom-block code {
    margin: 0;
    border-radius: 4px;
    padding: .15rem .5rem;
    font-family: var(--code-font-family);
    font-size: var(--code-font-size);
    color: var(--code-text-color);
    line-height: var(--code-line-height);
    background-color: var(--code-bg-color);
}
</style>