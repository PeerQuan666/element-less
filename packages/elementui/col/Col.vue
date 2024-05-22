<script setup lang="ts">
import { ref,watch, onMounted, onUnmounted ,inject,computed} from 'vue'
import { lessCom } from '../../utlis/com'
import { useValue } from '../../utlis/use';
import { colProps,useNamespace ,rowContextKey} from 'element-plus'
import type { CSSProperties } from 'vue'
defineOptions({
    name: 'ElsCol',
})

const props = defineProps(colProps)

const {getValue,setValue}=useValue(props)
const tagID = 'els-col-' + lessCom.generateID()
const currSpan = ref(24)
const colData = getValue<any>("colData", {})
const getSpan = getValue<Function>("getSpan", () => null)
const setSpan = getValue<Function>("setSpan", () => null)
const removeSpan = getValue<Function>("removeSpan", () => null)
const col=ref()
watch(()=>props.span,(val)=>{
    if(val==24||!val){
        setSpan(tagID, 0) 

    }else{
      setSpan(tagID, val) 
    }

},{immediate:true})

watch(colData.value, () => {
    if(getSpan){
        currSpan.value = getSpan()

    }
}, { deep: true ,immediate:true})
onUnmounted(() => {
    if (removeSpan) {
        removeSpan(tagID)

    }
})


const { gutter } = inject(rowContextKey, { gutter: computed(() => 0) })
const ns = useNamespace('col')

const style = computed(() => {
  const styles: CSSProperties = {}
  if (gutter.value) {
    styles.paddingLeft = styles.paddingRight = `${gutter.value / 2}px`
  }
  return styles
})

const colKls = computed(() => {
  const classes: string[] = []
  const pos = ['span', 'offset', 'pull', 'push'] as const

  pos.forEach((prop) => {
    const size = props[prop]
    console.log(prop,size)
    if (lessCom.isNumber(size.toString())||prop==='span') {
      if (prop === 'span') classes.push(ns.b(`${size!=24&&size!=0?size:currSpan.value}`))
      else if (size > 0) classes.push(ns.b(`${prop}-${props[prop]}`))
    }
  })

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
  sizes.forEach((size) => {
    if (lessCom.isNumber(props[size].toString())) {
      classes.push(ns.b(`${size}-${props[size]}`))
    } else if (lessCom.isObject(props[size])) {
      Object.entries(props[size]).forEach(([prop, sizeProp]) => {
        classes.push(
          prop !== 'span'
            ? ns.b(`${size}-${prop}-${sizeProp}`)
            : ns.b(`${size}-${sizeProp}`)
        )
      })
    }
  })

  // this is for the fix
  if (gutter.value) {
    classes.push(ns.is('guttered'))
  }
  return [ns.b(), classes]
})

setValue({'layer':'col'})
</script>
<template>
  <component :is="tag||'div'" :class="colKls" :style="style">
    <slot />
  </component>
</template>