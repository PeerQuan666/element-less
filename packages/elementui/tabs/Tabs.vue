<script setup lang="ts">
import { ref, reactive, watch, useAttrs, computed, nextTick, onMounted } from 'vue'
import { useValue } from '../../utlis/use';
import { ValueType } from '../../utlis/enums'
import { TabsProps } from '../../utlis/interfaces'
import { useModel, useMobile } from '../../utlis/use'
import { lessCom, ElsMessage } from '../../utlis/com'
defineOptions({
    name: 'ElsTabs',
})
const props = withDefaults(defineProps<TabsProps>(), ({
    labelField: 'label',
    valueField: 'value',
    noExistOptionPrefix: '未知选项',
    hasNoExistOption: true,
    disabledField: 'disabled',
    selectIndex: 0,
    resetValueByChangeData: true,
    isInitTriggerSelect: true,
    validTrigger: 'change',
    labelWidth:"0",
    hasFormItem:true

}))
const provideOptionData = ref<any>({ type: 'tabs' })
const { setValue } = useValue(props)
const { $codeField, $messageField, $dataField, $success } = lessCom.getApiConfig()

const selectValue = ref<any>('')
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
const formNode = ref()
const emits = defineEmits(['select', 'readdataed', 'click-option', 'update:modelValue', 'update:select', 'update:select-label', 'change'])
const optionData = computed<Array<Record<string, any>>>(() => {
    return options.concat(extraOption).concat(noExistOption);
})

const {
    currModelValue,
    returnModelValue,
} = useModel(props)

const { isMobile, onMobileConfirm, onMobileHiddenPopup } = useMobile(formNode)

watch(selectValue, (val) => {
    handleReturnResult(val);
})
watch(() => props.selectIndex, () => {
    initSelectIndex();
})


watch(() => props.url, () => {
    if(!props.url){return}
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




watch(currModelValue, () => {
    initSelectValue()

})

function initSelectValue() {

    const currValue = currModelValue.value
    let currValueType = props.valueType;
    if (currValue === '' || currValue === undefined || currValue === null || selectValue.value.toString() === currValue.toString()) {

        return
    }
    if (currValueType === ValueType.Number) {
        selectValue.value = parseFloat(currValue.toString());
    }
    else if (currValueType === ValueType.String) {
        selectValue.value = currValue.toString();
    }
    else if (optionData.value.length && currValue.toString().length < 12 && typeof (optionData.value[0][props.valueField]) === "number") {
        selectValue.value = parseFloat(currValue.toString());
    } else {
        selectValue.value = currValue;
    }
    initNoExistData()
}
function initSelectIndex() {
    const currValue = currModelValue.value
    if (props.selectIndex > -1 && !currValue) {
        if (optionData.value.length) {
            selectValue.value = optionData.value[props.selectIndex][props.valueField];
        }
    }
}
function setExtraOption(item: Record<string, any>) {
    let index = optionData.value.findIndex(ele => ele[props.valueField] == item.value)
    if (index == -1) {
        let currSlotData: Record<string, any> = {};
        currSlotData[props.labelField] = item.label;
        currSlotData[props.valueField] = item.value;
        currSlotData["DataIsExtra"] = true;
        extraOption.push(currSlotData)
    }
    if(!selectValue.value){
        initSelectIndex()
    }
}
function initNoExistData() {
    nextTick(() => {
        noExistOption.length = 0;
        if (props.hasNoExistOption) {
            if (selectValue.value) {
                let currOption = optionData.value.find(oele => oele[props.valueField] == selectValue.value);
                if (!currOption) {
                    let newOption: Record<string, any> = {};
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
    if(!props.url){return}
    let currUrl = props.url?.replacePowerUrl() ?? '';

    queryData['idString'] = selectValue.value?.toString();

    return new Promise((resolve, reject) => {
        currUrl.post(queryData).then(res => {
            if (res[$codeField] == $success) {
                options.length = 0;
                options.push(...res[$dataField])
                originalData.length = 0;
                originalData.push(...res[$dataField])

                initSelectValue();
                initSelectIndex();
                emits("readdataed", options)
            }
            else {
                ElsMessage.error(res[$messageField])
            }
            resolve(true)
        }).catch(action => {
            reject(action)
        })

    })
}
function handleClickOption(item: any) {
    emits("click-option", item)
}


function handleReturnResult(value) {
    if (value === undefined) { value = ''; }
    returnModelValue(value)
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
    onMobileConfirm(value)

}

initSelect.value = props.isInitTriggerSelect;
if (props.modelValue === '') {
    initSelect.value = true;
}
onMounted(() => {
    if (props.url) {
        readData()
    } else {
        if (props.data) {
            options.push(...props.data)
            originalData.push(...props.data)
        }
        initSelectValue()
        initSelectIndex();
    }
})
setValue({
    "provideOption": provideOptionData,
    setExtraOption
})


</script>
<template>
    <div class="els-node" :style="labelWidth==='0'?'--margin-bottom:0px': ''">
        <el-tabs v-model="selectValue" ref="elsTabs" v-bind="attrs">
            <slot name="extra">
            </slot>
            <template #label v-if="$slots.label">
                <slot name="label"></slot>
            </template>
            <template v-if="(url || data && data.length || options.length)">
                <template v-if="valueField">
                    <els-option @click.native="handleClickOption(item)" v-for="(item, index) in options"
                        :disabled="item[disabledField] === true" :key="item[valueField]" :label="item[labelField]"
                        :value="item[valueField]">
                        <slot name="default" :item="item">
                        </slot>
                    </els-option>
                </template>
                <template v-else>
                    <els-option @click.native="handleClickOption(item)" v-for="(item, index) in options"
                        :disabled="item[disabledField] === true" :label="item[labelField]">
                        <slot name="default" :item="item">
                        </slot>
                    </els-option>
                </template>
            </template>
            <slot name="default" v-else></slot>
            <template v-if="valueField">
                <els-option v-for="(item, index) in noExistOption" :key="item[valueField]" :label="item[labelField]"
                    :value="item[valueField]">
                </els-option>
            </template>
            <template v-else>
                <els-option v-for="(item, index) in noExistOption" :label="item[labelField]">
                </els-option>
            </template>
        </el-tabs>
    </div>

</template>
<style scoped lang="less">
.els-node:deep{
    >.el-form-item>.el-form-item__content{
        margin-bottom: var(--margin-bottom);
    }
}
.els-node,.el-tabs{flex-grow: 1}
</style>