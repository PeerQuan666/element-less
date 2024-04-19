<script setup lang="ts">
import { ref, watch } from 'vue'
import { useValue } from '../../utlis/use';
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
const {getValue}=useValue()

const visible=ref(true)
const isMobile = getValue<boolean>('isMobile', false)
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

    <el-image-viewer :url-list="urls" :initial-index="index" v-if="!isMobile"></el-image-viewer>
    <van-image-preview v-model:show="visible" :images="urls" :startPosition="index" :show-index="false" v-else>
        <template v-slot:index>第{{ index + 1 }}页</template>
    </van-image-preview>

</template>