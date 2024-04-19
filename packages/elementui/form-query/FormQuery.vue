<script setup lang="ts">
import { ref, reactive, watch, useAttrs, computed, nextTick, provide, onBeforeUnmount, onMounted } from 'vue'
import { lessCom } from '../../utlis/com'
import lodash from 'lodash';
import { ElForm } from 'element-plus'
import { QueryDataType, QueryMethod } from '../../utlis/enums';
import { QueryInfo } from '../../utlis/interfaces';
const { debounce } = lodash;
import { useValue, useContainer } from '../../utlis/use';
defineOptions({ name: 'ElsFormQuery' })

interface Props {
    modelValue?: any,
    queryData?:any,//兼容外部设置的查询数据
    tableRef?: string,
    autoReadData?: boolean,
    parameterType?: string,//NoPost|NoQuery|Query
}
const props = withDefaults(defineProps<Props>(), {
    parameterType: 'Query',
})
const container=useContainer()
const {setForm}=useValue(props)

const queryForm = ref()
const submitButton = ref()
const tagID = 'els-form' + lessCom.generateID();
const attrs = useAttrs();
let modelData: Record<string, any> = reactive({})
let formData: Record<string, any> = reactive({})
const debouncedQuerySearch = computed<Function>(() => {
    if(container){
        return debounce(handleElsQuery, 200)
    }
   else{
    return debounce(query, 200)
   }
})
function handleElsQuery(){
    if(container){
        return container.$query(false,props.tableRef)
    }
}
const emits = defineEmits(['update:modelValue', 'search','update:queryData'])



watch(formData, (val) => {
    emits("update:modelValue", val)
})

const queryStore = { id: tagID,tableRef:props.tableRef, query: query ,cacheQueryState}
const validateStore = { id: tagID, validate: validate }

onMounted(() => {
    recoverQueryState()
    if (container) {
        container.$pageStore.value.queryForms.push(queryStore)
        container.$pageStore.value.validates.push(validateStore)
    }
})

onBeforeUnmount(() => {
    if (container) {
        lessCom.removeArrayItem(container.$pageStore.value.queryForms,queryStore)
        lessCom.removeArrayItem(container.$pageStore.value.validates,validateStore)
    }
})
function getQueryData() {
    return modelData
}

function removeQueryData(key){
    delete modelData[key]
}

function setQueryData(item) {
    if (Array.isArray(item)) {
        item.forEach(ele => {
            modelData[ele.key] = converToQueryData(ele);
            formData[ele.key]=modelData[ele.key].Value

            if (modelData[ele.key]["QueryParameterType"] != "NoPost" && modelData[ele.key]["IsAutoQuery"]) {
                watch(()=>formData[ele.key], (newVal: any, oldVal: any) => {
                    if (newVal !== '' && newVal !== 0 && newVal == oldVal) {
                        return;
                    }
                    debouncedQuerySearch.value()
                })
            }
        })
    } else {
        modelData[item.key] = converToQueryData(item);
        formData[item.key]=modelData[item.key].Value
        if (modelData[item.key]["QueryParameterType"] != "NoPost" && modelData[item.key]["IsAutoQuery"]) {
            watch(()=>formData[item.key], (newVal: any, oldVal: any) => {
                if (newVal !== '' && newVal !== 0 && newVal == oldVal) {
                    return;
                }
                debouncedQuerySearch.value()
            })
        }
    }
}
function converToQueryData(query: QueryInfo) {
    const isRange=query.isRange??false
    const isRangeOrEqual=query.isRangeOrEqual??false

    const queryFieldname = query.prop ?? ''
    const isAroundComma = query.isAroundComma ?? false
    const queryDataType = query.dataType ?? QueryDataType.String
    const queryMethod: QueryMethod = query.method ??queryDataType==QueryDataType.String?QueryMethod.Contains: QueryMethod.Equal
    const isAutoQuery = query.isAutoQuery ?? props.autoReadData
    let parameterType = props.parameterType
    if (query.parameterType) {
        parameterType = query.parameterType
    }

    let defaultValue = query.value ?? ''
    if (query.key) {
        if (modelData[query.key] && modelData[query.key].Value !== '') {
            defaultValue = modelData[query.key].Value
        }
        return {
            QueryFieldName: queryFieldname,
            QueryDataType: queryDataType,
            QueryMethod: queryMethod,
            QueryParameterType: parameterType,
            IsAroundComma: isAroundComma,
            IsAutoQuery: isAutoQuery,
            IsRange:isRange,
            isRangeOrEqual:isRangeOrEqual,
            Value: queryDataType === QueryDataType.Int && defaultValue && lessCom.isNumber(defaultValue) ? parseFloat(defaultValue) : defaultValue
        }
    }
    return null


}
function recoverQueryState() {
    const pathID=container?.$pathID 
    if(!pathID){
        return
    }
    var currQueryDataStr = sessionStorage.getItem(`${pathID}_QueryData`);
    if (currQueryDataStr) {
        var currQueryData = JSON.parse(currQueryDataStr);
        for(const key in currQueryData.QueryData){
            if(key){
                if (formData[key] || formData[key] === 0) {
                    formData[key] =currQueryData.QueryData[key]
                }
            }
        
        }

        clearQueryState();
    }
}

function cacheQueryState() {
    if (Object.keys(formData).length > 0) {
        var cacheData = { QueryData: formData, CreateTime: new Date().getTime() }
        sessionStorage.setItem(`$${tagID}_QueryData`, JSON.stringify(cacheData))
    }
}

function clearQueryState() {
    sessionStorage.removeItem(`${tagID}_QueryData`)
}
function mergeQueryData(){
    for(const key in formData){
        if(key&&modelData[key]){
            modelData[key].Value= formData[key]
        }
    }
}
function query() {
    return  new Promise((resolve) => {
        validate().then(res => {
            if (res) {
                if (attrs["onSearch"]) {
                    emits("search", modelData)
                } 
                resolve(modelData)
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


function getModelValue(key, aIndex = -1) {
    if (key===undefined||key==='') {
        return
    }
    if (aIndex > -1) {
        if (key.toString().includes('.')) {
            return new Function('formData', `return formData[${aIndex}].${key};`);
        } else {
            return formData[aIndex][key]
        }

    }
    if (key.toString().includes('.')) {
        return new Function('formData', `return formData.${key};`);
    } else {
        return formData[key]
    }
}

function setModelValue(key, value, aIndex = -1) {
    if (key===undefined||key==='') {
        return
    }
    if (aIndex > -1) {
        if (key.toString().includes('.')) {
            new Function('formData,value', `formData[${aIndex}].${key}=value;`);
        } else {
            formData[aIndex][key] = value
        }
    }
    if (key.toString().includes('.')) {
        new Function('formData,value', `formData.${key}=value;`);
    } else {
        formData[key] = value
    }
}


onMounted(()=>{

 watch(formData,()=>{
        mergeQueryData()
    },{immediate:true,deep:true})
    
    watch(modelData,()=>{
        emits('update:queryData',modelData)
    },{immediate:true})

    //兼容外部设置传参
    if(props.queryData!==undefined){
        for(const key in props.queryData){
            watch(()=>props.queryData[key],(val)=>{
                if(key&&modelData[key]){
                    modelData[key].Value= val.Value
                }else{
                    modelData[key]=val
                }
            },{immediate:true,deep:true})
        }
    }

})



setForm({
    'tagContainer':'form',
    "formType":"Query",
    removeQueryData,
    setQueryData,
    getQueryData,
    setModelValue,
    getModelValue,
    formData,
})


defineExpose({
    query,
    recoverQueryState,
    cacheQueryState,
    clearValidate,
    validateField,
    validate,
    handleSubmitButton
})


</script>

<template>
    <el-form :model="formData" class="queryForm" ref="queryForm" onsubmit="return false;" inline :show-message="false">
        <slot v-bind="{formData:formData}"></slot>
    </el-form>
</template>
<style lang="less" scoped>
.queryForm {
    display: flex;
    flex-wrap: wrap;
}
</style>


import { lessCom } from '../../utlis/com'../../utlis/interfaces.js