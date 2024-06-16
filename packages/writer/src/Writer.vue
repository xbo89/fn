<template>
  <editor-content :editor="editor" />
  <bubble-menu :editor="editor" v-if="editor">
    <Bubble :editor="editor" />
  </bubble-menu>
  <!-- <div
    class="clip-drag-handle fixed opacity-100 border rounded-md z-50 w-6 inline-flex items-center py-0.5 cursor-grab">
    <i class="i-ri-draggable text-lg"></i>
  </div> -->
</template>
<script setup>

  import { useEditor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
  // import GlobalDragHandle from 'tiptap-extension-global-drag-handle'
  // import AutoJoiner from 'tiptap-extension-auto-joiner'
  import Dropcursor from '@tiptap/extension-dropcursor'
  import Document from '@tiptap/extension-document'
  import Paragraph from '@tiptap/extension-paragraph'
  import Heading from '@tiptap/extension-heading'
  import BulletList from '@tiptap/extension-bullet-list'
  import ListItem from '@tiptap/extension-list-item'
  import Blockquote from '@tiptap/extension-blockquote'
  import Text from '@tiptap/extension-text'
  import Bubble from './Bubble.vue'

  const editor = useEditor({
    content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
    extensions: [
      Document,
      Paragraph,
      Text,
      Heading,
      BulletList,
      ListItem,
      Blockquote,
      // GlobalDragHandle.configure({
      //   dragHandleWidth: 30,
      //   dragHandleSelector: ".clip-drag-handle"
      // }),
      // AutoJoiner,
      Dropcursor.configure({
        color: '#3A5BC7',
      })
    ],
    autofocus: true,
  })
</script>

<style>
  .ProseMirror {
    outline: none;
    /* padding: 0 2px 2px 30px; */
  }
</style>