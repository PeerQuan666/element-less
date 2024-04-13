<script setup lang="ts">
import NodeAdd from './NodeAdd.vue'
import NodeRender from './NodeRender.vue';
import '../../utlis/lessPrototype.js'
import lessCom from '../../utlis/lessCom.js'
import { DynamicHandler } from '../../utlis/lessConfig.js'
import { DynamicDataType } from '../../utlis/interfaceCom.js'
import { dynamicDataTypes } from '../../utlis/lessConfig.js'
const { $codeField, $dataField, $success } = lessCom.getApiConfig()
import {
    provide,
    ref, watch
} from "vue";
import {
    FormItemProps
} from '../../utlis/interfaceCom'
import { ElMessage } from 'element-plus';


defineOptions({
    name: "ElsWorkFlow"
})

interface Props extends FormItemProps {
    modelValue: Record<string, any> | string,
    dataTypes?: Array<DynamicDataType>,
    dynamicName: string,
    dynamicDesignerName?:string,
    url?: string,
    userUrl?:string,
    userTaskTemplateUrl?:string,
    configUrl?: string,
    isCreate?: boolean,
    showTreeData:false
}
let bgColors = ref(['87, 106, 149', '255, 148, 62', '50, 150, 250'])
const props = withDefaults(defineProps<Props>(), {
    configUrl: "/WorkflowManage/SearchAuto/StepReadData",
    userUrl: "/WorkflowManage/SearchAuto/PowerUserNameReadData",
    userTaskTemplateUrl:"/WorkflowManage/SearchAuto/UserTaskDataTemplateReadData",
    dynamicName: 'els-dynamic-render',
    isCreate: true,
    dynamicDesignerName:'els-dynamic-designer',
})
const currDynamicDataType = ref<any>([])
if (props.dataTypes) {
    currDynamicDataType.value.push(...props.dataTypes)
} else {
    currDynamicDataType.value.push(...dynamicDataTypes)
}
const emits = defineEmits(['update:modelValue'])
const dynamicHandler = new DynamicHandler(currDynamicDataType.value)
const initLoading = ref(false)
const workSetting = ref(false)

const configData = ref<Array<Record<string, any>>>([])
const formValidate=ref<boolean>(true)
let currConfig = ref<any>({})
let selectNode = ref<Record<string, any>>()
let editNode = ref<Record<string, any> | null>()
let attrDrawVisible = ref()
let workFlowData = ref<Record<string, any>>({
    "Id": "",
    "Name":"",
    "Version": 1,
    "Description": "",
    "DefaultErrorBehavior": 0,
    "DefaultErrorRetryInterval": "00:01:00",
    "Steps": [

    ]
})


if (props.modelValue) {
    if (typeof (props.modelValue) === 'string') {
        workFlowData.value = JSON.parse(props.modelValue)
    } else if (props.modelValue !== undefined && props.modelValue !== null) {
        workFlowData.value = lessCom.cloneObj(props.modelValue)
    }
}

let workFlowStepTreeData = ref<Array<Record<string, any>>>([])
workFlowStepTreeData.value = buildTree(workFlowData.value.Steps)


initLoading.value = true
if (props.configUrl) {
    props.configUrl.post({}).then(res => {
        if (res[$codeField] == $success) {
            configData.value.length = 0
            configData.value.push(...res[$dataField])
            initLoading.value = false
        }
    })
} else {
    initLoading.value = false
    ElMessage.error('请先设置节点配置')
}
watch(workFlowData, (val) => {
    if (val) {
        if (typeof (props.modelValue) === 'object') {
            emits('update:modelValue', val)
        } else {
            emits('update:modelValue', JSON.stringify(val))
        }
    }
}, { deep: true })
watch(workFlowStepTreeData, (val) => {
    workFlowData.value.Steps = flattenTree(lessCom.cloneObj(val))
}, { deep: true })



function buildTree(nodeList, parentId = '') {
    const tree: any = [];
    nodeList.forEach(node => {
        if (node.PId === parentId) {
            const currDo:any=[]
            if(node.Do.length){
                node.Do.forEach(cd=>{
                    currDo.push(buildTree(cd))
                })
            }
            node.Do=currDo
            const newNode = {
                id: node.Id,
                name: node.Name,
                data: node,
                children: buildTree(nodeList, node.Id)
            };
            tree.push(newNode);
        }
    });
    return tree;
}
function flattenTree(tree) {
    let nodeList: any = [];
    tree.forEach(node => {
        const currDo:any=[]
        if(node.data.Do.length){
            node.data.Do.forEach(cd=>{
                currDo.push(flattenTree(cd))
            })
           
        }
        node.data.Do=currDo
        nodeList.push(node.data);
        if (node.children && node.children.length > 0) {
            nodeList = nodeList.concat(flattenTree(node.children));
        }
    });
    return nodeList;
}

function getDynamicAttrContent(stepType,inputs) {
    if (inputs) {
        const nodeConfig = configData.value.find(ele => ele.Name == stepType)
    
        const currInputs=lessCom.cloneObj(inputs)
        const currContent = dynamicHandler.toKeyNameData(nodeConfig?.InputControl, currInputs)
        delete currContent.Options
        return currContent
    }
    return inputs
}
function handleVisibleAttrDraw(node) {
    attrDrawVisible.value = true
    currConfig.value = configData.value.find(ele => ele.Name == node.StepType)
    selectNode.value = node
    editNode.value = lessCom.cloneObj(selectNode.value)
}
provide('userUrl',props.userUrl)
provide('dynamicName',props.dynamicName)
provide('dynamicDesignerName',props.dynamicDesignerName)
provide("handleVisibleAttrDraw", handleVisibleAttrDraw)
provide("configData", configData)
provide("getDynamicAttrContent", getDynamicAttrContent)
provide('userTaskTemplateUrl',props.userTaskTemplateUrl)
const workFlow=ref()
const workForm=ref()
function closeWorkSetting(){
    workForm.value.validate()
}
function save(){
     return workFlow.value.validate()

}
defineExpose({
    save
})
</script>
<template>
    <els-container ref="workFlow">
    <els-json-editor v-if="showTreeData" :mainMenuBar="false" v-model="workFlowStepTreeData"  style="height: 500px;width:100%;"></els-json-editor>
    <div class="work-flow" v-loading="initLoading">
        <section class="dingflow-design" v-if="!initLoading">
            <div class="box-scale">
                <div class="node-wrap">
                    <div class="node-wrap-box start-node" :class="{'is-error':!formValidate}" @click="workSetting = true">
                        <div class="title" :style="`background: rgb(${bgColors[0]});`">
                            <span>工作流定义</span>
                        </div>
                        <div class="content">
                            <div class="text">
                                <div class="placeholder" v-if="!workFlowData.Name">请设置</div>
                                <div v-else>
                                    <el-descriptions :column="1" border>
                                        <el-descriptions-item>
                                            <template #label>
                                                <div class="cell-item">名称</div>
                                            </template>
                                            {{ workFlowData.Name }}
                                        </el-descriptions-item>
                                        <el-descriptions-item>
                                            <template #label>
                                                <div class="cell-item">版本</div>
                                            </template>
                                            {{ workFlowData.Version }}
                                        </el-descriptions-item>
                                    </el-descriptions>
                                </div>
                            </div>
                            <i class="anticon anticon-right arrow"></i>
                        </div>
                    </div>
                    <NodeAdd :data="workFlowStepTreeData" :item="null" :parentItem="null" />
                </div>
                <NodeRender :data="workFlowStepTreeData" :parentItem="null" />

            </div>
        </section>
    </div>
    <els-drawer v-model="workSetting" title="工作流设置" class="work-flow-drawer" :initBody="true" size="40%" :show-close="false" @close="closeWorkSetting">
        <els-form v-model="workFlowData" label-width="130px" v-model:isValidate="formValidate" ref="workForm">
            <els-input prop="Name"  label="名称"  required ></els-input>
            <els-input-number prop="Version" label="版本" required></els-input-number>
            <els-radio-button prop="DefaultErrorBehavior" label="出错处理">
                <els-option :value="0">重试</els-option>
                <els-option :value="1">暂停</els-option>
                <els-option :value="2">终止</els-option>
                <els-option :value="3">补偿</els-option>
            </els-radio-button>
            <els-time-picker v-if="workFlowData.ErrorBehavior === 0" label="重试间隔"
                prop="DefaultErrorRetryInterval"></els-time-picker>
            <els-textarea prop="Description" label="描述" :rows="3"></els-textarea>
        </els-form>
        <template #footer>
            <div class="demo-drawer__footer clear">
                <el-button type="primary" @click="workSetting = false">确 定</el-button>
                <el-button @click="workSetting = false">取 消</el-button>
            </div>
        </template>
    </els-drawer>
</els-container>
</template>

<style lang="less">
.work-flow-drawer {
    .el-drawer__header {
        margin-bottom: 0 !important;
        padding: 14px 0 14px 20px !important;
        border-bottom: 1px solid #f2f2f2 !important;
        color: #323232 !important;
        font-size: 16px !important;
    }
}

.work-flow {
    .right-add::before{
        content: '';
        width: 20px;
        background: #c7c7c7;
        height: 2px;
    }
    .right-add{
        position: absolute;
        right: -50px;
        width: 50px;
        height: 100%;
        display: flex;
        align-items: center;
            .btn{
                width: 30px;
                height: 30px;
                background: #3296fa;
                border-radius: 20px;
                display: flex;
                justify-content: center;
                align-items: center;       
                -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                &:hover {
                    transform: scale(1.3);
                    box-shadow: 0 13px 27px 0 rgba(0, 0, 0, 0.1);
                }
            }
            .add-node-btn-box .add-node-btn{
                padding:0 !important;
            }
    }

    .new_root>.dingflow-design>.node-root>.node-wrap>.node-wrap-box::before {
        content: unset !important;
    }

    .add-node-popover-item {
        p {
            margin-top: 5px;
            margin-bottom: 5px;
        }
    }

    .el-descriptions__label {
        .cell-item {
            max-width: 100px
        }

        .el-descriptions__content {
            min-width: 120px
        }
    }

    .fd-nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 997;
        width: 100%;
        height: 60px;
        font-size: 14px;
        color: #fff;
        background: #3296fa;
        display: flex;
        align-items: center
    }

    .fd-nav>* {
        flex: 1;
        width: 100%
    }

    .fd-nav .fd-nav-left {
        display: -webkit-box;
        display: flex;
        align-items: center
    }

    .fd-nav .fd-nav-center {
        flex: none;
        width: 600px;
        text-align: center
    }

    .fd-nav .fd-nav-right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        text-align: right
    }

    .fd-nav .fd-nav-back {
        display: inline-block;
        width: 60px;
        height: 60px;
        font-size: 22px;
        border-right: 1px solid #1583f2;
        text-align: center;
        cursor: pointer
    }

    .fd-nav .fd-nav-back:hover {
        background: #5af
    }

    .fd-nav .fd-nav-back:active {
        background: #1583f2
    }

    .fd-nav .fd-nav-back .anticon {
        line-height: 60px
    }

    .fd-nav .fd-nav-title {
        width: 0;
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 15px
    }

    .fd-nav a {
        color: #fff;
        margin-left: 12px
    }

    .fd-nav .button-publish {
        min-width: 80px;
        margin-left: 4px;
        margin-right: 15px;
        color: #3296fa;
        border-color: #fff
    }

    .fd-nav .button-publish.ant-btn:focus,
    .fd-nav .button-publish.ant-btn:hover {
        color: #3296fa;
        border-color: #fff;
        box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .3)
    }

    .fd-nav .button-publish.ant-btn:active {
        color: #3296fa;
        background: #d6eaff;
        box-shadow: none
    }

    .fd-nav .button-preview {
        min-width: 80px;
        margin-left: 16px;
        margin-right: 4px;
        color: #fff;
        border-color: #fff;
        background: transparent
    }

    .fd-nav .button-preview.ant-btn:focus,
    .fd-nav .button-preview.ant-btn:hover {
        color: #fff;
        border-color: #fff;
        background: #59acfc
    }

    .fd-nav .button-preview.ant-btn:active {
        color: #fff;
        border-color: #fff;
        background: #2186ef
    }

    .fd-nav-content {
        position: fixed;
        top: 60px;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        overflow-x: hidden;
        overflow-y: auto;
        padding-bottom: 30px
    }

    .error-modal-desc {
        font-size: 13px;
        color: rgba(25, 31, 37, .56);
        line-height: 22px;
        margin-bottom: 14px
    }

    .error-modal-list {
        height: 200px;
        overflow-y: auto;
        margin-right: -25px;
        padding-right: 25px
    }

    .error-modal-item {
        padding: 10px 20px;
        line-height: 21px;
        background: #f6f6f6;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        border-radius: 4px
    }

    .error-modal-item-label {
        flex: none;
        font-size: 15px;
        color: rgba(25, 31, 37, .56);
        padding-right: 10px
    }

    .error-modal-item-content {
        text-align: right;
        flex: 1;
        font-size: 13px;
        color: #191f25
    }

    #body.blur {
        -webkit-filter: blur(3px);
        filter: blur(3px)
    }

    .zoom {
        display: flex;
        position: fixed;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        height: 40px;
        width: 125px;
        right: 40px;
        margin-top: 30px;
        z-index: 10
    }

    .zoom .zoom-in,
    .zoom .zoom-out {
        width: 30px;
        height: 30px;
        background: #fff;
        color: #c1c1cd;
        cursor: pointer;
        background-size: 100%;
        background-repeat: no-repeat
    }

    .zoom .zoom-out {
        background-image: url(https://gw.alicdn.com/tfs/TB1s0qhBHGYBuNjy0FoXXciBFXa-90-90.png)
    }

    .zoom .zoom-out.disabled {
        opacity: .5
    }

    .zoom .zoom-in {
        background-image: url(https://gw.alicdn.com/tfs/TB1UIgJBTtYBeNjy1XdXXXXyVXa-90-90.png)
    }

    .zoom .zoom-in.disabled {
        opacity: .5
    }

    .auto-judge:hover .editable-title,
    .node-wrap-box:hover .editable-title {
        border-bottom: 1px dashed #fff
    }

    .auto-judge:hover .editable-title.editing,
    .node-wrap-box:hover .editable-title.editing {
        text-decoration: none;
        border: 1px solid #d9d9d9
    }

    .auto-judge:hover .editable-title {
        border-color: #15bc83
    }

    .editable-title {
        line-height: 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        border-bottom: 1px dashed transparent
    }

    .editable-title:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 40px
    }

    .editable-title:hover {
        border-bottom: 1px dashed #fff
    }

    .editable-title-input {
        flex: none;
        height: 18px;
        padding-left: 4px;
        text-indent: 0;
        font-size: 12px;
        line-height: 18px;
        z-index: 1
    }

    .editable-title-input:hover {
        text-decoration: none
    }

    .ant-btn {
        position: relative
    }

    .node-wrap-box {
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        position: relative;
        min-width: 220px;
        min-height: 56px;
        -ms-flex-negative: 0;
        flex-shrink: 0;
        background: #fff;
        border-radius: 4px;
        cursor: pointer
    }

    .node-wrap-box:after {
        pointer-events: none;
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        border-radius: 4px;
        border: 1px solid transparent;
        transition: all .1s cubic-bezier(.645, .045, .355, 1);
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .1)
    }

    .node-wrap-box.active:after,
    .node-wrap-box:active:after,
    .node-wrap-box:hover:after {
        border: 1px solid #3296fa;
        box-shadow: 0 0 6px 0 rgba(50, 150, 250, .3)
    }

    .node-wrap-box.active .close,
    .node-wrap-box:active .close,
    .node-wrap-box:hover .close {
        display: block
    }

    .node-wrap-box.error:after {
        border: 1px solid #f25643;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .1)
    }

    .node-wrap-box .title {
        position: relative;
        display: flex;
        align-items: center;
        padding-left: 11px;
        padding-right: 30px;
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        color: #fff;
        text-align: left;
        background: #576a95;
        border-radius: 4px 4px 0 0
    }

    .node-wrap-box .title .iconfont {
        font-size: 12px;
        margin-right: 5px
    }

    .node-wrap-box .placeholder {
        color: #bfbfbf;
        padding: 10px;
    }

    .node-wrap-box .close {
        display: none;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        font-size: 14px;
        color: #fff;
        border-radius: 50%;
        text-align: center;
        line-height: 20px
    }

    .node-wrap-box .content {
        position: relative;
        font-size: 14px;
    }

    .node-wrap-box .content .text {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical
    }

    .node-wrap-box .content .arrow {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 14px;
        font-size: 14px;
        color: #979797
    }

    .start-node.node-wrap-box .content .text {
        display: block;
        white-space: nowrap
    }

    .node-wrap-box:before {
        content: "";
        position: absolute;
        top: -12px;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        width: 0;
        height: 4px;
        border-style: solid;
        border-width: 8px 6px 4px;
        border-color: #cacaca transparent transparent;
        background: #f5f5f7
    }

    .node-wrap-box.start-node:before {
        content: none
    }

    .top-left-cover-line {
        left: -1px
    }

    .top-left-cover-line,
    .top-right-cover-line {
        position: absolute;
        height: 8px;
        width: 50%;
        background-color: #f5f5f7;
        top: -4px
    }

    .top-right-cover-line {
        right: -1px
    }

    .bottom-left-cover-line {
        left: -1px
    }

    .bottom-left-cover-line,
    .bottom-right-cover-line {
        position: absolute;
        height: 8px;
        width: 50%;
        background-color: #f5f5f7;
        bottom: -4px
    }

    .bottom-right-cover-line {
        right: -1px
    }



    .dingflow-design .box-scale {
        transform: scale(1);
        display: inline-block;
        position: relative;
        width: 100%;
        padding: 54.5px 0;
        -webkit-box-align: start;
        -ms-flex-align: start;
        align-items: flex-start;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        min-width: -webkit-min-content;
        min-width: -moz-min-content;
        min-width: min-content;
        background-color: #f5f5f7;
        transform-origin: 50% 0px 0px;
    }

    .dingflow-design .node-wrap {
        flex-direction: column;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-box-flex: 1;
        -ms-flex-positive: 1;
        position: relative
    }

    .dingflow-design .branch-wrap,
    .dingflow-design .node-wrap {
        display: inline-flex;
        width: 100%;
    }

    .dingflow-design .branch-box-wrap {
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        min-height: 270px;
        width: 100%;
        -ms-flex-negative: 0;
        flex-shrink: 0
    }

    .dingflow-design .branch-box {
        display: flex;
        overflow: visible;
        min-height: 180px;
        height: auto;
        border-bottom: 2px solid #ccc;
        border-top: 2px solid #ccc;
        position: relative;
        margin-top: 15px
    }

    .dingflow-design .branch-box .col-box {
        background: #f5f5f7
    }

    .dingflow-design .branch-box .col-box:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 0;
        margin: auto;
        width: 2px;
        height: 100%;
        background-color: #cacaca
    }

    .dingflow-design .add-branch {
        border: none;
        outline: none;
        user-select: none;
        justify-content: center;
        font-size: 12px;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        color: #3296fa;
        background: #fff;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);
        position: absolute;
        top: -16px;
        left: 50%;
        transform: translateX(-50%);
        transform-origin: center center;
        cursor: pointer;
        z-index: 1;
        display: inline-flex;
        align-items: center;
        -webkit-transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transition: all .3s cubic-bezier(.645, .045, .355, 1)
    }

    .dingflow-design .add-branch:hover {
        transform: translateX(-50%) scale(1.1);
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, .1)
    }

    .dingflow-design .add-branch:active {
        transform: translateX(-50%);
        box-shadow: none
    }

    .dingflow-design .col-box {
        display: inline-flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        -webkit-box-align: center;
        align-items: center;
        position: relative
    }

    .dingflow-design .condition-node {
        min-height: 220px
    }

    .dingflow-design .condition-node,
    .dingflow-design .condition-node-box {
        display: inline-flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        -webkit-box-flex: 1
    }

    .dingflow-design .condition-node-box {
        padding-top: 30px;
        padding-right: 50px;
        padding-left: 50px;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        flex-grow: 1;
        position: relative
    }

    .dingflow-design .condition-node-box:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 2px;
        height: 100%;
        background-color: #cacaca
    }

    .dingflow-design .auto-judge {
        position: relative;
        width: 182px;
        min-height: 49px;
        background: #fff;
        border-radius: 4px;
        padding: 14px 19px;
        cursor: pointer
    }

    .dingflow-design .auto-judge:after {
        pointer-events: none;
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        border-radius: 4px;
        border: 1px solid transparent;
        transition: all .1s cubic-bezier(.645, .045, .355, 1);
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .1)
    }

    .dingflow-design .auto-judge.active:after,
    .dingflow-design .auto-judge:active:after,
    .dingflow-design .auto-judge:hover:after {
        border: 1px solid #3296fa;
        box-shadow: 0 0 6px 0 rgba(50, 150, 250, .3)
    }

    .dingflow-design .auto-judge.active .close,
    .dingflow-design .auto-judge:active .close,
    .dingflow-design .auto-judge:hover .close {
        display: block
    }

    .dingflow-design .auto-judge.error:after {
        border: 1px solid #f25643;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .1)
    }

    .dingflow-design .auto-judge .title-wrapper {
        position: relative;
        font-size: 12px;
        color: #15bc83;
        text-align: left;
        line-height: 16px
    }

    .dingflow-design .auto-judge .title-wrapper .editable-title {
        display: inline-block;
        max-width: 120px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis
    }

    .dingflow-design .auto-judge .title-wrapper .priority-title {
        display: inline-block;
        float: right;
        margin-right: 10px;
        color: rgba(25, 31, 37, .56)
    }

    .dingflow-design .auto-judge .placeholder {
        color: #bfbfbf
    }

    .dingflow-design .auto-judge .close {
        display: none;
        position: absolute;
        right: -10px;
        top: -10px;
        width: 20px;
        height: 20px;
        font-size: 14px;
        color: rgba(0, 0, 0, .25);
        border-radius: 50%;
        text-align: center;
        line-height: 20px;
        z-index: 2
    }

    .dingflow-design .auto-judge .content {
        font-size: 14px;
        color: #191f25;
        text-align: left;
        margin-top: 6px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical
    }

    .dingflow-design .auto-judge .sort-left,
    .dingflow-design .auto-judge .sort-right {
        position: absolute;
        top: 0;
        bottom: 0;
        display: none;
        z-index: 1
    }

    .dingflow-design .auto-judge .sort-left {
        left: 0;
        border-right: 1px solid #f6f6f6
    }

    .dingflow-design .auto-judge .sort-right {
        right: 0;
        border-left: 1px solid #f6f6f6
    }

    .dingflow-design .auto-judge:hover .sort-left,
    .dingflow-design .auto-judge:hover .sort-right {
        display: flex;
        align-items: center
    }

    .dingflow-design .auto-judge .sort-left:hover,
    .dingflow-design .auto-judge .sort-right:hover {
        background: #efefef
    }

    .dingflow-design .end-node {
        border-radius: 50%;
        font-size: 14px;
        color: rgba(25, 31, 37, .4);
        text-align: left
    }

    .dingflow-design .end-node .end-node-circle {
        width: 10px;
        height: 10px;
        margin: auto;
        border-radius: 50%;
        background: #dbdcdc
    }

    .dingflow-design .end-node .end-node-text {
        margin-top: 5px;
        text-align: center
    }

    .approval-setting {
        border-radius: 2px;
        margin: 20px 0;
        position: relative;
        background: #fff
    }

    .box-item {
        background: unset !important;
        box-shadow: unset !important;

        .add-node-btn {
            padding: 0;

        }
    }

    // .no-bottom {
    //     width: 100% !important;
    // }

    // .box-no-bottom {
    //     border-bottom: unset !important;
    // }


    // .box-node::before{
    //     height: 70% !important;
    //     bottom:unset !important;
    // }
    // .box-node>.condition-node>.condition-node-box::before {
    //     height: 50% !important;
    // }
    .new_root {
        display: flex;
        gap: 20px;
        border: 2px solid #ccc;
        z-index: 10;
        background: #f5f5f7;
        padding: 20px;
        margin-bottom: 20px;
    }
    .condition-node.is-error .auto-judge::after{
        border: 1px solid #fa3232  !important;
    }
    .node-wrap-box.is-error::after{
        border: 1px solid #fa3232  !important;
    }
}
</style>
