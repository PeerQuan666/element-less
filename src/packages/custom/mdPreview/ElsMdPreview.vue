<script setup lang="ts">
import {onMounted,ref} from 'vue'
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
defineOptions({ name: "ElsMdPreview" })
interface Props {
    modelValue?: string,
}
const markDownContent = ref()
const props=defineProps<Props>()
onMounted(() => {
    if (props.modelValue) {
        markDownContent.value = props.modelValue
    }
})

</script>
<template >
    <MdPreview v-model="markDownContent"></MdPreview>
</template>
