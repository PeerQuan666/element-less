<script setup lang="ts">
import { useAttrs, h, watchEffect, ref, watch } from 'vue'
import draggable from 'vuedraggable'
import { useVModel } from '@vueuse/core'
import ElsForm from '../../elementui/form/Form.vue';
import lessCom from '../../utlis/lessCom'

defineOptions({ name: "ElsList", inheritAttrs: false })
const emits = defineEmits(['add', 'update:modelValue'])
interface Props {
    modelValue: Array<Record<string, any>>,
    sortable?: boolean,
    isRemove?: boolean,
    isAdd?: boolean,
    isModify?: boolean,
    isConfirmRemove?: boolean,
    itemClassName?: string,
    hasForm?: boolean,
    onAdd?: Function,
    itemKey?: string,
    labelWidth?: string
}
const props = withDefaults(defineProps<Props>(), {
    sortable: true,
    isRemove: true,
    isAdd: true,
    isModify: true,
    hasForm: true,
    isConfirmRemove: true,
    itemKey: ''

})

const currData = useVModel(props, 'modelValue', emits)
const dropData = ref<any>([])
const currItemKey = ref(props.itemKey)
watch(()=>props.modelValue,(val)=>{
    if(props.itemKey){
        dropData.value = val
    }
},{immediate:true})

if (!props.itemKey) {
    currData.value.forEach(ele => {
        dropData.value.push({ itemKey: lessCom.Guid32(), value: ele })
    })
    currItemKey.value = 'itemKey'
    watch(dropData, (val) => {
        emits('update:modelValue', val.map(ele => ele.value))
    }, { deep: true })
}

const attrs = useAttrs()

function handleAdd() {
    if (props.onAdd) {
        if(!props.itemKey){
            dropData.value.push({itemKey: lessCom.Guid32(), value:props.onAdd(dropData.value)})

        }else{
            dropData.value.push(props.onAdd(dropData.value))

        }
    } else {
        dropData.value.push({})
    }

}
function handleRemove(item) {
    var index = dropData.value.indexOf(item)
    dropData.value.splice(index, 1)
}

let container = h('div')
let outContainer = h('div')
watchEffect(() => {
    if (props.hasForm && dropData.value.length) {
        if (typeof (dropData.value[0]) !== 'object') {
            outContainer = h(ElsForm, { modelValue: dropData })
            container = h('div')

        } else {
            container = h(ElsForm)
            outContainer = h('div')
        }
    }
})
</script>
<template >
    <component :is="outContainer" class="els-list" :labelWidth="labelWidth">
        <draggable :list="dropData" handle=".el-icon-rank" v-bind="attrs" :item-key="currItemKey">
            <template #item="{ element, index }">
                <component :is="container" v-model="dropData[index]" inline :labelWidth="labelWidth">
                    <div class="listitem flex" :class="itemClassName">
                        <slot v-if="itemKey" name="default" v-bind="{ item: element, index: index, $item: element, $index: index,element:element }">
                        </slot>
                        <slot v-else name="default" v-bind="{ item: element.value, index: index, $item: element.value, $index: index,element:element }">
                        </slot>
                        <span class="els-list-operate" v-if="sortable || isRemove" style="margin-left:10px;">
                            <slot name="drag" v-if="sortable && isModify">
                                <el-icon class="el-icon-rank">
                                    <Rank />
                                </el-icon>
                            </slot>
                            <slot name="remove" v-if="isModify && isRemove">
                                <el-popconfirm title="确定删除吗？" @confirm="handleRemove(element)" v-if="isConfirmRemove">
                                    <template #reference>
                                        <el-icon class="el-icon-remove">
                                            <Remove />
                                        </el-icon>
                                    </template>
                                </el-popconfirm>
                                <el-icon class="el-icon-remove" v-else @click="handleRemove(element)">
                                    <Remove />
                                </el-icon>
                            </slot>
                        </span>
                    </div>
                </component>
            </template>
        </draggable>
        <div v-if="isModify && isAdd" class="leo-list-add">
            <slot name="add"><el-button type="info" icon="edit" @click="handleAdd">添加</el-button></slot>
        </div>
    </component>
</template>

<style lang="less" >
.els-list {
    .listitem {
        margin-bottom: 10px;
        display: flex;
        align-items: center;

        .els-list-operate {
            display: flex;
            column-gap: 5px;
            cursor: pointer;

        }

        >.els-node {
            flex-grow: 1;
        }
    }

    .el-form-item {
        margin-bottom: 18px !important;
    }

    .listitem:has(div[class^=el-form-item]) {
        margin-bottom: 0px;

        .els-list-operate {
            margin-bottom: 18px;
        }
    }

}</style>