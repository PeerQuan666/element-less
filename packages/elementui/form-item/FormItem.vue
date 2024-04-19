<script setup lang="ts">
import { ref, useAttrs, computed, useSlots, reactive, onUnmounted } from 'vue'

import { FormItemProps, QueryInfo } from '../../utlis/interfaces'
import { ElSpace } from 'element-plus';
import { lessCom } from '../../utlis/com'
import { useFormValidation } from '../../utlis/use'
import { useValue } from '../../utlis/use';
defineOptions({ name: "ElsFormItem" })
interface Props extends FormItemProps {
    spacer?: string
    spaceWrap?: boolean,
    spaceSize?: any
}

const props = withDefaults(defineProps<Props>(), {
    hasFormItem: true,
    aIndex: -1,
    tipPosition: 'left'
})

const { setValue, getValue } = useValue()
const removeQueryData = getValue<Function>('removeQueryData', () => { })
const setQueryData = getValue<Function>('setQueryData', () => { })
const getQueryData = getValue<Function>('getQueryData', () => { })
const formType = getValue<string>('formType', '')
const isMobile = getValue<boolean>('isMobile', false)
const attrs: any = useAttrs()
const formItem: any = ref()
const placeholder = ref()
const showPopup = ref(false)
const mobileValue = ref()

if (isMobile) {
    placeholder.value = "请选择" + props.label
}
const slots = useSlots()

function initRules() {
    if (formItem.value && formItem.value.clearValidate) {
        formItem.value.clearValidate();
    }
    return useFormValidation(props, attrs).initRules()
}

function initQuery() {
    if (getQueryData && (props.queryField || props.prop)) {
        let currKey = props.prop ?? lessCom.generateID()
        const currQueryData: any = getQueryData()
        if (currQueryData) {
            if (currQueryData[currKey]) {
                currKey += '_' + lessCom.generateID()
            }
        }
        const queryInfo: QueryInfo =
        {
            key: currKey,
            prop: props.queryField ?? props.prop,
            method: props.queryMethod,
            dataType: props.queryDataType,
            isAroundComma: props.queryAroundComma,
            isAutoQuery: props.queryAutoReadData,
            isRange: props.queryRange,
            isRangeOrEqual: props.queryRangeOrEqual,
            value: props.queryDefaultValue
        };
        return queryInfo
    }
    return null

}
const itemRules = computed<Array<Record<string, any>>>(() => {
    return initRules()
})
const defaultKey = ref<any>()
const defaultProp = ref<any>()
let startKey: any = attrs['propStart']
let endKey: any = attrs['propEnd']
let queryData: any = reactive({})




defaultKey.value = props.prop
if (formType == 'Query' && setQueryData) {
    queryData = initQuery()
    if (queryData) {
        setQueryData(queryData);
    }
    defaultKey.value = queryData?.key
}
defaultProp.value = defaultKey.value
if (props.aIndex > -1) {
    defaultProp.value = `[${props.aIndex}]['${defaultKey.value}']`
}


onUnmounted(() => {
    if (formType == 'Query' && removeQueryData) {
        removeQueryData(defaultKey.value)
    }
})
function confirmMobile(val) {
    mobileValue.value = val
    showPopup.value = false
}
function hiddenMobile() {
    showPopup.value = false
}


defineExpose({
    confirmMobile,
    hiddenMobile
})

if (!props.hasFormItem) {
    setValue({ 'tagContainer': 'formItem' })
}

</script>
<template>
    <template v-if="isMobile">
        <slot v-if="props.tagName === 'Input'"></slot>
        <template v-else-if="props.tagName == 'Select' || props.tagName == 'Datepicker' || props.tagName === 'Timepicker'">
            <van-field is-link v-model="mobileValue" readonly @click="showPopup = true" :placeholder="placeholder"
                :required="props.required" :label="label" :rules="itemRules"></van-field>
            <van-popup v-model:show="showPopup" position="bottom">
                <slot></slot>
            </van-popup>
        </template>
        <van-field v-model="mobileValue" v-bind="props" :label="label" :rules="itemRules" :placeholder="placeholder"
            :required="props.required" v-else>
            <template #input>
                <slot v-bind="attrs"></slot>
            </template>
        </van-field>
    </template>
    <el-form-item ref="formItem" :label="label" :labelWidth="labelWidth" :prop="defaultProp" :rules="itemRules" v-else>
        <template v-if="slots.label" #label>
            <slot name="label"></slot>
        </template>
        <template v-else-if="tip&&tipPosition=='left'" #label>
            <el-tooltip placement="top">
                <template #content>
                    <div v-html="tip"></div>
                </template>
                <span class="els-form-item-label">{{ label }} <el-icon style="margin-left:5px;cursor: pointer;">
                        <Question-Filled /></el-icon></span>
            </el-tooltip>

        </template>
        <el-space v-if="spacer" :wrap="spaceWrap" :spacer="spacer" :size="spaceSize">
            <slot></slot>
        </el-space>
        <slot v-bind="{ key: defaultKey, startKey: startKey, endKey: endKey }"></slot>
        <template v-if="tip && tipPosition == 'right'">
            <el-tooltip placement="top">
                <template #content>
                    <div v-html="tip"></div>
                </template>
                <span class="els-form-item-append"><el-icon style="margin-left:5px;cursor: pointer;">
                        <Question-Filled /></el-icon></span>
            </el-tooltip>
        </template>
        <span v-if="suffixContent" v-html="suffixContent" class="els-form-item-append"></span>
        <template v-if="slots.error">
            <slot name="error"></slot>
        </template>
    </el-form-item>
</template>
<style lang="less">
.el-form-item__content {
    column-gap: 5px;
}

.els-form-item-label {
    display: flex;
    align-items: center;
}

.el-form-item__content:has(span[class^=els-form-item-append]) {
    flex-wrap: nowrap;
}
</style>