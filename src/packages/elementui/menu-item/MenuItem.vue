
<script setup lang="ts">
import { computed, inject } from 'vue';
import { ElMenuItem } from 'element-plus'
defineOptions({ name: 'ElsMenuItem' })
interface Props {
    item?: Record<string, any>,
    isRootMenu?: boolean
}
const props = defineProps<Props>()
const provideData = inject<any>('provideData')
const handleMenuClick = inject<Function>('handleMenuClick') ?? function () { };
const hasChild = computed(() => {
    if (props.item) {
        return props.item.children && props.item.children.length > 0
    }
    return false
})

</script>
<template>
    <ElMenuItem v-if="!item">
        <slot></slot>
    </ElMenuItem>
    <template v-else>
        <ElMenuItem v-if="!hasChild" :index="item.id" @click.native="handleMenuClick(item)"
            class="submenu-title-noDropdown">
            <i v-if="item.icon" class="el-icon" :class="item.icon"></i>
            <template #title>
                <span v-if="item.label" :title="item.label">{{ item.label }}</span>
            </template>
        </ElMenuItem>
        <els-sub-menu v-else :index="item.id"
            :class="(isRootMenu && item.active) ? 'menuitem_root el-menu-active' : (isRootMenu ? 'menuitem_root' : item.active ? 'el-menu-active' : '')">
            <template #title>
                <div @click="handleMenuClick(item)" class="sub-menu-title" :class="{ 'el-submenu-active': item.active }">
                    <i v-if="item.icon" class="el-icon" :class="item.icon"></i>
                    <span v-if="item.label" :title="item.label">{{ item.label }}</span>
                </div>
            </template>
            <div v-if="provideData && provideData.openMenuData.indexOf(item.id) > -1">
                <template v-for="(citem, index) in item.children.filter(ele => ele.visible)">
                    <els-menu-item class="nest-menu" v-if="citem.children && citem.children.length > 0" :item="citem"
                        :key="index" @menu-click="handleMenuClick"></els-menu-item>
                    <el-menu-item :index="citem.id" v-else @click="handleMenuClick(citem)">
                        <i v-if="item.icon" class="el-icon" :class="citem.icon"></i>
                        <template #title>
                            <span v-if="citem.label" :title="citem.label">{{ citem.label }}</span>
                        </template>
                    </el-menu-item>
                </template>
            </div>
        </els-sub-menu>
    </template>
</template>
