<script setup lang="ts">
import { ref, useAttrs, computed, inject, useSlots,reactive } from 'vue'
import { FormItemProps, QueryInfo } from '../../utlis/interfaceCom'
import { ElSpace } from 'element-plus';
import lessCom from '../../utlis/lessCom.js'
defineOptions({ name: "ElsFormItem" })
interface Props extends FormItemProps {
    spacer?: string
    spaceWrap?: boolean,
    spaceSize?: any,

}
const props = defineProps<Props>()
const attrs: any = useAttrs()
const formItem: any = ref()
const setQueryData = inject<Function>('setQueryData',()=>{})
const getQueryData= inject<Function>('getQueryData',()=>{})
const formType = inject<string>('formType','')
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
        if (props.require) {
            currItemRules.push({ required: true, message: props.requireMessage ? props.requireMessage : (props.validationTrigger == 'change' ? '请选择' : '请输入') + currLabel, trigger: props.validationTrigger });
        }
        if (props.validationExpression) {
            currItemRules.push({ pattern: new RegExp(props.validationExpression), message: props.requireMessage ? props.requireMessage : currLabel + '格式错误' })
        }
        if (props.validationMethod) {
            currItemRules.push({ validator: props.validationMethod, trigger: props.validationTrigger })
        }
    }
    return currItemRules;
}

function initQuery() {
    if(getQueryData){
        let currKey=props.prop??lessCom.Guid32()
        const currQueryData:any=getQueryData()
        if(currQueryData){
            if(currQueryData[currKey]){
                currKey+='_'+lessCom.Guid32()
            }
        }
        const queryInfo: QueryInfo =
        {
            key:currKey,
            prop: props?.prop,
            method: props.queryMethod,
            dataType: props.queryDataType,
            isAroundComma: props.queryAroundComma,
            isAutoQuery: props.queryAutoReadData,
            Value: props.queryDefaultValue
        };
        return queryInfo
    }
    return null
   
}
const itemRules = computed<Array<Record<string, any>>>(() => {
    return initRules()
})
let defaultKey:any=props.prop
let queryData:any=reactive({})
if (formType == 'Query' && setQueryData) {
     queryData = initQuery()
    if(queryData){
        setQueryData(queryData);
    }
    defaultKey=queryData?.key
}
let startKey:any=attrs['propStart']
let endKey:any=attrs['propEnd']

</script>
<template>
    <el-form-item ref="formItem" :label="label"  :prop="defaultKey" :rules="itemRules">
        <template v-if="slots.label" #label>
            <slot name="label"></slot>
        </template>
        <el-space v-if="spacer" :wrap="spaceWrap" :spacer="spacer" :size="spaceSize">
            <slot></slot>
        </el-space>
        <slot  v-bind="{key:defaultKey,startKey:startKey,endKey:endKey}"></slot>

        <template v-if="slots.error">
            <slot name="error"></slot>
        </template>
    </el-form-item>
</template>
<style lang="less" >
.el-form-item__content {
    column-gap: 5px;
}
</style>