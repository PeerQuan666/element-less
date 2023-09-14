<script setup lang="ts">
import { ref, reactive, watch, useAttrs } from 'vue'
import '../../utlis/lessPrototype.js'
import { ElMessage } from 'element-plus';
defineOptions({ name: 'ElsCascader' })
interface Props {
    modelValue?: string,
    isPanel?: boolean,
    labelField?: string,
    valueField?: string,
    parentidField?: string,
    rootParentValue?: string,
    disabledField?: string,
    childrenField?: string,
    leafField?: string,
    url?: string,
    expandTrigger?: string,
    checkStrictly?: boolean,
    multiple?: boolean,
    emitPath?: boolean,
    lazy?: boolean,
    lazyLoad?: Function,
    onChange?: Function,
    data?: Array<Record<string, any>>,
    resetValueByChangeData?: boolean,
    mutiPathValueSeparator?: string,
    isInitTriggerSelect?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    labelField: 'label',
    valueField: 'value',
    parentidField: 'ParentID',
    disabledField: '',
    childrenField: 'children',
    leafField: 'leaf',
    emitPath: true,
    resetValueByChangeData: true,
    mutiPathValueSeparator: '$',

})
const initSelect = ref(false)
const componentName = ref('el-cascader')
const dataProps = ref<any>({})
const tableData = reactive<Array<Record<string, any>>>([])
const optionData = reactive<Array<Record<string, any>>>([])
const selectValue = ref<any>([])
watch(selectValue, (val: any) => {
    handleReturnResult(val);
})

watch(() => props.modelValue, () => {
    initSelectValue();
})
watch(() => props.url, () => {
    if (props.resetValueByChangeData) {
        selectValue.value = [];
    }
    readData()
}, { immediate: true })
watch(() => props.data, (val: any) => {
    if (val && val.length) {
        if (props.resetValueByChangeData) {
            selectValue.value = [];
        }
        toTreeData()
        initSelectValue();
    }
}, { immediate: true })

const attrs = useAttrs()
const emits = defineEmits(['update:modelValue', 'update:select', 'update:select-label'])

watch(selectValue, (val) => {
    handleReturnResult(val)
})
watch(() => props.modelValue, (val) => {
    selectValue.value = val
})



function initSelectValue() {
    if (props.multiple) {
        if (props.modelValue && props.emitPath) {
            selectValue.value = props.modelValue.split(props.mutiPathValueSeparator).map(ele => ele.split(','))
        } else if (props.modelValue) {
            selectValue.value = props.modelValue.split(props.mutiPathValueSeparator)
        } else {
            selectValue.value.length = 0;
        }
    } else if (props.modelValue && props.emitPath) {
        selectValue.value = props.modelValue.split(props.mutiPathValueSeparator);
    } else if (props.modelValue) {
        selectValue.value = props.modelValue
    }
}
function readData() {
    if (props.url) {
        props.url.post({}).then(res => {
            if (res.ResultCode == "0") {
                tableData.length = 0
                tableData.push(...res.Data)

                toTreeData()
                initSelectValue()
            }
            else {
                ElMessage.error(res.ResultMessage);
            }
        })
    }
}
function toTreeData() {
    optionData.length = 0
    if (tableData) {
        tableData.filter(ele => ele[props.parentidField] == props.rootParentValue).forEach(ele => {
            let currOption = ele;
            currOption[props.childrenField] = [];
            searchChildData(currOption)
            if (currOption[props.childrenField].length == 0) {
                currOption[props.childrenField] = null;
            }
            optionData.push(currOption)
        })
    }
}
function searchChildData(item) {
    tableData.filter(ele => ele[props.parentidField] == item[props.valueField]).forEach(ele => {
        let currOption = ele;
        currOption[props.childrenField] = [];
        searchChildData(currOption)
        if (currOption[props.childrenField].length == 0) {
            currOption[props.childrenField] = null;
        }
        item[props.childrenField].push(currOption)
    })
}
function handleReturnResult(value) {
    if (value === undefined) { value = ''; }

    if (!value || value.length == 0) {
        emits('update:modelValue', "");

        if (initSelect.value) {
            emits('update:select', {})
            emits('update:select-label', '')
        }
        initSelect.value = true
        if (props.onChange) {
            props.onChange("");
        }
        return
    }

    if (props.multiple && props.emitPath) {
        emits('update:modelValue', value.join(props.mutiPathValueSeparator));
        if (initSelect && tableData.length) {
            let selectData = value.map(ele => tableData.filter(cele => ele.indexOf(cele[props.valueField]) > -1))
            emits('update:select', selectData)

            let selectLabelData = selectData.map(ele => ele.map(cele => cele[props.labelField]))
            emits('update:select-label', selectLabelData.join(props.mutiPathValueSeparator))

        }
        initSelect.value = true
        if (props.onChange) {
            props.onChange(value.join(props.mutiPathValueSeparator));
        }
        return
    }

    if (props.emitPath || props.multiple) {
        emits('update:modelValue', value.toString());

        if (initSelect.value && tableData.length) {
            let selectData = tableData.filter(cele => value.indexOf(cele[props.valueField]) > -1)
            emits('update:select', selectData)

            let selectLabelData = selectData.map(ele => ele[props.labelField])
            emits('update:select-label', selectLabelData.toString())
        }
        initSelect.value = true
        if (props.onChange) {
            props.onChange(value.join(props.mutiPathValueSeparator));
        }
        return
    }

    emits('update:modelValue', value);
    if (initSelect.value && tableData.length) {
        let selectData = tableData.find(cele => value == cele[props.valueField])
        if (selectData) {
            let selectLabelData = selectData[props.labelField]
            emits('update:select', selectData)
            emits('update:select-label', selectLabelData)
        } else {
            emits('update:select', undefined)
            emits('update:select-label', undefined)
        }
    }
    initSelect.value = true
    if (props.onChange) {
        props.onChange(value);
    }
}

if (attrs['props']) {
    dataProps.value = attrs['props']

} else {
    dataProps.value = {
        expandTrigger: props.expandTrigger,
        multiple: props.multiple,
        checkStrictly: props.checkStrictly,
        emitPath: props.emitPath,
        lazy: props.lazy,
        lazyLoad: props.lazyLoad,
        value: props.valueField,
        label: props.labelField,
        children: props.childrenField,
        disabled: props.disabledField,
        leaf: props.leafField
    }
}


</script>

<template>
    <component :is="componentName" :props="dataProps" v-model="selectValue" :options="optionData" v-bind="attrs">
        <template #default="{ node, data }">
            <slot name="default" :node="node" :data="data">
                {{ data[labelField] }}
            </slot>
        </template>
        <template #empty>
            <slot name="empty">
            </slot>
        </template>
    </component>
</template>

