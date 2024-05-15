<script setup lang="ts">
import { useValue } from '../../utlis/use'
interface Props {
    nodeItem: Record<string, any>,
}
const props = defineProps<Props>()
const { getValue } = useValue(props)
const removeItem = getValue<Function>('removeItem', () => { })


</script>

<template>
    <span class="els-dynamic-d-v-item-type" v-if="nodeItem.componentGroup == 'Form'">
        <span>{{ nodeItem.keyCode }}</span>
        <span>{{ nodeItem.dataTypeName === 'Array' ? `Array
            <${nodeItem.arrayDataTypeName ? nodeItem.arrayDataTypeName : 'T'}>` : nodeItem.dataTypeName }}
        </span>
    </span>
    <span class="els-dynamic-d-v-item-move">
        <el-icon>
            <Hide />
        </el-icon>
        <el-popconfirm title="确定删除吗？" @confirm="removeItem(nodeItem)">
            <template #reference>
                <el-icon class="el-icon-remove">
                    <Delete />
                </el-icon></template>
        </el-popconfirm>
        <el-icon class="el-icon-rank els-view-move">
            <Rank />
        </el-icon>
    </span>
</template>
<style scoped>

.els-dynamic-d-v-item-type {
        position: absolute;
    z-index: 2;
    background: #aaaaaabf;
    color: #fff;
    font-size: 12px;
    padding: 0 3px;
    display: flex;
    left:0px;
    top: 0px;
    column-gap: 5px;
    line-height: 15px;
}
.els-dynamic-d-v-item-move {
    position: absolute;
    z-index: 2;
    background: #aaaaaadb;
    color: #fff;
    font-size: 12px;
    right: 0px;
    top:0px;
    padding: 0 3px;
    display: none;
    cursor: pointer;
    line-height: 15px;
    gap: 5px;

}
</style>