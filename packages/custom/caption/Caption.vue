<script setup lang="ts">
import { ref,watch } from 'vue'
import { useValue } from '../../utlis/use';
import { FormItemProps } from '../../utlis/interfaces'
import { lessCom } from '../../utlis/com'
import { useModel,useFormValidation } from '../../utlis/use'
defineOptions({ name: "ElsCaption" })
interface Props extends FormItemProps{
    type?: string,
    title?: string,
    width?: string,
    height?: string
}
const props = withDefaults(defineProps<Props>(), ({
    labelWidth:"0",
    height:'150px',
    width:'450px'
}))
const { getValue } = useValue()
const {
    currModelValue,
    returnModelValue,
} = useModel(props)

const modifyVisible = ref()
const modelValue = defineModel<string>()
const dialogInputValue=ref()
const isMobile = getValue<boolean>("isMobile", false);



watch(currModelValue, (val) => {
    const currValue = val
    if (currValue) {
        modelValue.value = currValue
    }
}, { immediate: true })

function handleModify() {
    dialogInputValue.value = modelValue.value
    modifyVisible.value = true
}
function handleSave() {
    return new Promise((resolve,reject)=>{
        modelValue.value = dialogInputValue.value
        modifyVisible.value = false
        returnModelValue(dialogInputValue.value)
        resolve(true)
    })

}


</script>
<template>
        <div v-if="!isMobile" class="els-caption" :class="{ 'els-left-caption': type == 'left' }">
            <span class="els-caption-sub-header" v-if="type == 'left'"><i class="dec"></i></span>
            <span class="els-caption-title">
                <slot name="default">{{ modelValue || title  }}</slot>
                <el-icon v-if="modelValue!==undefined" @click="handleModify">
                    <Edit />
                </el-icon>
            </span>
        </div>
        <van-divider v-else>
            <slot>{{ title }}</slot>
        </van-divider>
        <els-dialog v-model="modifyVisible" title="修改" :width="width" :contentHeight="height" showConfirmButton :confirm="handleSave">
            <el-input v-model="dialogInputValue"></el-input>
        </els-dialog>
</template>

<style lang="less" scoped>
.els-caption-title {
    display: flex;
    align-items: center;
    column-gap: 5px;
}

.els-caption {
    margin-bottom: 18px;
    font-weight: bold;
    border-bottom: 2px solid #dcdfe6;
    padding-bottom: 5px;
    font-size: 13px;
    display: flex;
}


.els-left-caption {
    margin-bottom: 12px;
    font-size: 14px;
    font-weight: bold;
    line-height: 28px;
    border-bottom: none;
    padding-bottom: 0;
}

.els-left-caption .sub-header {
    display: inline-block;
}

.els-left-caption .dec {
    height: 18px;
    width: 6px;
    background-color: #3ba1df;
    margin-right: 10px;
    vertical-align: text-top;
    display: inline-block
}
</style>