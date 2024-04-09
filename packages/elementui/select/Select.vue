
    
<script lang="ts" setup>

import { ref, reactive, watch, useAttrs, computed, nextTick, provide, useSlots, inject, onMounted } from 'vue'
import { ElMessage } from 'element-plus';
import '../../utlis/lessPrototype.js'
import lessCom from '../../utlis/lessCom.js'
import { ValueType } from '../../utlis/enumCom'
import { FormItemProps } from '../../utlis/interfaceCom'
import { useModel,useMobile } from '../../utlis/componentCom.js'
defineOptions({
    name: 'ElsSelect',
    inheritAttrs: false
})

interface Props extends FormItemProps {
    data?: Array<Record<string, any>>,
    url?: string,
    modelValue?: any,
    labelField?: string,
    valueField?: string,
    disabledField?: string,
    selectIndex?: number,
    isClearWithSearch?: boolean,
    isClearSearchWithNoSelect?: boolean,
    groupField?: string,
    noExistOptionPrefix?: string,
    hasNoExistOption?: boolean,
    isInitTriggerSelect?: boolean,
    resetValueByChangeData?: boolean,
    valueType?: ValueType,
    loading?: boolean,
    width?: string | number,
    onChange?: Function,
    valueSeparator?: string,
    multiple?: boolean,
    allowCreate?: boolean,
    isVirtual?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    valueType: ValueType.Auto,
    labelField: 'label',
    valueField: 'value',
    disabledField: 'disabled',
    selectIndex: -1,
    noExistOptionPrefix: '未知选项',
    hasNoExistOption: true,
    isInitTriggerSelect: true,
    resetValueByChangeData: true,
    valueSeparator: ',',
    validTrigger: 'change',
})

const slots = useSlots()
const attrs: Record<string, any> = useAttrs()
const emits = defineEmits(['update:modelValue', 'update:select', 'update:select-label', 'change', 'click-option', 'select', 'blur', 'clear', 'readdataed'])
const { $codeField, $messageField, $dataField, $success } = lessCom.getApiConfig()
const initSelect = ref(false)
const preSelectValue = ref<any>('')
const currLoading = ref(false)
const selectValue = ref<any>('')




const selectItem = ref<any>()
const selectLabel = ref('')
const options: Array<Record<string, any>> = reactive([])
const noExistOption: Array<Record<string, any>> = reactive([])
const extraOption: Array<Record<string, any>> = reactive([])
const defaultSlotData: Array<Record<string, any>> = reactive([])
const queryData = reactive({ searchKey: '', idString: '' })
const formInputWidth = inject<string>('inputWidth', '')
const currWidth = ref(props.width ?? '')
const formNode=ref()
if (!currWidth.value) {
    if (formInputWidth) {
        currWidth.value = formInputWidth
    }

}
const {
    currModelValue,
    returnModelValue,
} = useModel(props)

const {isMobile,onMobileConfirm,onMobileHiddenPopup} =useMobile(formNode)

watch(() => props.multiple, (val) => {
    if (val||isMobile) {
        selectValue.value = []

    } else {
        selectValue.value = ''
    }
}, { immediate: true })



const optionData = computed<Array<Record<string, any>>>(() => {
    return options.concat(extraOption).concat(noExistOption);
})
watch(() => props.selectIndex, () => {
    initSelectIndex()
})
watch(() => props.url, () => {
    if (props.resetValueByChangeData) {
        if (props.multiple) {
            selectValue.value = [];
        } else {
            selectValue.value = "";
        }
    }
    readData();
})
watch(() => props.data, (val) => {
    if (val === undefined) { return; }
    if (JSON.stringify(val) != JSON.stringify(options)) {
        if (props.resetValueByChangeData) {
            if (props.multiple) {
                selectValue.value = [];
            } else {
                selectValue.value = "";
            }
        }
        options.length = 0;
        options.push(...val);
        initNoExistData();
        initSelectIndex();
    }
}, { deep: true })

watch(selectValue, (val: any) => {
    if (props.multiple||isMobile) {
        handleReturnResult((val as Array<string | number>).join(props.valueSeparator));
        return
    }
    handleReturnResult(val);
})


const provideOptionData = ref<any>({ type: 'select' })
provide('provideOption', provideOptionData)

provide('multiple', props.multiple)
provide('setExtraOption', setExtraOption)


watch(currModelValue, () => {
    initSelectValue()
})

function initSelectValue() {
    let currValueType = props.valueType;
    if (props.allowCreate) {
        currValueType = ValueType.String
    }
    currModelValue.value


    if (currModelValue.value === '' || currModelValue.value === undefined ||currModelValue.value === null|| selectValue.value.toString() === currModelValue.value.toString()) {
        return
    }
    if (props.multiple) {
        if (currValueType === ValueType.Number) {
            selectValue.value = currModelValue.value.toString().toListNumber(props.valueSeparator)
        } else if (currValueType === ValueType.String) {
            selectValue.value = currModelValue.value.toString().toList(props.valueSeparator)
        } else if (optionData.value.length && typeof (optionData.value[0][props.valueField]) === "number") {
            selectValue.value = currModelValue.value.toString().toListNumber(props.valueSeparator)
        }
        else if (optionData.value.length && currModelValue.value.toString().length < 12 && typeof (optionData.value[0][props.valueField]) === "number") {
            selectValue.value = currModelValue.value.toString().toListNumber(props.valueSeparator)

        }
        else if (currModelValue.value) {
            selectValue.value = currModelValue.value.toString().toList(props.valueSeparator)
        }
    } else {
        if (currValueType === ValueType.Number) {
            selectValue.value = parseFloat(currModelValue.value.toString());
        }
        else if (currValueType === ValueType.String) {
            selectValue.value = currModelValue.value.toString();
        }
        else if (optionData.value.length && currModelValue.value.toString().length < 12 && typeof (optionData.value[0][props.valueField]) === "number") {
            selectValue.value = parseFloat(currModelValue.value.toString());
        } else {
            selectValue.value = currModelValue.value;
        }
    }
    initNoExistData();
}


function initSelectIndex() {
    if (props.selectIndex > -1 && !currModelValue.value) {
        if (optionData.value.length) {
            selectValue.value = optionData.value[props.selectIndex][props.valueField];
            if (props.multiple) {
                selectValue.value = [selectValue]
            }
        }
    }
}
function setExtraOption(item: Record<string, any>) {
    let index = optionData.value.findIndex(ele => ele[props.valueField] == item.value)
    if (index == -1) {
        let currSlotData: { [key: string]: any } = {}
        currSlotData[props.labelField] = item.label;
        currSlotData[props.valueField] = item.value;
        currSlotData["DataIsExtra"] = true;
        extraOption.push(currSlotData)
    }
}
function initNoExistData() {
    nextTick(() => {
        noExistOption.length = 0
        if (props.hasNoExistOption) {
            if (props.multiple) {
                if (selectValue.value.length) {
                    let existValue = (selectValue.value as Array<any>).filter(ele => !optionData.value.map(cele => cele[props.valueField]).includes(ele));
                    if (existValue && existValue.length) {
                        existValue.forEach(ele => {
                            if (ele === 0 || ele) {
                                let newOption: any = {};
                                if (props.allowCreate) {
                                    newOption[props.labelField] = ele;
                                } else {
                                    newOption[props.labelField] = props.noExistOptionPrefix ? props.noExistOptionPrefix + "-" + ele : ele;
                                }
                                newOption[props.valueField] = ele;
                                newOption["DataNoExist"] = true;
                                noExistOption.push(newOption)
                            }
                        })
                    }
                }

            } else {
                if (selectValue.value) {
                    let currOption = optionData.value.find(oele => oele[props.valueField] == selectValue.value);
                    if (!currOption) {
                        let newOption: any = {};
                        if (props.allowCreate) {
                            newOption[props.labelField] = selectValue.value;
                        } else {
                            newOption[props.labelField] = props.noExistOptionPrefix ? props.noExistOptionPrefix + "-" + selectValue.value : selectValue.value;
                        }
                        newOption[props.valueField] = selectValue.value;
                        newOption["DataNoExist"] = true;
                        noExistOption.push(newOption)
                    } else {
                        currOption[props.valueField] = selectValue.value;
                    }
                }
            }

        }
    })

}
function handleComitSelect(value: string | number | boolean) {
    try {
        if ((value || value === 0) && optionData.value.length) {
            let currOptions = optionData.value;
            let currValue = value;
            if (props.multiple) {
                selectItem.value = currOptions.filter(ele => value.toString().indexOf(ele[props.valueField]) > -1);
                selectLabel.value = (selectItem.value as Array<Record<string, any>>).map(ele => ele[props.labelField]).toString()
                currValue = value.toString()
            } else {
                selectItem.value = currOptions.find(ele => value === ele[props.valueField])
                if (selectItem.value) {
                    selectLabel.value = selectItem.value[props.labelField]
                }
            }
            emits('select', { selectItem: selectItem.value, selectLabel: selectLabel.value, selectValue: currValue, preSelectValue: preSelectValue.value });
            preSelectValue.value = value;
        }
    } catch (err) {
        console.log(err)
    }
}
function handleVisibleChange(val) {
    if (!val) {
        if (props.isClearSearchWithNoSelect && queryData.searchKey && !selectValue.value) {
            handleSearch('')
        }
    }
}
function handleClear() {
    if (props.isClearWithSearch && queryData.searchKey) {
        handleSearch('')
    }
    emits('clear');

}
function handleSearch(searchValue: string) {
    if (attrs['remote'] === undefined || attrs['remote'] === false) {
        return;
    }
    queryData['idString'] = selectValue.value?.toString();
    queryData['searchKey'] = searchValue
    readData()
}

function readData() {
    currLoading.value = true;
    let currUrl = props.url?.replacePowerUrl() ?? '';

    return new Promise((resolve, reject) => {
        currUrl.post(queryData).then(res => {
            if (res[$codeField] == $success) {
                options.length = 0;
                options.push(...res[$dataField])
                initSelectValue();
                initSelectIndex();
                emits("readdataed", options)
            }
            else {
                ElMessage.error(res[$messageField])
            }
            currLoading.value = false;
            resolve(true)
        }).catch(action => {
            reject(action)
        })
    })
}


function handleClickOption(item: any) {
    emits("click-option", item)
}



function handleReturnResult(value: number | string | boolean) {
    if (value === undefined) { value = ''; }
    returnModelValue(value)
    if (initSelect) {
        if (value || value === 0) {
            if (props.valueField && props.labelField) {
                if (props.multiple) {
                    emits('update:select', optionData.value.filter(ele => (value as string).indexOf(ele[props.valueField]) > -1))
                    emits('update:select-label', optionData.value.filter(ele => (value as string).indexOf(ele[props.valueField]) > -1).map(ele => ele[props.labelField]).toString())

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
            emits('change', value)
        }

    }
    initSelect.value = true;
}


if ((attrs["remote"] === true || attrs["remote"] === '') && props.url) {
    if (props.modelValue) {
        queryData['idString'] = props.modelValue.toString();
    }
}
currLoading.value = props.loading
function onConfirm(){
   const showText= optionData.value.filter(ele =>selectValue.value.indexOf(ele[props.valueField]) > -1).map(ele => ele[props.labelField]).toString()
    onMobileConfirm(showText)
}

onMounted(() => {
    if (props.url) {
        readData()
    } else {
        options.length = 0
        if (props.data) {
            options.push(...props.data)
        }
        initSelectValue()
        initSelectIndex();
    }
})

</script>
<template>
    <div class="els-node">
        <ElsFormNode v-bind="lessCom.getFormNodeProps(props)" ref="formNode" tagName="Select">
            <template v-if="!isMobile">
                <el-select v-if="!isVirtual" v-model="selectValue" :allowCreate="allowCreate" :multiple="multiple"
                    :remote-method="handleSearch" :style="{ width: currWidth?.appendPx() }" :loading="currLoading"
                    remote-show-suffix @visible-change="handleVisibleChange" @clear="handleClear" v-bind="attrs">

                    <slot name="extra">
                    </slot>
                    <template
                        v-if="(url || data && data.length > 0 || options.length) && !groupField && !defaultSlotData.length">
                        <el-option @click="handleClickOption(item)" v-for="item in options"
                            :disabled="item[disabledField] === true" :key="item[valueField]" :label="item[labelField]"
                            :value="item[valueField]">
                            <i class="check" v-if="multiple"></i>
                            <slot name="default" :item="item">
                                {{ item[labelField] }}
                            </slot>
                        </el-option>
                    </template>
                    <template
                        v-else-if="(url || data && data.length > 0 || options.length) && groupField && !defaultSlotData.length">
                        <el-option-group v-for="group in lessCom.dtGroupBy(options, groupField)" :key="group.key"
                            :label="group.key">
                            <el-option @click="handleClickOption(item)" v-for="item in group.value" :key="item[valueField]"
                                :label="item[labelField]" :value="item[valueField]">
                                <i class="check" v-if="multiple"></i>
                                <slot name="default" :item="item">
                                    {{ item[labelField] }}
                                </slot>
                            </el-option>
                        </el-option-group>
                    </template>
                    <slot name="default" v-else>
                    </slot>
                    <el-option @click="handleClickOption(item)" v-for="item in noExistOption" :key="item[valueField]"
                        :label="item[labelField]" :value="item[valueField]">
                        <i class="check" v-if="attrs.multiple"></i>
                        {{ item[labelField] }}
                    </el-option>
                    <template #empty v-if="slots['empty']">
                        <slot name="empty">
                        </slot>
                    </template>

                    <template #prefix v-if="slots['prefix']">
                        <slot name="prefix">
                        </slot>
                    </template>

                </el-select>
                <el-select-v2 v-else v-model="selectValue" :options="options"
                    :props="{ disabled: disabledField, label: labelField, value: valueField }" :multiple="multiple" v-bind="attrs"
                    :loading="currLoading" @clear="handleClear" @visible-change="handleVisibleChange"
                    :style="{ width: currWidth?.appendPx() }" :remote-method="handleSearch">
                    <template #default="{ item }">
                        <i class="check" v-if="multiple"></i>
                        <slot name="default" :item="item">
                            {{ item[labelField] }}
                        </slot>
                    </template>
                    <template #empty v-if="slots['empty']">
                        <slot name="empty">
                        </slot>
                    </template>
                    <template #prefix v-if="slots['prefix']">
                        <slot name="prefix">
                        </slot>
                    </template>
                </el-select-v2>
            </template>
            <template v-else>
                <van-picker v-model="selectValue" :columns="optionData" @confirm="onConfirm" :columns-field-names="{text: props.labelField, value: props.valueField}" @cancel="onMobileHiddenPopup" v-bind="attrs" >
                    <template #option="option">
                        <slot name="default" :item="option">
                            {{ option[labelField] }}
                        </slot>
                    </template>
                </van-picker>
            </template>
          

        </ElsFormNode>
    </div>
</template>
<style lang="less">
.els-node:has(>div[class^=el-select]) {
    display: inline-block;
    position: relative;
}

.el-select-dropdown__item.selected::after {
    content: "" !important;
}

.el-select-dropdown__item.selected .check,
.el-select-dropdown__option-item.is-selected .check {
    background-color: #409eff;
    border-color: #409eff;
}

.el-select-dropdown__item.selected .check:after,
.el-select-dropdown__option-item.is-selected .check:after {
    transform: rotate(45deg) scaleY(1);
}

.el-select-dropdown__item,
.el-select-dropdown__option-item {
    .check::after {
        box-sizing: content-box;
        content: "";
        border: 1px solid #fff;
        border-left: 0;
        border-top: 0;
        height: 7px;
        left: 4px;
        position: absolute;
        top: 1px;
        transform: rotate(45deg) scaleY(0);
        width: 3px;
        transition: transform .15s ease-in .05s;
        transform-origin: center;
    }

}

.el-select-dropdown__item,
.el-select-dropdown__option-item {
    .check {
        display: inline-block;
        position: relative;
        top: 2px;
        border: 1px solid #dcdfe6;
        border-radius: 2px;
        box-sizing: border-box;
        width: 14px;
        height: 14px;
        background-color: #fff;
        z-index: 1;
        transition: border-color .25s cubic-bezier(.71, -.46, .29, 1.46), background-color .25s cubic-bezier(.71, -.46, .29, 1.46);
        margin-right: 5px;
    }
}

.el-select-dropdown__item.selected::after,.el-select-dropdown__option-item.is-selected::after {
    display: none;
}

</style>