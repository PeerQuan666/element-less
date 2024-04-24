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
    tableRef?: string,
    autoReadData?: boolean,
    parameterType?: string,//NoPost|NoQuery|Query
}
const props = withDefaults(defineProps<Props>(), {
    parameterType: 'Query',
})
const emits = defineEmits(['update:modelValue','update:queryData','search'])
const {setForm}=useValue(props)
const modelValue =defineModel<object>({default:()=>reactive<object>({})})
const queryData =defineModel<object>('queryData',{default:()=>reactive<object>({})})
const queryForm = ref()
const submitButton = ref()
const container=useContainer()
const tagID = 'els-form' + lessCom.generateID();
const attrs = useAttrs();
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

const queryStore = { id: tagID,tableRef:props.tableRef, query: query ,cacheQueryState}
const validateStore = { id: tagID, validate: validate }
watch(modelValue,(val)=>{
    emits('update:modelValue',val)
},{deep:true})
watch(queryData,(val)=>{
    emits('update:queryData',val)
},{deep:true})
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
    return queryData.value
}

function removeQueryData(key){
    delete queryData.value[key]
}

function setQueryData(item) {
    if (Array.isArray(item)) {
        item.forEach(ele => {
            queryData.value[ele.key] = converToQueryData(ele);
            modelValue.value[ele.key]=queryData.value[ele.key].Value

            if (queryData.value[ele.key]["QueryParameterType"] != "NoPost" && queryData.value[ele.key]["IsAutoQuery"]) {
                watch(()=>modelValue.value[ele.key], (newVal: any, oldVal: any) => {
                    if (newVal !== '' && newVal !== 0 && newVal == oldVal) {
                        return;
                    }
                    debouncedQuerySearch.value()
                })
            }
        })
    } else {
        queryData.value[item.key] = converToQueryData(item);
        modelValue.value[item.key]=queryData.value[item.key].Value
        if (queryData.value[item.key]["QueryParameterType"] != "NoPost" && queryData.value[item.key]["IsAutoQuery"]) {
            watch(()=>modelValue.value[item.key], (newVal: any, oldVal: any) => {
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
        if (queryData.value[query.key] && queryData.value[query.key].Value !== '') {
            defaultValue = queryData.value[query.key].Value
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
                if (modelValue.value[key] || modelValue.value[key] === 0) {
                    modelValue.value[key] =currQueryData.QueryData[key]
                }
            }
        
        }

        clearQueryState();
    }
}

function cacheQueryState() {
    if (Object.keys(modelValue.value).length > 0) {
        var cacheData = { QueryData: modelValue.value, CreateTime: new Date().getTime() }
        sessionStorage.setItem(`$${tagID}_QueryData`, JSON.stringify(cacheData))
    }
}

function clearQueryState() {
    sessionStorage.removeItem(`${tagID}_QueryData`)
}
function mergeQueryData(){
    for(const key in modelValue.value){
        if(key&&queryData.value[key]){
            queryData.value[key].Value= modelValue.value[key]
        }
    }
}
function query() {
    return  new Promise((resolve) => {
        validate().then(res => {
            if (res) {
                if (attrs["onSearch"]) {
                    emits("search", queryData.value)
                } 
                resolve(queryData.value)
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
            return new Function('modelValue', `return modelValue.value[${aIndex}].${key};`);
        } else {
            return modelValue.value[aIndex][key]
        }

    }
    if (key.toString().includes('.')) {
        return new Function('formData', `return modelValue.value.${key};`);
    } else {
        return modelValue.value[key]
    }
}

function setModelValue(key, value, aIndex = -1) {
    if (key===undefined||key==='') {
        return
    }
    if (aIndex > -1) {
        if (key.toString().includes('.')) {
            new Function('modelValue,value', `modelValue[${aIndex}].${key}=value;`);
        } else {
            modelValue.value[aIndex][key] = value
        }
    }
    if (key.toString().includes('.')) {
        new Function('modelValue,value', `modelValue.value.${key}=value;`);
    } else {
        modelValue.value[key] = value
    }
}


onMounted(()=>{

 watch(modelValue,()=>{
        mergeQueryData()
    },{immediate:true,deep:true})
})

setForm({
    'tagContainer':'form',
    "formType":"Query",
    removeQueryData,
    setQueryData,
    getQueryData,
    setModelValue,
    getModelValue,
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
    <el-form :model="modelValue" class="queryForm" ref="queryForm" onsubmit="return false;" inline :show-message="false">
        <slot></slot>
    </el-form>
</template>
<style lang="less" scoped>
.queryForm {
    display: flex;
    flex-wrap: wrap;
}
</style>