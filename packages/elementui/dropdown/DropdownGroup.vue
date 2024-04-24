<script setup lang="ts">
import { useAttrs } from 'vue'
import { useValue } from '../../utlis/use';
defineOptions({
    name: 'ElsDropdownGroup',
    inheritAttrs:false
})

interface Props {
}

const props = withDefaults(defineProps<Props>(), {

})
const { getValue } = useValue()
const { setValue } = useValue(props)
const isMobile = getValue<boolean>('isMobile', false)
const attrs=useAttrs();
setValue({
    'type': 'dropdownGroup'
})

</script>
<template>
    <div class="els-dropdown-group" v-if="!isMobile">
        <slot></slot>
    </div>
    <van-dropdown-menu v-else v-bind="attrs">
        <slot></slot>
    </van-dropdown-menu>
</template>
<style lang="less" scoped>
.els-dropdown-group{display: flex;gap: 10px;}
</style>