<script setup lang="ts">
import {  reactive, computed, watch, onMounted,  getCurrentInstance, onUnmounted } from 'vue'
import lessCom from '../../utlis/lessCom.js'
const {  proxy } = getCurrentInstance() as any
defineOptions({ name: "ElsMenuContext" })

interface Props {
    menus?: Array<Record<string, any>>,
    positionLeft?: number,
    positionTop?: number,
    visible?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    positionLeft: 0,
    positionTop: 0,
    visible: false
})
const menuData: Array<Record<string, any>> = reactive([])
let idFieldname=''
let nameFieldname=''
let iconFieldname=''
if(proxy&&proxy.$lessConfig?.menu){
    idFieldname=proxy.$lessConfig.menu.id
    nameFieldname=proxy.$lessConfig.menu.name
    iconFieldname=proxy.$lessConfig.menu.icon
}
const isOutBottom = computed(() => {
    return (props.positionTop + (30 * menuData.length) + 30) > window.innerHeight
})
const isOutScreen = computed(() => {
    return props.positionTop - (30 * menuData.length) < 0 && isOutBottom.value;
})
const positionBottom = computed(() => {
    return window.innerHeight - props.positionTop;
})

watch(() => props.menus, (val) => {
    menuData.length=0
    if (val) {
        menuData.push(...val)
    }
}, { immediate: true })

const triggerHideFn= clickDocumentHandler.bind(this)

function clickDocumentHandler(e) {
    if (e.srcElement.className.indexOf && e.srcElement.className.indexOf('air-table__context') === -1 && e.srcElement.tagName!=='I') {
        proxy.$parent.contextMenuVisible = false
       }
 
}
onMounted(() => {
    document.addEventListener('mousedown', triggerHideFn)
})
onUnmounted(() => {
    document.removeEventListener('mousedown', triggerHideFn)
})


</script>
<template >
    <ul class="air-table__context--menu" :class="{ 'outscreen-menu': isOutScreen }" v-show="visible"
        :style="[{ left: positionLeft + 'px' }, { top: isOutBottom ? 'auto' : (positionTop + 'px') }, { bottom: !isOutBottom ? 'auto' : (positionBottom + 'px') }]">
        <li class="air-table__context--list"
            v-for="item in menuData" :key="item[idFieldname]"
            @click="lessCom.menuCommand(item)">
            <i :class="item[iconFieldname]"></i><span class="air-table__context--info">{{ item[nameFieldname] }}</span>
        </li>
    </ul>
</template>
<style scoped>


    .air-table__context--list:hover {
        background: #ebebeb;
    }


.air-table__context--icon {
    font-size: 12px;
    color: #757575;
    line-height: 30px;
}

.air-table__context--info {
    font-size: 12px;
    margin-left: 10px;
    color: #212121;
    line-height: 30px;
}

.air-table__context--menu {
    box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
    margin: 0;
    padding: 8px 0px;
    position: fixed;
    display: block;
    z-index: 1000;
    background-color: #fff;
    border-radius: 4px;
    width: 160px;
}

.air-table__context--list {
    padding: 0px 20px;
    display: inline-block;
    width: 120px;
    height: 30px;
    cursor: pointer;
    list-style: none;
    font-size:12px;
}

.outscreen-menu {
    width: 322px;
}
</style>