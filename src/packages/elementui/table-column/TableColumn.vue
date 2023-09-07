
<script setup lang="ts">
import { ref, watch, onMounted, useAttrs, inject, onErrorCaptured,useSlots ,getCurrentInstance} from 'vue'
import { ElMessage,ElButton } from 'element-plus';
import lessCom from '../../utlis/lessCom';
import { ColumnProps } from '../../utlis/interfaceCom'


defineOptions({ name: 'ElsColumn' })
const {  proxy } = getCurrentInstance() as any
const setEditData = inject<Function>("setEditData")
const setSortData = inject<Function>("setSortData")
const setMergeRowData = inject<Function>("setMergeRowData")
const setSummaryData = inject<Function>("setSummaryData")
const handleTableSelectRow = inject<Function>("handleTableSelectRow")
const handlePowerMenu = inject<Function>("handlePowerMenu")
const rowKey = inject<any>("rowKey")
const tableCheckData = inject<any>("tableCheckData")
const provideData = inject<any>("provideData")
const slots=useSlots()
const props = withDefaults(defineProps<ColumnProps>(), {
    isExport: true,
    autoComplete: true,
    trueLabel: '是',
    falseLabel: '否',
    falseClass: 'txt-red',
    trueValue: 1,
    enumShowType: 'Description',
    enumEqualType: 'Value',
    enumNoneLabel: '未知',
    menusFieldname: 'PowerMenu',
    selectButtonLabel: '选择'

})
const attrs = useAttrs()
const currColumnKey = ref('')
const columnSortable: any = ref(false)
let columnSortMethod: any = ref()
const columnClass = ref('')
let menuFieldname=''

if(proxy&&proxy.$lessConfig?.table){
    menuFieldname=proxy.$lessConfig.table.menuFieldname

}

watch(() => props.sortable, (val) => {
    columnSortable.value = val
}, { immediate: true })

watch(() => props.isEdit, (val) => {
    if (setEditData) {
        setEditData(props.editFields??props.prop, val)
    }
}, { immediate: true })

watch(() => props.isMergeRow, (val) => {
    if (setMergeRowData) {
        setMergeRowData(props.prop, {
            isMergeRow: val,
            mergeFieldName: props.mergeFieldname ? props.mergeFieldname : props.prop,
            mergeRowByFieldName: props.mergeRowByFieldname,
            mergeMethod: props.mergeMethod,
            isMergeSumValue: props.isMergeSumValue
        })

    }

}, { immediate: true })

watch(() => props.summaryValue, (val) => {
    if (setSummaryData) {
        setSummaryData(props.prop, {
            showSummary: props.showSummary,
            summaryFieldName: props.prop,
            summaryValue: val,
            summaryMethod: props.summaryMethod
        })
    }

}, { immediate: true })

watch(() => props.showSummary, (val) => {
    if (setSummaryData) {
        setSummaryData(props.prop, {
            showSummary: val,
            summaryFieldName: props.prop,
            summaryValue: props.summaryValue,
            summaryMethod: props.summaryMethod
        })
    }
}, { immediate: true })



onErrorCaptured(() => {
    return false;
})
onMounted(() => {
    if (props.sortData) {
        let currQueryData = props.sortData;
        if (typeof (currQueryData) === 'string') {
            currQueryData = JSON.parse(currQueryData)
        }
        if (setSortData) {
            setSortData(currQueryData);

        }
    }

})

function hasPowerMenu(row) {
    if (!row.PowerMenu || !row.PowerMenu.length) { return false }
    return row.PowerMenu.some(ele => ele.MenuID === props.triggerMenuId || ele.ActionName === props.triggerActionName);

}
function handleRowPowerMenu(row) {
    if (handlePowerMenu) {
        if (props.triggerMenuId) {
            handlePowerMenu(row, props.triggerMenuId)
        } else if (props.triggerActionName) {
            handlePowerMenu(row, props.triggerActionName)
        } else {
            ElMessage.error('请设置MenuID或则ActionName')
        }
    }


}

function formatterText(val) {
    if (val === undefined) { return '' }
    let currVal = val
    if (provideData.avgDay > 0 && props.isAvgDay) {
        currVal = lessCom.getAvgDayResult(val, 2, provideData.avgDay)
    }

    if (lessCom.isNumber(currVal) && (props.isLocaleString || provideData.isLocaleString)) {
        currVal = parseFloat(currVal).toLocaleString()
    }
    if (props.dateFormatter) {
        currVal = lessCom.formatDate(val, props.dateFormatter)
    }
    return currVal

}
function getEnumKeyByValue(row) {
    if (props.enumData[props.enumEqualType] && props.enumData[props.enumShowType]) {
        const enumValue = props.enumData.find(ele => ele[props.enumEqualType] == row[props.prop ?? '']);
        if (enumValue) {
            return enumValue[props.enumShowType]
        }
        return props.enumNoneLabel

    } else {
        let keys = Object.keys(props.enumData).filter(x => props.enumData[x] == row[props.prop ?? '']);
        return keys.length > 0 ? keys[0] : null;
    }
}
function handleSelectRow(row) {
    let selectTagID = lessCom.getUrlParms("Transfer_SelectTagID");
    let isMulti = lessCom.getUrlParms("Transfer_IsMuti");
    if (handleTableSelectRow) {
        handleTableSelectRow(row)
    }
    if (isMulti.toLowerCase() == 'true') {
        return;
    }
    if (selectTagID) {
        let modalType = lessCom.getUrlParms("Power_ModalType");
        if (modalType) {
            var parent = window.parent;
            if (!parent[selectTagID]) {
                ElMessage.error('父页面接收方法不存在')
            }
            parent[selectTagID](row)
        } else {
            if (!window[selectTagID]) {
                ElMessage.error('页面接收方法不存在')
            }
            window[selectTagID](row)

        }
    }

}

currColumnKey.value = props.prop ?? '';
columnSortMethod = props.sortMethod;
if (props.columnKey) {
    currColumnKey.value = props.columnKey
}
if (props.isHb) {
    currColumnKey.value += "_HB";
}
if (props.isTb) {
    currColumnKey.value += "_TB";
}
columnClass.value = ""
if (provideData.isExport && props.isExport && props.type != 'selection' && props.type != 'select') {

    columnClass.value += "els-isexport "
}
if (attrs["class-name"]) {
    columnClass.value += attrs["class-name"]
}
columnSortable.value = props.sortable
if (columnSortable.value === true) {
    columnSortable.value = "custom"
}

const align = props.align ?? provideData.align
const headAlign = props.headerAlign ?? props.align ?? provideData.headerAlign

</script>
<template>
    <el-table-column :type="type" :prop="prop" :column-key="currColumnKey" :class-name="columnClass"
        :sortable="columnSortable" :sort-method="columnSortMethod" :align="align" :header-align="headAlign">
        <template #header="{ column, $index }" v-if="$slots['header']">
            <slot name="header" :column="column" :$index="$index">
                <span v-html="headerFormatter" v-if="headerFormatter"></span>
                <span v-else-if="tipContent">
                    {{ attrs["label"] }}
                    <el-tooltip :content="tipContent" placement="right">
                        <i class="el-icon-question"></i>
                    </el-tooltip>
                </span>
            </slot>
        </template>
        <template #default="{ row, column, $index }" v-if="type != 'selection'">
            <template v-if="isCustomEdit">
                <slot name="default" :row="row" :column="column" :$index="$index">
                    <span v-html="row[prop]" v-if="prop">
                    </span>
                </slot>
            </template>
            <template v-else-if="(!row.edit || !isEdit) && prop">
                <els-image v-if="type == 'image'" :empty-desc="urlEmptyDesc" :url="row[prop]" :is-preview="isPreview"
                    :style="imageStyle"></els-image>

                <template v-else-if="type == 'enum'">
                    {{ getEnumKeyByValue(row) }}
                </template>
                <template v-else-if="type == 'bool' && prop">
                    <span v-if="row[prop] == trueValue" :class="trueClass">{{ trueLabel }}</span>
                    <span v-else :class="falseClass">{{ falseLabel }}</span>
                </template>
                <template v-else-if="(triggerActionName || triggerMenuId) && hasPowerMenu(row)">
                    <el-link type="primary" @click="handleRowPowerMenu(row)">
                        <slot name="default" :row="row" :column="column" :$index="$index">{{ prop ? row[prop] : '' }}</slot>
                    </el-link>
                </template>
                <template v-else>
                    <slot name="default" :row="row" :column="column" :$index="$index">
                        <span v-if="isHb && prop" :class="lessCom.getCompareClass(lessCom.getHBResult(row, prop))">
                            {{ lessCom.getHBResult(row, prop) }}
                        </span>
                        <span v-else-if="isTb && prop" :class="lessCom.getCompareClass(lessCom.getTBResult(row, prop))">
                            {{ lessCom.getTBResult(row, prop) }}
                        </span>
                        <template v-else-if="(isLocaleString || isAvgDay || dateFormatter) && prop">
                            {{ formatterText(row[prop]) }}
                        </template>
                        <span v-else-if="prop" v-html="row[prop]">
                        </span>
                    </slot>
                </template>
            </template>
            <template v-else-if="(!row.edit || !isEdit)">
                <els-menu-dropdown v-if="type == 'operate'" :menus="row[menuFieldname]" :key="row" :is-fold="isFold"
                    :un-fold-count="unFoldCount" :is-mobile="attrs['is-mobile']">
                </els-menu-dropdown>

                <el-button v-else-if="type == 'select'" 
                    @click="handleSelectRow(row)" :type="tableCheckData.checkRowKeys.indexOf(row[rowKey]) > -1?'info':'primary'">{{ tableCheckData.checkRowKeys.indexOf(row[rowKey]) > -1?'取消选择':selectButtonLabel }}</el-button>
                <template v-else-if="type == 'expand'">
                    <slot name="default" :row="row" :column="column" :$index="$index"></slot>
                    <div class="el-table-tr-split" v-if="hasBottomBorder"></div>
                </template>
                <slot v-else name="default" :row="row" :column="column" :$index="$index"></slot>
            </template>
            <template v-else-if="prop">
                <slot name="edit" :row="row" :column="column" :$index="$index" v-if="false">
                </slot>
                <slot name="formitem"  :row="row" :column="column" :$index="$index">
                    <template v-if="slots.edit">
                        <template v-for="vnode in slots.edit({row:row})[0].children">
                                <component :is="()=>vnode"  v-if="!(vnode as any).type.name||(vnode as any).type.name==='ElFormItem'||(vnode as any).type?.name==='ElsFormItem'||!(vnode as any).type.props||!(vnode as any).type.props.hasFormItem||(vnode as any).props&&(vnode as any).props['hasFormItem']===false"></component>
                                <ElsFormItem 
                                :prop="`[${$index}]['${prop}']`" :key="`[${$index}]['${prop}']`"
                                :validationTrigger="(vnode as any).type.props.validationTrigger?.default" 
                                :require="require" 
                                :requireMessage="requireMessage" 
                                :validationMessage="validationMessage" 
                                :validationExpression="validationExpression"
                                :validationMethod="validationMethod"
                                v-bind="(vnode as any).props??{}"   v-else>
                                
                                    <template #default>
                                        <component :is="vnode" v-if="(vnode as any).props?.hasOwnProperty('modelValue')" ></component>
                                        <component :is="vnode" v-else-if="row"   v-model="row[prop]"></component>
                                        <component :is="vnode" v-else></component>
                                    </template>
                                </ElsFormItem>
                        </template>
                    </template>
                    <els-form-item v-else :prop="`[${$index}]['${prop}']`" :key="`[${$index}]['${prop}']`"
                        :require="require" 
                        :requireMessage="requireMessage" 
                        :validationMessage="validationMessage" 
                        :validationExpression="validationExpression"
                        :validationMethod="validationMethod"
                        :validationTrigger="validationTrigger"
                        >
                        <el-input :name="prop" 
                            clearable 
                            :placeholder="'请输入' + attrs['label']"
                            v-model="row[prop]"></el-input>
                    </els-form-item>
                </slot>
            </template>
          
        </template>
    </el-table-column>
</template>