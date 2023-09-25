<script setup lang="ts">
import { ref, reactive, watch, useAttrs, computed, nextTick, inject, provide, onBeforeUnmount, onMounted, useSlots } from 'vue'
import lessCom from '../../utlis/lessCom.js'
import lodash from 'lodash';
import { ElForm } from 'element-plus'
import { QueryDataType, QueryMethod } from '../../utlis/enumCom';
import { QueryInfo } from '../../utlis/interfaceCom';
const { debounce } = lodash;
defineOptions({ name: 'ElsFormQuery' })
interface Props {
    tableRef?: string,
    autoReadData?: boolean,
    parameterType?: string,//NoPost|NoQuery|Query
}
const props = withDefaults(defineProps<Props>(), {
    parameterType: 'Query',

})
const slots = useSlots()
const queryForm = ref()
const submitButton = ref()
const tagID = 'els-form' + lessCom.Guid32();
const attrs = useAttrs();
const elsPageStore = inject<any>('elsPageStore')
const elsQuery = inject<Function>('elsQuery')
let modelData: Record<string, any> = reactive({})
let formData: Record<string, any> = reactive({})
const debouncedQuerySearch = computed<Function>(() => {
    if(elsQuery){
        return debounce(handleElsQuery, 200)
    }
   else{
    return debounce(handleSearch, 200)
   }
})
function handleElsQuery(){
    if(elsQuery){
        return elsQuery(false,props.tableRef)
    }
}
const emits = defineEmits(['update:modelValue', 'search'])

provide('setQueryData', setQueryData)
provide('getQueryData', getQueryData)
provide('labelWidth', attrs['label-width'])
provide('formType', 'Query')
provide('queryTableRef', props.tableRef)
provide('formData', formData)

watch(formData, (val) => {
    emits("update:modelValue", val)
})


const queryStore = { id: tagID,tableRef:props.tableRef, query: handleSearch ,cacheQueryState}
const validateStore = { id: tagID, validate: validate }

onMounted(() => {
    recoverQueryState()
    if (elsPageStore) {
        elsPageStore.value.queryForms.push(queryStore)
        elsPageStore.value.validates.push(validateStore)
    }
})

onBeforeUnmount(() => {
    if (elsPageStore) {
        elsPageStore.value.queryForms.remove(queryStore)
        elsPageStore.value.validates.remove(validateStore)
    }
})
function getQueryData() {
    return modelData
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
    const pathID=inject<string>('elsPathID')
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
function handleSearch() {
    return  new Promise((resolve) => {
        
        validate().then(res => {
            for(const key in formData){
                if(key&&modelData[key]){
                    modelData[key].Value= formData[key]
                }
            }
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
defineExpose({
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
        <slot v-if="false"></slot>
        <slot name="query" v-if="slots.default">
            <template v-for="vnode in slots.default()">
                <ElsFormNode :vnode="vnode"></ElsFormNode>
            </template>
        </slot>
    </el-form>
</template>
<style lang="less" scoped>
.queryForm {
    display: flex;
    flex-wrap: wrap;
}
</style>


../../utlis/lessCom.js