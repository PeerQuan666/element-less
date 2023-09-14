<script setup lang="ts">
import draggable from 'vuedraggable'
import {useAttrs} from 'vue'
defineOptions({ name: "ElsList", inheritAttrs: false })
const emits = defineEmits(['add'])
interface Props {
    data: Array<Record<string, any>>,
    sortable?: boolean,
    isRemove?: boolean,
    isAdd?: boolean,
    isModify?: boolean,
    isConfirmRemove?: boolean,
    itemClassName?: string
}
const props = withDefaults(defineProps<Props>(), {
    sortable: true,
    isRemove: true,
    isAdd: true,
    isModify: true,
    isConfirmRemove: true

})
const attrs=useAttrs()
function handleAdd() {
    if(attrs['onAdd']){
        emits("add", props.data)
    }else{
        props.data.push({})
    }

}
function handleRemove(item) {
    var index = props.data.indexOf(item)
    props.data.splice(index, 1)
}

</script>
<template >
    <div class="els-list">
        <draggable :list="data" handle=".el-icon-rank" v-bind="$attrs" item-key="">
            <template #item="{ element, index }">
                <div class="listitem flex" :class="itemClassName">
                    <slot name="default" :item="element" :index="index" :$item="element" :$index="index"></slot>
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
            </template>
        </draggable>
        <div v-if="isModify && isAdd" class="leo-list-add">
            <slot name="add"><el-button type="info" icon="edit" @click="handleAdd">添加</el-button></slot>
        </div>
    </div>
</template>

<style lang="less" scoped>
.els-list {
    .listitem {
        margin-bottom: 10px;
        display: flex;
        align-items: center;

        .els-list-operate {
            display: flex;
            column-gap: 5px;
            cursor:pointer;
        }
        .el-form+.els-list-operate{
            margin-bottom:18px;
        }
    }
    
}</style>