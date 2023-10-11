<script setup lang="ts">
import {useAttrs,h,provide} from 'vue'
import draggable from 'vuedraggable'
import { useVModel } from '@vueuse/core'
import ElsForm from '../../elementui/form/Form.vue';
defineOptions({ name: "ElsList", inheritAttrs: false })
const emits = defineEmits(['add'])
interface Props {
    data: Array<Record<string, any>>,
    sortable?: boolean,
    isRemove?: boolean,
    isAdd?: boolean,
    isModify?: boolean,
    isConfirmRemove?: boolean,
    itemClassName?: string,
    hasForm?:boolean,
    onAdd?:Function,
    itemKey?:string,
    labelWidth?:string
}
const props = withDefaults(defineProps<Props>(), {
    sortable: true,
    isRemove: true,
    isAdd: true,
    isModify: true,
    hasForm:true,
    isConfirmRemove: true,
    itemKey:''

})
provide('labelWidth', props.labelWidth)
const currData=useVModel(props, 'data', emits) 
const attrs=useAttrs()
function handleAdd() {
    if(props.onAdd){
        props.onAdd(currData.value)
    }else{
        currData.value.push({})
    }

}
function handleRemove(item) {
    var index = currData.value.indexOf(item)
    currData.value.splice(index, 1)
}
let container =props.hasForm? h(ElsForm):h('div')

</script>
<template >
 
    <div class="els-list">
        <draggable :list="currData" handle=".el-icon-rank" v-bind="attrs" :item-key="itemKey">
            <template #item="{ element, index }">  
                <component :is="container"  v-model="currData[index]" inline :slotData="{ item: element, index: index, $item: element, $index: index }">
                    <div class="listitem flex" :class="itemClassName">
               
                        <slot name="default" v-bind="{ item: element, index: index, $item: element, $index: index }"></slot>
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
    </div>
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

        .els-list-operate {
            margin-bottom: 18px;
        }
    }

}
</style>