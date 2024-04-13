<script setup lang="ts">
import { inject, ref, watch } from "vue";

import lessCom from "../../utlis/lessCom";
import "../../utlis/lessPrototype.js";
interface Props {
  item: Record<string, any>|null,
  data: Array<Record<string, any>>;
  parentItem: Record<string, any>|null,
  showBtn: boolean,
  isParallel?:false
}
const props = withDefaults(defineProps<Props>(), {
  showBtn: true
});
const visible = ref(false)
const operType=ref(0)
const configData = inject<Array<Record<string, any>>>("configData", []);
function addType(type: string, displayName: string) {

  visible.value = false;
  const approveData = {
      StepType: "When",
      Id: lessCom.generateID(),
      PId:'',
      Name: "允许",
      CancelCondition: "",
      ErrorBehavior: "",
      RetryInterval: "",
      Do: [],
      CompensateWith: [],
      Saga: false,
      NextStepId: "",
      Inputs: {
        ExpectedOutcome: "'approve'",
      },
      AuditorInputs:"",
      Outputs: {},
      SelectNextStep: {},
    }
    const denyData = {
      StepType: "When",
      Id: lessCom.generateID(),
      PId:'',
      Name: "拒绝",
      CancelCondition: "",
      ErrorBehavior: "",
      RetryInterval: "",
      Do: [],
      CompensateWith: [],
      Saga: false,
      NextStepId: "",
      Inputs: {
        ExpectedOutcome: "'deny'",
      },
      AuditorInputs:"",
      Outputs: {},
      SelectNextStep: {},
    }
  if (type == "When") {
    if( props.item){
      props.item.data.Do = [
        [
          { id: denyData.Id, name: denyData.Name, data: denyData, children: [] },
        ],
        [
          { id: approveData.Id, name: approveData.Name, data: approveData, children: [] },
        ],
      ];
    }
    return;
  }
  const addNode:any = {
    StepType: type,
    Id: lessCom.generateID(),
    PId: props.parentItem?props.parentItem.id:'',
    Name: displayName,
    CancelCondition: "",
    ErrorBehavior: "",
    RetryInterval: "",
    Do: type=='UserTask'?[
        [
          { id: approveData.Id, name: approveData.Name, data: approveData, children: [] },
        ],
        [
          { id: denyData.Id, name: denyData.Name, data: denyData, children: [] },
        ],
      ]:[],
    CompensateWith: [],
    Saga: false,
    NextStepId: "",
    AuditorInputs:"",
    Inputs: {},
    Outputs: {},
    SelectNextStep: {},
  };

  if(props.item&&props.item.data.StepType=='When'){

      if(props.item.data.Do.length===0){
        props.item.data.Do.push([{ id: addNode.Id, name: addNode.Name, data: addNode, children: [] }])

      }
    else{
      const currNodeChildren=lessCom.cloneObj(props.item.data.Do[0]);
      currNodeChildren.forEach(ele=>{
          ele.data.PId=addNode.Id
        })
    props.item.data.Do=[[{ id: addNode.Id, name: addNode.Name, data: addNode, children: currNodeChildren}]]

    }

  }else{
    if(props.data.length==0){
      props.data.push({ id: addNode.Id, name: addNode.Name, data: addNode, children: [] })
    }else if(operType.value==0){
      if(props.parentItem){
        const currNodeChildren=lessCom.cloneObj(props.parentItem.children);
        currNodeChildren.forEach(ele=>{
          ele.data.PId=addNode.Id
        })
        props.parentItem.children=[{ id: addNode.Id, name: addNode.Name, data: addNode, children: currNodeChildren }]
      }else{
          const currNodeChildren=lessCom.cloneObj(props.data);
          currNodeChildren.forEach(ele=>{
            ele.data.PId=addNode.Id
          })
          props.data[0].id=addNode.Id;
          props.data[0].name=addNode.Name;
          props.data[0].data=addNode;
          props.data[0].children=currNodeChildren;
        
      }

    }else {
      props.data.push({ id: addNode.Id, name: addNode.Name, data: addNode, children: [] })
    
    }
  }
}
</script>
<template>
  <div class="add-node-btn-box">  
    <div class="add-node-btn">
      <el-popover placement="right-start" v-model="visible" width="auto" v-if="showBtn">
        <div class="add-node-popover-body">
          <els-radio-button v-model="operType" v-if="props.parentItem&&props.data.length>0" style="margin-bottom: 15px;">
            <els-option :value="0">添加步骤</els-option>
            <els-option :value="1">并行步骤</els-option>
          </els-radio-button>
          <el-row>
            <template v-for="citem in configData">
              <el-col :span="4"
                v-if="citem.Name != 'When'">
                <a class="add-node-popover-item" @click="addType(citem.Name, citem.DisplayName)">
                  <div class="item-wrapper">
                    <el-icon v-if="citem.Icon">
                      <component :is="citem.Icon"></component>
                    </el-icon>
                  </div>
                  <p>{{ citem.DisplayName }}</p>
                </a>
              </el-col>
            </template>
          </el-row>
        </div>
        <template #reference>
          <span class="btn">
            <el-icon style="color: #fff">
              <Plus />
            </el-icon>
          </span>
        </template>
      </el-popover>
    </div>
  </div>
</template>
<style scoped lang="less">
.add-node-btn-box {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    margin: auto;
    width: 2px;
    height: 100%;
    background-color: #cacaca;
  }

  .add-node-btn {
    user-select: none;
    padding: 20px 0 32px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    flex-shrink: 0;
    -webkit-box-flex: 1;
    flex-grow: 1;

    .btn {
      z-index: 100;
      display: flex;
      justify-content: center;
      align-items: center;
      outline: none;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      width: 30px;
      height: 30px;
      background: #3296fa;
      border-radius: 50%;
      position: relative;
      border: none;
      line-height: 30px;
      -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

      .iconfont {
        color: #fff;
        font-size: 16px;
      }

      &:hover {
        transform: scale(1.3);
        box-shadow: 0 13px 27px 0 rgba(0, 0, 0, 0.1);
      }

      &:active {
        transform: none;
        background: #1e83e9;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>
<style lang="less">
.add-node-popover-body {
  max-width: 600px;

  .add-node-popover-item {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    cursor: pointer;
    text-align: center;
    flex: 1;
    color: #191f25 !important;

    .item-wrapper {
      user-select: none;
      display: inline-block;
      width: 80px;
      height: 80px;
      margin-bottom: 5px;
      background: #fff;
      border: 1px solid #e2e2e2;
      border-radius: 50%;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      display: flex;
      align-items: center;
      justify-content: center;

      .el-icon {
        font-size: 35px;
      }
    }

    &.approver {
      .item-wrapper {
        color: #ff943e;
      }
    }

    &.notifier {
      .item-wrapper {
        color: #3296fa;
      }
    }

    &.condition {
      .item-wrapper {
        color: #15bc83;
      }
    }

    &:hover {
      .item-wrapper {
        background: #3296fa;
        box-shadow: 0 10px 20px 0 rgba(50, 150, 250, 0.4);
      }

      .iconfont {
        color: #fff;
      }
    }

    &:active {
      .item-wrapper {
        box-shadow: none;
        background: #eaeaea;
      }

      .iconfont {
        color: inherit;
      }
    }
  }
}
</style>