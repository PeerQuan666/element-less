<script setup lang="ts">
import { watch, reactive, ref,computed } from 'vue'
import { ElMessage } from 'element-plus'
import { lessCom } from '../../utlis/com'
import { useValue,useMobile } from '../../utlis/use';
const { $codeField, $messageField, $dataField, $success } = lessCom.getApiConfig()
defineOptions({
    name: 'ElsDropdown',
})

interface Props {
    labelField?: string,
    valueField?: string,
    disabledField?: string,
    iconField?: string,
    url?: string,
    data?: Array<any>,
    title?: string,
    lazyRender?:boolean

}

const props = withDefaults(defineProps<Props>(), {
    labelField: 'label',
    valueField: 'value',
    disabledField: 'disabled',
    iconField: 'iconField',
    url: '',
    lazyRender:false
})
const modelValue=defineModel();
const { setValue,getValue } = useValue(props)
const emits = defineEmits(['update:select', 'update:select-label','select','readdataed'])
const isMobile = getValue<boolean>('isMobile', false)
const options = reactive<Array<Record<string, any>>>([])
const provideOptionData = ref<any>({ type: 'dropdown', optionWidth: '' })
const extraOption: Array<Record<string, any>> = reactive([])
const selectItem = ref<any>()
const selectLabel = ref('')
const initSelect = ref(false)
const preSelectValue = ref<any>('')
watch(() => props.url, (val) => {
    if (val) {
        readData();
    }
}, { immediate: true })

watch(() => props.data, (val) => {
    options.length = 0;
    if (val) {
        options.push(...val)

    }
}, { immediate: true })

const optionData = computed<Array<Record<string, any>>>(() => {
    return options.concat(extraOption);
})
const mobileOptionData=computed<Array<Record<string, any>>>(() => {
    return optionData.value.map(ele=>{return {text:ele[props.labelField??'text'],value:ele[props.valueField??'value'],disabled:ele[props.disabledField??'disabled'],icon:ele[props.iconField??'icon']}})
})
const showTitle=computed<string>(()=>{
    if(props.title){
        return props.title
    }
    if(!selectLabel.value&& modelValue.value){
        const currItem=optionData.value.find(ele => modelValue.value === ele[props.valueField])
        if(currItem){
           return currItem[props.labelField]
        }
    }
    return selectLabel.value
})
function readData() {
    let currUrl = props.url?.replacePowerUrl() ?? '';
    return new Promise((resolve, reject) => {
        currUrl.post({}).then(res => {
            if (res[$codeField] == $success) {
                options.length = 0;
                options.push(...res[$dataField])
            }
            else {
                ElMessage.error(res[$messageField])
            }
            resolve(true)
        }).catch(action => {
            reject(action)
        })
    })
}
function handleCommand(val){
    handleReturnResult(val)
}


function handleReturnResult(value: number | string | boolean) {
    if (value === undefined) { value = ''; }
    modelValue.value=value
    if (initSelect) {
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
        }

    }
    initSelect.value = true;
}
function handleComitSelect(value: string | number | boolean) {
    try {
        if ((value || value === 0) && optionData.value.length) {
            let currOptions = optionData.value;
            let currValue = value;
            selectItem.value = currOptions.find(ele => value === ele[props.valueField])
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
setValue({
    "provideOption":provideOptionData,
    setExtraOption
})

</script>
<template>
    <el-dropdown v-if="!isMobile" @command="handleCommand">
        <slot>
            <span class="el-dropdown-link">
                <span v-html="showTitle"></span>
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
        </slot>
        <template #dropdown>
            <el-dropdown-menu>
                <template v-if="(url || data && data.length > 0 || options.length)">
                    <el-dropdown-item  v-for="(item, index) in options" :key="index"
                        :command="item[valueField]" :icon="item[iconField]"
                        :disabled="item[disabledField] === true">
                        <slot name="item" :item="item">
                            {{ item[labelField] }}
                        </slot>
                    </el-dropdown-item>
                </template>
                <template v-else>
                    <slot name="dropdown"></slot>
                </template>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
    <van-dropdown-item :lazyRender="lazyRender" v-else v-model="modelValue" @change="handleCommand" :options="mobileOptionData" >
        <template #title v-if="title">
            <slot>
                <span v-html="title"></span></slot>
        </template>
        <slot name="dropdown"></slot>
    </van-dropdown-item>

   
</template>