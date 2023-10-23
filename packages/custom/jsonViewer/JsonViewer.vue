<script setup lang="ts">
import { ref, watch, nextTick, defineAsyncComponent, h ,useAttrs} from "vue";
import VueJsonViewer from 'vue-json-viewer'

defineOptions({
    name: 'ElsJsonViewer',
    inheritAttrs:false
})

interface Props {
    data?: any,

}
const attrs=useAttrs()
const props = defineProps<Props>()
const currData = ref()
const visible = ref(true)
watch(() => props.data, (val) => {
    visible.value = false
    if (val) {
        if (typeof (val) === 'object') {
            currData.value = val
        } else {
            currData.value = JSON.parse(val)
        }
    }
    nextTick(() => {
        visible.value = true
    })


}, { immediate: true, deep: true })

</script>
<template >
    <div class="json-viewer">
        <vue-json-viewer v-if="currData && visible" :value="currData" copyable v-bind="attrs"></vue-json-viewer>

    </div>
</template>