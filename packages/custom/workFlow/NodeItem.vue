<script setup lang="ts">
import NodeAdd from './NodeAdd.vue'
import {
    inject,
    computed,
    ref,
    watchEffect
} from 'vue'
import lessCom from '../../utlis/lessCom.js'
import '../../utlis/lessPrototype.js'
const { $dataField } = lessCom.getApiConfig()
interface Props {
    parentItem: Record<string, any> | null,
    data: any,
    item: Record<string, any>,
    index: number,
    aindex?: number
}

const props = withDefaults(defineProps<Props>(), {})
const formValidate = ref(true)
const conditionValiddate = ref(true)
const comValidate = ref(true)
const attrDrawVisible = ref()
const selectTemplate=ref()

let bgColors = ref(['87, 106, 149', '255, 148, 62', '50, 150, 250'])
const delNode = (type) => {
    //删除当前节点，将子节点复制到父节点去
    const currChildren = lessCom.cloneObj(props.item.children)
    props.data.splice(props.index, 1);
    if (props.parentItem) {
        if (type == 'When' && props.parentItem.data.Do.length < 2) {
            props.parentItem.data.Do.length = 0;
        }
        else if (props.parentItem.data.StepType == 'When') {
            props.parentItem.data.Do[0].push(...currChildren)
        }
        else {
            if (!props.parentItem.children.length) {
                props.parentItem.children.push(...currChildren)
            }
        }

    } else {
        if (!props.data.length) {
            props.data.push(...currChildren)
        }

    }
};
const dynamicTag = ref()
const dynamicName = inject<string>("dynamicName", "")
const dynamicDesignerName= inject<string>("dynamicDesignerName", "")
const configData = inject<any>("configData", "")
const userUrl = inject<any>("userUrl", "")
const userTaskTemplateUrl=inject<any>("userTaskTemplateUrl", "")
const getDynamicAttrContent = inject<Function>('getDynamicAttrContent', () => { return '' })
const itemContent: any = ref({})
const dynamicTemplate=ref()
if(!props.item.data.AuditorInputs){
    props.item.data.AuditorInputs='';
}
watchEffect(() => {
    if (props.item.data.StepType === 'UserTask') {
        let currInputs = props.item.data.Inputs
        if (typeof (currInputs) !== 'string') {
            currInputs = lessCom.cloneObj(currInputs)
        }
        if (currInputs.AssignedPrincipal) {
            userUrl.post({ idString: currInputs.AssignedPrincipal }).then(res => {
                if (res[$dataField]) {
                    currInputs.AssignedPrincipal = res[$dataField].toString()
                    itemContent.value = getDynamicAttrContent(props.item.data.StepType, currInputs)
                }

            })
        } else {
            itemContent.value = getDynamicAttrContent(props.item.data.StepType, props.item.data.Inputs)
        }

    } else {
        itemContent.value = getDynamicAttrContent(props.item.data.StepType, props.item.data.Inputs)
    }
})

watchEffect(() => {
    if (props.item.data.StepType === 'When') {
        if (props.parentItem) {
            conditionValiddate.value = !props.parentItem.data.Do.some(ele => ele[0].id != props.item.id && ele[0].data.Inputs.ExpectedOutcome == props.item.data.Inputs.ExpectedOutcome)
        }

    } else {
        const currOptions = {};
        if (props.item.children.length) {
            props.item.children.forEach(ele => {
                currOptions[ele.id] = "'true'"
            })
        }
        if (JSON.stringify(props.item.data.SelectNextStep) != JSON.stringify(currOptions)) {
            props.item.data.SelectNextStep = currOptions
        }
    }


    if (props.item.data.Do.length) {
        const currOptions = {}
        props.item.data.Do.forEach(ele => {
            if (ele.length)
                currOptions[ele[0].name] = ele[0].data.Inputs.ExpectedOutcome?.toString().trimQuotes()
        })
        if (JSON.stringify(props.item.data.Inputs.Options) != JSON.stringify(currOptions)) {
            props.item.data.Inputs.Options = currOptions
        }
        if (JSON.stringify(props.item.data.Inputs.Options) == '{}') {
            delete props.item.data.Inputs.Options
        }
    } else {
        if (props.item.data.Inputs.Options) {
            delete props.item.data.Inputs.Options
        }
    }

})
const currConfig = computed(() => {
    return configData.value.find(ele => ele.Name == props.item.data.StepType)
})
const isValidate = computed(() => {
    return comValidate.value && formValidate.value && conditionValiddate.value
})
const itemForm = ref()
function closeAttrSetting() {
    itemForm.value.validate()
    if (dynamicTag.value.validate) {
        dynamicTag.value.validate()
    }
}
function handleSelectTemplate({selectItem}){
    dynamicTemplate.value.initData(selectItem.Control)
}
</script>
<template>

    <div class="condition-node" :class="{ 'is-error': !isValidate }" v-if="item.data.StepType == 'When'"
        @click="attrDrawVisible = true">
        <div class="condition-node-box">
            <div class="auto-judge">
                <div class="title-wrapper">
                    <span class="editable-title">{{ item.data.Name }}</span>
                    <el-icon class="anticon anticon-close close" @click.stop="delNode(item.data.StepType)">
                        <Close />
                    </el-icon>
                </div>
                <div class="content">{{
        item.data.Inputs.ExpectedOutcome ? item.data.Inputs.ExpectedOutcome.toString().trimQuotes() : '请设置'
    }}
                </div>
            </div>
            <NodeAdd :data="data" :item="item" v-if="item.data.Do.length < 2" :parentItem="null" />
        </div>
    </div>

    <div class="node-wrap-box" :class="{ 'is-error': !isValidate }" v-else @click="attrDrawVisible = true">
        <div class="title" :style="`background: rgb(${bgColors[item.data.StepType == 'UserTask' ? 1 : 2]});`">
            <span class="iconfont">
                <el-icon v-if="currConfig.Icon">
                    <component :is="currConfig.Icon" />
                </el-icon></span>
            <span class="editable-title">{{ item.data.Name }}</span>
            <el-icon class="anticon anticon-close close" @click.stop="delNode(item.data.StepType)">
                <Close />
            </el-icon>
        </div>
        <div class="content">
            <div class="text">
                <div class="placeholder" v-if="!item.data.Inputs">请设置</div>
                <div v-else>
                    <el-descriptions :column="1" border>
                        <el-descriptions-item v-for="(content, key) in itemContent">
                            <template #label>
                                <div class="cell-item">
                                    {{ key }}
                                </div>
                            </template>
                            <span v-if="content == 'json(context.Workflow.Reference).Creator'">发起人</span>
                            <span v-else>{{ content.toString().trimQuotes() }}</span>
                        </el-descriptions-item>
                    </el-descriptions>
                </div>
            </div>
            <i class="anticon anticon-right arrow"></i>
        </div>
    </div>
    <els-drawer v-model="attrDrawVisible" :title="item.data.Name" :initBody="true" class="work-flow-drawer" size="60%"
        @close="closeAttrSetting" :show-close="false" append-to-body>
        <div>
            <els-caption type="left">步骤配置</els-caption>
            <els-form v-model="item.data" label-width="120px" v-model:isValidate="formValidate" ref="itemForm">
                <els-input prop="Name" label="步骤名称" required></els-input>
                <els-input prop="CancelCondition" label="取消条件"></els-input>
                <els-radio-button prop="ErrorBehavior" label="出错处理">
                    <els-option :value="''">默认</els-option>
                    <els-option value="Retry">重试</els-option>
                    <els-option value="Suspend">暂停</els-option>
                    <els-option value="Terminate">终止</els-option>
                    <els-option value="Compensate">补偿</els-option>
                </els-radio-button>
                <els-time-picker v-if="item.data.ErrorBehavior === 'Retry'" label="重试间隔"
                    prop="RetryInterval"></els-time-picker>
                <els-caption type="left">Inputs
                    <el-tooltip placement="top">
                        <template #content>
                            <div>字符串类型需要添加前后单引号</div>
                        </template>
                        <el-icon style="margin-left:5px;cursor: pointer;"><Question-Filled /></el-icon>
                    </el-tooltip>
                </els-caption>
                <component :is="dynamicName" v-model="item.data.Inputs" ref="dynamicTag"
                    v-model:isValidate="comValidate" :config="currConfig.InputControl" :return-obj="true"></component>
                <template v-if="item.data.StepType == 'UserTask'">
                    <els-caption type="left">审批配置
                        <el-tooltip placement="top">
                            <template #content>
                                <div>用户在审批时需要输入的参数</div>
                            </template>
                            <el-icon style="margin-left:5px;cursor: pointer;"><Question-Filled /></el-icon>
                        </el-tooltip>
                    </els-caption>
                    <els-select label="选择模板" v-model="selectTemplate" :url="userTaskTemplateUrl" labelField="TemplateName" valueField="TemplateID" @select="handleSelectTemplate"></els-select>
                    <component :is="dynamicDesignerName" ref="dynamicTemplate" v-model="item.data.AuditorInputs" 
                        :visibleFields="['keyName', 'keyCode', 'dataType', 'componentType', 'required','oper','config']"></component>
                </template>

                <els-caption type="left">Outputs</els-caption>
                <els-form-item label="输出字段" v-if="currConfig.OutputFields" tip="用step.字段名取值">
                    {{ currConfig.OutputFields }}
                </els-form-item>
                <els-form-item label="输出" tip="json kv，此处定义的对象属性会添加到全局的data里">
                    <els-json-editor :mainMenuBar="false" v-model="item.data.Outputs"
                        style="height: 300px;width:100%;"></els-json-editor>
                </els-form-item>


            </els-form>
        </div>
        <template #footer>
            <div class="demo-drawer__footer clear">
                <el-button type="primary" @click="attrDrawVisible = false">确 定</el-button>
                <el-button @click="attrDrawVisible=false">取 消</el-button>
            </div>
        </template>
    </els-drawer>

</template>
