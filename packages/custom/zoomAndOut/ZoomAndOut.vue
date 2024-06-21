<template>
    <div class="zoom-and-out-box">
        <div class="left" @click="reduce">-</div>
        <div class="center">{{ (modelValue*100).toFixed(0) }}%</div>
        <div class="right" @click="add">+</div>
    </div>
</template>
<script lang="ts" setup>
defineOptions({ name: "ElsZoomAndOut" })
interface Props {
    max?: number,
    min?: number,
    step?: number
}
const props = withDefaults(defineProps<Props>(), {
    max: 1,
    min: 0,
    step: 0.01
})
const modelValue = defineModel<number>({ default: 1 })
// 加
const add = () => {
    if (modelValue.value >= props.max) {
        return;
    }
    const currValue= modelValue.value+props.step

    modelValue.value = currValue.toFixed(2).toFloat()
}
// 减
const reduce = () => {
    if (modelValue.value <= props.min) {
        return;
    } else {
        const currValue= modelValue.value-props.step
        modelValue.value = currValue.toFixed(2).toFloat()
    }
}
</script>
<style lang="scss" scoped>
.zoom-and-out-box {
    display: flex;
    justify-content: space-between;
    width: 88px;
    background: #f2f2f2;
    border-radius: 10px;
    user-select: none;

    .left,
    .right {
        width: 20px;
        height: 20px;
        cursor: pointer;
        background: #eee;
        color: #888;
        border-radius: 10px;
        border: 1px #bbb solid;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 3px;
        transition: all 0.3s;

        &:hover {
            border-color: #74a274;
            opacity: 0.9;
            color: #74a274;
        }
    }

    .left {
        margin: 1px 0 0 1px;
        font-size: 24px;
    }

    .right {
        margin: 1px 1px 0 0;
        font-size: 18px;
    }

    .center {
        width: 40px;
        border: 0;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
        margin: 0 5px;
        color: #888;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>