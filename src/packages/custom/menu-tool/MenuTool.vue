<script setup lang="ts">
import { ref, watch, reactive, getCurrentInstance ,inject} from 'vue'

const { proxy } = getCurrentInstance() as any
import lessCom from '../../utlis/lessCom.js'
import '../../utlis/lessPrototype.js'
defineOptions({ name: "ElsMenuTool" })
interface Props {
    url?: string,
    logUrl?: string,
    docUrl?: string,
    noteUrl?: string,
    mutiSaveUrl?: string,
    data?: Array<Record<string, any>>,
    buttonType?: string,
    showMenuName?: boolean,
    editTable?: Function,
    saveTable?: Function,
    command?: Function,
    onClick?:Function

}

const props = withDefaults(defineProps<Props>(), {
    showMenuName: true
})
if (!proxy.$lessConfig?.menu) {
    console.log('未设置全局配置$lessConfig，无法使用菜单')
}
let idFieldname = ''
let actionTypeFieldname = ''
let actionFieldname = ''
let nameFieldname = ''
let iconFieldname = ''
let buttonColorFieldname = ''
let buttonTypeFieldname = ''
let groupFieldname = ''
if (proxy && proxy.$lessConfig?.menu) {
    idFieldname = proxy.$lessConfig.menu.id
    nameFieldname = proxy.$lessConfig.menu.name
    iconFieldname = proxy.$lessConfig.menu.icon
    actionFieldname = proxy.$lessConfig.menu.action
    actionTypeFieldname = proxy.$lessConfig.menu.actionType
    buttonColorFieldname = proxy.$lessConfig.menu.buttonColor
    buttonTypeFieldname = proxy.$lessConfig.menu.buttonType
    groupFieldname = proxy.$lessConfig.menu.group
}

const elsMenuCommand=inject<Function>('elsMenuCommand')
const saveDataLoading = ref(false)
const isTableEdit = ref(false)
const menuData: Array<Record<string, any>> = reactive([])
const foldMenuData: Array<Record<string, any>> = reactive([])
const lastMenuData: Array<Record<string, any>> = reactive([])
const isPlain = ref(false)
const isRound = ref(false)
const isCircle = ref(false)
const dialogLogVisible = ref(false)
const dialogDocVisible = ref(false)
const dialogNoteVisible = ref(false)

const dialogUploadVisible = ref(false)
const uploadInfo = ref<any>({
    previewImg: '',
    uploadUrl: ''
})

if (props.buttonType == "Plain") {
    isPlain.value = true;
}
if (props.buttonType == "Round") {
    isRound.value = true;
}
if (props.buttonType == "Circle") {
    isCircle.value = true;
}
watch(() => props.url, (val) => {
    if (val) {
        val.post({}).then(res => {
            if (res.ResultCode == '0') {
                initData(res.Data)
            }
        })
    }
})
watch(() => props.data, (val) => {
    if (val) {
        initData(val)
    }
}, { immediate: true })

function initData(val) {
    menuData.length = 0;
    menuData.push(...val)
    menuData.forEach(ele => ele.IsLoading = false)
    if (menuData.length && menuData.filter(ele => ele[groupFieldname] !== '').length) {
        lastMenuData.length = 0
        lastMenuData.push(...menuData.filter(ele => ele[buttonTypeFieldname] == "Search" || ele[buttonTypeFieldname] == "Back"))
        foldMenuData.length = 0
        foldMenuData.push(...lessCom.dtGroupBy(menuData.filter(ele => ele[buttonTypeFieldname] != "Search" && ele[buttonTypeFieldname] != "Back"), "FoldName", "SortIndex"))
        let noFoldMenus = foldMenuData.find(ele => ele.key == '');
        if (noFoldMenus) {
            menuData.length = 0
            menuData.push(...noFoldMenus.value)
        } else {
            menuData.length = 0;
        }
        const currfoldMenuData = foldMenuData.filter(ele => ele.key != '')
        foldMenuData.length = 0
        foldMenuData.push(...currfoldMenuData)
    }
}
function handleEditTable() {
    isTableEdit.value = true;
    if (props.editTable) {
        props.editTable(true)
    }
}
function handleSaveTable() {
    saveDataLoading.value = true;
    if (props.saveTable) {
        props.saveTable().then(res => {
            if (res) {
                saveDataLoading.value = false
            }
        }).catch(() => {
            saveDataLoading.value = false
        })
    }
}
function handleUnEditTable() {
    isTableEdit.value = false;
    if (props.editTable) {
        props.editTable(false)
    }
}
function handleCommandMore(type) {
    if (props.command) {
        props.command(type)
        return
    }

    switch (type) {
        case 'log':
            dialogLogVisible.value = true
            break;
        case 'doc':
            dialogDocVisible.value = true
            break;
        case 'note':
            dialogNoteVisible.value = true

            break;
    }
}
function triggerPowerMenu(menuID) {
    if (props.data) {
        var currPowerMenu = props.data.find(ele => ele[actionFieldname] === menuID || ele[idFieldname] == menuID);
        if (currPowerMenu&&elsMenuCommand) {
            elsMenuCommand(currPowerMenu)
        }
    }

}
function menuCommand(menu) {
    if(props.onClick){
        props.onClick(menu)
        return
    }
    if (menu[actionTypeFieldname] == 'Import') {
        dialogUploadVisible.value = true;
        uploadInfo.value = {
            previewImg: menu.ActionScript,
            uploadUrl: menu.TargetUrl
        }

    } else if(elsMenuCommand){
        elsMenuCommand(menu)

    }
}
defineExpose({
    triggerPowerMenu
})

</script>
<template >
    <div class="els-tool-menu">
        <div class="els-tool-menu-button">
            <el-button :type="menu[buttonColorFieldname]"
                :icon="menu[iconFieldname] ? menu[iconFieldname].replace('el-icon-', '') : ''" v-for="menu in menuData"
                :key="menu[idFieldname]"
                :native-type="(menu[actionFieldname] == 'Search' || menu[actionFieldname] == 'Save') ? 'submit' : 'button'"
                :plain="isPlain" :round="isRound" :circle="isCircle" :loading="menu.IsLoading" @click="menuCommand(menu)">
                <template #icon v-if="menu[iconFieldname] && !menu[iconFieldname].startsWith('el-icon-')">
                    <i v-if="menu[iconFieldname]" :class="menu[iconFieldname]"></i>
                </template>
                {{ showMenuName ? menu[nameFieldname] : '' }}
            </el-button>
            <el-dropdown v-for="(foldData, cindex) in foldMenuData" :key="cindex" @command="menuCommand">
                <el-button type="primary" icon="Menu">
                    {{ foldData.key }}<el-icon>
                        <ArrowDown />
                    </el-icon>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item v-for="(item, index) in foldData.value" :key="index" :command="item">
                            <i :class="item.ImageUrl"></i>{{ item[nameFieldname] }}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <slot></slot>

            <el-button :type="menu[buttonColorFieldname]" v-for="menu in lastMenuData" :key="menu[idFieldname]"
                :icon="menu[iconFieldname] ? menu[iconFieldname].replace('el-icon-', '') : ''"
                :native-type="(menu[actionFieldname] == 'Search' || menu[actionFieldname] == 'Save') ? 'submit' : 'button'"
                :plain="isPlain" :round="isRound" :circle="isCircle" :loading="menu.IsLoading" @click="menuCommand(menu)">
                <template #icon v-if="menu[iconFieldname] && !menu[iconFieldname].startsWith('el-icon-')">
                    <i v-if="menu[iconFieldname]" :class="menu[iconFieldname]"></i>
                </template>
                {{ showMenuName ? menu[nameFieldname] : '' }}
            </el-button>
        </div>
        <div class="operationlog" v-if="mutiSaveUrl||logUrl||docUrl||noteUrl">
            <el-tooltip v-if="mutiSaveUrl && !isTableEdit" placement="bottom-end" content="可以双击指定行单独编辑">
                <el-button v-if="!isTableEdit" @click="handleEditTable" type="primary">
                    <i class='el-icon-s-operation'></i>批量编辑
                </el-button>
            </el-tooltip>
            <template v-else-if="mutiSaveUrl">
                <el-button @click="handleSaveTable" type="success" :loading="saveDataLoading">
                    <i class='el-icon-check'></i>批量保存
                </el-button>
                <el-button @click="handleUnEditTable" type="info">
                    <i class='el-icon-close'></i>取消批量
                </el-button>
            </template>
            <el-dropdown v-if="logUrl || docUrl || noteUrl" @command="handleCommandMore">
                <el-button type="primary" icon="menu">更多<el-icon>
                        <ArrowDown />
                    </el-icon></el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="log" v-if="logUrl">操作日志</el-dropdown-item>
                        <el-dropdown-item command="doc" v-if="docUrl">帮助文档</el-dropdown-item>
                        <el-dropdown-item command="note" v-if="noteUrl">帮助书签</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>

        <el-dialog title="上传" width="500px" v-model="dialogUploadVisible">
            <els-image :url="uploadInfo.previewImg" width="480" :is-preview="true"
                v-if="uploadInfo.previewImg.startsWith('http') && !uploadInfo.previewImg.endsWith('xlsx')"></els-image>
            <el-link :href="uploadInfo.previewImg" type="primary" target='_blank' v-else>点击下载模板地址</el-link>
            <div style="text-align: center;margin-top: 20px;">
                <el-upload multiple drag :on-success="lessCom.handleApiResult" :action="uploadInfo.uploadUrl">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </div>
        </el-dialog>
        <els-dialog title="操作日志" width="75%" height="600px" v-model="dialogLogVisible" :url="logUrl">
        </els-dialog>
        <els-dialog title="帮助文档" width="75%" height="600px" v-model="dialogDocVisible" :url="docUrl">
        </els-dialog>
        <els-dialog title="帮助书签" width="75%" height="600px" v-model="dialogNoteVisible" :url="noteUrl">
        </els-dialog>
    </div>
</template>

<style scoped lang="less">
.els-tool-menu {
    display: flex;
    justify-content: space-between;

    .els-tool-menu-button {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;

        .el-button+.el-button {
            margin: 0;
        }
    }


    .operationlog {
        margin-left: 100px;
    }

}</style>