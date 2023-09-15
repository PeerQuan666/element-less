<script setup lang="ts">
defineOptions({ name: "ElsCaption"})
interface Props {
    type?: string,
}
defineProps<Props>()

</script>
<template >
   <div class="els-caption" :class="{'els-left-caption':type=='left'}" >
        <span class="els-caption-sub-header" v-if="type=='left'"><i class="dec"></i></span>
        <span>
        <slot></slot>
    </span>
    </div>
</template>

<style lang="less" scoped>


.els-caption {
    margin-bottom: 18px;
    font-weight: bold;
    border-bottom: 2px solid #dcdfe6;
    padding-bottom: 5px;
    font-size: 13px;
}


.els-left-caption {
    margin-bottom: 12px;
    font-size: 14px;
    font-weight: bold;
    line-height: 28px;
    border-bottom: none;
    padding-bottom: 0;
}
.els-left-caption .sub-header {
    display: inline-block;
}

.els-left-caption .dec {
    height: 18px;
    width: 6px;
    background-color: #3ba1df;
    margin-right: 10px;
    vertical-align: text-top;
    display:inline-block
}



</style>