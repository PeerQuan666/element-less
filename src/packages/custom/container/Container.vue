<script setup lang="ts">
import { provide, ref, getCurrentInstance, onMounted, computed, useSlots, h, nextTick } from 'vue'
import '../../utlis/lessPrototype.js'
import lessCom from '../../utlis/lessCom.js'
import { ElMessage, ElContainer, ElMessageBox, ElLoading } from 'element-plus'
defineOptions({
    name: 'ElsContainer',
})
interface Props {
    selectMenuPostQuery?: boolean
}
const props = defineProps<Props>()
const { ctx } = getCurrentInstance() as any
const { $codeField, $messageField, $success, $eventData } = lessCom.getApiConfig()
const { $actionField, $confirmField, $confirmPasswordField, $urlField } = lessCom.getMenuConfig()

const elsPageStore = ref<any>({
    validates: [],
    queryForms: [],
    dataTables: [],
    saveForms: []
})
const dialogVisible = ref(false)
const dialogUrl = ref('')
const drawerVisible = ref(false)
const drawerUrl = ref('')

const elsPathId = computed(() => {
    const path = location.host + location.pathname
    if (location.search) {
        const parms = location.search.substring(1).split('&').filter(ele => !ele.startsWith('Signature')).sort().toString();
        return (path + parms).md5()
    }
    return path.md5()
})
const completeReadTableIds = ref<any>([])

function validate() {
    return new Promise((resolve) => {
        Promise.all(elsPageStore.value.validates.map(ele => ele.validate())).then(res => {
            if (res.every(ele => ele == true)) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    })
}
function save() {
    return new Promise((resolve, reject) => {
        if (elsPageStore.value.saveForms.length) {
            validate().then(res => {
                if (res) {
                    Promise.all(elsPageStore.value.saveForms.map(ele => ele.save())).then(allRes => {
                        console.info(allRes)
                        resolve(true)
                    }).catch((error) => {
                        reject(error)
                    })
                } else { resolve(false) }
            })
        } else {
            resolve(true)
        }

    })
}
async function query(initPage = false, tableRef = '') {
    const parentRefs = ctx._.parent.refs
    completeReadTableIds.value.length = 0
    return new Promise(async (resolve) => {
        if (tableRef) {
            const currForm = elsPageStore.value.queryForms.find(ele => ele.tableRef == tableRef)
            if (currForm) {
                await currForm.query().then(res => {
                    if (res) {
                        const currTable = parentRefs[currForm.tableRef]
                        if (currTable && (currTable.initReadData || !initPage)) {
                            completeReadTableIds.value.push(currTable.tagID)

                            parentRefs[currForm.tableRef].query(initPage, res).then(() => {
                                resolve(true)
                            })
                        }
                    }
                })
            }
            else {
                resolve(false)
            }
            return
        }
        if (elsPageStore.value.queryForms.length) {
            const queryAsyncs: any = [];
            for (const ele of elsPageStore.value.queryForms.filter(ele => ele.tableRef)) {
                await ele.query().then(res => {
                    if (res) {
                        const currTable = parentRefs[ele.tableRef]
                        if (currTable && (currTable.initReadData || !initPage)) {
                            completeReadTableIds.value.push(currTable.tagID)
                            queryAsyncs.push(parentRefs[ele.tableRef].query(initPage, res))
                        }
                    }
                })
            }
            const allQuery = elsPageStore.value.queryForms.filter(ele => !ele.tableRef)
            if (allQuery.length) {
                for (const ele of allQuery) {
                    await ele.query().then(res => {
                        if (res) {
                            elsPageStore.value.dataTables.filter(cele => !completeReadTableIds.value.includes(cele.tagID) && (cele.initReadData || !initPage)).forEach(item => {
                                completeReadTableIds.value.push(item.tagID)
                                queryAsyncs.push(item.query(initPage, res))
                            });
                        }
                    })
                }
            } else {
                elsPageStore.value.dataTables.filter(cele => !completeReadTableIds.value.includes(cele.tagID) && (cele.initReadData || !initPage)).forEach(item => {
                    completeReadTableIds.value.push(item.tagID)
                    queryAsyncs.push(item.query(initPage, {}))
                });
            }

            Promise.all(queryAsyncs).then(() => {
                resolve(true)
            })
        }
        else if (elsPageStore.value.dataTables.length) {
            const queryAsyncs: any = [];
            elsPageStore.value.dataTables.filter(cele => (cele.initReadData || !initPage)).forEach(item => {
                queryAsyncs.push(item.query(initPage, {}))
            });
            Promise.all(queryAsyncs).then(() => {
                resolve(true)
            })
        }
        else {
            resolve(true)

        }
    })

}
function elsSaveTable() {
    return new Promise(async (resolve) => {
        const queryAsyncs: any = [];
        elsPageStore.dataTables.forEach(ele => {
            queryAsyncs.push(ele.saveTableData())
        })
        if (queryAsyncs.length) {
            Promise.all(queryAsyncs).then(() => {
                resolve(true)
            }).catch(() => {
                resolve(false)
            })
        }
    })

}
function elsMenuCommand(menu) {
    switch (menu[$actionField]) {
        case 'Save':
            menu.IsLoading = true;
            if (menu[$confirmField] && !menu[$confirmPasswordField]) {
                menu.IsLoading = true;
                ElMessageBox.confirm(menu[$confirmField]).then(_ => {
                    save().then(res => {
                        menu.IsLoading = false;
                        elsApiResult(res)
                    }).catch(() => {
                        menu.IsLoading = false;
                    })

                }).catch(() => {
                    menu.IsLoading = false;
                });
            }
            else if (menu[$confirmField] && menu[$confirmPasswordField]) {
                ElMessageBox.prompt(`请输入密码${(menu.IsShowPassword ? `【${menu[$confirmPasswordField]}】` : '')}`, menu[$confirmField], {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnHashChange: false,
                    closeOnClickModal: false,
                    inputValidator: (val) => { return val == menu[$confirmPasswordField]; },
                    inputErrorMessage: '密码错误'
                }).then(() => {
                    save().then(res => {
                        menu.IsLoading = false;
                        elsApiResult(res)
                    }).catch(() => {
                        menu.IsLoading = false;
                    })

                }).catch(() => {

                });
            }
            else {
                save().then(res => {
                    menu.IsLoading = false;
                    elsApiResult(res)
                }).catch(() => {
                    menu.IsLoading = false;
                })
            }
            break
        case 'Drawer':
            drawerUrl.value = menu[$urlField]
            drawerVisible.value = true
            break
        case 'Dialog':
            dialogUrl.value = menu[$urlField]
            dialogVisible.value = true
            break
        case 'Target':
            menu.IsLoading = true;
            if (menu.IsQueryState == 1) {
                elsPageStore.queryForms.forEach(ele => {
                    ele.cacheQueryState()
                })
            }
            window.location.href = menu[$urlField];
            break;
        case 'TargetBlank':
            window.open(menu[$urlField])
            break;
        case 'Select':
            const currSelectData = {}
            elsPageStore.value.dataTables.forEach(ele => {
                let keyData = ele.getTableSelectionWithQuery(props.selectMenuPostQuery);
                Object.assign(currSelectData, keyData)
            })

            if (menu[$confirmField] && !menu[$confirmPasswordField]) {
                menu.IsLoading = true;
                ElMessageBox.confirm(menu[$confirmField]).then(_ => {
                    menu[$urlField].post(currSelectData).then(res => {
                        menu.IsLoading = false;
                        if (!res) {
                            return;
                        }
                        elsApiResult(res)
                    }).catch(err => {
                        console.log(err)
                        menu.IsLoading = false;
                    })

                }).catch(() => {
                    menu.IsLoading = false;
                });
            }
            else if (menu[$confirmField] && menu[$confirmPasswordField]) {
                ElMessageBox.prompt(`请输入密码${(menu.IsShowPassword ? `【${menu[$confirmPasswordField]}】` : '')}`, menu[$confirmField], {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnHashChange: false,
                    closeOnClickModal: false,
                    inputValidator: (val) => { return val == menu[$confirmPasswordField]; },
                    inputErrorMessage: '密码错误'
                }).then(() => {
                    menu.IsLoading = true;
                    menu[$urlField].post(currSelectData).then(res => {
                        menu.IsLoading = false;
                        if (!res) {
                            return;
                        }
                        elsApiResult(res)
                    }).catch(err => {
                        console.log(err)
                        menu.IsLoading = false;
                    })

                }).catch(() => {

                });
            }
            else {
                menu.IsLoading = true;
                menu[$urlField].post(currSelectData).then(res => {
                    menu.IsLoading = false;
                    if (!res) {
                        return;
                    }
                    elsApiResult(res)
                }).catch(err => {
                    console.log(err)
                    menu.IsLoading = false;
                })
            }

            break
        case 'Export':
            if (menu[$urlField] && menu[$urlField].split('?')[0]) {
                menu.IsLoading = true;
                menu[$urlField].post(res => {
                    menu.IsLoading = false;
                    if (!res) {
                        return;
                    }
                    if (res[$codeField] == "0") {
                        var currUrl = res.Data;
                        if (currUrl.indexOf('txt') > -1) {
                            lessCom.downLoadTxt(currUrl)
                        } else {
                            window.location.href = currUrl;
                        }
                    }
                    else {
                        ElMessage.error(res[$messageField]);
                    }
                })
            } else {
                elsExportAll()
                menu.IsLoading = false;
            }
            break;
        case 'Search':
            menu.IsLoading = true;
            query().then(() => {
                menu.IsLoading = false;
            }).catch(() => {
                menu.IsLoading = false;
            })
            return false;
        default:
            break

    }
}

function elsApiResult(res) {
    if (!res[$eventData.data] && res[$codeField] == $success) {
        ElMessage.success(res[$messageField])
        return
    } else if (!res[$eventData.data] && res[$codeField] != $success) {
        ElMessage.error(res[$messageField])
        return;
    }
    res[$eventData.data].forEach(action => {
        switch (action[$eventData.data_key]) {
            case "Alert":
                ElMessage.success({ message: action[$eventData.data_value] })
                break
            case "TargetUrl":
                window.location.href = action[$eventData.data_value];
                break
            case "RefreshTable":
                elsPageStore.value.dataTables.forEach(item => {
                    item.query()
                })
                break
            case "CloseDialog":
                dialogVisible.value = false
                break
            case "CloseDrawer":
                drawerVisible.value = false
                break

        }

    })
}
function elsExport(tableRef) {
    const parentRefs = ctx._.parent.refs
    const dataTable = parentRefs[tableRef]
    if (!dataTable) {
        ElMessage.error('导出的表格不存在')
        return
    }
    dataTable.exportTable()
}


function elsExportHtml() {
    return new Promise((resolve) => {
        if (!elsPageStore) {
            ElMessage.warning("页面未包含在els-container中无法使用默认导出")
            resolve(false)
            return
        }
        const dataTables = elsPageStore.value.dataTables
        let refDatas: any = [];
        let headerCounts: any = [];
        let sheetNames: any = [];
        let exportPageData: any = []
        dataTables.forEach((ele, index) => {
            if (ele.isExport) {
                exportPageData[index] = ele.getPageInfo()
                ele.setPageInfo({ pageSize: 100000, pageIndex: 0 })
                ele.changePageReadData();
            }
        })
        nextTick(() => {
            dataTables.forEach((ele: any, index) => {
                if (ele.isExport) {
                    refDatas.push(ele.table.$el)
                    sheetNames.push(ele.tableName ?? "表" + index);
                    headerCounts.push(ele.table.$el.querySelector(".el-table__header").querySelectorAll("tr").length)
                }
            })
            lessCom.exportMuti(refDatas, sheetNames, [], headerCounts, {
                font: {
                    bold: true,
                },
                alignment: { horizontal: "center", vertical: "center", wrap_text: true },
                fill: { bgcolor: { rgb: 'F5F7FA' }, fgColor: { rgb: 'F5F7FA' } }
            }, window.document.title)
        })
        nextTick(() => {
            dataTables.forEach((ele, index) => {
                if (ele.isExport) {
                    ele.setPageInfo(exportPageData[index])
                    ele.changePageReadData();
                }
            })
            resolve(true)
        })
    })
}
function elsExportAll() {
    const exportLoading = ElLoading.service({
        lock: true,
        text: '数据导出中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
    setTimeout(() => {
        elsExportHtml().then(() => {
            exportLoading.close()
        })

    }, 300);


}
provide("elsSaveTable", elsSaveTable)
provide("elsExportAll", elsExportAll)
provide("elsExport", elsExport)
provide("elsPathID", elsPathId)
provide("elsPageStore", elsPageStore)
provide("elsQuery", query)
provide("elsMenuCommand", elsMenuCommand)
provide("elsApiResult", elsApiResult)

const slots = useSlots()
let componentName: any = h('div')
const isVertical = ref(false)
if (slots.default) {
    componentName = slots.default().some(i => ['ElHeader', 'ElContainer', 'ElAside', 'ElMain', 'ElFooter'].includes((i.type as any)?.name)) ? ElContainer : h('div')
    isVertical.value = slots.default().some(i => ['ElHeader', 'ElFooter'].includes((i.type as any)?.name))
}

onMounted(() => {
    query(true)
})

</script>
<template>
    <component :is="componentName" class="page_container" :class="{ 'is-vertical': isVertical }">
        <slot></slot>
    </component>
    <els-dialog :url="dialogUrl" v-model="dialogVisible" :destroy-on-close="true"></els-dialog>
    <els-drawer :url="drawerUrl" v-model="drawerVisible" :destroy-on-close="true"></els-drawer>
</template>