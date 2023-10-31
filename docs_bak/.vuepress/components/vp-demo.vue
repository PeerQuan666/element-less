<script setup lang="ts">
import { computed, getCurrentInstance, ref, toRef } from 'vue'
import { useClipboard, useToggle } from '@vueuse/core'
import { CaretTop } from '@element-plus/icons-vue'

import Example from './demo/vp-example.vue'
import SourceCode from './demo/vp-source-code.vue'

const allExamples = import.meta.globEager('../../examples/*/*.vue')

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
          <font-awesome-icon :icon="['far','copy']" @click="copyCode" class="op-btn"/>
        </ElTooltip>
        <ElTooltip :content="'源代码'" :show-arrow="false" :trigger="['hover', 'focus']" :trigger-keys="[]">
          <font-awesome-icon icon="code"    @click="toggleSourceVisible()" class="op-btn"/>
        
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
