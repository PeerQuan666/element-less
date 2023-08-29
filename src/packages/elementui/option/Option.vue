<script lang="ts" setup>

import { ref,inject, useSlots ,reactive} from 'vue';
defineOptions({name:'BbOption'})
interface Props{
    type?:string,
    label?:string,
    value?:string|number|boolean
}
const props=defineProps<Props>()
const componentName=ref('')
const currLabel=ref('')
const multiple=ref(false)
const type=inject<string>('type')??''
const optionWidth=inject<string>('optionWidth','')
const slots=useSlots()
const optionStyle:any=reactive([]);

if(optionWidth){
    optionStyle.push({'width':optionWidth.appendPx()})
}
if (type != 'tabs' && type != 'dropdown') { 
    switch (type) {
        case 'radio':
            componentName.value = 'el-radio';
            break;
        case 'radiobutton':
            componentName.value = 'el-radio-button';
            break;
        case 'checkbox':
            componentName.value = 'el-checkbox';
            break;
        case 'checkboxbutton':
        componentName.value = 'el-checkbox-button';
            break;
    }
 }
 multiple.value=inject('multiple',false)
 currLabel.value = props.label??'';
if (type == "select"||type.indexOf("checkbox")>-1||type.indexOf("radio")>-1) {
    if (slots.default && slots.default()[0].type?.toString() == "Symbol(v-txt)") {
        currLabel.value = slots.default()[0].children?.toString()??''
    }
} 
const setExtraOption=inject<Function>('setExtraOption')

if(setExtraOption){
    setExtraOption({ label: currLabel.value, value: props.value });
}
</script>
<template>
 <el-option v-if="type=='select'"  :label="currLabel" :value="value" v-bind="$attrs"  >
        <i class="check" v-if="multiple"></i><slot name="default">{{currLabel}}</slot>
    </el-option>
        <el-tab-pane v-else-if="type=='tabs'"  :label="label" :name="value" v-bind="$attrs"  >
            <template #default>
                <slot name="default"></slot>
            </template>
        <template #label v-if="$slots.label">
                <slot name="label"></slot>
        </template>
    </el-tab-pane>
        <el-dropdown-item v-else-if="type=='dropdown'"  :command="value"  v-bind="$attrs"  >
            <template #default>
                <slot name="default">{{label}}</slot>
            </template>
        <template #dropdown v-if="$slots.dropdown">
                <slot name="dropdown"></slot>
        </template>
    </el-dropdown-item>
    <component v-else :is="componentName" :style="optionStyle" v-bind="$attrs" :label="value"><slot name="default">{{label}}</slot></component>
</template>
