<script setup lang="ts">
import { useSlots } from 'vue'

import {watch,ref} from 'vue'
import ElsRadio from '../radio/Radio.vue'
import {RadioProps} from '../../utlis/interfaces'
defineOptions({
  name: 'ElsRadioButton',
})
const slots = useSlots()
const emits=defineEmits(['update:modelValue'])
import {useModel,useMobile} from '../../utlis/use'
const selectValue=ref('')
const props:any = withDefaults(defineProps<RadioProps>(), ({
    type: 'button',
    labelField: 'label',
    valueField: 'value',
    noExistOptionPrefix: '未知选项',
    hasNoExistOption: true,
    disabledField: 'disabled',
    selectIndex: -1,
    resetValueByChangeData: true,
    isInitTriggerSelect: true,
}))

const {
    currModelValue,
    returnModelValue,
} = useModel(props)

watch(currModelValue,(val)=>{
    selectValue.value=val
})


watch(selectValue,(value)=>{
    returnModelValue(value)
})
const slotNames:any=[]
for(const slotItem in slots){
    slotNames.push(slotItem)
}

</script>
<template>
    <els-radio v-model="selectValue" v-bind="props">
     <template v-for="item in slotNames" :slot="item">
        <slot :name="item" ></slot>
    </template>
    </els-radio>
</template>