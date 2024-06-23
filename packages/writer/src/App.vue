<template>
  <div class="w-full h-full flex">
    <div class="f1 w-full p-6">
      <Writer @on-update="onUpdate" />
    </div>
    <div class="f2 border-l border-gray-400 w-full flex flex-col">
      <div class="border-b p-6 h-full">{{renderJSON}}</div>
      <div class="p-6 h-full">{{renderHTML}}</div>
    </div>
    <div class="f3 border-l border-gray-400 w-full p-6 ProseMirror" v-html="renderHTML">
    </div>
  </div>
</template>
<script setup>
  import Writer from './Writer.vue'
  import hljs from 'highlight.js';

  import { ref, onMounted } from 'vue'
  const renderJSON = ref(null)
  const renderHTML = ref(null)

  const onUpdate = ({ json, html }) => {
    renderJSON.value = json
    renderHTML.value = html

  }

  onMounted(() => {
    hljs.highlightAll();
  })
</script>
<style>
  html,
  body,
  #app {
    @apply antialiased w-full h-full bg-gray-300;
  }
</style>