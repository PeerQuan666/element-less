<script setup lang="ts">
import { ref, reactive, watch, useAttrs, computed, nextTick, provide } from 'vue'
import { ElMessage } from 'element-plus';
import BbOption from '../option/Option.vue';
import BbOptionGroup from  '../option-group/OptionGroup.vue';
import babyCom from '../../utlis/babyCom.js'
import '../../utlis/babyPrototype.js'
import  {ValueType} from '../../utlis/enumCom'
import {RadioProps} from '../../utlis/interfaceCom'
defineOptions({
  name: 'BbRadio',
})

const props = withDefaults(defineProps<RadioProps>(), ({
    type: 'radio',
    labelField: 'label',
    valueField: 'value',
    noExistOptionPrefix: '未知选项',
    hasNoExistOption: true,
    disabledField: 'disabled',
    selectIndex: -1,
    resetValueByChangeData: true,
    isInitTriggerSelect: true,
    validationTrigger:'change'

}))


const selectValue = ref<any>()
const preSelectValue = ref<any>('')
const selectItem = ref<any>()
const selectLabel = ref('')
const filterText = ref('')
const initSelect = ref(false)
const options: Array<Record<string, any>> = reactive([])
const noExistOption: Array<Record<string, any>> = reactive([])
const extraOption: Array<Record<string, any>> = reactive([])
const originalData: Array<Record<string, any>> = reactive([])
const queryData = reactive({ searchKey: '', idString: '' })
const attrs = useAttrs()
const radioStyle:any=reactive([]);
const emits = defineEmits(['select', 'readdataed', 'change-option', 'update:modelValue', 'update:select', 'update:select-label', 'change'])
const optionData = computed<Array<Record<string, any>>>(() => {
    return options.concat(extraOption).concat(noExistOption);
})

watch(selectValue, (val) => {
    handleReturnResult(val);
})
watch(() => props.selectIndex, () => {
    initSelectIndex();
})
watch(() => props.modelValue, () => {
    initSelectValue();
    initNoExistData()
})
watch(() => props.url, () => {
    if (props.resetValueByChangeData) {
        selectValue.value = "";
    }
    readData();
})
watch(() => props.data, (val) => {

    if (props.resetValueByChangeData) {
        selectValue.value = "";
    }
    options.length = 0;
    originalData.length = 0;
    if (val) {
        options.push(...val)
        originalData.push(...val)
    }
    initNoExistData();
    initSelectIndex();

})

watch(filterText, (val) => {
    options.length = 0;
    options.push(...originalData.filter((ele) => {
        return ele[props.labelField].toLowerCase().indexOf(val.toLowerCase()) > -1;
    }))

})
if(props.type=='button'){
    provide('type', 'radiobutton')

}else{
provide('type', 'radio')
provide('optionWidth', props.optionWidth)

}
provide('setExtraOption', setExtraOption)

const radioClass: string[] = reactive([])
if (props.type == 'radio') {

    radioStyle.push({'text-align':'left'})
    if(props.width){
        radioStyle.push({'width':props.width.appendPx()})
    }
    radioClass.push('bb-radio-default')
}
else {
    radioClass.push('bb-radio')
   

}
if (props.height) {
    radioClass.push('scrollheight')
    if(props.height){
        radioStyle.push({'max-height':props.height.appendPx()})
    }

}

function initSelectValue() {
    let currValueType = props.valueType;
    if (props.modelValue === '' || props.modelValue === undefined) { selectValue.value = ''; return }
    if (currValueType === ValueType.Number) {
        selectValue.value = parseFloat(props.modelValue.toString());
    }
    else if (currValueType === ValueType.String) {
        selectValue.value = props.modelValue.toString();
    }
    else if (optionData.value.length && props.modelValue.toString().length < 12 && typeof (optionData.value[0][props.valueField]) === "number") {
        selectValue.value = parseFloat(props.modelValue.toString());
    } else {
        selectValue.value = props.modelValue;
    }

}
function initSelectIndex() {
    if (props.selectIndex > -1 && !props.modelValue) {
        if (optionData.value.length) {
            selectValue.value = optionData.value[props.selectIndex][props.valueField];
        }
    }
}
function setExtraOption(item: Record<string, any>) {
    let index = optionData.value.findIndex(ele => ele[props.valueField] == item.value)
    if (index == -1) {
        let currSlotData:Record<string,any> = {};
        currSlotData[props.labelField] = item.label;
        currSlotData[props.valueField] = item.value;
        currSlotData["DataIsExtra"] = true;
        extraOption.push(currSlotData)
    }
}
function initNoExistData() {
    nextTick(() => {
        noExistOption.length = 0;
        if (props.hasNoExistOption) {
            if (selectValue.value) {
                let currOption = optionData.value.find(oele => oele[props.valueField] == selectValue.value);
                if (!currOption) {
                    let newOption:Record<string,any> = {};
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
    })
}
function handleComitSelect(value: string | number | boolean) {
    try {
        if ((value || value === 0) && optionData.value.length) {
            let currValue = value;
            selectItem.value = optionData.value.find(ele => value === ele[props.valueField])
            if (selectItem.value) {
                selectLabel.value = selectItem.value[props.labelField]
            }
            emits('select', { selectItem: selectItem.value, selectLabel: selectLabel.value, selectValue: currValue, preSelectValue: preSelectValue.value });
            preSelectValue.value = value;
        }
    } catch (err) {
        console.log(err)
    }
}
function readData() {

    let currUrl = props.url?.replacePowerUrl()??'';
  
    queryData['idString'] = selectValue.value?.toString();

    return new Promise((resolve, reject) => {
        currUrl.post(queryData).then(res => {
            if (res.ResultCode == "0") {
                options.length = 0;
                options.push(...res.Data)
                originalData.length = 0;
                originalData.push(...res.Data)

                initSelectValue();
                initNoExistData();
                initSelectIndex();
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
function handleClickOption(item: any) {
    emits("change-option", item)
}
function handleReturnResult(value: number | string | boolean) {
    if (value === undefined) { value = ''; }
    emits('update:modelValue', value)
    if (initSelect.value) {
        if (value || value === 0) {
            if (props.valueField && props.labelField) {
                let currOption = optionData.value.find(ele => value == ele[props.valueField]);
                emits('update:select', currOption)
                if (currOption) {
                    emits('update:select-label', currOption[props.labelField])
                } else {
                    emits('update:select-label', '')
                }
            }
            handleComitSelect(value);
            emits('change', value)
        }
    }
    initSelect.value = true;

}


initSelect.value = props.isInitTriggerSelect;
if (props.modelValue === '') {
    initSelect.value = true;
}
if (props.url) {
    readData()
} else {
    if (props.data) {
        options.push(...props.data)
        originalData.push(...props.data)
    }
    initSelectValue()
    initNoExistData();
    initSelectIndex();
}

</script>
<template>
    <div  :class="radioClass"  :style="radioStyle">
        <div v-if="props.filterable">
            <el-input style="width:200px;" suffix-icon="Search" v-if="filterable" placeholder="输入关键字进行过滤"
                v-model="filterText" clearable>
            </el-input>
        </div>
        <el-radio v-if="!url && (!data || !data.length) && !optionData.length" ref="leo-radio" v-model="selectValue"
            v-bind="attrs">
            <slot name="default"></slot>
        </el-radio>
        <el-radio-group v-else v-model="selectValue" ref="bb-radio-group" v-bind="attrs">
            <slot name="extra"></slot>
            <el-empty v-if="filterText&&!optionData.length"></el-empty>
            <template v-else-if="(url || data&&data.length > 0 || options.length) && !groupField">
                <bb-option :type="type" v-for="(item, index) in options" :key="index" :value="item[valueField]"
                    :disabled="item[disabledField] === true" @click.native="handleClickOption(item)">
                    <slot name="default" :item="item">
                        {{ item[labelField] }}
                    </slot>
                </bb-option>
            </template>
            <template v-else-if="(url || data&&data.length > 0) && groupField">
                <template v-for="gitem in babyCom.dtGroupBy(options, groupField)">
                    <bb-option-group :label="gitem.key??'未分组'">
                        <bb-option :type="type" v-for="(item, index) in gitem.value" :key="index" :value="item[valueField]"
                            :disabled="item[disabledField] === true" @click.native="handleClickOption(item)">
                            <slot name="default" :item="item">
                                {{ item[labelField] }}
                            </slot>
                        </bb-option>
                    </bb-option-group>
                </template>
            </template>
            <slot name="default" v-else>
            </slot>
            <bb-option :type="type" v-for="(item) in noExistOption" :key="item[valueField]" :value="item[valueField]" @click.native="handleClickOption(item)">{{ item[labelField] }}</bb-option>
        </el-radio-group>
    </div>
</template>

<style lang="less" scoped>


.bb-radio {
    display:flex;
    .el-radio-group {
        display: inline-block;
        width: 100%;
    }
}

.bb-radio-default {
    .el-radio-group {
        width: 100%;
    }
    .el-radio {
        margin-bottom: 15px;
    }
}

.scrollheight {
    overflow-y: scroll;
    border: 1px solid #dcdfe6;
    padding: 5px;
}
</style>