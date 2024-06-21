<script setup lang="ts">
import { useAttrs, h, watchEffect, ref, watch,nextTick } from 'vue'
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
    outFormAttrs?: Record<string, any>,
    innerFormAttrs?: Record<string, any>,
    borderType?: string,
    itemComponent?: string,
    itemComponentTitle?: Function | string,
    addButtonText?: string

}
const props = withDefaults(defineProps<Props>(), {
    sortable: true,
    isRemove: true,
    isAdd: true,
    isModify: true,
    hasForm: true,
    isConfirmRemove: true,
    itemKey: '',
    borderType: '',
    itemComponent: 'div'

})
const { getValue } = useValue(props)

const wrapComponent = ref('div')
const currItemComponent = ref('div')
const wrapRef = ref()
const wrapValue=ref(0)
const isMobile = getValue<boolean>('isMobile', false);
let container = h('div')
let outContainer = h('div')
const currLabelWidth = ref(getValue<any>('labelWidth', undefined))
const currLabelPosition = ref(getValue<any>('labelPosition', ''))
const currData = useVModel(props, 'modelValue', emits)
const dropData = ref<any>([])
const currItemKey = ref(props.itemKey)
const notObjectArray = ref(false)
const currItemClassName = ref()
const currBorderType = ref()

if (props.itemComponent === 'collapse') {
    currItemComponent.value = 'el-collapse-item'
    wrapComponent.value = 'el-collapse'

}

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
    if (props.itemComponent === 'collapse') {
        nextTick(()=>{
         wrapValue.value=dropData.value.length-1
        })
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
    currItemClassName.value = props.itemClassName??''
    currBorderType.value = props.borderType
    if (props.hasForm && dropData.value.length) {
        if (typeof (dropData.value[0]) !== 'object' || !props.itemKey) {
            outContainer = h(ElsForm, { modelValue: dropData })
            container = h('div')
            notObjectArray.value = true

        } else {
            container = h(ElsForm)
            outContainer = h('div')

        }
    }
    if ((!props.hasForm || props.itemKey) && !currBorderType.value) {
        currBorderType.value = 'border1'
    }
    if (isMobile || props.itemComponent !== 'div') {
        currBorderType.value = ''
    }
    if (props.itemComponent === 'div') {
        currItemClassName.value += ' listitem flex'
    }
})
defineExpose({
    remove: handleRemoveIndex
})

</script>
<template>
    <component :is="outContainer" class="els-list" :class="[{ 'el-list-mobile': isMobile }]"
        :labelWidth="currLabelWidth" v-bind="outFormAttrs">
        <draggable :list="dropData" handle=".el-icon-rank" v-bind="attrs" :item-key="currItemKey">
            <template #item="{ element, index }">
                <component :is="wrapComponent" v-model="wrapValue" accordion>
                    <component :is="container" class="els-list-inner-form" :class="currBorderType"
                        v-model="dropData[index]" :labelWidth="currLabelWidth" v-bind="innerFormAttrs">

                        <component :is="currItemComponent" :class="currItemClassName" :name="index">
                            <template #title v-if="itemComponent">
                                <div class="els-list-title">
                                    <slot name="itemTitle"
                                        v-bind="{ item: element, index: index, $item: element, $index: index, element: element }">
                                        <div>
                                            <div v-if="typeof (itemComponentTitle) === 'function'"
                                                v-html="itemComponentTitle()"></div>
                                            <div v-else-if="itemComponentTitle" v-html="itemComponentTitle"></div>
                                            <div v-else>还未设置标题</div>
                                        </div>
                                    </slot>
                                    <span class="els-list-operate">
                                        <slot name="drag" v-if="sortable && isModify">
                                            <el-icon class="el-icon-rank">
                                                <Rank />
                                            </el-icon>
                                        </slot>

                                        <slot name="remove" v-if="isModify && isRemove">
                                            <el-popconfirm title="确定删除吗？" @confirm="handleRemove(element)"
                                                v-if="isConfirmRemove">
                                                <template #reference>
                                                    <el-icon class="el-icon-remove">
                                                        <Delete />
                                                    </el-icon>
                                                </template>
                                            </el-popconfirm>
                                            <el-icon class="el-icon-remove" v-else @click="handleRemove(element)">
                                                <Delete />
                                            </el-icon>
                                        </slot>
                                    </span>
                                </div>


                            </template>
                            <slot v-if="itemKey" name="default"
                                v-bind="{ item: element, index: index, $item: element, $index: index, element: element }">
                            </slot>
                            <slot v-else name="default"
                                v-bind="{ item: element.value, index: index, $item: element.value, $index: index, element: element }">
                            </slot>
                            <template v-if="(sortable || isRemove) && itemComponent === 'div'">
                                <span class="els-list-operate" v-if="!currBorderType" style="margin-left:10px;">
                                    <slot name="drag" v-if="sortable && isModify">
                                        <el-icon class="el-icon-rank">
                                            <Rank />
                                        </el-icon>
                                    </slot>
                                    <slot name="remove" v-if="isModify && isRemove">
                                        <el-popconfirm title="确定删除吗？" @confirm="handleRemove(element)"
                                            v-if="isConfirmRemove">
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
                                    <div class="els-list-index">{{ index + 1 }}</div>
                                    <div class="els-list-handle">
                                        <el-icon class="el-icon-add" v-if="index === dropData.length - 1"
                                            @click="handleAdd">
                                            <Plus />
                                        </el-icon>
                                        <el-popconfirm title="确定删除吗？" @confirm="handleRemove(element)"
                                            v-if="isConfirmRemove">
                                            <template #reference>
                                                <el-icon class="el-icon-remove">
                                                    <Minus />
                                                </el-icon>
                                            </template>
                                        </el-popconfirm>
                                        <el-icon v-else @click="handleRemove(element)" class="el-icon-remove">
                                            <Minus />
                                        </el-icon>
                                        <el-icon class="el-icon-rank">
                                            <Rank />
                                        </el-icon>
                                    </div>
                                </template>
                            </template>
                        </component>
                    </component>
                </component>
            </template>
        </draggable>
        <div v-if="isModify && isAdd && (currBorderType !== 'border1'||(dropData.length===0&&currBorderType === 'border1'))" class="els-list-bottom"
            :class="[{ 'els-list-add': !isMobile }]"
            :style="`--marginleft:${(currLabelWidth==='' && currLabelPosition !== 'top') ? '100px' : isMobile && !notObjectArray ? 'var(--van-cell-horizontal-padding)' : '0px'}`">
            <slot name="add">
                <el-button type="primary" link icon="plus" @click="handleAdd">{{ addButtonText || '添加' }}</el-button>
            </slot>
        </div>
    </component>
</template>

<style lang="less" scoped>
.els-list {
    .els-list-operate {
        display: flex;
        column-gap: 5px;
        cursor: pointer;
        align-items: center;
    }

    .listitem {
        margin-bottom: 10px;
        display: flex;
        align-items: center;

        .el-icon-add {
            color: var(--el-color-primary) !important;
        }

        .el-icon-remove {
            color: var(--el-color-danger) !important;
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

.border1 {
    .listitem {
        border: 1px dashed #d9d9d9;
        border-radius: 5px;
        padding-top: 5px;
        position: relative;
        margin-bottom: 18px !important;
        padding-left: 5px;
        padding-right: 5px;
    }

    .els-list-index {
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

    .els-list-handle {
        background-color: #fff;
        border: 1px dashed #d9d9d9;
        border-radius: 15px;
        bottom: -15px;
        display: flex;
        flex-direction: row;
        padding: 3px 8px;
        position: absolute;
        right: 15px;

        .el-icon {
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

    >div>.els-list-inner-form {
        &:first-of-type {
            >.listitem>.els-node>.van-cell {
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

.el-collapse:deep {
    margin-bottom: 10px;
    border: 1px solid #ebeef5;
    border-radius: 5px;
    overflow: hidden;

    .el-collapse-item__header {
        --el-collapse-header-bg-color: #fcfcfc;
        padding: 0 5px;
        min-height: 48px;
        position: relative;
        height: auto;
    }

    .el-collapse-item__content {
        padding: 10px;
    }
}

.els-list-title {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    margin-right: 5px;
}
</style>