<script setup lang="ts">
import { ref, reactive, watch } from 'vue'

import { lessCom } from '../../utlis/com'
import { ElMessage } from 'element-plus';
import { useModel } from '../../utlis/use'
import { FormItemProps } from '../../utlis/interfaces'
defineOptions({ name: 'ElsAutocomplete', inheritAttrs: false })
interface Props extends FormItemProps {
    data?: Array<Record<string, any>>,
    url?: string,
    modelValue?: string,
    valueField?: string,
    fetchSuggestions?: Function,
    remote?: boolean,
    width?: string
}
const props = withDefaults(defineProps<Props>(), {
    valueField: 'value',
})

const {
    currModelValue,
    returnModelValue,
} = useModel(props)
const { $codeField, $messageField, $dataField, $success } = lessCom.getApiConfig()
const selectValue = ref()
const tableData: Array<Record<string, any>> = reactive([])
const queryData = reactive<any>({ searchKey: '', idString: '' })

watch(selectValue, (val) => {
    returnModelValue(val)
})
watch(currModelValue, (val) => {
    selectValue.value = val
}, { immediate: true })

watch(() => props.data, (val) => {
    tableData.length = 0
    if (val) {
        tableData.push(...val)
    }

}, { immediate: true })

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
                if (res[$codeField] == $success) {
                    tableData.length = 0;
                    tableData.push(...res[$dataField])
                }
                else {
                    ElMessage.error(res[$messageField])
                }
            })
        } else { resolve(false) }

    })
}



</script>

<template>
    <div class="els-node">
        <ElsFormNode v-bind="lessCom.getFormNodeProps(props)">
            <el-autocomplete v-model="selectValue" :style="[{ width: width?.appendPx() }]" :fetch-suggestions="queryMethod"
                :value-key="valueField">
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
        </ElsFormNode>
    </div>
</template>
