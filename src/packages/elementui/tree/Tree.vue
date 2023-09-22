<script setup lang="ts">
import { ref, watch, useAttrs, onMounted } from 'vue'
import '../../utlis/lessPrototype.js'
import lessCom from '../../utlis/lessCom.js'
import { ElMessage } from 'element-plus';
import { FormItemProps } from '../../utlis/interfaceCom'
import { ValueType } from '../../utlis/enumCom'
defineOptions({ name: 'ElsTree' })
interface Props extends FormItemProps {
    modelValue?: string,
    checkStrictly?: boolean,
    expandOnClickNode?: boolean,
    labelField?: string,
    valueField?: string,
    idField?: string,
    idPathField?: string,
    parentIdField?: string,
    targetUrlField?: string,
    disabledField?: string,
    rootParentValue?: string | number,
    showSelect?: boolean,
    showCheckAll?: boolean,
    treeData?: Array<Record<string, any>>,
    url?: string,
    data?: Array<Record<string, any>>,
    expandAll?: boolean,
    expandDepth?: number,
    filterable?: boolean,
    checkWithParent?: boolean,
    unCheckWithchild?: boolean,
    load?: Function,
    isInitTriggerSelect?: boolean,
    resetValueByChangeData?: boolean,
    isOnlySelectChild?: boolean,
    lazyNoChild?: Function,
    hasNoExistOption?: boolean,
    valueSeparator?: string,
    multiple?: boolean,
    valueType?: ValueType,
}
const props = withDefaults(defineProps<Props>(), {
    checkStrictly: true,
    checkWithParent: true,
    unCheckWithchild: true,
    isInitTriggerSelect: true,
    resetValueByChangeData: true,
    labelField: 'label',
    valueField: 'value',
    parentIdField: 'parentId',
    valueSeparator: ',',
    rootParentValue: ''


})
const { $codeField, $messageField, $dataField, $success } = lessCom.getApiConfig()
const attrs = useAttrs()
const currProps = ref<any>({
    children: 'children',
    label: 'label',
    isLeaf: 'noChild',
})
if (attrs["props"]) {
    currProps.value = attrs["props"]
}
const currIdField = ref(props.idField ?? '')
if (!currIdField.value) {
    currIdField.value = props.valueField;
}
const checkAll = ref(false)
const initSelect = ref(props.isInitTriggerSelect)
const optionData = ref<any>([])
const options = ref<any>([])
const selectValue = ref<any>([])
const selectOptionData = ref<any>([])
const dataLoading = ref(false)
const expendData = ref<any>([])
const filterText = ref()
const viewData = ref<any>()
const collapseID = ref()
const expendID = ref()
const dataTree = ref()
const preSelectValue = ref()
const currMultiple = props.multiple || (attrs['show-checkbox'] === true || attrs['show-checkbox'] === '')

watch(selectValue, (val: any) => {
    handleReturnResult(val);
})


watch(filterText, (val) => {
    dataTree.value.filter(val)
})
watch(() => props.url, () => {
    if (props.resetValueByChangeData) {
        selectValue.value.length = 0
    }
    readData()
}, { immediate: true })
watch(() => props.data, (val: any) => {
    if (val && val.length) {
        if (props.resetValueByChangeData) {
            selectValue.value.length = 0
        }
        options.value.length = [];
        optionData.value = val;
        toTreeData()
    }
}, { immediate: true })

watch(() => props.modelValue, () => {
    initSelectValue();
})

const emits = defineEmits(['update:modelValue', 'update:select', 'update:select-label', 'select'])



function handleHasLazyChild(item, data = null) {
    if (attrs["lazy"] && props.lazyNoChild) {
        item.noChild = props.lazyNoChild(item, data);
    } else if (attrs["lazy"]) {
        item.noChild = item.children === undefined || item.children === null || item.children.length === 0;
    }
}
function handleLoadNode(node, resolve) {
    if (node.data.id) {
        if (props.load) {
            props.load(node).then(res => {
                if (res === false) {
                    if (node.data.children && node.data.children.length) {
                        return resolve(node.data.children);
                    } else {
                        return resolve(getChildData(node.data, node.data.depth));
                    }

                } else {
                    var childData: any = [];
                    res.filter(cele => cele[props.parentIdField] == node.data.sourceData[currIdField.value]).forEach(ele => {
                        var item: any = {
                            id: ele[currIdField.value],
                            label: ele[props.labelField],
                            sourceData: ele,
                            children: []
                        }
                        lazyDataConvertToTreeData(res, item)
                        if (item.children.length == 0) {
                            item.children = null;
                        }
                        item.noChild = item.children == null;
                        childData.push(item)

                    })

                    resolve(childData)
                }

            })

        } else {
            return resolve(getChildData(node.data, node.data.depth));
        }
    }

}
function lazyDataConvertToTreeData(childData, item) {
    childData.filter(cele => cele[props.parentIdField] == item.sourceData[currIdField.value]).forEach(ele => {
        var childitem: any = {
            id: ele[currIdField.value],
            label: ele[props.labelField],
            sourceData: ele,
            children: []
        }
        lazyDataConvertToTreeData(childData, childitem)
        if (childitem.children.length == 0) {
            childitem.children = null;
        }
        childitem.noChild = childitem.children == null;
        item.children.push(childitem)
    })
}
function getChildData(item, depth) {
    depth += 1;
    var childItems: any = [];
    optionData.value.filter(cele => cele[props.parentIdField] == item.sourceData[currIdField.value]).forEach(ele => {
        var childItem = {
            id: ele[currIdField.value],
            label: ele[props.labelField],
            sourceData: ele,
            noChild: true,
            depth: depth
        }
        handleHasLazyChild(childItem, optionData.value)
        childItems.push(childItem)

    })
    return childItems;
}
onMounted(() => {
    if (attrs["props"]) {
        currProps.value = attrs["props"]
    }
    initSelectValue();
})
function initSelectValue() {
    if (props.modelValue === '' || props.modelValue === undefined) {
        return
    }
    if (currMultiple) {
        if (props.valueType === ValueType.Number) {
            selectValue.value = props.modelValue.toString().toListNumber(props.valueSeparator)
        } else if (props.valueType === ValueType.String) {
            selectValue.value = props.modelValue.toString().toList(props.valueSeparator)
        } else if (optionData.value.length && typeof (optionData.value[0][props.valueField]) === "number") {
            selectValue.value = props.modelValue.toString().toListNumber(props.valueSeparator)
        } else if (props.modelValue) {
            selectValue.value = props.modelValue.toString().toList(props.valueSeparator)
        }
        dataTree.value.setCheckedKeys(selectValue.value);
    } else {
        if (props.valueType === ValueType.Number) {
            selectValue.value = parseFloat(props.modelValue.toString());
        }
        else if (props.valueType === ValueType.String) {
            selectValue.value = props.modelValue.toString();
        }
        else if (optionData.value.length && props.modelValue.toString().length < 12 && typeof (optionData.value[0][props.valueField]) === "number") {
            selectValue.value = parseFloat(props.modelValue.toString());
        } else {
            selectValue.value = props.modelValue;
        }
        selectOptionData.value.forEach(ele => {
            pushExpendData(ele)
            pushParentExpendData(ele)
        })
    }


}
function filterNode(value, data) {
    if (!value) return true;
    return data.label.indexOf(value) !== -1;
}
function handleCheckAllChange() {
    options.forEach(ele => {
        handleDataAllSelect(ele)
    })
    return;
}
function readData() {
    let currUrl = props.url?.replacePowerUrl() ?? '';

    return new Promise((resolve, reject) => {
        if (!props.url) {
            resolve(false)
            return
        }
        dataLoading.value = true;
        currUrl.post({}).then(res => {
            if (res[$codeField] == $success) {
                optionData.value = res[$dataField];
                options.value = [];
                toTreeData()
                initSelectValue();
            }
            else {
                ElMessage.error(res[$messageField]);
            }
            dataLoading.value = false;
            resolve(true)
        }).catch(action => {
            reject(action)
        })

    })
}
function toTreeData() {
    var groups: any = [];
    if (!props.parentIdField) {
        options.value = optionData.value.map(ele => {
            return {
                id: ele[currIdField.value],
                label: ele[props.labelField],
                children: [],
                sourceData: ele
            }
        })
        return;
    }
    var roots = optionData.value.filter(ele => ele[props.parentIdField] == props.rootParentValue).map(ele => {
        let item = {
            id: ele[currIdField.value],
            label: ele[props.labelField],
            sourceData: ele,
            noChild: true,
            children: [],
            disabled: props.disabledField ? ele[props.disabledField] : false
        }
        return item;
    })
    // 数据根据parentid分组
    for (let ele of optionData.value.filter(i => i[props.parentIdField] != props.rootParentValue)) {
        var parentid = ele[props.parentIdField];
        var parent = groups.find((x) => x.pid == parentid);
        if (!parent) {
            parent = { pid: parentid, items: [] };
            groups.push(parent);
        }
        let item = {
            id: ele[currIdField.value],
            label: ele[props.labelField],
            sourceData: ele,
            noChild: true,
            disabled: props.disabledField ? ele[props.disabledField] : false
        };
        parent.items.push(item);
    }
    searchChildData(roots, groups);
    options.value = roots;
}
function searchChildData(roots, groups, depth = 1) {
    for (let root of roots) {
        root.depth = depth;
        if (props.expandDepth && props.expandDepth >= depth) {
            if (expendData.value.indexOf(root.id) == -1) {
                expendData.value.push(root.id)
            }
        }
        for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            if (group.pid == root.id) {
                root.children = group.items;
                handleHasLazyChild(root)
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
function handleChange(data, checked) {
    if (!currMultiple) {
        return;
    }
    if (data.sourceData[props.parentIdField] != 0 && data.sourceData[props.parentIdField] != "" && checked && props.checkWithParent) {

        if (props.idPathField && data.sourceData[props.idPathField]) {
            var ids = data.sourceData[props.idPathField].split(',');
            ids.forEach(ele => {
                if (ele) {
                    dataTree.value.setChecked(ele, true)
                }
            })
        } else {
            checkParent(data.sourceData);
        }
    } else if (!checked && props.unCheckWithchild) {
        if (props.idPathField && data.sourceData[props.idPathField]) {
            unCheckChildForIDPath(data.sourceData[currIdField.value]);

        } else {
            unCheckChild(data.sourceData[currIdField.value])
        }
    }
    selectValue.value = dataTree.value.getCheckedKeys()
    if (props.valueField != currIdField.value) {
        if (optionData.value && optionData.value.length) {
            selectValue.value = optionData.value.filter(ele => selectValue.indexOf(ele[props.valueField]) > -1).map(ele => ele[currIdField.value])
        }
        if (props.hasNoExistOption && props.modelValue) {
            let noExists = props.modelValue.split(props.valueSeparator).filter(ele => optionData.value.map(cele => cele[props.valueField]).indexOf(ele) == -1)
            selectValue.value = selectValue.value.concat(noExists)
        }
    }



}
function handleComitSelect(value) {
    try {
        if (value && optionData.value.length) {
            let currValue = value.toString()
            if (currMultiple) {
                emits('select', { selectItem: selectOptionData.value, selectLabel: selectOptionData.value.map(ele => ele[props.labelField]).toString(), selectValue: currValue, preSelectValue: preSelectValue.value });
            } else {
                const selectItem = selectOptionData.value.at(0)
                let selectLabel = ''
                if (selectItem) {
                    selectLabel = selectItem[props.labelField]
                }
                emits('select', { selectItem: selectItem, selectLabel: selectLabel, selectValue: currValue, preSelectValue: preSelectValue.value });
            }
            preSelectValue.value = value;
        }
    } catch (err) {
        console.log(err)
    }
}
function handleReturnResult(value) {
    if (value === undefined) { value = []; }
    if (currMultiple) {
        emits('update:modelValue', value.join(props.valueSeparator))

    } else {
        emits('update:modelValue', value.toString())

    }
    if (attrs['onUpdate:select'] || attrs['onUpdate:select-label'] || attrs["onSelect"]) {
        if (currMultiple) {
            selectOptionData.value = optionData.value.filter(ele => value.indexOf(ele[props.valueField]) > -1)

        } else {
            selectOptionData.value = optionData.value.filter(ele => value == ele[props.valueField])

        }
        if (initSelect) {
            if (props.valueField && props.labelField) {
                if (currMultiple) {
                    emits('update:select', selectOptionData.value)
                    emits('update:select-label', selectOptionData.value.map(ele => ele[props.labelField]).toString())
                } else {
                    if (selectOptionData.value.length > 0) {
                        let currOption = selectOptionData.value[0];
                        emits('update:select', selectOptionData.value[0])
                        if (currOption) {
                            emits('update:select-label', currOption[props.labelField])
                        } else {
                            emits('update:select-label', '')
                        }
                    }
                }
            }
            handleComitSelect(value);
        }
        initSelect.value = true;
    }
}
function checkParent(data) {
    if (data[props.parentIdField]) {
        var currData = findParentData(data[props.parentIdField])
        if (currData) {
            checkParent(currData)
            dataTree.value.setChecked(currData[currIdField.value], true)
        }
    }
}
function findParentData(parentID) {
    return optionData.value.find(ele => ele[currIdField.value] == parentID)
}
function unCheckChild(parentID) {
    optionData.value.filter(ele => ele[props.parentIdField] == parentID).forEach(ele => {
        if (dataTree.value.getCheckedKeys().indexOf(ele[currIdField.value]) > -1) {
            dataTree.value.setChecked(ele[currIdField.value], false)
        }

    })
}
function unCheckChildForIDPath(parentID) {
    if (props.idPathField) {
        optionData.value.filter(ele => ele[props.idPathField ?? ''].indexOf(parentID) > -1).forEach(ele => {
            dataTree.value.setChecked(ele[currIdField.value], false)
        })
    }

}
function handleAllSelect(node) {
    var isSelect = node.isSelectAll
    if (!isSelect) {
        isSelect = true;

    } else {
        isSelect = false;
    }
    node.isSelectAll = isSelect;
    dataTree.value.setChecked(node.data.id, isSelect)
    node.childNodes.forEach(ele => {
        selectChild(ele, isSelect)
    })
}
function selectChild(node, select) {
    dataTree.value.setChecked(node.data.id, select)
    node.childNodes.forEach(ele => {
        selectChild(ele, select)
    })
}
function handleDataAllSelect(data) {
    var isSelect = data.isSelectAll
    if (!isSelect) {
        isSelect = true;

    } else {
        isSelect = false;
    }
    data.isSelectAll = isSelect;
    dataTree.value.setChecked(data.id, isSelect)
    if (data.children) {
        data.children.forEach(ele => {
            selectDataChild(ele, isSelect)
        })
    }
}
function selectDataChild(data, select) {
    dataTree.value.setChecked(data.id, select)
    if (data.children) {
        data.children.forEach(ele => {
            selectDataChild(ele, select)
        })
    }
}
function targetFrame(url) {
    if (url) {
        let currFramePage = lessCom.getUrlParms("Transfer_FramePageTagID")
        if (!currFramePage) {
            ElMessage.error("未找到Transfer_FramePageTagID")
            return
        }
        if (window.parent["elsStore"]) {
            let currFrame = window.parent["elsStore"].framePages.find(ele => ele.tagID == currFramePage);
            if (!currFrame) {
                ElMessage.error("未找到Transfer_FramePageTagID页面")
                return;
            }
            currFrame.setFramePageLoading(true)
            currFrame.setFrameViewUrl(url)
        }

    }
}
function pushParentExpendData(item) {
    if (item[currIdField.value] != item[props.parentIdField] && item[props.parentIdField]) {
        var currData = optionData.value.find((ele) => { return ele[currIdField.value] == item[props.parentIdField] })
        pushExpendData(currData[currIdField.value])
        pushParentExpendData(currData)
    }
}
function pushExpendData(val) {
    if (collapseID.value == val) { collapseID.value = ''; return; }
    if (expendID.value == val) {
        expendID.value = '';
        return
    }
    const index = expendData.value.indexOf(val)
    if (index == -1) {
        expendData.value.push(val)
    } else {
        expendData.value.splice(index, 1)
    }
}
function handleNodeExpand(data) {
    if (currMultiple) {
        return;
    }
    expendID.value = data.id
    if (expendData.value.indexOf(data.id) == -1) {
        expendData.value.push(data.id)
    }

}
function handleNodeCollapse(data) {
    if (currMultiple) {
        return;
    }
    collapseID.value = data.id
    const index = expendData.value.indexOf(data.id)
    expendData.value.splice(index, 1)
}
function handleNodeClick(data) {
    if (currMultiple) {
        return;
    }
    if (props.isOnlySelectChild && data.children) {
        return;
    }
    viewData.value = data.sourceData
    if (!data.noChild) {
        pushExpendData(data.sourceData[currIdField.value])
    }
    if (props.targetUrlField) {
        targetFrame(data.sourceData[props.targetUrlField])
    }

    selectValue.value = [data.sourceData[props.valueField]]
}



</script>

<template>
    <el-input v-if="filterable" placeholder="输入关键字进行过滤" v-model="filterText" suffix-icon="Search" clearable></el-input>
    <el-checkbox v-if="currMultiple && showCheckAll" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <el-tree ref="dataTree" v-loading="dataLoading" :load="handleLoadNode" node-key="id" :props="currProps" :data="options"
        :default-checked-keys="selectValue" @check-change="handleChange" @node-click="handleNodeClick"
        @node-expand="handleNodeExpand" @node-collapse="handleNodeCollapse" :default-expanded-keys="expendData"
        :check-strictly="checkStrictly" :expand-on-click-node="!currMultiple ? true : expandOnClickNode"
        :filter-node-method="filterNode" :show-checkbox="currMultiple" v-bind="attrs">
        <template #default="{ node, data }">
            <div @dblclick="handleAllSelect(node)" v-if="currMultiple"
                :class="!node.childNodes.length ? 'els-tree-last-node' : 'els-tree-node'">
                <slot name="default" :node="node" :data="data.sourceData">
                    {{ node.label }}
                </slot>
            </div>
            <div :class="{ 'els-tree-selected ': viewData && viewData[valueField] == data.sourceData[valueField] }" v-else>
                <span>
                    <slot name="default" :node="node" :data="data.sourceData">{{ node.label }}</slot>
                </span>
                <el-icon
                    v-if="viewData && viewData[valueField] == data.sourceData[valueField] && !currMultiple && showSelect">
                    <Check />
                </el-icon>
            </div>
        </template>
    </el-tree>
</template>
<style scoped>
.els-tree-selected {
    color: #409eff;
}
</style>
