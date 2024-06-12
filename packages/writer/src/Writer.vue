<template>
  <editor-content :editor="editor" />
  <bubble-menu :editor="editor" :tippy-options="{ duration: 10}" v-if="editor" class="p-1 bg-white border">
    <HoverCard :openDelay="100">
      <HoverCardTrigger as-child>
        <Button variant="link">
          @vuejs
        </Button>
      </HoverCardTrigger>
      <HoverCardContent class="w-80" align="end">
        <ul>
          <li>a</li>
          <li>a</li>
          <li>a</li>
          <li>a</li>
          <li>a</li>
          <li>a</li>
          <li>a</li>
        </ul>
      </HoverCardContent>
    </HoverCard>
    <!-- <button v-tooltip="{ content: '<b>Bold</b>', html: true,hideTriggers: events => [...events, 'click'], }">aa</button> -->
    <!-- <div class="a" @mouseenter="openn=true">aaa</div>
    <div class="bb" v-show="openn">aaasss</div> -->
    <!-- <VMenu>
      <button class="p-1 bg-white border">Documentation</button>

      <template #popper>
        <button>Guide</button>
        <button>API Reference</button>
      </template>
    </VMenu> -->
  </bubble-menu>


</template>
<script setup>
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu'
  import { Button } from '@/components/ui/button'
  import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from '@/components/ui/hover-card'


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