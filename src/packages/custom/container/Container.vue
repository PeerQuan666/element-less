<script setup lang="ts">
import { provide, ref, getCurrentInstance, onMounted, computed, useSlots, h } from 'vue'
import '../../utlis/lessPrototype.js'
import lessCom from '../../utlis/lessCom.js'
import { ElMessage, ElContainer } from 'element-plus'
defineOptions({
    name: 'ElsContainer',
})

const { ctx } = getCurrentInstance() as any
const {$codeField,$messageField,$success}=lessCom.getApiConfig()
const elsPageStore = ref<any>({
    validates: [],
    queryForms: [],
    dataTables: [],
    saveForms: []
})
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
            for (const ele of elsPageStore.value.queryForms.filter(ele => !ele.tableRef)) {
                await ele.query().then(res => {
                    if (res) {
                        elsPageStore.value.dataTables.filter(cele => !completeReadTableIds.value.includes(cele.tagID) && (cele.initReadData || !initPage)).forEach(item => {
                            queryAsyncs.push(item.query(initPage, res))

                        });
                    }
                })
            }
            Promise.all(queryAsyncs).then(() => {
                resolve(true)
            })
        }
        else {
            resolve(true)

        }
    })

}
function elsMenuCommand(menu) {
    switch (menu.ActionType) {
        case 'Save':
            menu.IsLoading = true;
            save().then(() => {
                menu.IsLoading = false;
            }).catch(() => {
                menu.IsLoading = false;
            })
            break
        case 'Modal':
            break
        case 'Target':
            break;
        case 'DesktopTarget':
            break;
        case 'Select':
            break
        case 'Export':
            break;
        case 'Search':
            menu.IsLoading = true;
            query().then(() => {
                menu.IsLoading = false;
            }).catch(() => {
                menu.IsLoading = false;
            })
            return false;
            break;
        default:
            break

    }
}

function elsApiResult(res) {
    if (!res.EventActionData && res[$codeField] == $success) {
        ElMessage.success(res[$messageField])
        return
    } else if (!res.EventActionData && res[$codeField]  != $success) {
        ElMessage.error(res[$messageField])
        return;
    }
    res.EventActionData.forEach(action => {
        switch (action.Name) {
            case "Alert":
                ElMessage.success({ message: action.Value })
                break
            case "TargetUrl":
                window.location.href = action.Value;
                break
            case "RefreshGrid":
                break
            case "RefreshGridParent":
                break
            case "CloseModal":
                break
            case "RefreshFrame":
                break
            case "RefreshFrameParent":
                break
            case "Script":
                break;

        }


    })
}
function elsExport(tableRef) {
    const parentRefs = ctx._.parent.refs
    const dataTable = parentRefs[tableRef]
    dataTable.exportTable()
}
provide("elsExport",elsExport)
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
</template>