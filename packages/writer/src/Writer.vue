<template>
  <editor-content :editor="editor" />
  <bubble-menu :editor="editor" v-if="editor">
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>
            New Incognito Window
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Find</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Search the web</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Find...</MenubarItem>
              <MenubarItem>Find Next</MenubarItem>
              <MenubarItem>Find Previous</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>
            Always Show Full URLs
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset>
            Reload <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled inset>
            Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>
            Toggle Fullscreen
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>
            Hide Sidebar
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value="benoit">
            <MenubarRadioItem value="andy">
              Andy
            </MenubarRadioItem>
            <MenubarRadioItem value="benoit">
              Benoit
            </MenubarRadioItem>
            <MenubarRadioItem value="Luis">
              Luis
            </MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem inset>
            Edit...
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>
            Add Profile...
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
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
  import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
  } from '@/components/ui/menubar'

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