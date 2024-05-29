<template>
  <CardContainer>
    <editor-content :editor="editor" />
  </CardContainer>
</template>

<script setup>
  import { Editor, EditorContent } from '@tiptap/vue-3'
  import StarterKit from '@tiptap/starter-kit'
  import CardContainer from './CardContainer.vue'
  import { ref } from 'vue'
  const editor = new Editor({
    content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
    extensions: [
      StarterKit,
    ]
  })
</script>