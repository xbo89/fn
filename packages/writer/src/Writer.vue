<template>
  <editor-content :editor="editor" />
  <bubble-menu :editor="editor" v-if="editor">
    <UDropdown :items="items" mode="hover" :popper="{ placement: 'bottom-start' }">
      <UButton color="white" label="Options" trailing-icon="i-heroicons-chevron-down-20-solid" />
    </UDropdown>
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
  const items = [
    [{
      label: 'Profile',
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/739984?v=4'
      }
    }]
  ]
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
</style>