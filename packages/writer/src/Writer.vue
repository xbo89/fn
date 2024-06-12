<template>
  <editor-content :editor="editor" />
  <bubble-menu :editor="editor" :tippy-options="{ duration: 10,appendTo:'body' }" v-if="editor"
    class="p-8 bg-white border">
    <VMenu>
      <button class="p-8 bg-white border">Documentation</button>

      <template #popper>
        <button>Guide</button>
        <button>API Reference</button>
      </template>
    </VMenu>
  </bubble-menu>


</template>
<script setup>
  import 'remixicon/fonts/remixicon.css'
  import './style.css'
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
  const openn = ref(false)
</script>

<style>
  .ProseMirror {
    outline: none;
  }

  .v-popper__arrow-container {
    display: none;
  }
</style>