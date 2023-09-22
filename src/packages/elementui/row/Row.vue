<script setup lang="ts">
import { ref, useSlots, provide, onMounted } from 'vue'
import ElsCol from '../col'

defineOptions({
    name: 'ElsRow',
})
const slots = useSlots()
const colData = ref({ count: 24 })
provide('getSpan', getSpan)
provide('colData', colData)
function getSpan() {
    if (slots.default) {
        if (slots.default().length == 1 && slots.default()[0].type.toString() == 'Symbol(Fragment)') {
            let cols = (slots.default()[0].children as any).filter(ele => ele.type)
            colData.value.count = cols.length
            return 24 / cols.length;
        }
        let cols = slots.default().filter(ele => ele.type)
        colData.value.count = cols.length
        return 24 / cols.length;
    }
    return 24
}
onMounted(() => {

})
</script>
<template>
    <el-row>
        <slot v-if="false"></slot>
        <slot name="edit" v-if="slots.default">
            <template v-for="vnode in slots.default()">

                <component :is="()=>vnode"
                    v-if="typeof (vnode.type) == 'object' && (vnode.type as any)?.name === 'ElsCol' && (vnode.type as any)?.name !== 'ElCol'">
                    <component :is="vnode">
                    </component>
                </component>
                <ElsCol :span="vnode.props?vnode.props?.span:24" v-else>
                  
                    <component :is="vnode">
                    </component>
                </ElsCol>
            </template>
        </slot>
    </el-row>
</template>