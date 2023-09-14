<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import '../../utlis/lessPrototype.js'
import { ElMessage } from 'element-plus';
defineOptions({ name: 'ElsAutocomplete' })
interface Props {
    data?: Array<Record<string, any>>,
    url?: string,
    modelValue?: string,
    valueField?: string,
    fetchSuggestions?: Function,
    remote?: boolean,
    width?:string
}
const props = withDefaults(defineProps<Props>(), {
    valueField: 'value',
})

const emits = defineEmits(['update:modelValue'])

const selectValue = ref()
const tableData: Array<Record<string, any>> = reactive([])
const queryData = reactive<any>({ searchKey: '', idString: '' })
watch(selectValue, (val) => {
    handleReturnResult(val)
})
watch(() => props.modelValue, (val) => {
    selectValue.value = val
})
watch(() => props.data, (val) => {
    console.info(val)
    tableData.length = 0
    if (val) {
        tableData.push(...val)
    }

},{immediate:true})

function queryMethod(searchValue, cb) {
    if (props.fetchSuggestions) {
        return props.fetchSuggestions(searchValue, cb)
    }
    queryData['searchKey'] = searchValue
    if ((props.remote && props.url) || (!props.remote && props.url && !tableData.length)) {
        readData().then(res => {
            if (res) {
                cb(tableData)
            }

        })
    } else {
        return tableData.filter(ele => ele[props.valueField].toString().indexOf(searchValue) > -1)
    }
}
function readData() {

    return new Promise((resolve) => {
        if (props.url) {
            props.url.post(queryData).then(res => {
                if (res.ResultCode == "0") {
                    tableData.length = 0;
                    tableData.push(...res.Data)
                }
                else {
                    ElMessage.error(res.ResultMessage)
                }
            })
        } else { resolve(false) }

    })
}

function handleReturnResult(value) {
    if (value === undefined) { value = ''; }
    emits('update:modelValue', value)

}

</script>

<template>
    <el-autocomplete v-model="selectValue"  :style="[{width:width?.appendPx()}]" :fetch-suggestions="queryMethod" :value-key="valueField">
        <template #prefix>
            <slot name="prefix">
            </slot>
        </template>
        <template #suffix>
            <slot name="suffix">
            </slot>
        </template>
        <template #prepend v-if="$slots.prepend">
            <slot name="prepend">
            </slot>
        </template>
        <template #append v-if="$slots.append">
            <slot name="append">
            </slot>
        </template>
        <template #default="{ item }">
            <slot name="default" :item="item" v-if="valueField">
                {{ item[valueField] }}
            </slot>
            <slot name="default" :item="item" v-else>
                {{ item }}
            </slot>
        </template>
    </el-autocomplete>
</template>

