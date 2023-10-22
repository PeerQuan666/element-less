<script setup lang="ts">
import { ref, watch } from 'vue'
defineOptions({ name: 'ElsImageViewer' })
interface Props {
    currentUrl?: string,
    initialIndex?: number,
    url?: Array<string> | string,
    separator?: string
}
const props = withDefaults(defineProps<Props>(), {
    separator: '$',
    initialIndex: 0
})

const urls = ref<Array<string>>()
let index = props.initialIndex
function initData() {
    if (props.url) {
        if (Array.isArray(props.url)) {
            urls.value = props.url
        } else {
            urls.value = props.url.split(props.separator)
        }
        if (props.currentUrl) {
            index = urls.value.indexOf(props.currentUrl)
        }
    }
}
watch(() => props.url, () => {
    initData()
}, { immediate: true })

</script>
<template>
    <el-image-viewer :url-list="urls" :initial-index="index"></el-image-viewer>
</template>