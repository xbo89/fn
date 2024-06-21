<template>
  <BubbleContainer>
    <MenuContainer placement="bottom-start">
      <BubbleToggleButton icon="i-ri-heading" hasChild />
      <template #floating>
        <MenuPopper>
          <MenuItem icon="i-ri-paragraph" @mousedown="editor.chain().focus().setParagraph().run()"
            :active="editor.isActive('paragraph')">Paragraph
          </MenuItem>
          <div class="h-px bg-gray-100 dark:bg-gray-700 my-1 -mx-2" />
          <MenuItem icon="i-ri-h-1" @mousedown="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :active="editor.isActive('heading', { level: 1 })">
          Heading 01
          </MenuItem>
          <MenuItem icon="i-ri-h-2" @mousedown="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :active="editor.isActive('heading', { level: 2 })">Heading 02
          </MenuItem>
          <MenuItem icon="i-ri-h-3" @mousedown="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            :active="editor.isActive('heading', { level: 3 })">Heading 03
          </MenuItem>
          <MenuContainer placement="right-start" :offset="0" :teleport="false">
            <MenuItem icon="i-ri-more-2-fill" hasChild
              :active="editor.isActive('heading', { level: 4 })||editor.isActive('heading', { level: 5 })||editor.isActive('heading', { level: 6 })">
            Other headings</MenuItem>
            <template #floating>
              <MenuPopper>
                <MenuItem icon="i-ri-h-4" @mousedown="editor.chain().focus().toggleHeading({ level: 4 }).run()"
                  :active="editor.isActive('heading', { level: 4 })">Heading 04
                </MenuItem>
                <MenuItem icon="i-ri-h-5" @mousedown="editor.chain().focus().toggleHeading({ level: 5 }).run()"
                  :active="editor.isActive('heading', { level: 5 })">Heading 05
                </MenuItem>
                <MenuItem icon="i-ri-h-6" @mousedown="editor.chain().focus().toggleHeading({ level: 6 }).run()"
                  :active="editor.isActive('heading', { level: 6 })">Heading 06
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
          <MenuItem icon="i-ri-layout-bottom-2-line" @mousedown="editor.chain().toggleCallout().run()"
            :active="editor.isActive('callout')">Callout
          </MenuItem>
          <MenuItem icon="i-ri-double-quotes-l" @mousedown="editor.chain().focus().toggleBlockquote().run()"
            :active="editor.isActive('blockquote')">Blockquote
          </MenuItem>
        </MenuPopper>
      </template>
    </MenuContainer>
    <MenuDivider />
    <MenuContainer placement="bottom-start">
      <BubbleToggleButton icon="i-ri-align-left" hasChild />
      <template #floating>
        <MenuPopper>
          <MenuItem icon="i-ri-align-left" @mousedown="editor.chain().focus().setTextAlign('left').run()"
            :active="editor.isActive({ textAlign: 'left' })">Align Left
          </MenuItem>
          <MenuItem icon="i-ri-align-center" @mousedown="editor.chain().focus().setTextAlign('center').run()"
            :active="editor.isActive({ textAlign: 'center' })">Align
          Center</MenuItem>
          <MenuItem icon="i-ri-align-right" @mousedown="editor.chain().focus().setTextAlign('right').run()"
            :active="editor.isActive({ textAlign: 'right' })">Align Right
          </MenuItem>
        </MenuPopper>
      </template>
    </MenuContainer>
    <MenuDivider />
    <div class="flex space-x-0.5">
      <BubbleToggleButton icon="i-ri-bold" @mousedown="editor.chain().focus().toggleBold().run()"
        :active="editor.isActive('bold')" />
      <BubbleToggleButton icon="i-ri-strikethrough" @mousedown="editor.chain().focus().toggleStrike().run()"
        :active="editor.isActive('strike')" />
      <BubbleToggleButton icon="i-ri-italic" @mousedown="editor.chain().focus().toggleItalic().run()"
        :active="editor.isActive('italic')" />
      <BubbleToggleButton icon="i-ri-underline" @mousedown="editor.chain().focus().toggleUnderline().run()"
        :active="editor.isActive('underline')" />
      <BubbleToggleButton icon="i-ri-link" />
      <BubbleToggleButton icon="i-ri-code-view" @mousedown="editor.chain().focus().toggleCode().run()"
        :active="editor.isActive('code')" />
    </div>
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