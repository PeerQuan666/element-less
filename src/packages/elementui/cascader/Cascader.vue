<script setup lang="ts">
import { ref, reactive, watch, useAttrs, inject, watchEffect } from 'vue'
import '../../utlis/lessPrototype.js'
import lessCom from '../../utlis/lessCom.js'
import { ElMessage } from 'element-plus';
import { FormItemProps } from '../../utlis/interfaceCom'
import { ValueType } from '../../utlis/enumCom'
defineOptions({ name: 'ElsCascader' ,inheritAttrs:false})
interface Props extends FormItemProps {
    modelValue?: string,
    isPanel?: boolean,
    labelField?: string,
    valueField?: string,
    parentIdField?: string,
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
    pathSeparator?: string,
    isInitTriggerSelect?: boolean,
    valueSeparator?: string,
    valueType?: ValueType,
}
const props = withDefaults(defineProps<Props>(), {
    labelField: 'label',
    valueField: 'value',
    parentIdField: 'parentId',
    disabledField: '',
    childrenField: 'children',
    leafField: 'leaf',
    emitPath: true,
    resetValueByChangeData: true,
    pathSeparator: '$',
    valueSeparator: ',',
    rootParentValue: '',

})
const { $codeField, $messageField, $dataField, $success } = lessCom.getApiConfig()

const initSelect = ref(false)
const componentName = ref('el-cascader')
if (props.isPanel) {
    componentName.value = "el-cascader-panel"
}
const dataProps = ref<any>({})
const tableData = reactive<Array<Record<string, any>>>([])
const optionData = reactive<Array<Record<string, any>>>([])
const selectValue = ref<any>([])
const getModelValue = inject<Function>('getModelValue', () => null)
function initModelValue() {
    if (props.modelValue===undefined&& getModelValue && props.prop) {
        return getModelValue(props.prop,props.aIndex)
    }
    return props.modelValue
}
watch(selectValue, (val: any) => {
    handleReturnResult(val);
})

watchEffect(() => {
    initModelValue()
    initSelectValue()
})

watch(() => props.url, () => {
    if (props.resetValueByChangeData) {
        selectValue.value.length = 0
    }
    readData()
}, { immediate: true })
watch(() => props.data, (val: any) => {
    if (val && val.length) {
        if (props.resetValueByChangeData) {
            selectValue.value.length = 0
        }
        tableData.length = 0
        tableData.push(...val)
        toTreeData()
    }
}, { immediate: true })

const attrs = useAttrs()
const emits = defineEmits(['update:modelValue', 'update:select', 'update:select-label'])
const setModelValue = inject<Function>('setModelValue', () => { })

function initSelectValue() {
    const currValue = initModelValue()
    if (currValue === '' || currValue === undefined) {
        return
    }
    if (props.multiple && props.emitPath) {
        if (currValue && props.emitPath) {
            selectValue.value.length = 0;
            selectValue.value.push(...currValue.split(props.pathSeparator).map(ele => ele.split(',')))
        } else if (currValue) {
            selectValue.value.length = 0;
            selectValue.value.push(...currValue.split(props.pathSeparator))
        } else {
            selectValue.value.length = 0;
        }
        selectValue.value.length = 0;
        if (props.valueType === ValueType.Number) {
            selectValue.value.push(...currValue.toString().split(props.pathSeparator).map(ele => ele.toListNumber(props.valueSeparator)))
        } else if (props.valueType === ValueType.String) {
            selectValue.value.push(...currValue.toString().split(props.pathSeparator).map(ele => ele.toList(props.valueSeparator)))
        } else if (optionData.length && typeof (optionData[0][props.valueField]) === "number") {
            selectValue.value.push(...currValue.toString().split(props.pathSeparator).map(ele => ele.toListNumber(props.valueSeparator)))
        } else if (currValue) {
            selectValue.value.push(...currValue.toString().split(props.pathSeparator).map(ele => ele.toList(props.valueSeparator)))
        }
    } else if (props.multiple || props.emitPath) {
        selectValue.value.length = 0;
        if (props.valueType === ValueType.Number) {
            selectValue.value.push(...currValue.toString().toListNumber(props.valueSeparator))
        } else if (props.valueType === ValueType.String) {
            selectValue.value.push(...currValue.toString().toList(props.valueSeparator))
        } else if (optionData.length && typeof (optionData[0][props.valueField]) === "number") {
            selectValue.value.push(...currValue.toString().toListNumber(props.valueSeparator))
        } else if (currValue) {
            selectValue.value.push(...currValue.toString().toList(props.valueSeparator))
        }

    } else {
        if (props.valueType === ValueType.Number) {
            selectValue.value = parseFloat(currValue.toString());
        }
        else if (props.valueType === ValueType.String) {
            selectValue.value = currValue.toString();
        }
        else if (optionData.length && currValue.toString().length < 12 && typeof (optionData[0][props.valueField]) === "number") {
            selectValue.value = parseFloat(currValue.toString());
        } else {
            selectValue.value = currValue;
        }
    }

}
function readData() {
    if (props.url) {
        props.url.post({}).then(res => {
            if (res[$codeField] == $success) {
                tableData.length = 0
                tableData.push(...res[$dataField])

                toTreeData()
                initSelectValue()
            }
            else {
                ElMessage.error(res[$messageField]);
            }
        })
    }
}
function toTreeData() {
    optionData.length = 0
    if (tableData.length) {
        tableData.filter(ele => ele[props.parentIdField] == props.rootParentValue).forEach(ele => {
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
    tableData.filter(ele => ele[props.parentIdField] == item[props.valueField]).forEach(ele => {
        let currOption = ele;
        currOption[props.childrenField] = [];
        searchChildData(currOption)
        if (currOption[props.childrenField].length == 0) {
            currOption[props.childrenField] = null;
        }
        item[props.childrenField].push(currOption)
    })
}
function handleReturnModelValue(value) {
    emits('update:modelValue', value);
    if (props.modelValue===undefined&&setModelValue && props.prop) {
        setModelValue(props.prop, value,props.aIndex)
    }
}
function handleReturnResult(value) {
    if (value === undefined) { value = ''; }

    if (!value || value.length == 0) {
        handleReturnModelValue("")
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
        const currValue = value.map(ele => ele.join(props.valueSeparator)).join(props.pathSeparator)
        handleReturnModelValue(currValue)

        if (initSelect && tableData.length) {
            let selectData = value.map(ele => tableData.filter(cele => ele.includes(cele[props.valueField])))
            emits('update:select', selectData)

            let selectLabelData = selectData.map(ele => ele.map(cele => cele[props.labelField]))
            emits('update:select-label', selectLabelData.join(props.pathSeparator))

        }
        initSelect.value = true
        if (props.onChange) {
            props.onChange(currValue);
        }
        return
    }

    if (props.emitPath || props.multiple) {
        handleReturnModelValue(value.join(props.valueSeparator))

        if (initSelect.value && tableData.length) {
            let selectData = tableData.filter(cele => value.indexOf(cele[props.valueField]) > -1)
            emits('update:select', selectData)

            let selectLabelData = selectData.map(ele => ele[props.labelField])
            emits('update:select-label', selectLabelData.toString())
        }
        initSelect.value = true
        if (props.onChange) {
            props.onChange(value.join(props.valueSeparator));
        }
        return
    }
    handleReturnModelValue(value)

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
    <ElsFormNode v-bind="lessCom.getFormNodeProps(props)">
        <component :is="componentName" :props="dataProps" v-model="selectValue" :options="optionData">
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
    </ElsFormNode>
</template>

