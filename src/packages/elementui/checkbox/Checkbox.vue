<script setup lang="ts">
import { ValueType } from '../../utlis/enumCom'
import { ref, reactive, computed, provide, watch, onMounted, useAttrs, nextTick } from 'vue'
import lessCom from '../../utlis/lessCom.js'
import { ElMessage } from 'element-plus';
import {CheckboxProps} from '../../utlis/interfaceCom'
defineOptions({ name: 'ElsCheckbox' })
const props = withDefaults(defineProps<CheckboxProps>(), {
    labelField: 'label',
    valueField: 'value',
    disabledField: 'disabled',
    noExistOptionPrefix: '未知选项',
    hasNoExistOption: true,
    resetValueByChangeData: true,
    type: 'checkbox'
})
const attrs = useAttrs()
const emits = defineEmits(['update:modelValue', 'update:select', 'update:select-label', 'change', 'click-option', 'select', 'blur', 'clear', 'readdataed'])
let initSelect = ref(false)
const preSelectValue = ref([])
const selectItem = ref()
const selectLabel = ref()
const selectValue: any = ref([])
const singleSelectValue = ref()
const options: Array<Record<string, any>> = reactive([])
const noExistOption: Array<Record<string, any>> = reactive([])
const extraOption: Array<Record<string, any>> = reactive([])
const originalData: Array<Record<string, any>> = reactive([])
const checkInverse = ref(false)
const checkAll = ref(false)
const isIndeterminate = ref(false)
const filterText = ref('')
let multiple = ref(true)
const queryData = reactive({ searchKey: '', idString: '' })
const optionData = computed<Array<Record<string, any>>>(() => {
    return options.concat(extraOption).concat(noExistOption);
})
const checkboxClass: string[] = reactive([])
const checkboxStyle: any = reactive([]);
provide('type', props.type)
provide('setExtraOption', setExtraOption)
provide('optionWidth', props.optionWidth)

if (props.type == 'checkbox') {

    checkboxStyle.push({ 'text-align': 'left' })
    if (props.width) {
        checkboxStyle.push({ 'width': props.width.appendPx() })
    }
    checkboxClass.push('els-checkbox-default')
}
else {
    checkboxClass.push('els-checkbox')
}
if (props.height) {
    checkboxClass.push('scrollheight')
    if (props.height) {
        checkboxStyle.push({ 'max-height': props.height.appendPx() })
    }

}

watch(filterText, (val) => {
    options.length = 0;
    options.push(...originalData.filter((ele) => {
        return ele[props.labelField].toLowerCase().indexOf(val.toLowerCase()) > -1;
    }))

})

watch(() => props.url, () => {
    if (props.resetValueByChangeData) {
        if (multiple.value) {
            selectValue.value = [];
        } else {
            singleSelectValue.value = '';
        }
    }
    readData();
})

watch(() => props.data, (val, oldVal) => {
    if (val === undefined && oldVal === undefined) { return; }
    if (val != oldVal && JSON.stringify(val) != JSON.stringify(oldVal) && val) {
        if (props.resetValueByChangeData) {
            if (multiple.value) {
                selectValue.value = [];
            } else {
                singleSelectValue.value = "";
            }
        }
        options.length = 0;
        originalData.length = 0;
        if (val) {
            options.push(...val)
            originalData.push(...val)
        }
        initNoExistData();

    }
})
watch(() => props.modelValue, () => {
    initSelectValue();
    initNoExistData()
})
watch(selectValue, (val) => {
    handleReturnResult(val);
    checkAllStatus();
})
watch(singleSelectValue, (val) => {
    handleReturnResult(val);
})

function initData() {
    if (!props.url && (!props.data || !props.data.length) && !optionData.value.length) {
        multiple.value = false;
    }
    if (props.url) {
        queryData['idString'] = props.modelValue ?? '';
        readData()
    } else {

        if (props.data) {
            options.push(...props.data)
            originalData.push(...props.data)
        }
        initSelectValue()
        initNoExistData();
        checkAllStatus();

    }
}
function initNoExistData() {
    nextTick(() => {
        noExistOption.length = 0;
        if (props.hasNoExistOption && multiple) {
            if (selectValue.length) {
                let existValue = selectValue.filter(ele => !optionData.value.map(cele => cele[props.valueField]).includes(ele));
                if (existValue && existValue.length) {
                    existValue.forEach(ele => {
                        if (ele === 0 || ele) {
                            let newOption = {};
                            newOption[props.labelField] = props.noExistOptionPrefix ? props.noExistOptionPrefix + "-" + ele : ele;
                            newOption[props.valueField] = ele;
                            newOption["DataNoExist"] = true;
                            noExistOption.push(newOption)
                        }
                    })
                }
            }
        }
    })
}

function setExtraOption(item) {
    if (!multiple.value) {
        multiple.value = true;
        selectValue.value = []
    }
    let index = optionData.value.findIndex(ele => ele[props.valueField] == item.value)
    if (index == -1) {
        let currSlotData = {};
        currSlotData[props.labelField] = item.label;
        currSlotData[props.valueField] = item.value;
        currSlotData["DataIsExtra"] = true;
        extraOption.push(currSlotData)
    }
}
function handleInverseChange() {
    selectValue.value = optionData.value.filter(ele => !selectValue.value.includes(ele[props.valueField])).map(obj => { return obj[props.valueField] });
}
function handleCheckAllChange(val) {
    selectValue.value = val ? optionData.value.map(obj => { return obj[props.valueField] }) : [];
    isIndeterminate.value = false;
}
function initSelectValue() {
    let currValueType = props.valueType;
    let currModelValue = props.modelValue
    if (typeof (currModelValue) == "string") {
        currModelValue = currModelValue.replace(/^,+/, "").replace(/,+$/, "");
    }
    if (currModelValue === '' || currModelValue === undefined) {
        if (selectValue.value.length > 0) {
            selectValue.value = [];
        }
        singleSelectValue.value = '';
        return
    }
    if (!multiple.value) {
        if (currValueType === ValueType.Number) {
            singleSelectValue.value = parseFloat(currModelValue);
        }
        else if (currValueType === ValueType.String) {
            singleSelectValue.value = currModelValue.toString();
        }
        else if (optionData.value.length && currModelValue.length < 12 && typeof (optionData.value[0][props.valueField]) === "number") {
            singleSelectValue.value = parseFloat(currModelValue);
        } else {
            singleSelectValue.value = currModelValue;
        }
        return;
    } else {
        if (currValueType === ValueType.Number) {
            selectValue.value = currModelValue.split(',').map(ele => parseFloat(ele));
        } else if (currValueType === "string" && currModelValue !== "") {
            selectValue.value = currModelValue.split(',')
        } else if (optionData.value.length && typeof (optionData.value[0][props.valueField]) === "number") {
            selectValue.value = currModelValue.split(',').map(ele => parseFloat(ele));
        } else if (currModelValue) {
            selectValue.value = currModelValue.split(',')
        }
    }

}
function readData() {
    let currUrl = props.url?.replacePowerUrl() ?? '';
    return new Promise((resolve, reject) => {
        currUrl.post(queryData).then(res => {
            if (res.ResultCode == "0") {
                options.length = 0;
                options.push(...res.Data)
                originalData.length = 0;
                originalData.push(...res.Data)
                initSelectValue();
                initNoExistData();
                checkAllStatus();
                emits("readdataed", options)
            }
            else {
                ElMessage.error(res.ResultMessage)
            }
            resolve(true)

        }).catch(action => {
            reject(action)
        })
    })
}
function checkAllStatus() {
    if (props.showCheckall) {
        let checkedCount = selectValue.value.length;
        checkAll.value = checkedCount > 0 && checkedCount === optionData.value.length;
        isIndeterminate.value = checkedCount > 0 && checkedCount < optionData.value.length;
    }
}
function handleComitSelect(value) {
    try {
        if (value && options.length) {
            let currOptions = options;
            let currValue = value;
            if (multiple.value) {
                selectItem.value = currOptions.filter(ele => value.indexOf(ele[props.valueField]) > -1)
                selectLabel.value = selectItem.value.map(ele => ele[props.labelField]).toString()
                currValue = value.toString()
            } else {
                selectItem.value = currOptions.find(ele => value === ele[props.valueField])
                if (selectItem) {
                    selectLabel.value = selectItem[props.labelField]
                }
            }
            emits('select', { selectItem: selectItem, selectLabel: selectLabel, selectValue: currValue, preSelectValue: preSelectValue });
            preSelectValue.value = value;
        }
    } catch (err) {
        console.log(err)
    }
}
function handleClickOption(item) {
    emits("click-option", item)
}
function handleReturnResult(value) {
    if (value === undefined) { value = ''; }
    if (multiple.value) {
        emits('update:modelValue', value.toString())
    } else {
        emits('update:modelValue', value)
    }
    if (initSelect) {
        if (value) {
            if (props.valueField && props.labelField) {
                if (multiple.value) {
                    emits('update:select', optionData.value.filter(ele => value.indexOf(ele[props.valueField]) > -1))
                    emits('update:select-label', optionData.value.filter(ele => value.indexOf(ele[props.valueField]) > -1).map(ele => ele[props.labelField]).toString())

                } else {
                    let currOption = optionData.value.find(ele => value == ele[props.valueField]);
                    emits('update:select', currOption)
                    if (currOption) {
                        emits('update:select-label', currOption[props.labelField])
                    } else {
                        emits('update:select-label', '')
                    }

                }
            }
            handleComitSelect(value);
        }

    }
    initSelect.value = true;

}


initSelect.value = props.isInitTriggerSelect;
if (props.modelValue === '') {
    initSelect.value = true;
}

onMounted(() => {
    initData();
})


</script>

<template>
    <div :class="checkboxClass" :style="checkboxStyle">
        <div style="margin-bottom: 15px;text-align:left;" v-if="showCheckall || filterable">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" v-if="showCheckall"
                @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox v-model="checkInverse" v-if="showInverse" @change="handleInverseChange">反选</el-checkbox>
            <el-input style="width:200px;" :style="showCheckall ? 'margin-left:15px;' : ''" suffix-icon="Search"
                v-if="filterable" placeholder="输入关键字进行过滤" v-model="filterText" clearable>
            </el-input>
        </div>
        <el-checkbox v-if="!url && (!data || !data.length) && !optionData.length" ref="els-checkbox"
            v-model="singleSelectValue" v-bind="attrs">
            <slot name="default"></slot>
        </el-checkbox>
        <el-checkbox-group v-else v-model="selectValue" ref="els-checkbox-group" v-bind="attrs">
            <slot name="extra"></slot>
            <el-empty v-if="filterText&&!optionData.length"></el-empty>
            <template v-else-if="(url || data && data.length > 0 || options.length) && !groupField">
                <els-option v-for="(item, index) in options" :key="index" :value="item[valueField]"
                    :disabled="item[disabledField] === true" @click.native="handleClickOption(item)">
                    <slot name="default" :item="item">
                        {{ item[labelField] }}
                    </slot>
                </els-option>
            </template>
            <template v-else-if="(url || (data && data.length > 0)) && groupField">
                <template v-for="gitem in lessCom.dtGroupBy(options, groupField)">
                    <els-option-group :label="gitem.key ?? '未分组'">
                        <els-option v-for="(item, index) in gitem.value" :key="index" :value="item[valueField]"
                            :disabled="item[disabledField] === true" @click.native="handleClickOption(item)">
                            <slot name="default" :item="item">
                                {{ item[labelField] }}
                            </slot>
                        </els-option>
                    </els-option-group>
                </template>
            </template>
            <slot name="default" v-else>
            </slot>
            <els-option v-for="item in noExistOption" :key="item[valueField]" :value="item[valueField]"
                @click="handleClickOption(item)">{{ item[labelField] }}</els-option>
        </el-checkbox-group>
    </div>
</template>


<style lang="less" scoped>
.els-checkbox {
    display: flex;

    .el-checkbox-group {
        display: inline-block;
        width: 100%;
    }
}

.els-checkbox-default {
    .el-checkbox-group {
        width: 100%;
    }

    .el-checkbox {
        margin-bottom: 15px;
    }
}

.scrollheight {
    overflow-y: scroll;
    border: 1px solid #dcdfe6;
    padding: 5px;
}
</style>../../utlis/lessCom.js