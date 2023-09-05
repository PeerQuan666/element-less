<script setup lang="ts">
import { ref, useSlots, inject, watch, onMounted } from 'vue'
defineOptions({
    name: 'BbCol',
})
interface Props {
    span?: number,

}
const props = withDefaults(defineProps<Props>(), {
    span: 24,
})

const slots = useSlots()
const currSpan = ref(24)
const getSpan = inject<Function>("getSpan")
const colData = inject<any>("colData")
const formData = inject<any>("formData")
watch(colData, (val) => {
    currSpan.value = props.span
    if (props.span == 24) {
        currSpan.value = 24 / val.count
    }
}, { deep: true })
onMounted(() => {
    currSpan.value = props.span
    if (props.span == 24 && getSpan) {
        currSpan.value = getSpan()
    }
})
</script>
<template>
    <el-col :span="currSpan">
        <template v-if="formData">
            <slot v-if="false"></slot>
            <slot name="edit" v-if="slots.default">
                <template v-for="vnode in slots.default()">
                    <component :is="()=>vnode"
                        v-if="!(vnode.type as any).name || (vnode.type as any).name === 'ElFormItem' || (vnode.type as any)?.name === 'BbFormItem' || vnode.props&&(vnode.props as any)['hasFormItem'] === false">
                    </component>
                    <BbFormItem :validationTrigger="(vnode.type as any).props.validationTrigger?.default"
                        v-bind="vnode.props ?? {}" v-else>
                        <template #default="{ key }">
                            <component :is="vnode" v-if="(vnode as any).props.hasOwnProperty('modelValue')"></component>
                            <component :is="vnode" v-else-if="formData" v-model="formData[key]"></component>
                            <component :is="vnode" v-else></component>
                        </template>
                    </BbFormItem>
                </template>
            </slot>
        </template>
        <slot v-else></slot>
    </el-col>
</template>