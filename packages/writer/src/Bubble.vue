<template>
  <LinkInputPanel v-if="linkInputDisplay" :editor="editor" />
  <BubbleContainer>
    <MenuContainer placement="bottom-start">
      <BubbleToggleButton icon="i-ri-heading" has-child />
      <template #floating>
        <MenuPopper>
          <MenuItem
            icon="i-ri-paragraph" :active="editor.isActive('paragraph')"
            @mousedown="editor.chain().focus().setParagraph().run()"
          >
            Paragraph
          </MenuItem>
          <div class="h-px bg-gray-100 dark:bg-gray-700 my-1 -mx-2" />
          <MenuItem
            icon="i-ri-h-1" :active="editor.isActive('heading', { level: 1 })"
            @mousedown="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          >
            Heading 01
          </MenuItem>
          <MenuItem
            icon="i-ri-h-2" :active="editor.isActive('heading', { level: 2 })"
            @mousedown="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          >
            Heading 02
          </MenuItem>
          <MenuItem
            icon="i-ri-h-3" :active="editor.isActive('heading', { level: 3 })"
            @mousedown="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          >
            Heading 03
          </MenuItem>
          <MenuContainer placement="right-start" :offset="0" :teleport="false">
            <MenuItem
              icon="i-ri-more-2-fill" has-child
              :active="editor.isActive('heading', { level: 4 }) || editor.isActive('heading', { level: 5 }) || editor.isActive('heading', { level: 6 })"
            >
              Other headings
            </MenuItem>
            <template #floating>
              <MenuPopper>
                <MenuItem
                  icon="i-ri-h-4" :active="editor.isActive('heading', { level: 4 })"
                  @mousedown="editor.chain().focus().toggleHeading({ level: 4 }).run()"
                >
                  Heading 04
                </MenuItem>
                <MenuItem
                  icon="i-ri-h-5" :active="editor.isActive('heading', { level: 5 })"
                  @mousedown="editor.chain().focus().toggleHeading({ level: 5 }).run()"
                >
                  Heading 05
                </MenuItem>
                <MenuItem
                  icon="i-ri-h-6" :active="editor.isActive('heading', { level: 6 })"
                  @mousedown="editor.chain().focus().toggleHeading({ level: 6 }).run()"
                >
                  Heading 06
                </MenuItem>
              </MenuPopper>
            </template>
          </MenuContainer>
          <div class="h-px bg-gray-100 dark:bg-gray-700 my-1 -mx-2" />
          <MenuItem
            icon="i-ri-list-ordered" :active="editor.isActive('orderedList')"
            @mousedown="editor.chain().focus().toggleOrderedList().run()"
          >
            Number List
          </MenuItem>
          <MenuItem
            icon="i-ri-list-unordered" :active="editor.isActive('bulletList')"
            @mousedown="editor.chain().focus().toggleBulletList().run()"
          >
            Bulleted
            List
          </MenuItem>
          <div class="h-px bg-gray-100 dark:bg-gray-700 my-1 -mx-2" />
          <MenuItem
            icon="i-ri-code-block" :active="editor.isActive('codeBlock')"
            @mousedown="editor.chain().toggleCodeBlock().run()"
          >
            Codeblock
          </MenuItem>
          <MenuItem
            icon="i-ri-layout-bottom-2-line" :active="editor.isActive('callout')"
            @mousedown="editor.chain().toggleCallout().run()"
          >
            Callout
          </MenuItem>
          <MenuItem
            v-show="editor.can().setBlockquote()" icon="i-ri-double-quotes-l"
            :active="editor.isActive('blockquote')" @mousedown="editor.chain().focus().toggleBlockquote().run()"
          >
            Blockquote
          </MenuItem>
        </MenuPopper>
      </template>
    </MenuContainer>
    <MenuDivider />
    <MenuContainer placement="bottom-start">
      <BubbleToggleButton icon="i-ri-align-left" has-child />
      <template #floating>
        <MenuPopper>
          <MenuItem
            icon="i-ri-align-left" :active="editor.isActive({ textAlign: 'left' })"
            @mousedown="editor.chain().focus().setTextAlign('left').run()"
          >
            Align Left
          </MenuItem>
          <MenuItem
            icon="i-ri-align-center" :active="editor.isActive({ textAlign: 'center' })"
            @mousedown="editor.chain().focus().setTextAlign('center').run()"
          >
            Align
            Center
          </MenuItem>
          <MenuItem
            icon="i-ri-align-right" :active="editor.isActive({ textAlign: 'right' })"
            @mousedown="editor.chain().focus().setTextAlign('right').run()"
          >
            Align Right
          </MenuItem>
        </MenuPopper>
      </template>
    </MenuContainer>
    <MenuDivider />
    <div class="flex space-x-0.5">
      <BubbleToggleButton
        icon="i-ri-bold" :active="editor.isActive('bold')"
        @mousedown="editor.chain().focus().toggleBold().run()"
      />
      <BubbleToggleButton
        icon="i-ri-strikethrough" :active="editor.isActive('strike')"
        @mousedown="editor.chain().focus().toggleStrike().run()"
      />
      <BubbleToggleButton
        icon="i-ri-italic" :active="editor.isActive('italic')"
        @mousedown="editor.chain().focus().toggleItalic().run()"
      />
      <BubbleToggleButton
        icon="i-ri-underline" :active="editor.isActive('underline')"
        @mousedown="editor.chain().focus().toggleUnderline().run()"
      />
      <BubbleToggleButton icon="i-ri-link" :active="editor.isActive('link')" @mousedown="linkInputDisplay = true" />
      <BubbleToggleButton
        icon="i-ri-code-view" :active="editor.isActive('code')"
        @mousedown="editor.chain().focus().toggleCode().run()"
      />
    </div>
    <MenuDivider />
    <MenuContainer>
      <BubbleToggleButton icon="i-ri-font-color" has-child />
      <template #floating>
        <MenuPopper>
          <BubbleColorPicker :editor="editor" />
        </MenuPopper>
      </template>
    </MenuContainer>
    <MenuDivider />
    <BubbleToggleButton icon="i-ri-sparkling-fill" has-child />
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
import BubbleColorPicker from './components/BubbleColorPicker.vue'

import LinkInputPanel from '@/components/LinkInputPanel.vue'

defineProps({
  editor: {
    type: Object,
  },
})
const linkInputDisplay = ref(false)
</script>
