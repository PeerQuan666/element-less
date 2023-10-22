
<script setup lang="ts">
import { ref, watch, useAttrs } from 'vue'
defineOptions({ name: 'ElsImage', inheritAttrs: false })
interface Props {
    url?: string,
    previewUrls?: Array<string>,
    thumbnailUrl?: string,
    width?: string,
    height?: string,
    isPreview?: boolean,
    emptyDesc?: string,
    hideOnClickModal?: boolean,
    previewTeleported?: boolean,
    onSwitch?: Function
}
const props = withDefaults(defineProps<Props>(), {
    isPreview: true,
    previewTeleported: true,
    hideOnClickModal:true
})
const attrs = useAttrs()

const picUrls = ref<Array<string>>([])
const thumbnailPicUrls = ref<Array<string>>([])
const showPreview = ref(false)
const previewUrl = ref('')
function initData() {
    if (props.previewUrls) {
        picUrls.value = props.previewUrls
    } else if (props.url) {
        picUrls.value = props.url.split('$')
    }
    if (props.thumbnailUrl) {
        thumbnailPicUrls.value = props.thumbnailUrl.split('$')
    } else if (props.url) {
        thumbnailPicUrls.value = props.url.split('$')
    }

}
function preview(url, index) {
    if (props.isPreview) {
        if (thumbnailPicUrls.value.length == picUrls.value.length && index > -1) {
            previewUrl.value = picUrls.value[index]
        } else {
            previewUrl.value = url
        }
        showPreview.value = true;
    }

}
watch(() => props.url, () => {
    initData()
}, { immediate: true })

</script>
<template>
    <div v-if="!url" class="leo_image_empty">
        <svg t="1626166549727" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="4592" :width="width">
            <path
                d="M345.15968 357.80096a48.54784 48.54784 0 1 0 48.52736 48.54784 48.58368 48.58368 0 0 0-48.52736-48.54784zM844.68736 174.08H184.43264A102.656 102.656 0 0 0 81.92 276.64896v470.70208A102.656 102.656 0 0 0 184.43264 849.92h660.25472A102.65088 102.65088 0 0 0 947.2 747.35104V276.64896A102.65088 102.65088 0 0 0 844.68736 174.08zM345.15968 295.02976a111.32416 111.32416 0 1 1-111.2576 111.31904 111.42144 111.42144 0 0 1 111.2576-111.31904z m-72.45312 444.544l-42.496-46.17728 174.71488-161.0496L483.88096 611.328l-44.35968 44.39552-36.38272-36.4032z m517.6064-25.12896l-134.55872-151.552-171.12064 183.42912L438.784 703.488l218.112-233.82016 180.3264 203.10016z"
                fill="#7da3cc" p-id="4593" data-spm-anchor-id="a313x.7781069.0.i10" class="selected"></path>
        </svg>
        <div v-if="emptyDesc" v-html="emptyDesc" class="leo_image_empty_desc"></div>
    </div>
    <el-image v-else :src="item" v-bind="attrs" :style="[{ width: width }, { height: height },{cursor:isPreview?'zoom-in':'default'}]"
        v-for="(item, index) in thumbnailPicUrls" @click="preview(item, index)">
        <template #placeholder>
            <slot name="placeholder">
                <el-skeleton :style="[{ 'width': width }, { 'height': height }, { 'min-height': width }]" animated>
                    <template #template>
                        <el-skeleton-item variant="image"
                            :style="[{ 'width': width }, { 'height': height }, { 'min-height': width }]"></el-skeleton-item>
                    </template>
                </el-skeleton>
            </slot>
        </template>
        <template #error>
            <slot name="error"></slot>
        </template>
        <template #viewer>
            <slot name="viewer"></slot>
        </template>
    </el-image>
    <els-image-viewer v-if="showPreview" :url="picUrls" :current-url="previewUrl" @switch="onSwitch"
        :hide-on-click-modal="hideOnClickModal" @close="showPreview = false"
        :teleported="previewTeleported"></els-image-viewer>
</template>
