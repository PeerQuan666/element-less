<script setup lang="ts">
import { provide, ref, getCurrentInstance, onMounted, computed } from 'vue'
import '../../utlis/lessPrototype.js'
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { map } from 'lodash';
defineOptions({
    name: 'ElsContainer',
})

const { ctx } = getCurrentInstance() as any

const elsPageStore = ref<any>({
    validates: [],
    queryForms: [],
    dataTables: [],
    saveForms:[]
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
    return new Promise((resolve, reject) => {
    Promise.all(elsPageStore.value.validates.map(ele => ele.validate())).then(res => {
        if (res.every(ele => ele == true)) {
            resolve(true)
        } else {
            resolve(false)
        }
    })})
}
function save(){
    return new Promise((resolve,reject) => {
        if(elsPageStore.value.saveForms.length){
            validate().then(res=>{
                if(res){
                    Promise.all(elsPageStore.value.saveForms.map(ele => ele.save())).then(allRes=>{
                        resolve(true)
                    }).catch((error)=>{
                            reject(error)
                        })
                }else{resolve(false)}
            })
        }else{
            resolve(true)
        }
       
    })
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
        case 'Save':
            menu.IsLoading = true;
            save().then(res=>{
                menu.IsLoading = false;
            }).catch(()=>{
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
            }).catch(()=>{
                menu.IsLoading = false;
            })
            return false;
            break;
        default:

            break

    }
}

function elsApiResult(res) {
        if (!res.EventActionData && res.ResultCode == "0") {
            ElMessage.success(res.ResultMessage)
            return
        } else if (!res.EventActionData && res.ResultCode != "0") {
            ElMessage.error(res.ResultMessage)
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

provide("elsPathID", elsPathId)
provide("elsPageStore", elsPageStore)
provide("elsQuery", query)
provide("elsMenuCommand", elsMenuCommand)
provide("elsApiResult",elsApiResult)

onMounted(() => {
    query(true)
})

</script>
<template>
    <div class="page_container">
        <slot></slot>
    </div>
</template>