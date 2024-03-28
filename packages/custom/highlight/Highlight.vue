<script setup lang="ts">
import { ref, onMounted } from "vue";
import prism from 'prismjs'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-typescript'
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/plugins/toolbar/prism-toolbar.js'
import 'prismjs/plugins/toolbar/prism-toolbar.css'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js'
defineOptions({
    name: 'ElsHighlight',
    inheritAttrs: false
})

interface Props {
    language?: string,
    lineNumber?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    language: 'javascript'
})
const highlight = ref()
const currClass: any = ref(['language-' + props.language])
if (props.lineNumber) {
    currClass.push('line-numbers')
}
onMounted(() => {
    prism.highlightElement(highlight.value)
})

</script>
<template >
    <pre class="els-highlight" :class="currClass">
        <code   data-prismjs-copy="复制代码" data-prismjs-copy-success="复制成功"  ref="highlight" ><slot></slot></code>
    </pre>
</template>
