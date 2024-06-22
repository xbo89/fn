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

  import { useEditor, EditorContent } from '@tiptap/vue-3'
  import GlobalDragHandle from 'tiptap-extension-global-drag-handle'
  import AutoJoiner from 'tiptap-extension-auto-joiner'
  import Dropcursor from '@tiptap/extension-dropcursor'
  import Document from '@tiptap/extension-document'
  import Paragraph from '@tiptap/extension-paragraph'
  import Heading from '@tiptap/extension-heading'
  import BulletList from '@tiptap/extension-bullet-list'
  import ListItem from '@tiptap/extension-list-item'
  import Blockquote from '@tiptap/extension-blockquote'
  import Bold from '@tiptap/extension-bold'
  import Strike from '@tiptap/extension-strike'
  import Text from '@tiptap/extension-text'
  import Italic from '@tiptap/extension-italic'
  import Underline from '@tiptap/extension-underline'
  import Code from '@tiptap/extension-code'
  import Bubble from './Bubble.vue'
  import TextAlign from '@tiptap/extension-text-align'
  import History from '@tiptap/extension-history'
  import Callout from './modules/Callout/callout.js'

  import { BubbleMenu } from './modules/BubbleMenu/bubbleMenuComponent.js'

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
      Bold,
      Strike,
      Italic,
      Underline,
      Callout,
      History,
      Code.extend({
        excludes: ''
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'callout'],
      }),
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