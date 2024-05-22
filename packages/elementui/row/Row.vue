<script setup lang="ts">
import { ref,computed,provide } from 'vue'
import { useValue } from '../../utlis/use';
import { useNamespace,rowContextKey } from 'element-plus'
import { lessCom } from '../../utlis/com';
defineOptions({
    name: 'ElsRow',
})
interface Props{
    justify?:string,
    align?:string,
    gutter?:number,
    tag?:string,
}
const props=withDefaults(defineProps<Props>(),{
    tag:'div',
    gutter:0,
    justify:'start',
    align:'top'
})
const colData = ref<any>([])
const spanCount = ref(24)
const {setValue}=useValue()
const ns = useNamespace('row')

function setSpan(id, span) {
    if(colData.value.find(ele=>ele.id==id)){
        removeSpan(id)
    }
    colData.value.push({ 'id': id, 'span': span })
}
function removeSpan(id) {
    colData.value.splice(colData.value.findIndex(ele => ele.id == id), 1)
}

function getSpan() {
    const autoSpan = colData.value.filter(ele => !ele.span).length  
    if (autoSpan)
        return (spanCount.value -lessCom.sumArray(colData.value.filter(ele => ele.span).map(ele=>ele.span)))/ autoSpan
}
const rowKls = computed(() => [
  ns.b(),
  ns.is(`justify-${props.justify}`, props.justify !== 'start'),
  ns.is(`align-${props.align}`, props.align !== 'top'),
])
const style = computed(() => {
  const styles:any = {}
  if (!props.gutter) {
    return styles
  }

  styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`
  return styles
})
const gutter = computed(() => props.gutter)

provide(rowContextKey, {
  gutter,
})
setValue({
    'layer':'row',
    colData,
    getSpan,
    setSpan,
    removeSpan
})
</script>
<template>
  <component :is="tag||'div'" :class="rowKls" :style="style">
    <slot />
  </component>
</template>