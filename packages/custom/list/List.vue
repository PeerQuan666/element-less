<script setup lang="ts">
import { useAttrs, h, watchEffect, ref, watch, computed } from 'vue'
import draggable from 'vuedraggable'
import { useVModel } from '@vueuse/core'
import ElsForm from '../../elementui/form/Form.vue';
import { lessCom } from '../../utlis/com';
import { useValue } from '../../utlis/use'

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
    labelWidth?: string,
    outFormData?:Record<string, any>,
    innerFormData?:Record<string, any>,
    borderType?:string

}
const props = withDefaults(defineProps<Props>(), {
    sortable: true,
    isRemove: true,
    isAdd: true,
    isModify: true,
    hasForm: true,
    isConfirmRemove: true,
    itemKey: '',
    borderType:''

})
const { getValue } = useValue(props)
const isMobile = getValue<boolean>('isMobile', false);
let container = h('div')
let outContainer = h('div')
const currLabelWidth = ref(getValue<any>('labelWidth', ''))
const currLabelPosition = ref(getValue<any>('labelPosition', ''))
const currData = useVModel(props, 'modelValue', emits)
const dropData = ref<any>([])
const currItemKey = ref(props.itemKey)
const notObjectArray=ref(false)
const currItemClassName=ref()
const currBorderType=ref()
watch(() => props.modelValue, (val) => {
    if (props.itemKey) {
        dropData.value = val
    }
}, { immediate: true })


if (!props.itemKey) {
    currData.value.forEach(ele => {
        dropData.value.push({ itemKey: lessCom.generateID(), value: ele })
    })
    currItemKey.value = 'itemKey'
    watch(dropData, (val) => {
        emits('update:modelValue', val.map(ele => ele.value))
    }, { deep: true })
}


const attrs = useAttrs()

function handleAdd() {
    if (props.onAdd) {
        if (!props.itemKey) {
            dropData.value.push({ itemKey: lessCom.generateID(), value: props.onAdd(dropData.value) })

        } else {
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
function handleRemoveIndex(index) {
    dropData.value.splice(index, 1)
}


watch(() => props.labelWidth, (val) => {
    if (isMobile) {
        currLabelWidth.value = 1;
    } else {
        if (val) {
            currLabelWidth.value = props.labelWidth
        }
    }

})

watchEffect(() => {
    currItemClassName.value=props.itemClassName
    currBorderType.value=props.borderType
    if (props.hasForm && dropData.value.length) {
        if (typeof (dropData.value[0]) !== 'object'||!props.itemKey) {
            outContainer = h(ElsForm, { modelValue: dropData })
            container = h('div')
            notObjectArray.value=true

        } else {
            container = h(ElsForm)
            outContainer = h('div')
           
        }
    }
    if(!props.hasForm||props.itemKey&&!currBorderType.value){
        currBorderType.value='border1'
    }
    if(isMobile){
        currBorderType.value=''
    }
})
defineExpose({
    remove:handleRemoveIndex
})

</script>
<template>
    <component :is="outContainer" class="els-list" :class="[{ 'el-list-mobile': isMobile }]" :labelWidth="currLabelWidth" v-bind="outFormData">
        <draggable :list="dropData" handle=".el-icon-rank" v-bind="attrs" :item-key="currItemKey">
            <template #item="{ element, index }">
                <component :is="container" class="els-list-inner-form" :class="currBorderType" v-model="dropData[index]" :labelWidth="currLabelWidth" v-bind="innerFormData">
                    <div class="listitem flex" :class="currItemClassName">
                        <slot v-if="itemKey" name="default"
                            v-bind="{ item: element, index: index, $item: element, $index: index, element: element }">
                        </slot>
                        <slot v-else name="default"
                            v-bind="{ item: element.value, index: index, $item: element.value, $index: index, element: element }">
                        </slot>
                        <template v-if="sortable || isRemove">
                            <span class="els-list-operate" v-if="!currBorderType" style="margin-left:10px;">
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
                           <template v-else>
                                <div class="els-list-index">{{index+1}}</div>
                                <div class="els-list-handle">
                                    <el-icon class="el-icon-add" v-if="index===dropData.length-1" @click="handleAdd"><Plus /></el-icon>
                                    <el-popconfirm title="确定删除吗？" @confirm="handleRemove(element)" v-if="isConfirmRemove">
                                        <template #reference>
                                            <el-icon  class="el-icon-remove"><Minus /></el-icon>
                                        </template>
                                    </el-popconfirm>
                                    <el-icon v-else @click="handleRemove(element)"  class="el-icon-remove"><Minus /></el-icon>
                                    <el-icon class="el-icon-rank">
                                        <Rank />
                                    </el-icon>
                                </div>
                           </template>
                        </template>
                    </div>
                </component>

            </template>
        </draggable>
        <div v-if="isModify && isAdd&&currBorderType!=='border1'"  class="els-list-bottom" :class="[{ 'els-list-add': !isMobile }]"
            :style="`--marginleft:${(currLabelWidth&&currLabelPosition!=='top') ? '100px': isMobile&&!notObjectArray?'var(--van-cell-horizontal-padding)': '0px'}`">
            <slot name="add">
                <span v-if="isMobile" class="mobile-add" @click="handleAdd">
                    <van-icon name="plus" />
                    添加
                </span>
                <el-button v-else type="info" icon="edit" @click="handleAdd">添加</el-button>
            </slot>
        </div>
    </component>
</template>

<style lang="less">
.els-list {
    .listitem {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        .el-icon-add{
            color:var(--el-color-primary) !important;
        }
        .el-icon-remove {
                color: var(--el-color-danger) !important;
            }
        .els-list-operate {
            display: flex;
            column-gap: 5px;
            cursor: pointer;

         
        }

        >.els-node {
            flex-grow: 1;
        }
    }

    .els-list-bottom {
        padding-left: var(--marginleft) !important;
        .mobile-add {
            color: #409eff;
           
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

    .els-list-add {
        margin-left: var(--marginleft);
        margin-bottom: 10px;
        cursor: pointer;
    }

}

.border1{
    .listitem{
        border: 1px dashed #d9d9d9;
        border-radius: 5px;
        padding-top: 5px;
        position: relative;
        margin-bottom: 18px !important;
        padding-left: 5px;
        padding-right: 5px;
    }
    .els-list-index{
        align-items: center;
        background: #eee;
        border-radius: 15px;
        bottom: -15px;
        display: flex;
        font-weight: 700;
        height: 30px;
        justify-content: center;
        left: 10px;
        position: absolute;
        width: 30px;
        
    }
    .els-list-handle{
        background-color: #fff;
        border: 1px dashed #d9d9d9;
        border-radius: 15px;
        bottom: -15px;
        display: flex;
        flex-direction: row;
        padding: 3px 8px;
        position: absolute;
        right: 15px;
        .el-icon{
            cursor: pointer;
            height: 20px;
            position: relative;
            width: 20px;
        }
    }
   
}

.el-list-mobile {
    .listitem {
        margin-bottom: 0;
    }
    .els-list-bottom {
        padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);

    }
    >div>.els-list-inner-form{
        &:first-of-type{
            >.listitem>.els-node>
            .van-cell{
                padding-top: 0;
            }
        }
    }

    // .van-form:first-child {
    //     .van-cell {
    //         padding-top: 0;
    //     }
    // }
}
</style>