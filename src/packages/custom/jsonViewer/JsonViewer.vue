<script setup lang="ts">
import { ref, watch,nextTick} from "vue";
import VueJsonViewer from 'vue-json-viewer'

defineOptions({
    name: 'ElsJsonViewer',
    components: { VueJsonViewer }
})

interface Props {
    data?: any,
    
}

const props = defineProps<Props>()
const currData = ref()
const visible=ref(true)
watch(() => props.data, (val) => {
    visible.value=false
    if (val) {
        if (typeof (val) === 'object') {
            currData.value = val
        } else {
            currData.value = JSON.parse(val)
        }
    }
    nextTick(()=>{
        visible.value=true
    })


}, { immediate: true, deep: true })

</script>
<template >
  <vue-json-viewer v-if="currData&&visible" :value="currData" copyable ></vue-json-viewer>
</template>