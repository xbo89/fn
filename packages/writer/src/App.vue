<template>
  <div class="w-full h-full grid grid-cols-3 gap-0">
    <div class="f1 p-6 pl-12">
      <Writer @on-update="onUpdate" />
    </div>
    <div class="f2 border-l border-gray-400 w-full flex flex-col overflow-scroll">
      <div class="border-b p-6 h-full whitespace-pre-wrap">
        {{ renderJSON }}
      </div>
      <div class="p-6 h-full whitespace-pre-wrap">
        {{ renderHTML }}
      </div>
    </div>
    <div class="f3 border-l border-gray-400 w-full p-6 ProseMirror" v-html="renderHTML" />
  </div>
</template>

<script setup>
import hljs from 'highlight.js'

import { ref } from 'vue'
import Writer from './Writer.vue'

const renderJSON = ref(null)
const renderHTML = ref(null)
function extractAndReplaceCodeBlocks(html) {
  // 正则表达式匹配 <pre><code>...</code></pre> 片段
  const regex = /<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/g
  // let matches
  // const codeBlocks = [];

  // 使用正则表达式匹配所有符合条件的片段
  html = html.replace(regex, (match, p1) => {
    // codeBlocks.push(p1); // 提取代码片段并存入数组
    // console.log(p1)
    const decodedCode = decodeHtmlEntities(p1.trim())
    const code = (hljs.highlightAuto(decodedCode).value)
    return `<pre><code>${code}</code></pre>` // 可以根据需求进行不同的替换处理
  })

  // return {
  //   html,
  //   codeBlocks
  // };

  return html
}
function decodeHtmlEntities(text) {
  const textArea = document.createElement('textarea')
  textArea.innerHTML = text
  return textArea.value
}
function onUpdate({ json, html }) {
  renderJSON.value = json
  // console.log('aaa')
  renderHTML.value = extractAndReplaceCodeBlocks(html)
}

// onMounted(() => {
//   hljs.highlightAll();
// })
</script>

<style>
html,
body,
#app {
  @apply antialiased w-full h-full;
}
</style>
