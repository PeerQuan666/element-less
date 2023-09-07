<script setup lang="ts">
import { ref, reactive, computed, provide, watch, onMounted, useAttrs, nextTick, h ,getCurrentInstance} from 'vue'


import { ElMessage, ElLoading } from 'element-plus';
import Sortable from 'sortablejs'
import lessCom from '../../utlis/lessCom.js'
import ElsTableColumn from '../table-column/TableColumn.vue';
import ElsForm from '../form/Form.vue';

defineOptions({ name: 'ElsTable', inheritAttrs: false, })
const {  proxy } = getCurrentInstance() as any
const emits = defineEmits(['update:check-rows', 'update:check-row-keys', 'drag-move', 'drag-start', 'update:editStatus'])
const attrs = useAttrs()
interface Props {
    tableName?: string,
    url?: string,
    queryData?: any,
    saveUrl?: string,
    rowKey?: string | number,
    rowClassName?: string | Function,
    data?: any,
    hasPage?: boolean,
    pageSize?: number,
    pageTotal?: number,
    recordCount?: number,
    pageSizes?: any,
    pageIndex?: number,
    pageLayout?: string,
    isCustomPageSize?: boolean,
    hasBottomFixdScroll?: boolean,
    isLocaleString?: boolean,
    isExport?: boolean,
    isClientSort?: boolean,
    isClientPage?: boolean,
    isClientSearch?: boolean,
    dragSortable?: boolean,
    align?: string,
    headerAlign?: string,
    initReadData?: boolean,
    isReadDataClearCheckRowKey?: boolean,
    isPostCheckRowData?: boolean,
    isPostNoCheckRow?: boolean,
    checkRowKeys?: Array<any>,
    checkRows?: Array<any>,
    extraPowerMenus?: any,
    loading?: boolean,
    spanMethod?: Function,
    showSummary?: boolean,
    showCheckLabelFieldname?: string,
    showEditColumn?: boolean,
    summaryMethod?: Function,
    beforeSave?: Function,
    beforeReadData?: Function,
    afterReadData?: Function,
    headerStickyTop?: number | boolean,
    editStatus?: boolean,
    beforeTriggerContextMenu?:Function,
    hasContextMenu?:boolean


}

const props = withDefaults(defineProps<Props>(), {
    rowKey: '',
    hasPage: true,
    pageSize: 20,
    pageSizes: [10, 20, 30, 40, 50, 100],
    pageIndex: 1,
    pageLayout: 'total,slot, sizes, prev, pager, next, jumper',
    hasBottomFixdScroll: true,
    isExport: true,
    align: 'center',
    initReadData: true,
    isReadDataClearCheckRowKey: true,
    showEditColumn: true,
    headerStickyTop: -1,
    hasContextMenu:true,
    queryData: {},
})

let menuFieldname=''
let idFieldname=''
let actionFieldname=''
if(proxy&&proxy.$lessConfig?.table){
    menuFieldname=proxy.$lessConfig.table.menuFieldname
    idFieldname=proxy.$lessConfig.table.contextMenu.idFieldname
    actionFieldname=proxy.$lessConfig.table.contextMenu.actionFieldname

}

const tagID = lessCom.Guid32()
const wrapTagID = 'leo-wrap-' + tagID
let currSaveUrl = ref('')
let currHeaderStickyTop = ref(-1)
let dataLoading = ref(false)
let saveDataLoading = ref(false)
let currPageSize = ref(0)
let currPageIndex = ref(1)
let currPageTotal = ref(0)
let currRecourdCount = ref(0)
const tableData: Array<Record<string, any>> = reactive([])
const sourceTableData: Array<Record<string, any>> = reactive([])
let editSourceTableData: Array<Record<string, any>> = reactive([])

let extendData: Record<string, any> = reactive({})
let rowData: Record<string, any> = reactive({})
let contextMenuVisible = ref(false)
let contextMenuPositionLeft = ref(0)
let contextMenuPositionTop = ref(0)
let sortSelectRow: Record<string, any> = reactive({})
let currShowSummary = ref(false)
let currSpanMethod: Function
let currSummaryMethod: Function
let currSortChange: Function
let columnEditData: Array<Record<string, any>> = reactive([])
let columnSortData: Record<string, any> = reactive({})
let columnMergeData: Array<Record<string, any>> = reactive([])
let columnSummaryData: Array<Record<string, any>> = reactive([])
let isFirstReadData = ref(true)
let tableCheckData = reactive<any>({ checkRows: [], checkRowKeys: [] })
let provideData = reactive({ avgDay: 0, isLocaleString: false, isClientPage: false, isClientSearch: false, align: '', headerAlign: '', isExport: true })
let tableBodyWidth = ref('')
let scrollLeft = ref('')
let isMobile = ref(false)
let mobilePageLayout: string = "total, prev, next, jumper"
const bottomScroll = ref()
const dataTable = ref()
const tableForm = ref()

const contentMenu = ref()
let tableContainer = h('div', { class: 'table-container' })
let tableFormContainer = h(ElsForm, {  modelValue: tableData, class: 'table-form-container', labelWidth: '0', showMessage: false })


watch(() => props.isLocaleString, (val) => {
    provideData.isLocaleString = val
}, { immediate: true })
if (props.data && props.data.Data) {
    watch(() => props.data.Data, (val) => {

        if (val) {
            if (props.isReadDataClearCheckRowKey) {
                tableCheckData.checkRowKeys.length = 0;
                tableCheckData.checkRows.length = 0;
            }
            initTableData(props.data)
        }

    }, { deep: true })
}

watch(() => props.data, (val) => {
    console.info('aaa')
    if (Array.isArray(val)) {
        if (props.isReadDataClearCheckRowKey) {
            tableCheckData.checkRowKeys.length = 0;
            tableCheckData.checkRows.length = 0;
        }
        initTableData(val)
    }
})

watch(tableData, () => {
    updateBottomScroll();
}, { immediate: true })

watch(() => props.pageSize, (val) => {
    currPageSize.value = val

})
watch(() => props.pageTotal, (val) => {
    currPageSize.value = val ?? 0

})
watch(() => props.recordCount, (val) => {
    currRecourdCount.value = val ?? 0

})
watch(() => props.pageIndex, (val) => {
    currPageIndex.value = val

})
watch(() => props.loading, (val) => {
    dataLoading.value = val

}, { immediate: true })
watch(() => props.headerStickyTop, (val) => {
    if (val === true) {
        currHeaderStickyTop.value = 0

    } else if (typeof (val) === 'number') {
        currHeaderStickyTop.value = val

    }

}, { immediate: true })
watch(columnMergeData, (val) => {
    if (val && val.length) {
        currSpanMethod = handleSpanMethod;
    }

}, { immediate: true })
watch(tableCheckData, (val) => {
    emits("update:check-rows", lessCom.cloneObj(val.checkRows))
    emits("update:check-row-keys", lessCom.cloneObj(val.checkRowKeys))

}, { deep: true })

const currRowClassName = computed(() => {
    if (props.rowClassName) {
        return props.rowClassName
    }
    return tableRowClassName
})
const isShowEditColumn = computed(() => {
    return props.saveUrl && columnEditData.filter(ele => ele.isEdit).length;

})
const isEdit = computed(() => {
    return columnEditData.filter(ele => ele.isEdit).length > 0;

})
provide('provideData', provideData)
provide('rowKey', props.rowKey)
provide('setEditData', setEditData)
provide('setSortData', setSortData)
provide('setMergeRowData', setMergeRowData)
provide('setSummaryData', setSummaryData)
provide('handleTableSelectRow', handleTableSelectRow)
provide('tableCheckData', tableCheckData)
provide('handlePowerMenu', handlePowerMenu)


isMobile.value = navigator.userAgent.indexOf('Mobile') > -1





function handleTableBodyScroll(data) {
    if (scrollLeft != data.scrollLeft) {
        scrollLeft = data.scrollLeft;
        bottomScroll.value.setScrollLeft(data.scrollLeft)
    }

}
function handleBottomFixedScroll(data) {
    if (scrollLeft != data.scrollLeft) {
        scrollLeft = data.scrollLeft;
        dataTable.value.setScrollLeft(data.scrollLeft)
    }
}
function updateBottomScroll() {
    if (props.hasBottomFixdScroll && !isMobile) {
        nextTick(() => {
            setTimeout(function () {
                if (dataTable.value) {
                    tableBodyWidth.value = parseFloat(dataTable.value.bodyWidth) + "px";
                    setTimeout(() => {
                        if (bottomScroll.value) {
                            bottomScroll.value.update()
                        }
                    }, 50)
                }
            }, 50)
        })
    }


}
function getTableSelection(isPostCheckRowData, isPostNoCheckRow) {
    if (isPostCheckRowData === false) {
        isPostCheckRowData = isPostCheckRowData
    }
    if (isPostNoCheckRow === false) {
        isPostNoCheckRow = isPostNoCheckRow
    }
    if (isPostCheckRowData) {
        let keyData = {};
        keyData["selectRows"] = JSON.stringify(tableCheckData.checkRows);
        return keyData;

    } else {
        let keyData = {};
        if (props.rowKey) {
            const currRowKey = props.rowKey.toString()
            keyData[currRowKey] = tableCheckData.checkRowKeys.toString();
            if (isPostNoCheckRow) {

                keyData["No" + props.rowKey] = tableData.map(ele => ele[currRowKey]).filter(ele => { return tableCheckData.checkRowKeys.indexOf(ele) == -1 }).toString()
            }
        }
        return keyData;
    }

}
function setDragSortable() {
    if (props.dragSortable) {
        new Sortable(dataTable.value.$el.querySelector(".el-table__body-wrapper tbody"), {
            handle: '.leo-table-drag',
            draggable: '.el-table__row', // 允许拖拽的项目类名
            // 拖拽中 回调函数
            onMove(customEvent) {
                console.info("----DragMove----")
                emits("drag-move", customEvent)
            },
            onStart(parms) {
                console.info("----DragStart----")
                emits("drag-move", parms)
            },
            // 拖拽结束，调整位置
            onEnd({ newIndex, oldIndex }) {
                console.info("----DragEnd---")
                if (oldIndex && newIndex) {
                    const currRow = tableData.splice(oldIndex, 1);
                    tableData.splice(newIndex, 0, currRow);
                    emits("drag-start", { newIndex, oldIndex })
                }

            },
        })
    }
}
function setEditData(field, isEdit) {
    if (!field) { return; }
    let currIndex = columnEditData.findIndex(ele => ele.fieldName == field)
    if (currIndex > -1) {
        columnEditData.splice(currIndex, 1)
    }
    columnEditData.push({ fieldName: field, isEdit: isEdit })
    columnEditData = columnEditData.filter(ele => ele.isEdit)
}
function setSortData(sortData) {
    if (!sortData) { return; }
    columnSortData[sortData.Key] = {
        QueryFieldName: sortData.Info["QueryFieldName"],
        QueryParameterType: sortData.Info["QueryParameterType"],
        SignatureMD5: sortData.Info["SignatureMD5"],
        Value: sortData.Info["Value"]
    }
}
function setMergeRowData(field, mergeData) {
    if (!field) { return; }
    let currIndex = columnMergeData.findIndex(ele => ele.fieldName == field)
    if (currIndex > -1) {
        columnMergeData.splice(currIndex, 1)
    }
    columnMergeData.push({ fieldName: field, mergeData: mergeData })
    columnMergeData = columnMergeData.filter(ele => ele.mergeData.isMergeRow)

    if (!currSpanMethod) {
        currSpanMethod = handleSpanMethod;

    }


}
function setSummaryData(field, summaryData) {
    if (!field) { return; }
    let currIndex = columnSummaryData.findIndex(ele => ele.fieldName == field)
    if (currIndex > -1) {
        columnSummaryData.splice(currIndex, 1)
    }
    columnSummaryData.push({ fieldName: field, summaryData: summaryData })
    columnSummaryData = columnSummaryData.filter(ele => ele.summaryData.showSummary)

    if (!currSummaryMethod) {
        currSummaryMethod = handleSummaryMethod;
        currShowSummary.value = true;
    }

}
function initData() {
    if (props.headerStickyTop === true) {
        currHeaderStickyTop.value = 0;
    } else if (typeof(props.headerStickyTop)=="number") {
        currHeaderStickyTop.value = props.headerStickyTop
    } else {
        currHeaderStickyTop.value = -1;
    }

    currPageSize.value = props.pageSize;
    currPageIndex.value = props.pageIndex;

    provideData.isExport = props.isExport;
    provideData.isClientPage = props.isClientPage;
    provideData.isClientSearch = props.isClientSearch;
    provideData.align = props.align;
    provideData.headerAlign = props.headerAlign ?? props.align
    currSaveUrl.value = props.saveUrl ?? '';
    if (props.data) {
        initTableData(props.data);
    }


}
function initTableData(val) {
    if (Array.isArray(val)) {
        sourceTableData.length = 0
        sourceTableData.push(...val)

    } else if (val.Data) {
        sourceTableData.length = 0
        sourceTableData.push(...val.Data)
        if (val.ExtendData) {
            extendData = val.ExtendData
        }
        if (val.PageSize !== undefined && !props.isClientPage) {
            currPageSize.value = val.PageSize
        }
        if (val.PageIndex !== undefined) {
            currPageIndex.value = val.PageIndex + 1;
        }
        if (val.RecordCountInt !== undefined) {
            currRecourdCount.value = val.RecordCountInt;
        }
        if (val.PageCount !== undefined) {
            currPageTotal.value = val.PageCount;
        }
        if (val.DayCount) {
            provideData.avgDay = val.DayCount
        }
    } else {
        sourceTableData.length = 0;
        extendData = {}
    }
    if (props.isClientSearch || props.isClientPage) {
        clientTableData();
    } else {
        tableData.length = 0;
        tableData.push(...sourceTableData)
    }
    editSourceTableData = lessCom.cloneObj(sourceTableData)
    setTableCheckRows();
}
function setTableCurrentRow(id) {
    if (dataTable.value && props.rowKey) {
        let currRow = tableData.find(ele => ele[props.rowKey.toString()] == id)
        if (currRow) {
            dataTable.value.setCurrentRow(currRow)
        }
    }
}
function validTableForm(postData) {
    return new Promise((resolve) => {
        if (!columnEditData.length) {
            ElMessage.error("没有编辑的行");
            return resolve(false)
        }
        if (!postData.length) {
            tableData.forEach(row => {
                if (row.edit) {
                    var postItem = {};
                    postItem[props.rowKey] = row[props.rowKey];
                    columnEditData.forEach(ele => {
                        postItem[ele.fieldName] = row[ele.fieldName]
                    })
                    postData.push(postItem);
                }
            })
        }
        if (postData.length > 1) {
            tableForm.value.validate().then(res => {
                if(res){
                    resolve(postData)
                }
              
            }).catch(action => {
                console.log(action)
                resolve(false)
            })
        } else {
            validEditRow(postData[0]).then(() => {
                resolve(postData)
            }).catch(action => {
                console.log(action)
                resolve(false)
            })
        }
    }).catch(action => {
        console.log(action);
        ElMessage.error("数据异常，保存失败！请联系技术解决！")

    })
}
function saveTableData(url, postData: any = []) {
    return new Promise((resolve, reject) => {
        validTableForm(postData).then((validData: any) => {
            if (validData !== false) {
                if (props.beforeSave) {
                    props.beforeSave()
                }

                if (!url) { url = currSaveUrl.value; }
                if (!url) {
                    ElMessage.error("请设置保存地址");
                    return resolve(false)
                }
                if (validData.length == 1) {
                    let currRow = tableData.find(ele => ele[props.rowKey] == validData[0][props.rowKey]);
                    if (currRow) {
                        currRow.saveDataLoading = true;
                    }
                } else {
                    saveDataLoading.value = true
                }
                url.post({ tabledata: JSON.stringify(validData) }).then(res => {
                    saveDataLoading.value = false
                    tableData.forEach(ele => {
                        ele.saveDataLoading = false;
                    })
                    tableForm.value.handleSubmitButton();
                    if (res.ResultCode != "0") {
                        ElMessage.error(res.ResultMessage)
                    } else {
                        if (!res.EventActionData) {
                            ElMessage.success('保存成功')
                            compatibleReadData()
                        } else {
                            lessCom.handleApiResult(res);
                        }
                    }
                    resolve(res)
                }).catch(action => {
                    saveDataLoading.value = false
                    tableData.forEach(ele => {
                        ele.saveDataLoading = false;
                    })
                    reject(action)
                })
            }

        })
    })
}
function handleTableRowClick(row) {
    rowData = row;
}
function handleTableRowDblClick(row) {
    handleRowEdit(row, tableData.findIndex(ele => ele[props.rowKey] == row[props.rowKey]))

}
function editTable() {
    tableData.forEach(ele => {
        ele.edit = true
    })
    emits("update:editStatus",true)
}
function unEditTable() {
    tableData.forEach(ele => {
        ele.edit = false
    })
    emits("update:editStatus",false)

}
function handleRowEdit(row, index) {
    if (isEdit) {
        if (row.edit) {
            let sourceRow = editSourceTableData.find(ele => ele[props.rowKey] == row[props.rowKey])
            if (sourceRow) {
                for (const key in sourceRow) {
                    if (tableData[index].hasOwnProperty(key)) {
                        tableData[index][key] = sourceRow[key];
                    }
                }
                sourceRow.edit = false
            }
            row.edit = false
        } else {
            row.edit = true
        }
        if (props.saveUrl) {
            if (tableData.find(ele => ele["edit"] === true)) {

                emits("update:editStatus", true)

            } else {

                emits("update:editStatus", false)

            }
        }
    }

}
function handleRowSave(row) {
    if (!props.rowKey) {
        ElMessage.error("主键ID不存在，请设置RowKey")
        return;
    }
    let postItem = {};
    postItem[props.rowKey] = row[props.rowKey];
    if (!columnEditData.length) {
        return
    }
    columnEditData.forEach(ele => {
        postItem[ele.fieldName] = row[ele.fieldName]
    })
    let postData = [postItem];
    saveTableData(currSaveUrl.value, postData)
}
function validEditRow(row) {
    let validFields: any = [];
    let rowIndex = tableData.findIndex(ele => ele[props.rowKey] == row[props.rowKey])
    if (rowIndex == -1) {
        ElMessage.error(`【${row[props.rowKey]}】当前行未找到`);
    }
    for (let key in row) {
        validFields.push(`[${rowIndex}]['${key}']`)
    }
    return tableForm.value.validateField(validFields);
}
function handleTableSelectSortRow() {
    sortSelectRow = lessCom.cloneObj(rowData)
}
function handleTableRowMoveHere(url) {
    url.post({ selectID: sortSelectRow[props.rowKey], moveID: rowData[props.rowKey] }).then(res => {
        if (!res || res.ResultCode != "0") {
            ElMessage.error(res.ResultMessage)
        }
        else {
            ElMessage.success("移动成功")
            readData();
        }

    })
}
function handleTableRowExchangeMove(url) {
    url.post({ selectID: sortSelectRow[props.rowKey], moveID: rowData[props.rowKey] }).then(res => {
        if (!res || res.ResultCode != "0") {
            ElMessage.error(res.ResultMessage)
        }
        else {
            ElMessage.success("移动成功")
            readData();
        }

    })
}
function tableRowClassName({ row }) {
    if (props.rowKey) {
        if (sortSelectRow && sortSelectRow[props.rowKey] && row[props.rowKey] == sortSelectRow[props.rowKey]) {
            return 'table_selectrow';
        } else {
            if (tableCheckData.checkRowKeys && tableCheckData.checkRowKeys.indexOf(row[props.rowKey]) > -1) {
                return 'table_checkrow';
            }
            return '';
        }
    }
}
function handleTableSelectRow(row) {
    var index = tableCheckData.checkRowKeys.indexOf(row[props.rowKey]);
    if (index == -1) {
        dataTable.value.toggleRowSelection(row, true);
    } else {
        dataTable.value.toggleRowSelection(row, false);
    }
    handleTableSelect(null, row)


}
function handleTableSelect(selection, row) {
    console.log(selection)
    if (row[props.rowKey]) {
        var index = tableCheckData.checkRowKeys.indexOf(row[props.rowKey]);
        if (index == -1) {
            tableCheckData.checkRowKeys.push(row[props.rowKey])
            tableCheckData.checkRows.push(row)
        } else {
            tableCheckData.checkRows.splice(index, 1)
            tableCheckData.checkRowKeys.splice(index, 1)
        }
    }
}
function handleTableSelectAll(selection) {
    if (selection.length > 0) {
        selection.forEach(ele => {
            var index = tableCheckData.checkRowKeys.indexOf(ele[props.rowKey]);
            if (index == -1) {
                tableCheckData.checkRowKeys.push(ele[props.rowKey])
                tableCheckData.checkRows.push(ele)
            }
        })
    } else {
        tableData.forEach(ele => {
            var index = tableCheckData.checkRowKeys.indexOf(ele[props.rowKey]);
            if (index > -1) {
                tableCheckData.checkRowKeys.splice(index, 1)
                tableCheckData.checkRows.splice(index, 1)
            }
        })
    }
}
function handleRowContextMenu(row, column, event) {
    if(!props.hasContextMenu){return}
    if(!menuFieldname){
        console.log('未设置全局配置$lessConfig，无法使用菜单')
        return
    }
    console.log(column)
    if (!row[menuFieldname] || !row[menuFieldname].length) { return; }
    if (event.target.className.indexOf("el-image-viewer") > -1) {
        return;
    }
    var currEvent = event
    rowData = row
    if(props.beforeTriggerContextMenu){
        props.beforeTriggerContextMenu(row)
    }
    contextMenuPositionLeft.value = currEvent.clientX
    contextMenuPositionTop.value = currEvent.clientY
    contextMenuVisible.value = true
    currEvent.returnValue = false
    dataTable.value.setCurrentRow(row)
}
function handleSpanMethod({ row, column, rowIndex, columnIndex }) {
    var rowSpan = 1;
    var colSpan = 1;
    if (columnMergeData.length && column.columnKey) {
        let currTableData = tableData;
        let mergeAttrData = columnMergeData.find(ele => ele.fieldName == column.columnKey && ele.mergeData.isMergeRow === true);
        if (mergeAttrData) {
            mergeAttrData = mergeAttrData.mergeData
        }
        if (mergeAttrData) {
            const mergeFieldName = mergeAttrData.mergeFieldName
            let mergeByFieldName = mergeFieldName
            if (mergeAttrData.mergeRowByFieldName) {
                mergeByFieldName = mergeAttrData.mergeRowByFieldName
            }
            let currRowValue = lessCom.getObjectKey(row, mergeByFieldName)
            if (currTableData.findIndex(ele => lessCom.getObjectKey(ele, mergeByFieldName) === currRowValue) === rowIndex) {
                let currRows = currTableData.filter(ele => lessCom.getObjectKey(ele, mergeByFieldName) === currRowValue);
                rowSpan = currRows.length;
                colSpan = 1;
                if (mergeAttrData.isMergeSumValue) {
                    row[column.columnKey] = lessCom.sumArray(currRows.map(ele => ele[mergeFieldName]))
                }
                else if (mergeAttrData.mergeMethod) {
                    row[column.columnKey] = mergeAttrData.mergeMethod(currRows, column)
                }

            } else {
                if (mergeAttrData.isMergeSumValue || mergeAttrData.mergeMethod) {
                    row[column.columnKey] = 0;
                }
                rowSpan = 0;
                colSpan = 0;
            }
        }
    } else {
        let currMergeData = extendData;
        if (currMergeData) {
            if (currMergeData[rowIndex + '_' + columnIndex]) {
                var currData = currMergeData[rowIndex + '_' + columnIndex];
                if (currData) {
                    rowSpan = parseInt(currData.split('_')[0]);
                    colSpan = parseInt(currData.split('_')[1]);
                }
            }
        }
    }
    return {
        rowspan: rowSpan,
        colspan: colSpan
    };
}
function handleSummaryMethod(param) {
    let sums: any = [];
    param.columns.forEach((column, index) => {
        if (index === 0) {
            sums[index] = '合';

        } else {
            let currSummary = columnSummaryData.map(ele => ele.summaryData).filter(ele => ele.showSummary).find(ele => ele.summaryFieldName == column.columnKey)
            if (currSummary) {
                if (currSummary.summaryMethod) {
                    sums[index] = currSummary["summaryMethod"](column, param.tableRef)
                }
                else if (currSummary.summaryValue) {
                    sums[index] = currSummary.summaryValue
                }
                else {
                    sums[index] = lessCom.sumArray(sourceTableData.map(ele => ele[currSummary.summaryFieldName]))
                }
            } else {
                sums[index] = '';
            }
        }
    })
    return sums;
}
function clientTableData() {

    let clientData = lessCom.cloneObj(sourceTableData)
    if (props.isClientSearch) {
        clientData = clientTableSearchData(clientData)
    }
    if (props.isClientPage) {
        clientData = clientTablePageData(clientData)
    }
    tableData.length = 0;
    tableData.push(...clientData)
    setTableCheckRows()
}
function clientTablePageData(data) {
    var pageData = lessCom.pageArray(data, currPageIndex.value - 1, currPageSize.value)
    if (pageData.length === 0) {
        pageData = lessCom.pageArray(data, 0, currPageSize.value)
    }
    currRecourdCount = data.length
    return pageData
}
function clientTableSearchData(data) {
    if (!props.queryData) {
        return data
    }
    let filterData = data.filter(ele => {
        var isTrue = true;
        for (let key in props.queryData) {
            let currQuery = props.queryData[key];
            let currFieldName = currQuery["QueryFieldName"];
            if (!currFieldName) {
                continue;
            }
            var currValue = currQuery.Value;
            var currType = currQuery.QueryDataType;
            if (currValue === '' || currQuery.QueryParameterType == 'NoQuery' || currQuery.QueryParameterType == 'Sort' || currQuery.QueryType == 'Parm') {
                continue;
            }

            if (key.startsWith("StartDate_") || key.startsWith("Start_")) {
                isTrue = ele[currFieldName] >= currValue;
            } else if (key.startsWith("EndDate_") || key.startsWith("End_")) {
                isTrue = ele[currFieldName] <= currValue;
            } else {
                if (currType == "Int") {
                    isTrue = ele[currFieldName] == currValue;
                }
                else {
                    isTrue = ele[currFieldName] && ele[currFieldName].toLowerCase().includes(currValue.toLowerCase());
                }
            }
            if (!isTrue) { return isTrue; }
        }
        return isTrue
    });
    currRecourdCount = filterData.length
    return filterData
}
function searchData() {
    currPageIndex.value = 1;
    return compatibleReadData();
}
function readData() {
    if (!props.url) {
        return;
    }

    let searchQueryData = Object.assign(props.queryData ?? {}, columnSortData)
    searchQueryData.PageSize = { Value: currPageSize.value };
    searchQueryData.PageIndex = { Value: currPageIndex.value - 1 };

    if (props.beforeReadData) {
        props.beforeReadData()
    }
    dataLoading.value = true;
    let currQueryData = lessCom.getQueryData(searchQueryData);
    return props.url.post(currQueryData).then(res => {
        if (res.ResultCode === "0") {
            if (res.Data.ExtendData != undefined) {
                extendData = res.Data.ExtendData
            }
            if (res.Data.PageSize != undefined) {
                sourceTableData.length = 0
                sourceTableData.push(...res.Data.Data);
                if (!props.isClientPage) {
                    currPageSize.value = res.Data.PageSize
                }
                currPageIndex.value = res.Data.PageIndex + 1
                currRecourdCount.value = res.Data.RecordCountInt
                currPageTotal.value = res.Data.PageCount
            } else {
                sourceTableData.length = 0
                sourceTableData.push(...res.Data)

            }
            if (props.isClientSearch || props.isClientPage) {
                clientTableData();
            } else {
                tableData.length = 0
                tableData.push(...sourceTableData)
            }
            editSourceTableData = lessCom.cloneObj(sourceTableData)
            if (res.Data.DayCount) {
                provideData.avgDay = res.Data.DayCount;
            }

        }
        else if (res.ResultCode === "Login") {
            ElMessage.warning('未登录')
        }
        else {
            ElMessage.error(res.ResultMessage);
        }
        dataLoading.value = false
        if (props.afterReadData) {
            props.afterReadData()
        }
        if (props.isReadDataClearCheckRowKey && !isFirstReadData) {
            tableCheckData.checkRowKeys.length = 0;
            tableCheckData.checkRows.length = 0;
        }
        isFirstReadData.value = false
        margePowerMenu();
        setTableCheckRows()

    }).catch(error => {
        console.log(error);
        ElMessage.error("数据加载失败！")

    })
}
function initTableCheckRows(defaultCheckRow) {
    if (defaultCheckRow) {
        dataTable.value.clearSelection();
        tableCheckData.checkRows = defaultCheckRow;
        if (props.rowKey && defaultCheckRow) {
            tableCheckData.checkRowKeys = defaultCheckRow.map(obj => { return obj[props.rowKey] });
        }
        setTableCheckRows();
    }
}
function initTableCheckKeys(checkRowKeys) {
    if (checkRowKeys) {
        tableCheckData.checkRows = tableData.filter(ele => checkRowKeys.indexOf(ele[props.rowKey]) > -1);
        tableCheckData.checkRowKeys = tableCheckData.checkRows.map(ele => ele[props.rowKey]);
        dataTable.value.clearSelection();
        setTableCheckRows(tableCheckData.checkRowKeys);
    }
}
function toggleRowSelection(item, checked) {
    dataTable.value.toggleRowSelection(item, checked);
}
function setTableCheckRows(checkRowKeys: any = null) {
    nextTick(() => {
        if (props.rowKey && tableData.length) {
            tableData.forEach(ele => {
                if (ele[props.rowKey]) {
                    if (checkRowKeys) {
                        if (checkRowKeys.indexOf(ele[props.rowKey]) > -1) {
                            tableCheckData.checkRowKeys = lessCom.cloneObj(checkRowKeys);
                            dataTable.value.toggleRowSelection(ele, true);
                        }
                    } else {
                        if (tableCheckData.checkRowKeys.indexOf(ele[props.rowKey]) > -1) {
                            dataTable.value.toggleRowSelection(ele, true);
                        }
                    }

                }
            })
        }
    })
}
function handlePowerMenu(row, menuID) {
    if(!menuFieldname){
        ElMessage.warning('未设置全局配置$lessConfig，无法使用菜单')
        return
    }
    if (!row[menuFieldname]) {
        ElMessage.error('菜单不存在')
        return;
    }
    setTimeout(() => {
        var currPowerMenu = row[menuFieldname].find(ele => ele[idFieldname] === menuID || ele[actionFieldname] === menuID);
        if (!currPowerMenu) {
            ElMessage.error('菜单不存在')
            return;
        }
        contentMenu.value.handleCommand(currPowerMenu);
    }, 150)
}
function margePowerMenu() {
    if (tableData && props.extraPowerMenus) {
        tableData.forEach(ele => {
            ele[menuFieldname].push(...props.extraPowerMenus)

        })
    }
}
function handleSortTable(column) {
    if (props.isClientPage || props.isClientSearch || props.isClientSort) {
        sortTableData(column.prop, column.order)
        return;
    }
    let prop = column.prop;
    if (!prop) {
        return;
    }
    let columnSort = ''
    if (column.order === 'ascending') {
        columnSort = 'Asc'
    } else if (column.order === 'descending') {
        columnSort = 'Desc'
    }
    if (columnSortData["Sort_" + prop]) {
        columnSortData["Sort_" + prop].Value = columnSort
    }

    searchData()
}
function sortTableData(fieldName, order) {
    if (order == "ascending") {
        lessCom.orderBy(sourceTableData, fieldName)

    } else if (order == "descending") {
        lessCom.orderByDescending(sourceTableData, fieldName)
    }
    clientTableData()
}
function changePageReadData() {
    if (props.isClientPage) {
        clientTableData()
        return
    }
    return compatibleReadData();
}
function compatibleReadData() {
    if (props.isClientSearch) {
        return new Promise((resolve) => {
            clientTableData()
            return resolve(true)
        })
    }
    if (props.url) {
        return readData();
    }
}
function handleChangePage(val) {
    currPageIndex.value = val;
    changePageReadData();
    emits("update:editStatus", false)
}
function handleChangePageSize(val) {
    currPageSize.value = val;
    changePageReadData();
    emits("update:editStatus", false)

}
function handleDragCheckItem() {
    tableCheckData.checkRowKeys = tableCheckData.checkRows.map(ele => ele[props.rowKey])
}
function handleCloseCheckItem(item) {
    lessCom.removeArrayItem(tableCheckData.checkRows, item)
    tableCheckData.checkRowKeys = tableCheckData.checkRows.map(ele => ele[props.rowKey])
    let currRow = tableData.find(ele => ele[props.rowKey] == item[props.rowKey])
    if (currRow) {
        dataTable.value.toggleRowSelection(currRow, false);
    }
}
function exportClientDataHtml() {
    let pageSize = currPageSize.value;
    let pageIndex = currPageIndex.value;
    currPageSize.value = 100000;
    currPageIndex.value = 0;
    changePageReadData();
    nextTick(() => {
        exportDataHtml();
        currPageSize.value = pageSize;
        currPageIndex.value = pageIndex;
        changePageReadData();
    })

}
function exportDataHtml() {
    let filename = getExportFileName();
    let headerCount = dataTable.value.$el.querySelector(".el-table__header").querySelectorAll("tr").length
    lessCom.exportTable(dataTable.value.$el, [], headerCount, {
        font: {
            bold: true,
        },
        alignment: { horizontal: "center", vertical: "center", wrap_text: true },
        fill: { bgcolor: { rgb: 'F5F7FA' }, fgColor: { rgb: 'F5F7FA' } }
    }, filename)
}

function exportReadDataHtml() {
    let currUrl = props.url;

    if (!currUrl) {
        ElMessage.error("接口地址不存在！")
        return;
    }
    if (props.beforeReadData) {
        props.beforeReadData()
    }
    let currQueryData = Object.assign(props.queryData, columnSortData)
    currQueryData = lessCom.getQueryData(currQueryData)
    currQueryData["Query_PageSize"] = 100000;
    currQueryData["Query_PageIndex"] = 0;
    const exportLoading = ElLoading.service({
        lock: true,
        text: '数据导出中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
    currUrl.post(currQueryData).then(res => {
        if (res.ResultCode === "0") {
            tableData.length = 0
            if (res.Data.PageSize != undefined) {
                tableData.push(...res.Data.Data);

            }else{
                tableData.push(...res.Data);
            }
            nextTick(() => {
                exportDataHtml()
                changePageReadData();
                exportLoading.close();
            })
        }
        else {
            exportLoading.close();
            ElMessage.error(res.ResultMessage);
        }
    }).catch(action => {
        exportLoading.close();
        console.log(action)
    })
}



function getExportFileName() {
    let filename = props.tableName??'未设置名称'
    let currQueryData = props.queryData;

    if (currQueryData.StartDate_QueryDate && currQueryData.EndDate_QueryDate) {
        filename += "(" + currQueryData.StartDate_QueryDate.replaceAll(" 00:00:00", "") + "~" + currQueryData.EndDate_QueryDate.replaceAll(" 23:59:59", "") + ")" + "-" + lessCom.formatDate(new Date(), "yyyyMMddHHmmss");
    } else if (currQueryData.StartDate_CreateDate && currQueryData.EndDate_CreateDate) {
        filename += "(" + currQueryData.StartDate_CreateDate.replaceAll(" 00:00:00", "") + "~" + currQueryData.EndDate_CreateDate.replaceAll(" 23:59:59", "") + ")" + "-" + lessCom.formatDate(new Date(), "yyyyMMddHHmmss");
    }
    else if (currQueryData.DateType) {
        if ((currQueryData.DateType == 1 || currQueryData.DateType == 'Day') && currQueryData.StartDate_CreateDay) {
            filename += "(" + currQueryData.StartDate_CreateDay.replaceAll(" 00:00:00", "") + "~" + currQueryData.EndDate_CreateDay.replaceAll(" 23:59:59", "") + ")" + "-" + lessCom.formatDate(new Date(), "yyyyMMddHHmmss");
        } else if ((currQueryData.DateType == 2 || currQueryData.DateType == 'Week') && currQueryData.StartDate_CreateWeek) {
            filename += "(" + currQueryData.StartDate_CreateWeek.replaceAll(" 00:00:00", "") + "~" + currQueryData.EndDate_CreateWeek.replaceAll(" 23:59:59", "") + ")" + "-" + lessCom.formatDate(new Date(), "yyyyMMddHHmmss");
        } else if (currQueryData.EndDate_CreateMonth) {
            filename += "(" + currQueryData.StartDate_CreateMonth.replaceAll(" 00:00:00", "") + "~" + currQueryData.EndDate_CreateMonth.replaceAll(" 23:59:59", "") + ")" + "-" + lessCom.formatDate(new Date(), "yyyyMMddHHmmss");
        } else {
            filename += "-" + lessCom.formatDate(new Date(), "yyyyMMddHHmmss");
        }
    }
    else if (currQueryData.StartDate_CreateMonth && currQueryData.EndDate_CreateMonth) {
        filename += "(" + currQueryData.StartDate_CreateMonth.replaceAll(" 00:00:00", "") + "~" + currQueryData.EndDate_CreateMonth.replaceAll(" 23:59:59", "") + ")" + "-" + lessCom.formatDate(new Date(), "yyyyMMddHHmmss");
    }
    else if (currQueryData.StartDate_CreateDay && currQueryData.EndDate_CreateDay) {
        filename += "(" + currQueryData.StartDate_CreateDay.replaceAll(" 00:00:00", "") + "~" + currQueryData.EndDate_CreateDay.replaceAll(" 23:59:59", "") + ")" + "-" + lessCom.formatDate(new Date(), "yyyyMMddHHmmss");
    }
    else if (currQueryData.StartDate_CreateWeek && currQueryData.EndDate_CreateWeek) {
        filename += "(" + currQueryData.StartDate_CreateWeek.replaceAll(" 00:00:00", "") + "~" + currQueryData.EndDate_CreateWeek.replaceAll(" 23:59:59", "") + ")" + "-" + lessCom.formatDate(new Date(), "yyyyMMddHHmmss");
    } else {
        filename += "-" + lessCom.formatDate(new Date(), "yyyyMMddHHmmss");
    }
    return filename;
}

initData();

onMounted(() => {
    if (props.initReadData && props.url) {
        readData()
    }
    currShowSummary.value = props.showSummary;
    if (props.spanMethod) {
        currSpanMethod = props.spanMethod;
    } else if (columnMergeData.length) {
        currSpanMethod = handleSpanMethod;
    }

    if (attrs['onSortChange']) {
        currSortChange = attrs['onSortChange'] as Function
    }
    else {
        currSortChange = handleSortTable;
    }
    if (props.summaryMethod) {
        currSummaryMethod = props.summaryMethod;
        currShowSummary.value = true;
    } else if (columnSummaryData.length) {
        currSummaryMethod = handleSummaryMethod;
        currShowSummary.value = true;
    }

    if (props.headerStickyTop === true || props.headerStickyTop as number > -1) {
        setTimeout(() => {
            currHeaderStickyTop.value = lessCom.getToolHeight()
        }, 400)
    }
    setDragSortable();

    window.addEventListener("resize", function () {
        if (props.headerStickyTop === true || props.headerStickyTop as number > -1) {
            setTimeout(() => {
                currHeaderStickyTop.value = lessCom.getToolHeight()
            }, 400)
        }

    });

})
defineExpose({
    exportReadDataHtml,
    exportClientDataHtml,
    toggleRowSelection,
    initTableCheckKeys,
    initTableCheckRows,
    handleTableRowExchangeMove,
    handleTableRowMoveHere,
    handleTableSelectSortRow,
    setTableCurrentRow,
    getTableSelection,
    handleTableBodyScroll,
    editTable,
    unEditTable,
    saveTableData,
    contextMenuVisible
})

</script>
<template>
    <div class="select_container" v-if="showCheckLabelFieldname || $slots.checklabel">
        <draggable :list="tableCheckData.checkRows" :item-key="rowKey" class="leo-table-checkrows"
            @end="handleDragCheckItem">
            <template #item="{ element }">
                <el-tag :closable="true" @close="handleCloseCheckItem(element)">
                    <slot name="checklabel" :check-item="element">
                        <span v-if="showCheckLabelFieldname">{{ element[showCheckLabelFieldname] }}</span>
                    </slot>
                </el-tag>
            </template>
        </draggable>
    </div>
    <component :is="isEdit?tableFormContainer:tableContainer" ref="tableForm">

        <el-table :data="tableData" :inner-wrapper-class="wrapTagID" v-loading="dataLoading" :border="true" fit
            highlight-current-row :class="!isMobile && hasBottomFixdScroll ? tagID + ' leo-table-noScroll' : tagID"
            :row-key="rowKey" ref="dataTable" :header-sticky-top="currHeaderStickyTop" :row-class-name="currRowClassName"
            :show-summary="currShowSummary" @sort-change="currSortChange" @row-contextmenu="handleRowContextMenu"
            @row-dblclick="handleTableRowDblClick" @row-click="handleTableRowClick" @select="handleTableSelect"
            @select-all="handleTableSelectAll" :span-method="currSpanMethod" :summary-method="currSummaryMethod"
            v-bind="attrs">
            <template #default>
                <slot name="default"></slot>
                <els-table-column label="操作" v-if="showEditColumn && (isShowEditColumn || dragSortable)" fixed="right"
                    width="200">
                    <template #default="{ row, $index }">
                        <el-button type="success" @click="handleRowSave(row)" v-if="row.edit && isEdit"
                            :loading="row.saveDataLoading" icon="Check">保存</el-button>
                        <el-button @click="handleRowEdit(row, $index)" icon="Edit" :type="row.edit ? 'info' : 'primary'">{{
                            row.edit ? '取消' : '编辑' }}</el-button>

                        <el-button type="info" v-if="dragSortable" class="leo-table-drag" icon="Rank"></el-button>
                    </template>
                </els-table-column>
            </template>
            <template #append>
                <slot name="append"></slot>
            </template>
            <template #empty>
                <slot name="empty"></slot>
            </template>
        </el-table>
        <el-affix position="bottom" ref="bottomAffix" :offset="20" :target="'.' + tagID"
            v-if="!isMobile && hasBottomFixdScroll && tableBodyWidth">
            <div class="leo-bottom-scroll-fixed" v-if="!dataLoading">
                <el-scrollbar ref="bottomScroll" class="leo_scollbar_container" @scroll="handleBottomFixedScroll">
                    <div :style="{ width: tableBodyWidth, height: '10px' }"></div>
                </el-scrollbar>
            </div>
        </el-affix>
    </component>
    <div class="pagination-container" style="margin-top: 10px;" v-if="isClientPage || currPageTotal > 0">
        <el-pagination background small :layout="isMobile ? mobilePageLayout : pageLayout" :page-sizes="pageSizes"
            :page-size="currPageSize" :total="currRecourdCount" :current-page="currPageIndex"
            @current-change="handleChangePage" @size-change="handleChangePageSize" v-if="hasPage">
            <el-input v-model="currPageSize" style="width:55px;margin-left:5px;" @blur="handleChangePageSize"
                placeholder="页数" v-if="isCustomPageSize && !isMobile"></el-input>
            <el-tag type="info" @click="exportDataHtml" style="margin-right:10px;cursor: pointer;margin-left:10px;"
                v-if="!isMobile">导出</el-tag>
        </el-pagination>
    </div>
    <els-menu-context ref="contentMenu"  v-if="hasContextMenu&&menuFieldname" :menus="rowData[menuFieldname]" :visible="contextMenuVisible" :positionLeft="contextMenuPositionLeft"
        :positionTop="contextMenuPositionTop"></els-menu-context>
</template>