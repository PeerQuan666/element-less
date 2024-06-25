<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useValue } from '../../../utlis/use'
const { getValue } = useValue()
const getDataTypeData = getValue<Function>('getDataTypeData');
const validationCode = getValue<Function>('validationCode');

const camelCase = getValue<boolean>('camelCase', false);
const currSelectItem = defineModel<any>('nodeItem', { default: () => { return reactive<Record<string, any>>({}); } })
const dataTypeData = computed(() => {

    return getDataTypeData(currSelectItem.value.componentType)
})
const baseConfig = computed(() => {
    return currSelectItem.value.config.baseConfig;

})
function handleChangeKeyCode(keyCode) {
    if (camelCase) {
        currSelectItem.value.keyCode = keyCode.replace(keyCode[0], keyCode[0].toLowerCase())
    }
}

</script>
<template>
    <els-form v-model="currSelectItem" labelPosition="top">
        <els-input label="名称" prop="keyName" v-if="currSelectItem.componentGroup === 'Form'"></els-input>
        <els-input label="字段名" prop="keyCode" v-if="currSelectItem.formItem" @input="handleChangeKeyCode"
            :validMethod="validationCode"
            :required="currSelectItem.componentGroup !== 'Container' && currSelectItem.componentGroup !== 'Show'"></els-input>
        <els-select label="数据类型"
            v-if="currSelectItem.dataTypeName != 'Array' && currSelectItem.dataTypeName != 'Object' && currSelectItem.componentGroup === 'Form' && dataTypeData.length > 1"
            required :data="dataTypeData" @select="(sitem) => { currSelectItem.dataTypeName = sitem.selectItem.type; }"
            @click-option="currSelectItem.defaultValue = '';" valueField="value" labelField="label" placeholder="值类型"
            prop="dataType"></els-select>

        <els-select label="数据类型"
            v-if="currSelectItem.dataTypeName == 'Array' && currSelectItem.componentType && currSelectItem.componentGroup === 'Form' && dataTypeData.length > 1"
            required :data="dataTypeData"
            @select="(sitem) => { currSelectItem.arrayDataTypeName = sitem.selectItem.type; currSelectItem.defaultValue = ''; }"
            @click-option="currSelectItem.defaultValue = '';" valueField="value" labelField="label" placeholder="值类型"
            prop="arrayDataType"></els-select>
        <template v-if="currSelectItem.componentGroup === 'Form'">
            <els-radio-button label="默认值" :resetValueByChangeData="false" v-model="currSelectItem.defaultValue"
                v-if="currSelectItem.componentTypeName === 'Switch' && baseConfig['active-value'] !== undefined">
                <els-option
                    :value="baseConfig['inactive-value']">{{ baseConfig['inactive-text'] || baseConfig['inactive-value'] }}</els-option>
                <els-option
                    :value="baseConfig['active-value']">{{ baseConfig['active-text'] || baseConfig['active-value'] }}</els-option>
            </els-radio-button>
            <els-select label="默认值" :resetValueByChangeData="false" v-model="currSelectItem.defaultValue"
                :multiple="currSelectItem.componentTypeName === 'Checkbox'"
                v-else-if="['Select', 'Radio', 'Checkbox'].includes(currSelectItem.componentTypeName) && baseConfig['data'] !== undefined"
                v-bind="baseConfig">
            </els-select>
            <els-textarea label="默认值" prop="defaultValue" :rows="3"
                v-else-if="currSelectItem.dataTypeName === 'String'"></els-textarea>
            <els-input-number label="默认值" prop="defaultValue" v-else-if="currSelectItem.dataTypeName === 'Number'"
                controls-position="right"></els-input-number>

        </template>


    </els-form>

</template>
<style scoped lang="less">
.el-form:deep{
    .el-form-item {
        margin-bottom: 18px;
    }
}
</style>


