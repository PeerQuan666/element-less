<script setup lang="ts">
import { computed, getCurrentInstance, ref, toRef } from 'vue'
import { useClipboard, useToggle } from '@vueuse/core'
import { CaretTop } from '@element-plus/icons-vue'
import Example from './demo/vp-example.vue'
import SourceCode from './demo/vp-source-code.vue'

import "prismjs/themes/prism.min.css"
const allExamples = import.meta.glob('../../examples/*/*.vue',{eager: true})

defineOptions({
  name: 'VpDemo'
})

const props = defineProps<{
  demos?: any
  source: string
  path: string
  rawSource: string
  description?: string
}>()



const vm = getCurrentInstance()!

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false,
})


const [sourceVisible, toggleSourceVisible] = useToggle()


const sourceCodeRef = ref<HTMLButtonElement>()
const formatPathDemos = computed(() => {
  const demos = {}
  Object.keys(allExamples).forEach((key) => {
    demos[key.replace('../../examples/', '').replace('.vue', '')] =
      allExamples[key].default
  })


  return demos
})

const decodedDescription = computed(() =>
  decodeURIComponent(props.description!)
)


const onSourceVisibleKeydown = (e: KeyboardEvent) => {
  if (['Enter', 'Space'].includes(e.code)) {
    e.preventDefault()
    toggleSourceVisible(false)
    sourceCodeRef.value?.focus()
  }
}

const copyCode = async () => {
  const { $message } = vm.appContext.config.globalProperties
  if (!isSupported) {
    $message.error('复制失败')
  }
  try {
    await copy()
    $message.success('复制成功')
  } catch (e: any) {
    $message.error(e.message)
  }
}
</script>

<template>
  <ClientOnly>
    <!-- danger here DO NOT USE INLINE SCRIPT TAG -->
    <p text="sm" v-html="decodedDescription" />

    <div class="example">
      <Example :file="path" :demo="formatPathDemos[path]" />

      <ElDivider class="m-0" />

      <div class="op-btns">
  
        <ElTooltip :content="'复制'" :show-arrow="false" :trigger="['hover', 'focus']" :trigger-keys="[]">
          <el-icon @click="copyCode"><CopyDocument /></el-icon>
        </ElTooltip>
        <ElTooltip :content="'源代码'" :show-arrow="false" :trigger="['hover', 'focus']" :trigger-keys="[]">
          <svg t="1698918969711" @click="toggleSourceVisible()" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4202" width="16" height="16"><path d="M322.133333 296.533333c-12.8-12.8-32-12.8-44.8 0l-192 192c-12.8 12.8-12.8 32 0 44.8l192 192c6.4 6.4 14.933333 8.533333 23.466667 8.533334s17.066667-2.133333 23.466667-8.533334c12.8-12.8 12.8-32 0-44.8L151.466667 512l168.533333-168.533333c12.8-12.8 12.8-34.133333 2.133333-46.933334zM940.8 488.533333l-192-192c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l168.533333 168.533334-168.533333 168.533333c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333l192-192c8.533333-8.533333 8.533333-29.866667-2.133333-42.666667zM622.933333 76.8c-17.066667-4.266667-34.133333 6.4-38.4 23.466667L366.933333 902.4c-4.266667 17.066667 6.4 34.133333 23.466667 38.4 2.133333 0 6.4 2.133333 8.533333 2.133333 14.933333 0 27.733333-8.533333 29.866667-23.466666L644.266667 115.2c4.266667-17.066667-4.266667-34.133333-21.333334-38.4z" fill="#666666" p-id="4203"></path></svg>
        </ElTooltip>
      </div>

      <ElCollapseTransition>
        <SourceCode v-show="sourceVisible" :source="source" />
      </ElCollapseTransition>

      <Transition name="el-fade-in-linear">
        <div v-show="sourceVisible" class="example-float-control" tabindex="0" role="button"
          @click="toggleSourceVisible(false)" @keydown="onSourceVisibleKeydown">
          <ElIcon :size="16">
            <CaretTop />
          </ElIcon>
          <span>隐藏</span>
        </div>
      </Transition>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
.example {
  border: 1px solid var(--border-color);
  border-radius: var(--el-border-radius-base);
.m-0{
  margin: 0px;
}
  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 1.5rem;

    .el-icon {
      &:hover {
        color: var(--text-color);
      }
    }

    .op-btn {
      margin: 0 0.5rem;
      cursor: pointer;
      color: var(--text-color-lighter);
      transition: 0.2s;

      &.github a {
        transition: 0.2s;
        color: var(--text-color-lighter);

        &:hover {
          color: var(--text-color);
        }
      }
    }
  }

  &-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--border-color);
    height: 44px;
    box-sizing: border-box;
    background-color: var(--bg-color, #fff);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;

    span {
      font-size: 14px;
      margin-left: 10px;
    }

    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>
