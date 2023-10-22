
<script lang="ts" setup>
import { ref, reactive, watch, nextTick,provide } from 'vue';
import lessCom from '../../utlis/lessCom.js'
import { ElMenu, ElMessage } from 'element-plus'
const emits = defineEmits(['menuClick'])

defineOptions({ name: 'ElsMenu' })
interface Props {
    collapse?: boolean,
    labelField?: string,
    idField?: string,
    targetField?: string,
    parentIdField?: string,
    rootParentValue?: number | string,
    iconField?: string,
    targetFrameName?: string,
    width?: string,
    url?: string,
    data?: string | Array<Record<string, any>>,
    hiddenIds?: Array<any>,
    filterable?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    parentIdField: 'ParentID',
    idField: '',
    labelField: '',
    iconField: '',
    targetUrlField: '',
    rootParentValue:''

})
const {$codeField,$messageField,$dataField,$success}=lessCom.getApiConfig()

const searchKey = ref('')
const isCollapse = ref(props.collapse)
let hiddenMenuIds = ref<any>([])
const optionData: Array<Record<string, any>> = reactive([])
const sourceData: Array<Record<string, any>> = reactive([])
const menuData: Array<Record<string, any>> = reactive([])
const provideData = reactive<any>({ openMenuData: [] })
const searchOpenMenuData: Array<Record<string, any>> = reactive([])
const preMenuItem = ref<any>()
const currMenuID = ref()
const elMenu = ref()
const searchInput = ref()

watch(searchKey, (val) => {
    searchOpenMenuData.length = 0
    provideData.openMenuData = []
    provideData.openMenuData.push(...searchOpenMenuData)
    let currSearchData = lessCom.cloneObj(sourceData)
    if (val) {
        searchTree(currSearchData)
    }
    nextTick(() => {
        searchOpenMenuData.forEach(ele => {
            elMenu.value.open(ele)
        })
        nextTick(() => {
            menuData.length = 0
            menuData.push(...currSearchData)
        })
    })
})
watch(() => props.filterable, (val) => {
    if (val) {
        nextTick(() => {
            searchInput.value.focus();
        })
    } else {
        searchKey.value = '';
    }

})
watch(() => props.url, (val) => {
    if (val) {
        readData()
    }

},{immediate:true})

watch(() => props.data, (val) => {
    if (val) {
     
        optionData.length = 0;
        if (typeof (val) == "string") {
            optionData.push(...JSON.parse(val))
        } else {
            optionData.push(...val)
        }
        converToData()
       
    }

}, { deep: true, immediate: true })

watch(() => props.hiddenIds, (val: any) => {
    if (val) {
        hiddenMenuIds.value = val
    }
}, { immediate: true })


function setActiveMenuID(id) {
    currMenuID.value = id
}

function handleOpen(index) {
    if (provideData.openMenuData.indexOf(index) > -1) { return; }
    provideData.openMenuData.push(index)
}
function handleMenuClick(item) {
    if (preMenuItem.value) {
        preMenuItem.value.active = false
    }
    item.active = true
    preMenuItem.value = item
    currMenuID.value = item.id
    emits("menuClick", item)

}

function readData() {
    if (props.url) {
        props.url.post({}).then(res => {
            if (res[$codeField] == $success) {
                optionData.length = 0;
                optionData.push(...res[$dataField])
                converToData()
            }
            else {
                ElMessage.error(res[$messageField]);
            }
        })
    }
}
function converToData() {
    if (props.idField && props.parentIdField) {
        let groups: any = [];
        let roots = optionData.filter(ele => hiddenMenuIds.value.indexOf(ele[props.idField]) == -1 && ele[props.parentIdField] == props.rootParentValue).map(ele => {
            let item = {
                id: ele[props.idField].toString(),
                label: ele[props.labelField],
                icon: ele[props.iconField],
                url: ele[props.targetUrlField],
                sourceData: ele,
                active: false,
                visible: true,
                children: []
            }
            return item;
        })
        // 数据根据parentid分组
        for (let ele of optionData.filter(i => i[props.parentIdField] != props.rootParentValue)) {
            let parentid = ele[props.parentIdField];
            let parent: any = groups.find((x: any) => x.pid == parentid);
            if (!parent) {
                parent = { pid: parentid, items: [] };
                groups.push(parent);
            }
            let item = {
                id: ele[props.idField].toString(),
                label: ele[props.labelField],
                icon: ele[props.iconField],
                url: ele[props.targetUrlField],
                sourceData: ele,
                active: false,
                visible: true,
                children: []
            };
            parent.items.push(item);
        }
        searchChildData(roots, groups);
        menuData.length = 0
        menuData.push(...roots)
        sourceData.length = 0;
        sourceData.push(...roots)
    }

}
function searchChildData(roots, groups, depth = 1) {
    for (let root of roots) {
        root.depth = depth;
        if (!root.namePath) {
            root.namePath = root.label
        }
        for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            if (group.pid == root.id) {
                group.items.forEach(ele => {
                    ele.namePath = root.namePath + ',' + ele.label
                })
                root.children = group.items;
                groups.splice(i, 1);
                for (let j = 0; j < group.items.length; j++) {
                    const child = group.items[j];
                    searchChildData([child], groups, depth + 1);
                }
                continue;
            }
        }
    }

}
function searchTree(tree) {
    var isMatching = false;
    tree.forEach(ele => {
        let childVisible = false
        let currVisible = ele.label.indexOf(searchKey) > -1
        if (ele.children) {
            childVisible = searchTree(ele.children)
        }
        if (!childVisible) {
            ele.children = [];
        }
        if (childVisible) {
            searchOpenMenuData.push(ele.id)
        }
        ele.visible = childVisible || currVisible
        if (!isMatching) {
            isMatching = childVisible || currVisible
        }



    })
    return isMatching;
}
provide('provideData', provideData)
provide("handleMenuClick",handleMenuClick)
defineExpose({
    setActiveMenuID
})
</script>
<template>
    <ElMenu ref="elMenu" :default-openeds="provideData.openMenuData" @open="handleOpen" :default-active="currMenuID"
        :collapse="isCollapse" :style="[{ 'width': width?.appendPx() }]">
        <slot></slot>
        <el-collapse-transition>
            <span v-if="filterable" class="menu-filterable"><el-input v-model="searchKey" ref="searchInput"
                    suffix-icon="Search" clearable></el-input></span>
        </el-collapse-transition>
        <els-menu-item v-for="(item, index) in menuData.filter(ele => ele.visible)" :key="index"  :isRootMenu="true" :item="item"></els-menu-item>
    </ElMenu>
</template>

