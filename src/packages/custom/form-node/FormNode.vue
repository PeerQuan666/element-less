<script setup lang="ts">
import { VNode, RendererNode, RendererElement, inject, h } from 'vue'
defineOptions({ name: "ElsFormNode" })

interface Props {
    vnode: VNode<RendererNode, RendererElement, {
        [key: string]: any;
    }>,
    prop?: string,
    index?: number
}
const props = defineProps<Props>()

const modelData = inject('formData') ?? inject('tableData') ?? {}

let currNode = props.vnode
let nodeName = ''
let nodeHasFormItem = false

if (props.vnode.type) {
    nodeName = (props.vnode.type as any)?.name ?? ''
    nodeHasFormItem = (props.vnode.type as any).props?.hasFormItem ? true : false
}
if (typeof (props.vnode.type) === 'string') {
    currNode = h(props.vnode.type.toString(), props.vnode.props)
}

</script>
<template >
    <component :is="currNode" v-if="typeof (vnode.type) === 'string'">
        <template v-if="vnode.children && typeof (vnode.children) == 'object'">
            <ElsFormNode v-for="cnode in vnode.children" :vnode="cnode" :prop="prop" :index="index" >
            </ElsFormNode>
        </template>
    </component>
    <component :is="currNode"
        v-else-if="!nodeHasFormItem || nodeName == 'ElFormItem' && nodeName == 'ElsFormItem' || vnode.props && (vnode.props as any)['hasFormItem'] === false">
    </component>

    <ElsFormItem :validTrigger="(vnode.type as any).props.validTrigger?.default"
        :queryMethod="(vnode.type as any).props.queryMethod?.default"
        :queryDataType="(vnode.type as any).props.queryDataType?.default"
        :queryRangeOrEqual="(vnode.type as any).props.queryRangeOrEqual?.default"
        :queryRange="(vnode.type as any).props.queryRange?.default"
        :prop="prop"
        :aIndex="index"
        v-bind="vnode.props ?? {}"
        v-else>
        <template #default="{ key, startKey, endKey }">
            <component :is="vnode" v-if="(vnode as any).props&&(vnode as any).props.hasOwnProperty('modelValue')"></component>
            <template v-else-if="index > -1">
                <component :is="vnode" v-if="modelData && modelData[index] && !startKey && !endKey"
                    v-model="modelData[index][key]">
                </component>
                <component :is="vnode"
                    v-else-if="modelData && modelData[index] && startKey && endKey && key && (key != startKey && key != endKey)"
                    v-model="modelData[key]" v-model:start="modelData[index][startKey]"
                    v-model:end="modelData[index][endKey]">
                </component>
                <component :is="vnode"
                    v-else-if="modelData && modelData[index] && startKey && endKey && (!key || key == startKey || key == endKey)"
                    v-model:start="modelData[index][startKey]" v-model:end="modelData[index][endKey]">
                </component>
                <component :is="vnode" v-else></component>
            </template>
            <template v-else>
                <component :is="vnode" v-if="modelData && !startKey && !endKey" v-model="modelData[key]">
                </component>
                <component :is="vnode"
                    v-else-if="modelData && startKey && endKey && key && (key != startKey && key != endKey)"
                    v-model="modelData[key]" v-model:start="modelData[startKey]" v-model:end="modelData[endKey]">
                </component>
                <component :is="vnode"
                    v-else-if="modelData && startKey && endKey && (!key || key == startKey || key == endKey)"
                    v-model:start="modelData[startKey]" v-model:end="modelData[endKey]">
                </component>
                <component :is="vnode" v-else></component>
            </template>


        </template>
    </ElsFormItem></template>
