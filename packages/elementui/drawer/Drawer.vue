<script setup lang="ts">
import { ref, useSlots, watch } from 'vue'
import lessCom from '../../utlis/lessCom.js'
const emits = defineEmits(['update:modelValue'])
const slots = useSlots()

defineOptions({
    name: 'ElsDrawer',
})
interface Props {
    modelValue?: boolean,
    url?: string,
}

const props = withDefaults(defineProps<Props>(), {
  
})

const tagID = "less_drawer_" + lessCom.Guid32()
const pageLoading = ref(false)
const drawerUrl = ref()
const drawerVisible = ref(false)

watch(() => props.url, (val) => {
    if (val) {
        drawerUrl.value = val.addUrlParameter("Transfer_DialogTagID", tagID)
        handleRegistEvent()
    }
}, { immediate: true })

watch(() => props.modelValue, (val) => {
    drawerVisible.value = val
}, { immediate: true })
watch(drawerVisible, (val) => {
    emits("update:modelValue", val)
})


function handleRegistEvent() {
    window[tagID] = handleCloseLoading
}

function handleCloseLoading() {
    pageLoading.value = false
}

</script>
<template>
    <el-drawer v-model="drawerVisible" :custom-class="tagID">
        <template #header v-if="slots.header">
            <slot name="header"></slot>
        </template>
        <slot>
            <iframe v-if="url" :src="url" frameborder='0' style="height: calc(100vh - 48px);width: 100%;"></iframe>
        </slot>
        <template #footer v-if="slots.footer">
            <slot name="footer"></slot>
        </template>
    </el-drawer>
</template>