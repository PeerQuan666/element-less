<script setup lang="ts">
import { ref, useSlots, inject, watch, onMounted } from 'vue'
defineOptions({
    name: 'ElsCol',
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
watch(colData, () => {
    currSpan.value = props.span
    if (props.span == 24&& getSpan) {
        currSpan.value = getSpan()
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
                    <ElsFormNode :vnode="vnode"></ElsFormNode>
                </template>
            </slot>
        </template>
        <slot v-else></slot>
    </el-col>
</template>