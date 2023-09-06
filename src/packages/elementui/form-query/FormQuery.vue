<script setup lang="ts">
import { ref, reactive, watch, useAttrs, computed, nextTick, inject, provide, onBeforeUnmount, onMounted, useSlots } from 'vue'
import lessCom from '../../utlis/lessCom.js'
import lodash from 'lodash';

import {ElForm } from 'element-plus'
import ElsFormItem from '../form-item/FormItem.vue';
import { QueryDataType, QueryMethod } from '../../utlis/enumCom';
import { QueryInfo } from '../../utlis/interfaceCom';
const { debounce } = lodash;
defineOptions({ name: 'ElsFormQuery' })
interface Props {
    queryTableRef?: string,
    queryAutoReadData?: boolean,
    queryParameterType?: string,//NoPost|NoQuery|Query
}
const props = withDefaults(defineProps<Props>(), {
    queryParameterType: 'Query',

})
const slots = useSlots()
const queryForm = ref()
const submitButton = ref()
const tagID = 'els-form' + lessCom.Guid32;
const attrs = useAttrs();
let modelData: Record<string, any> = reactive({})
let formData: Record<string, any> = ref({}) 
const debouncedQuerySearch = computed<Function>(() => {
    return debounce(handleSearch, 200)
})
const emits = defineEmits(['update:modelValue', 'search'])
provide('setQueryData', setQueryData)
provide('getQueryData',getQueryData)
provide('labelWidth', attrs['label-width'])
provide('formType', 'Query')
provide('formData',modelData)

onMounted(() => {
    recoverQueryState()
})
watch(modelData,(val)=>{
    const currData= Object.fromEntries(
         Object.keys(val).map(key => [key, val[key].Value])
    );
    formData.value={...currData}
    emits("update:modelValue", currData)
})
onBeforeUnmount(() => {
    console.info('卸载')
})
function getQueryData(){
    return modelData
}
function setQueryData(item) {
    if (Array.isArray(item)) {
        item.forEach(ele => {
            modelData[ele.key] = converToQueryData(ele);
            if (modelData[ele.key]["QueryParameterType"] != "NoPost" && modelData[ele.key]["IsAutoQuery"]) {
                watch(modelData[ele.key]['Value'], (newVal: any, oldVal: any) => {
                    if (newVal !== '' && newVal !== 0 && newVal == oldVal) {
                        return;
                    }
                    debouncedQuerySearch.value()
                })
            }
        })
    } else {
        modelData[item.key] = converToQueryData(item);
        if (modelData[item.key]["QueryParameterType"] != "NoPost" && modelData[item.key]["IsAutoQuery"]) {
            watch(modelData[item.key]['Value'], (newVal: any, oldVal: any) => {
                if (newVal !== '' && newVal !== 0 && newVal == oldVal) {
                    return;
                }
                debouncedQuerySearch.value()
            })
        }
    }
}
function converToQueryData(query:QueryInfo) {
    const queryFieldname = query.fieldName??''
    const isAroundComma = query.isAroundComma??false
    const queryDataType = query.dataType??QueryDataType.String
    const queryMethod:QueryMethod = query.method??QueryMethod.NoAuto
    const isAutoQuery=query.isAutoQuery??props.queryAutoReadData
    let parameterType = props.queryParameterType
    if(query.parameterType){
        parameterType=query.parameterType
    }

    let defaultValue = query.Value??''
    if(query.key){
        if (modelData[query.key] && modelData[query.key].Value !== '') {
            defaultValue = modelData[query.key].Value
        }
        return {
            QueryFieldName: queryFieldname,
            QueryDataType: queryDataType,
            QueryMethod: queryMethod,
            QueryParameterType: parameterType,
            IsAroundComma: isAroundComma,
            IsAutoQuery:isAutoQuery,
            Value: queryDataType === QueryDataType.Int&& defaultValue && lessCom.isNumber(defaultValue) ? parseFloat(defaultValue) : defaultValue
        }
    }
    return null
   
   
}
function recoverQueryState() {
    var currQueryDataStr = sessionStorage.getItem(`${tagID}_QueryData`);
    if (currQueryDataStr) {
        var currQueryData = JSON.parse(currQueryDataStr);
        currQueryData.QueryData.forEach(ele => {
            if (modelData[ele.Key] || modelData[ele.Key] === 0) {
                modelData[ele.Key].Value = ele.Value
            }
        })
        clearQueryState();
    }
    const isPageCompleteReadData = inject<boolean>('isPageCompleteReadData',false)
    if (isPageCompleteReadData) {
        //查询
    }
}

function cacheQueryState() {
    var currQueryData: any = [];
    for (let key in modelData) {
        var item = modelData[key];
        if (item.Value || item.Value === 0) {
            currQueryData.push({ Key: key, Value: item.Value })
        }
    }
    var cacheData = { QueryData: currQueryData, CreateTime: new Date().getTime() }
    if (currQueryData.length > 0) {
        sessionStorage.setItem(`$${tagID}_QueryData`, JSON.stringify(cacheData))
    }

}

function clearQueryState() {
    sessionStorage.removeItem(`${tagID}_QueryData`)
}
function handleSearch() {
    return new Promise((resolve) => {
        validate().then(res => {
            if (res) {
                if (attrs["onSearch"]) {
                    emits("search", modelData)
                    resolve(true)
                } else {
                    //查询...

                }
            } else {
                resolve(false)
            }
        })
    })
}
function clearValidate() {
    nextTick(() => {
        queryForm.value.clearValidate()
    })
}
function validate() {
    
    return new Promise((resolve) => {
        if (!queryForm.value) {
            resolve(true)
        } else {
            queryForm.value.validate().then(res => {
                resolve(res)
            }).catch(action => {
                console.log(action)
                resolve(false)
            })
        }

    })
}
function validateField(fields) {
    return queryForm.value.validateField(fields)
}
function handleSubmitButton() {
    submitButton.value.$el.trigger("click")
}
defineExpose({
    cacheQueryState,
    clearValidate,
    validateField,
    validate,
    handleSubmitButton
})


</script>

<template>
    <el-form :model="formData" class="queryForm" ref="queryForm"  onsubmit="return false;" inline :show-message="false">
       <slot v-if="false"></slot>
       <slot name="query" v-if="slots.default">
            <template v-for="vnode in slots.default()">
                <component :is="()=>vnode"  v-if="!(vnode.type as any).name||(vnode.type as any)?.name==='ElFormItem'||(vnode.type as any)?.name==='ElsFormItem'||!(vnode.type as any).props||!(vnode.type as any).props.hasFormItem||vnode.props&&(vnode as any).props['hasFormItem']===false"></component>
                <ElsFormItem :validationTrigger="(vnode.type as any).props.validationTrigger?.default" v-bind="vnode.props??{}"   v-else>
                    <template #default="{key}">
                        <component :is="vnode" v-if="(vnode as any).props.hasOwnProperty('modelValue')" ></component>
                        <component :is="vnode" v-else-if="modelData[key]"    v-model="modelData[key].Value"></component>
                        <component :is="vnode" v-else></component>
                    </template>
                </ElsFormItem>
            </template>
        </slot>
    </el-form>
</template>
<style lang="less" scoped>
.queryForm{
    display: flex;
    flex-wrap: wrap;
}
</style>


../../utlis/lessCom.js