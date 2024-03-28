<script setup lang="ts">
import { ref, useAttrs, computed, inject, useSlots, reactive, provide, onUnmounted } from 'vue'

import { FormItemProps, QueryInfo } from '../../utlis/interfaceCom'
import { ValidType } from '../../utlis/enumCom'
import { ElSpace } from 'element-plus';
import lessCom from '../../utlis/lessCom.js'
defineOptions({ name: "ElsFormItem" })
interface Props extends FormItemProps {
    spacer?: string
    spaceWrap?: boolean,
    spaceSize?: any,

}
const props = withDefaults(defineProps<Props>(), {
    queryAutoReadData: undefined,
    hasFormItem: true,
    aIndex: -1,
    tipPosition: 'left'
})

const attrs: any = useAttrs()
const formItem: any = ref()

const removeQueryData = inject<Function>('removeQueryData', () => { })
const setQueryData = inject<Function>('setQueryData', () => { })
const getQueryData = inject<Function>('getQueryData', () => { })
const formType = inject<string>('formType', '')
if (!props.hasFormItem) {
    provide('container', 'formitem')
}

const slots = useSlots()
function initRules() {
    if (formItem.value) {
        formItem.value.clearValidate();
    }
    let currItemRules: any = [];
    let currLabel = props.label ? props.label : '';
    if (attrs.rules) {
        return attrs.rules;
    } else {
        if (props.required) {
            currItemRules.push({ required: true, message: props.requiredMessage ? props.requiredMessage : (props.validTrigger == 'change' ? '请选择' : '请输入') + currLabel, trigger: props.validTrigger });
        }
        let validExpression = props.validExpression
        if (!validExpression) {
            switch (props.validType) {
                case ValidType.Number:
                    validExpression = "^-?\\d+$";
                    break;
                case ValidType.Float:
                    validExpression = "^([1-9]+\\d*(\\.\\d+)?|0\\.\\d+)$";
                    break;
                case ValidType.Price:
                    validExpression = "((^[1-9]\\d*)|^0)(\\.\\d{0,2}){0,1}$";
                    break;
                case ValidType.Date:
                    validExpression = "^(\\d{4})(-)(\\d{2})(-)(\\d{2})$";
                    break;
                case ValidType.DateTime:
                    validExpression = "^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$";
                    break;
                case ValidType.Time:
                    validExpression = "^(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$";
                    break;
                case ValidType.Email:
                    validExpression = "^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$";
                    break;
                case ValidType.Phone:
                    validExpression = "^[1][0-9]{10}$";
                    break;
                case ValidType.Character:
                    validExpression = "^[\\u4e00-\\u9fa5]{0,}$";
                    break;
                case ValidType.Url:
                    validExpression = "^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$";
                    break;
            }
        }
        if (validExpression) {
            currItemRules.push({ pattern: new RegExp(validExpression), message: props.validMessage ? props.validMessage : currLabel + '格式错误' })

        }
        if (props.validMethod) {
            currItemRules.push({ validator: props.validMethod, trigger: props.validTrigger })
        }
    }
    return currItemRules;
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
const defaultKey=ref<any>()
const defaultProp=ref<any>()
let queryData: any = reactive({})




defaultKey.value=props.prop
if (formType == 'Query' && setQueryData) {
    queryData = initQuery()
    if (queryData) {
        setQueryData(queryData);
    }
    defaultKey.value = queryData?.key
}
defaultProp.value=  defaultKey.value
if (props.aIndex > -1) {
    defaultProp.value = `[${props.aIndex}]['${defaultKey.value}']`
}


onUnmounted(()=>{
    if (formType == 'Query' && removeQueryData) {
        removeQueryData(defaultKey.value)
    }
})




let startKey: any = attrs['propStart']
let endKey: any = attrs['propEnd']

</script>
<template>
    <el-form-item ref="formItem" :label="label" :labelWidth="labelWidth" :prop="defaultProp" :rules="itemRules">

        <template v-if="slots.label" #label>
            <slot name="label"></slot>
        </template>
        <template v-else-if="tip&&tipPosition=='left'" #label>
            <el-tooltip placement="top">
                <template #content>
                    <div v-html="tip"></div>
                </template>
                <span class="els-form-item-label">{{ label }}   <el-icon style="margin-left:5px;cursor: pointer;">
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
<style lang="less" >
.el-form-item__content {
    column-gap: 5px;
}
.els-form-item-label{display: flex;align-items: center;}
.el-form-item__content:has(span[class^=els-form-item-append]){
    flex-wrap: nowrap;
}
</style>