<template>
  <BubbleContainer>
    <MenuContainer placement="bottom-start">
      <BubbleToggleButton icon="i-ri-heading" hasChild />
      <template #floating>
        <MenuPopper>
          <MenuItem icon="i-ri-paragraph" @mousedown="editor.chain().focus().setParagraph().run()">Paragraph
          </MenuItem>
          <div class="h-px bg-gray-100 dark:bg-gray-700 my-1 -mx-2" />
          <MenuItem icon="i-ri-h-1" @mousedown="editor.chain().focus().toggleHeading({ level: 1 }).run()">
          Heading 01
          </MenuItem>
          <MenuItem icon="i-ri-h-2" @mousedown="editor.chain().focus().toggleHeading({ level: 2 }).run()">Heading 02
          </MenuItem>
          <MenuItem icon="i-ri-h-3" @mousedown="editor.chain().focus().toggleHeading({ level: 3 }).run()">Heading 03
          </MenuItem>
          <MenuContainer placement="right-start" :offset="0">
            <MenuItem icon="i-ri-more-2-fill" hasChild>Other headings</MenuItem>
            <template #floating>
              <MenuPopper>
                <MenuItem icon="i-ri-h-4" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()">Heading 04
                </MenuItem>
                <MenuItem icon="i-ri-h-5" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()">Heading 05
                </MenuItem>
                <MenuItem icon="i-ri-h-6" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()">Heading 06
                </MenuItem>
              </MenuPopper>
            </template>
          </MenuContainer>
          <div class="h-px bg-gray-100 dark:bg-gray-700 my-1 -mx-2" />
          <MenuItem icon="i-ri-list-ordered">Number List</MenuItem>
          <MenuItem icon="i-ri-list-unordered" @mousedown="editor.chain().focus().toggleBulletList().run()">Bulleted
          List
          </MenuItem>
          <MenuItem icon="i-ri-code-block">Code Block</MenuItem>
          <div class="h-px bg-gray-100 dark:bg-gray-700 my-1 -mx-2" />
          <MenuItem icon="i-ri-layout-bottom-2-line">Callout</MenuItem>
          <MenuItem icon="i-ri-double-quotes-l" @click="editor.chain().focus().toggleBlockquote().run()">Blockquote
          </MenuItem>
        </MenuPopper>
      </template>
    </MenuContainer>
    <MenuDivider />
    <MenuContainer placement="bottom-start">
      <BubbleToggleButton icon="i-ri-align-left" hasChild />
      <template #floating>
        <MenuPopper>
          <MenuItem icon="i-ri-align-left">Align Left</MenuItem>
          <MenuItem icon="i-ri-align-center">Align Center</MenuItem>
          <MenuItem icon="i-ri-align-right">Align Right</MenuItem>
        </MenuPopper>
      </template>
    </MenuContainer>
    <MenuDivider />
    <BubbleToggleButton icon="i-ri-bold" />
    <BubbleToggleButton icon="i-ri-strikethrough" />
    <BubbleToggleButton icon="i-ri-italic" />
    <BubbleToggleButton icon="i-ri-underline" />
    <BubbleToggleButton icon="i-ri-link" />
    <BubbleToggleButton icon="i-ri-code-view" />
    <MenuDivider />
    <MenuContainer>
      <BubbleToggleButton icon="i-ri-font-color" hasChild />
      <template #floating>
        <MenuPopper>
          <MenuItem icon="i-ri-align-left">Align Left</MenuItem>
          <MenuItem icon="i-ri-align-center">Align Center</MenuItem>
          <MenuItem icon="i-ri-align-right">Align Right</MenuItem>
        </MenuPopper>
      </template>
    </MenuContainer>
  </BubbleContainer>
</template>
<script setup>
  import { ref } from 'vue'
  import BubbleContainer from './components/BubbleContainer.vue'
  import MenuContainer from './components/MenuContainer.vue'
  import MenuItem from './components/MenuItem.vue'
  import MenuDivider from './components/MenuDivider.vue'
  import MenuPopper from './components/MenuPopper.vue'
  import BubbleToggleButton from './components/BubbleToggleButton.vue'
  defineProps({
    editor: {
      type: Object
    }
  })
</script>
<style>

</style>