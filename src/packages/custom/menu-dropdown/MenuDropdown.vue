<script setup lang="ts">
import { ref, reactive, watch, getCurrentInstance,inject } from 'vue'
const { proxy } = getCurrentInstance() as any
defineOptions({ name: "ElsMenuDropdown" })

interface Props {
    menus?: Array<Record<string, any>>,
    isFold?: boolean,
    unFoldCount?: number,
    isMobile?: boolean,
    onSelect?: Function
}
const props = withDefaults(defineProps<Props>(), {
    unFoldCount: 0
})
const dialogVisible = ref(false)
const unFoldMenus: Array<Record<string, any>> = reactive([])
const menuData: Array<Record<string, any>> = reactive([])
if (!proxy.$lessConfig?.menu) {
    console.log('未设置全局配置$lessConfig，无法使用菜单')
}
const elsMenuCommand=inject<Function>('elsMenuCommand')
let idFieldname=''
let nameFieldname=''
let iconFieldName=''
if(proxy&&proxy.$lessConfig?.menu){
    idFieldname=proxy.$lessConfig.menu.id
    nameFieldname=proxy.$lessConfig.menu.name
    iconFieldName=proxy.$lessConfig.menu.icon
}

watch(() => props.menus, (val) => {
    if (val) {
        menuData.push(...val)
        if (props.unFoldCount > 0) {
            unFoldMenus.push(...menuData.splice(0, props.unFoldCount))
        }

    }
}, { immediate: true })

function menuCommand(menu) {
    if (!props.onSelect) {
        if (elsMenuCommand) {
            elsMenuCommand(menu)
        }
    } else {
        props.onSelect(menu)
    }
}
</script>
<template >
    <div v-if="nameFieldname" class="els-table-operate">
        <template v-if="isMobile">
            <el-link type="primary" @click="dialogVisible = !dialogVisible">操作</el-link>
        </template>
        <template v-else-if="isFold || unFoldCount > 0">
            <el-link class="els-table-operate-link" type="primary" @click="menuCommand(item)" v-for="item in unFoldMenus"
                :key="item[idFieldname]">{{ item[nameFieldname] }}</el-link>
            <el-dropdown @command="menuCommand" v-if="menuData.length">
                <span class="els-table-operate-link"> {{ unFoldCount > 0 ? '更多操作' : '操作' }}  <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon></span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item v-for="item in menuData" :key="item[idFieldname]" :command="item"><i
                                :class="'el-icon ' + item[iconFieldName]"></i>{{ item[nameFieldname] }}</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </template>
        <template v-else>
            <el-link class="els-table-operate-link" type="primary" @click="menuCommand(item)" v-for="item in menuData"
                :key="item[idFieldname]">{{ item[nameFieldname] }}</el-link>
        </template>
        <el-dialog :align-center="true" :append-to-body="true" v-model="dialogVisible" class="table-column-operate-dialog"
            :show-close="false" width="50%">
            <div v-for="item in menuData" class="center" @click="menuCommand(item)"
                style="line-height: 50px; border-bottom: 1px solid #dcdcdc;">{{ item.MenuName }}</div>
        </el-dialog>
    </div>
</template>
<style scoped>
.els-table-operate-link{
margin-right: 10px;
display: flex;
cursor: pointer;

}
</style>