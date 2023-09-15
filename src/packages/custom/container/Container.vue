<script setup lang="ts">
import { provide, ref, getCurrentInstance, onMounted, computed } from 'vue'
import '../../utlis/lessPrototype.js'
import { map } from 'lodash';
defineOptions({
    name: 'ElsContainer',
})

const { ctx } = getCurrentInstance() as any

const elsPageStore = ref<any>({
    validates: [],
    queryForms: [],
    dataTables: []
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

function vaildForm() {
    return new Promise((resolve, reject) => {
    Promise.all(elsPageStore.value.queryForms.map(ele => ele.validate())).then(res => {
        if (res.every(ele => ele == true)) {
            resolve(true)
        } else {
            resolve(false)
        }
    })})
}

async function query(initPage = false, tableRef = '') {
    completeReadTableIds.value.length = 0
    return new Promise(async (resolve) => {
        if (tableRef) {
            const currForm = elsPageStore.value.queryForms.find(ele => ele.tableRef == tableRef)
            if (currForm) {
                await currForm.query().then(res => {
                    if (res) {
                        const currTable = ctx.$parent.$refs[currForm.tableRef]
                        if (currTable && (currTable.initReadData || !initPage)) {
                            completeReadTableIds.value.push(currTable.tagID)

                            ctx.$parent.$refs[currForm.tableRef].query(initPage, res).then(res => {
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
                        const currTable = ctx.$parent.$refs[ele.tableRef]
                        if (currTable && (currTable.initReadData || !initPage)) {
                            completeReadTableIds.value.push(currTable.tagID)
                            queryAsyncs.push(ctx.$parent.$refs[ele.tableRef].query(initPage, res))
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
            })
            return false;
            break;
        default:

            break

    }
}

provide("elsPathID", elsPathId)
provide("elsPageStore", elsPageStore)
provide("elsQuery", query)
provide("elsMenuCommand", elsMenuCommand)

onMounted(() => {
    query(true)
})

</script>
<template>
    <div class="page_container">
        <slot></slot>
    </div>
</template>