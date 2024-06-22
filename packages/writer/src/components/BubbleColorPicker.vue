<template>
  <div class="text-xs text-gray-500 mb-1">Text Color</div>
  <div class="flex space-x-1">
    <BubbleColorButton mode="empty" @select-color="clearColor" />
    <BubbleColorButton v-for="(color,index) in ColorfulBlock" :color="color.variants.light.color"
      @select-color="changeColor" :active="editor.isActive('textStyle', { color: color.variants.light.color })" />
  </div>
  <div class="text-xs text-gray-500 mt-2 mb-1">Highlight Color</div>
  <div class="flex space-x-1">
    <BubbleColorButton mode="empty" @select-color="clearHighlight" />
    <BubbleColorButton v-for="(color,index) in ColorfulBlock" :color="color.variants.light.border"
      @select-color="changeHighlight" :active="editor.isActive('highlight', { color: color.variants.light.border })" />
  </div>
</template>
<script setup>
  import BubbleColorButton from './BubbleColorButton.vue'
  import ColorfulBlock from './ColorfulBlock.js'
  const props = defineProps({
    editor: {
      type: Object
    }
  })

  const changeColor = (color) => {
    props.editor.chain().focus().setColor(color).run()
  }
  const clearColor = (color) => {
    props.editor.chain().focus().unsetColor().run()
  }
  const changeHighlight = (color) => {
    props.editor.chain().focus().toggleHighlight({ color }).run()
  }
  const clearHighlight = (color) => {
    props.editor.chain().focus().unsetHighlight().run()
  }

</script>