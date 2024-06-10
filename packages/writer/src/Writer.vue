<template>
  <editor-content :editor="editor" />
  <bubble-menu :editor="editor" :tippy-options="{ duration: 100 }" v-if="editor"
    class="border rounded-lg p-1 bg-white flex space-x-1">
    <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }"
      icon="ri-bold" class="icon-button">
      <i class="ri-heading text-xl"></i>
    </button>
    <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }"
      icon="ri-bold" class="icon-button">
      <i class="ri-list-unordered text-xl"></i>
    </button>
    <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }"
      icon="ri-bold" class="icon-button">
      <i class="ri-bold text-xl"></i>
    </button>
    <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }"
      icon="ri-bold" class="icon-button">
      <i class="ri-link text-xl"></i>
    </button>
    <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }"
      class="icon-button">
      <i class="ri-italic text-xl"></i>
    </button>
    <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }"
      class="icon-button">
      <i class="ri-strikethrough text-xl"></i>
    </button>
    <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }"
      class="icon-button">
      <i class="ri-underline text-xl"></i>
    </button>
    <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }"
      class="icon-button">
      <i class="ri-code-view text-xl"></i>
    </button>
  </bubble-menu>
</template>
<script setup>
  import 'remixicon/fonts/remixicon.css'
  import './style.css'
  import { useEditor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
  import Document from '@tiptap/extension-document'
  import Paragraph from '@tiptap/extension-paragraph'
  import Text from '@tiptap/extension-text'

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