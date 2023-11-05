<template>
  <els-highlight><pre>
import hljs from 'highlight.js'
const lang = hljs.getLanguage('js') ? 'js' : 'plaintext';
hljs.highlight(str, { lang }).value;</pre>
  </els-highlight>
</template>