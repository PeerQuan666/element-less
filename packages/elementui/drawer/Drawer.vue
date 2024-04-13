<script setup lang="ts">
import { ref, useSlots, watch,onMounted } from 'vue'
import lessCom from '../../utlis/lessCom.js'
const emits = defineEmits(['update:modelValue'])
const slots = useSlots()

defineOptions({
    name: 'ElsDrawer',
})
interface Props {
    modelValue?: boolean,
    url?: string,
    initBody?:boolean
}

const props = withDefaults(defineProps<Props>(), {
    
})

const tagID = "less_drawer_" + lessCom.generateID()
const pageLoading = ref(false)
const drawerUrl = ref()
const drawerVisible = ref(false)

watch(() => props.url, (val) => {
    if (val) {
        drawerUrl.value = val.addUrlParameter("Transfer_DialogTagID", tagID)
        handleRegistEvent()
    }
}, { immediate: true })

if(props.initBody){
    drawerVisible.value=true
}


function handleRegistEvent() {
    window[tagID] = handleCloseLoading
}

function handleCloseLoading() {
    pageLoading.value = false
}

onMounted(() => {
    drawerVisible.value=false

    watch(() => props.modelValue, (val) => {
        drawerVisible.value = val
    })
    watch(drawerVisible, (val) => {
        emits("update:modelValue", val)
    })


})
</script>
<template>
    <el-drawer v-model="drawerVisible" :class="tagID">
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