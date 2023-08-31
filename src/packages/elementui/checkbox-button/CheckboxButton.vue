<script setup lang="ts">
import { useSlots } from 'vue'
import '../../utlis/babyPrototype.js'
import {watch,ref} from 'vue'
import BbCheckbox from '../checkbox/Checkbox.vue'
import {CheckboxProps} from '../../utlis/interfaceCom'
defineOptions({
  name: 'BbCheckboxButton',
})
const slots = useSlots()
const emits=defineEmits(['update:modelValue'])

const selectValue=ref('')
const props = withDefaults(defineProps<CheckboxProps>(), {
    labelField: 'label',
    valueField: 'value',
    disabledField: 'disabled',
    noExistOptionPrefix: '未知选项',
    hasNoExistOption: true,
    resetValueByChangeData: true,
    type: 'checkboxbutton'
})
selectValue.value=props.modelValue??''
watch(() => props.modelValue, (val) => {
    selectValue.value=val??''
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
    <bb-checkbox v-model="selectValue" v-bind="props">
     <template v-for="item in slotNames" :slot="item">
        <slot :name="item" ></slot>
    </template>
    </bb-checkbox>
</template>
