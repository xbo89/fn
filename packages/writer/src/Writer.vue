<template>
  <editor-content :editor="editor" />
  <bubble-menu :editor="editor" v-if="editor">
    <Bubble />
  </bubble-menu>


</template>
<script setup>

  import { useEditor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
  import Document from '@tiptap/extension-document'
  import Paragraph from '@tiptap/extension-paragraph'
  import Text from '@tiptap/extension-text'
  import Bubble from './Bubble.vue'

  const editor = useEditor({
    content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
    extensions: [
      Document,
      Paragraph,
      Text,
    ],
    autofocus: true,
  })
</script>

<style>
  .ProseMirror {
    outline: none;
  }
</style>