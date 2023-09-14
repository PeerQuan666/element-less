<script setup lang="ts">
import { provide, ref, getCurrentInstance } from 'vue'
defineOptions({
    name: 'ElsContainer',
})

const { proxy } = getCurrentInstance() as any


const elsPageStore = ref<any>({
    validates: [],
    queryForms: [],
    dataTables: [],
    pageRefs: proxy.refs
})
function getCurrentRefName(el) {
    for (const refName in proxy.refs) {
        if (proxy.refs[refName] && proxy.refs[refName].$el === el) {
            return refName;
        }
    }
    return '';
}
provide("getCurrentRefName",getCurrentRefName)
provide("elsPageStore", elsPageStore)

</script>
<template>
    <div class="page_container">
        <slot></slot>
    </div>
</template>