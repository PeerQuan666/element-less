<script setup lang="ts">
import NodeAdd from './NodeAdd.vue'
import NodeItem from './NodeItem.vue'
import NodeRender from './NodeRender.vue'
import lessCom from "../../utlis/lessCom";
import { watch,watchEffect } from 'vue'
interface Props {
    data: Array<Record<string, any>>,
    item: Record<string, any>,
    index: number,
    parentItem: Record<string, any> | null,
    isWhen: boolean

}

const props = withDefaults(defineProps<Props>(), {})
watch(() => props.item, (val) => {
    props.item.name = props.item.data.Name
}, { deep: true })

const addNode = () => {
    const currNode = {
        StepType: "When",
        Id: lessCom.generateID(),
        PId:'',
        Name: "新增条件",
        CancelCondition: "",
        ErrorBehavior: 0,
        RetryInterval: "",
        Do: [],
        CompensateWith: [],
        Saga: false,
        NextStepId: "",
        Inputs: {
            ExpectedOutcome: "'new'",
        },
        Outputs: {},
        SelectNextStep: {},
    }
    props.item.data.Do.push([{ id: currNode.Id, name: currNode.Name, data: currNode, children: [] }]);
};

watchEffect(()=>{
    if(props.item.data.Do.length > 1){
        props.item.data.Do.forEach(doItem=>{
            doItem.forEach(dcItem=>{
            for(const index in dcItem.data.Do){
                if(dcItem.data.Do[index].length==0){
                    dcItem.data.Do.splice(index,1)
                }
            }
            })
        })
        
    }
 
})

</script>
<template>
    <div class="node-root">
        <div class="node-wrap">
            <NodeItem :data="data" :item="item" :index="index" :parentItem="parentItem"></NodeItem>
            <NodeAdd :data="item.children" :item="item" :parentItem="item"  :show-btn="item.data.Do.length < 2 && item.children.length < 2" />

        </div>
        <div class="branch-wrap" v-if="item.data.Do.length > 1">
            <div class="branch-box-wrap">
                <div class="branch-box">
                    <button class="add-branch" @click="addNode()">添加条件</button>
               
                    <template v-for="(doItem, index) in item.data.Do" :key="index">
                        <div class="col-box" v-for="(dcitem, aIndex) in doItem">
                            <NodeItem :data="item.data.Do" :parentItem="item" :item="dcitem" :index="index"
                                :aindex="aIndex">
                            </NodeItem>
                            
                            <NodeRender v-if="dcitem.data.Do.length<2" :data="dcitem.data.Do[0]" :parentItem="dcitem" :isWhen="true"></NodeRender>
                            <div class="node-wrap" :style="[{'margin-bottom':dcitem.data.Do.length>1?'100px':'0px'}]" v-else>
                                <div class="new_root">
                                    
                                    <NodeAdd :data="[]" :item="dcitem" class="add-branch box-item" :parentItem="null"  />

                                    <template v-if="dcitem.data.Do.length" v-for="sitem in dcitem.data.Do">
                                        <section class="dingflow-design">
                                            <NodeRender :data="sitem" :parentItem="dcitem" ></NodeRender>
                                        </section>
                                    </template>
                                </div>
                            </div>
                            <template v-if="index == 0">
                                <div class="top-left-cover-line"></div>
                                <div class="bottom-left-cover-line"></div>
                            </template>
                            <template v-if="index == item.data.Do.length - 1">
                                <div class="top-right-cover-line"></div>
                                <div class="bottom-right-cover-line"></div>
                            </template>
                        </div>
                    </template>
                </div>
                <NodeAdd :data="item.children" :item="item" :parentItem="item" :show-btn="item.children.length < 2" />

            </div>
        </div>

        <NodeRender v-if="item.children.length" :data="item.children" :parentItem="item" :index="index"
            :isWhen="isWhen" />

        <div class="end-node" v-if="item.children.length == 0&&!isWhen">
            <div class="end-node-circle"></div>
            <div class="end-node-text">流程结束</div>
        </div>
    </div>
</template>
