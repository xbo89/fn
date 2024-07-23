<template>
  <button
    @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()"
  >
    Insert table
  </button>
  <button @click="editor.chain().setHorizontalRule().run()">
    Divider
  </button>
  <EditorContent :editor="editor" />
  <BubbleMenu v-if="editor" :editor="editor">
    <Bubble :editor="editor" />
  </BubbleMenu>
  <DragHandle v-if="editor" :editor="editor">
    <span>a</span>
  </DragHandle>

  <!-- <div
    class="clip-drag-handle fixed opacity-100 border rounded-md z-50 w-6 inline-flex items-center py-0.5 cursor-grab"
  >
    <i class="i-ri-draggable text-lg" />
  </div> -->
</template>

<script setup>
import { EditorContent, useEditor } from '@tiptap/vue-3'
import GlobalDragHandle from 'tiptap-extension-global-drag-handle'
import AutoJoiner from 'tiptap-extension-auto-joiner'
import Dropcursor from '@tiptap/extension-dropcursor'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Heading from '@tiptap/extension-heading'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import ListKeymap from '@tiptap/extension-list-keymap'
import Blockquote from '@tiptap/extension-blockquote'
import Bold from '@tiptap/extension-bold'
import Strike from '@tiptap/extension-strike'
import Text from '@tiptap/extension-text'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import Code from '@tiptap/extension-code'
import TextAlign from '@tiptap/extension-text-align'
import History from '@tiptap/extension-history'
import Placeholder from '@tiptap/extension-placeholder'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Gapcursor from '@tiptap/extension-gapcursor'
import CharacterCount from '@tiptap/extension-character-count'
import Bubble from './Bubble.vue'
import Callout from './modules/Callout/callout.js'
import CodeBlock from './modules/CodeBlock/codeblock.js'
import { BubbleMenu } from './modules/BubbleMenu/bubbleMenuComponent.js'
import SelectNodeKeymap from './modules/SelectNodeKeymap/index.js'
import Title from './modules/Title/title.js'
import Image from './modules/Image/image.js'
import {
  ExtendTable,
  ExtendTableCell,
  TableHeader,
  TableRow,
} from './modules/Table/table.js'
import { DragHandle } from '@/modules/DragHandle/dragHandleComponent.js'
import { ExtendLink } from '@/modules/Link/link.js'

// import 'simplebar-vue/dist/simplebar.min.css';
const emit = defineEmits(['onUpdate'])
const editor = useEditor({
  content: '',
  onUpdate: ({ editor }) => {
    emit('onUpdate', {
      json: editor.getJSON(),
      html: editor.getHTML(),
    })
  },
  extensions: [
    Document.extend({
      content: 'title block+',
    }),
    Placeholder.configure({
      // Use a placeholder:
      // placeholder: 'Write something …',
      // Use different placeholders depending on the node type:
      emptyEditorClass: 'is-editor-empty',
      showOnlyCurrent: false,
      placeholder: ({ node }) => {
        if (node.type.name === 'title') {
          return 'Enter a title'
        }

        return 'Write something …'
      },
    }),
    Paragraph,
    Text,
    Heading,
    BulletList,
    OrderedList,
    ListItem,
    ListKeymap,
    Blockquote,
    Bold,
    Strike,
    Italic,
    Underline,
    Callout,
    History,
    TextStyle,
    Color,
    Title,
    Image,
    Gapcursor,
    CharacterCount,
    HorizontalRule,
    ExtendTable,
    ExtendTableCell,
    TableHeader,
    TableRow,
    ExtendLink,
    Highlight.configure({ multicolor: true }),
    Code.extend({
      excludes: '',
    }),
    CodeBlock,
    TextAlign.configure({
      types: ['heading', 'paragraph', 'callout'],
    }),
    SelectNodeKeymap,
    // GlobalDragHandle.configure({
    //   dragHandleWidth: 30,
    //   dragHandleSelector: '.clip-drag-handle',
    // }),
    // AutoJoiner,
    Dropcursor.configure({
      color: '#3A5BC7',
    }),
  ],
  autofocus: true,
})
</script>
