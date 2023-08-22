<script setup lang="ts">
import { useSlots } from 'vue'
import '../../utlis/babyPrototype.js'
import {watch,ref} from 'vue'
import BbRadio from '../radio/Radio.vue'
import {RadioProps} from '../../utlis/interfaceCom'
defineOptions({
  name: 'BbRadioButton',
})
const slots = useSlots()
const emits=defineEmits(['update:modelValue'])

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
selectValue.value=props.defaultValue
watch(() => props.modelValue, (val) => {
    selectValue.value=val
})
watch(selectValue,(value)=>{
    emits('update:modelValue', value)
})
const slotNames:any=[]
for(const slotItem in slots){
    slotNames.push(slotItem)
}

</script>
<template>
    <bb-radio v-model="selectValue" v-bind="props">
     <template v-for="item in slotNames" :slot="item">
        <slot :name="item" ></slot>
    </template>
    </bb-radio>
</template>
