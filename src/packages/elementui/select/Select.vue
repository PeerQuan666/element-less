
    
<script lang="ts" setup>

import { ref, reactive, watch, useAttrs, computed, nextTick, provide,useSlots } from 'vue'
import { ElMessage } from 'element-plus';
import '../../utlis/lessPrototype.js'
import lessCom from '../../utlis/lessCom.js'
import  {ValueType} from '../../utlis/enumCom'
import  {FormItemProps} from '../../utlis/interfaceCom'
defineOptions({
  name: 'ElsSelect',
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
    width?: string|number,
    onChange?: Function,
    valueSeparator?: string,
}

const props = withDefaults(defineProps<Props>(), {
    valueType:ValueType.Auto,
    labelField: 'label',
    valueField: 'value',
    disabledField: 'disabled',
    selectIndex: -1,
    noExistOptionPrefix: '未知选项',
    hasNoExistOption: true,
    isInitTriggerSelect: true,
    resetValueByChangeData: true,
    valueSeparator:',',
    validationTrigger:'change',
    width:'220'
})
const slots=useSlots()
const attrs:Record<string,any> = useAttrs()
const emits = defineEmits(['update:modelValue', 'update:select', 'update:select-label', 'change', 'click-option', 'select', 'blur', 'clear', 'readdataed'])

const initSelect = ref(false)
const preSelectValue = ref<any>('')
const currLoading = ref(false)
const selectValue = ref<any>('')
const multiple=attrs['multiple']!==undefined&&attrs['multiple']!==false;
if(multiple){
    selectValue.value=[]
}
const selectItem = ref<any>()
const selectLabel = ref('')
const options: Array<Record<string, any>> = reactive([])
const noExistOption: Array<Record<string, any>> = reactive([])
const extraOption: Array<Record<string, any>> = reactive([])
const defaultSlotData: Array<Record<string, any>> = reactive([])
const queryData = reactive({ searchKey: '', idString: '' })


const optionData = computed<Array<Record<string, any>>>(() => {
    return options.concat(extraOption).concat(noExistOption);
})
watch(() => props.selectIndex, () => {
    initSelectIndex()
})
watch(() => props.url, () => {
    if (props.resetValueByChangeData) {
        if (multiple) {
            selectValue.value = [];
        } else {
            selectValue.value = "";
        }
    }
    readData();
})
watch(() => props.data, (val, oldVal) => {
    if (val === undefined && oldVal === undefined) { return; }
    if (val != oldVal && JSON.stringify(val) != JSON.stringify(oldVal)&&val) {
        if (props.resetValueByChangeData) {
            if (multiple) {
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
})
watch(() => props.modelValue, () => {
    initSelectValue();
    initNoExistData();
})
watch(selectValue, (val:any) => {
    if(multiple){
        handleReturnResult((val as Array<string|number>).join(props.valueSeparator));
        return
    }
    handleReturnResult(val);
})
provide('type', 'select')
provide('multiple', multiple)
provide('setExtraOption', setExtraOption)

function initSelectValue() {
    let currValueType = props.valueType;
    if (attrs["allow-create"]) {
        currValueType = ValueType.String
    }
    if (props.modelValue === '' || props.modelValue === undefined) {
        return
    }
    if (multiple) {
        if (currValueType === ValueType.Number) {
            selectValue.value  = props.modelValue.toString().toListNumber(props.valueSeparator)
        } else if (currValueType === ValueType.String) {
            selectValue.value  = props.modelValue.toString().toList(props.valueSeparator)
        } else if (optionData.value.length && typeof (optionData.value[0][props.valueField]) === "number") {
            selectValue.value  = props.modelValue.toString().toListNumber(props.valueSeparator)
        } else if (props.modelValue) {
            selectValue.value  = props.modelValue.toString().toList(props.valueSeparator)
        }
    }else{
        if (currValueType === ValueType.Number) {
            selectValue.value  = parseFloat(props.modelValue.toString());
        }
        else if (currValueType === ValueType.String) {
            selectValue.value  = props.modelValue.toString();
        }
        else if (optionData.value.length && props.modelValue.toString().length < 12 && typeof (optionData.value[0][props.valueField]) === "number") {
            selectValue.value  = parseFloat(props.modelValue.toString());
        } else {
            selectValue.value  = props.modelValue;
        }
    }
}

function initSelectIndex() {
    if (props.selectIndex > -1 && !props.modelValue) {
        if (optionData.value.length) {
            selectValue.value = optionData.value[props.selectIndex][props.valueField];
            if (multiple) {
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
            if (multiple) {
                if (selectValue.value.length) {
                    let existValue = (selectValue.value as Array<any>).filter(ele => !optionData.value.map(cele => cele[props.valueField]).includes(ele));
                    if (existValue && existValue.length) {
                        existValue.forEach(ele => {
                            if (ele === 0 || ele) {
                                let newOption: any = {};
                                if (attrs["allow-create"]) {
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
                        if (attrs["allow-create"]) {
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
function handleComitSelect(value: string | number|boolean) {
    try {
        if ((value || value === 0) && optionData.value.length) {
            let currOptions = optionData.value;
            let currValue = value;
            if (multiple) {
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
function handleBlur() {
    if (props.isClearSearchWithNoSelect && queryData.searchKey && !selectValue.value) {
        handleSearch('')
    }
    emits('blur');
}
function handleClear() {
    if (props.isClearWithSearch && queryData.searchKey) {
        handleSearch('')
    }
    emits('clear');

}
function handleSearch(searchValue: string) {
    if (attrs['remote']===undefined|| attrs['remote']===false) {
        return;
    }
    queryData['idString'] = selectValue.value?.toString();
    queryData['searchKey'] = searchValue
    readData()
}

function readData() {
    currLoading.value = true;
    let currUrl = props.url?.replacePowerUrl()??'';

    return new Promise((resolve, reject) => {
        currUrl.post(queryData).then(res => {
            if (res.ResultCode == "0") {
                options.length = 0;
                options.push(...res.Data)
                initSelectValue();
                initNoExistData();
                initSelectIndex();
                emits("readdataed", options)
            }
            else {
                ElMessage.error(res.ResultMessage)
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


function handleReturnResult(value: number|string|boolean) {
    if (value === undefined) { value = ''; }
    emits('update:modelValue', value)
    if (initSelect) {
        if (value || value === 0) {
            if (props.valueField && props.labelField) {
                if (multiple) {
                    emits('update:select', optionData.value.filter(ele => (value as string).indexOf(ele[props.valueField]) > -1))
                    emits('update:select-label', optionData.value.filter(ele =>  (value as string).indexOf(ele[props.valueField]) > -1).map(ele => ele[props.labelField]).toString())

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


if ((attrs["remote"]===true||attrs["remote"]==='') && props.url) {
    if(props.modelValue){
        queryData['idString'] = props.modelValue.toString();
    }
}
currLoading.value = props.loading
if (props.url) {
    readData()
} else {
    options.length = 0
    if(props.data){
        options.push(...props.data)
    }
    initSelectValue()
    initNoExistData();
    initSelectIndex();
}

</script>
<template>
    <el-select v-model="selectValue" :remote-method="handleSearch" :style="{width:props.width?.appendPx()}" :loading="currLoading" remote-show-suffix
        @blur="handleBlur" @clear="handleClear">
        <slot name="extra">
        </slot>
        <template v-if="(url || data&&data.length > 0 || options.length) && !groupField && !defaultSlotData.length">
            <el-option @click="handleClickOption(item)" v-for="item in options" :disabled="item[disabledField] === true"
                :key="item[valueField]" :label="item[labelField]" :value="item[valueField]">
                <i class="check" v-if="multiple"></i>
                <slot name="default" :item="item">
                    {{ item[labelField] }}
                </slot>
            </el-option>
        </template>
        <template v-else-if="(url || data&&data.length > 0 || options.length) && groupField && !defaultSlotData.length">
            <el-option-group v-for="group in lessCom.dtGroupBy(options, groupField)" :key="group.key" :label="group.key">
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
</template>
<style lang="less" scoped>
.el-select-dropdown__item.selected::after {
    content: "" !important;
}
.el-select-dropdown__item.selected .check {
    background-color: #409eff;
    border-color: #409eff;
}
.el-select-dropdown__item.selected .check:after {
        transform: rotate(45deg) scaleY(1);
    }
    .el-select-dropdown__item .check::after {
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
.el-select-dropdown__item .check {
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
    transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
    margin-right: 5px;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after{
    display: none;
}
</style>
../../utlis/lessCom.js../../utlis/lessPrototype.js