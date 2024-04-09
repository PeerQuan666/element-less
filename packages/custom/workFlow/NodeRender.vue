<script setup lang="ts">
import NodeAdd from './NodeAdd.vue'
import NodeItem from './NodeItem.vue'
import { watch, ref, inject } from 'vue'
import NodeRoot from './NodeRoot.vue'
interface Props {
    data: Array<Record<string, any>>,
    parentItem: Record<string, any> | null,
    isWhen?: boolean,

}
const props = withDefaults(defineProps<Props>(), {
    type: 'insert',
    parentId: '',
    isWhen: false
})

const emits = defineEmits(['update:data'])
watch(() => props.data, (val) => {
    val.forEach(ele=>{
        ele.name=ele.data.Name
    })

}, { deep: true })


</script>
<template>
    <template v-if="data&&data.length > 0">
        <NodeRoot :data="data" :item="data[0]" v-if="data.length < 2" :index="0" :isWhen="isWhen"
            :parentItem="parentItem"></NodeRoot>
        <div class="node-wrap" v-else>
            <div class="new_root" >
                <NodeAdd :data="data" :item="data[0]" class="add-branch box-item" :parentItem="parentItem"  />
                <template v-for="(item, index) in data" :key="index">
                    <section class="dingflow-design">
                        <NodeRoot :data="data" :item="item" :index="index" :isWhen="data.length>1?false:isWhen" :parentItem="parentItem"></NodeRoot>
                    </section>
                </template>
            </div>
        </div>
        
    </template>

</template>

<style lang="less">
.work-flow {
    .error_tip {
        position: absolute;
        top: 0px;
        right: 0px;
        transform: translate(150%, 0px);
        font-size: 24px;
    }

    .promoter_person .el-dialog__body {
        padding: 10px 20px 14px 20px;
    }

    .selected_list {
        margin-bottom: 20px;
        line-height: 30px;
    }

    .selected_list span {
        margin-right: 10px;
        padding: 3px 6px 3px 9px;
        line-height: 12px;
        white-space: nowrap;
        border-radius: 2px;
        border: 1px solid rgba(220, 220, 220, 1);
    }

    .selected_list img {
        margin-left: 5px;
        width: 7px;
        height: 7px;
        cursor: pointer;
    }
}
</style>
