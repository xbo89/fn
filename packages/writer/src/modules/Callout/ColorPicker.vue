<template>
  <div class="text-xs text-gray-500 mb-1">Text Color</div>
  <div class="flex space-x-1">
    <BubbleColorButton mode="empty" @select-color="changeColor" />
    <BubbleColorButton v-for="(color,index) in ColorfulBlock" :color="color.variants.light.color"
      @select-color="changeColor" />
  </div>
  <div class="text-xs text-gray-500 mt-2 mb-1">Border Color</div>
  <div class="flex space-x-1">
    <BubbleColorButton mode="empty" @select-color="clearBorder" />
    <BubbleColorButton v-for="(color,index) in ColorfulBlock" :color="color.variants.light.border"
      @select-color="changeBorder" />
  </div>
  <div class="text-xs text-gray-500 mt-2 mb-1">Background Color</div>
  <div class="flex space-x-1">
    <BubbleColorButton mode="empty" @select-color="clearBackground" />
    <BubbleColorButton v-for="(color,index) in ColorfulBlock" :color="color.variants.light.background"
      @select-color="changeBackground" />
  </div>
</template>
<script setup>
  import BubbleColorButton from '../../components/BubbleColorButton.vue'
  import ColorfulBlock from '../../components/ColorfulBlock.js'
  const props = defineProps({
    editor: {
      type: Object
    }
  })
  const emit = defineEmits([
    'changeColor',
    'clearColor',
    'changeBorder',
    'clearBorder',
    'changeBackground',
    'clearBackground'
  ])
  const changeColor = (color) => {
    emit('changeColor', color)
  }
  const clearColor = () => {
    emit('clearColor', '')
  }
  const changeBorder = (color) => {
    emit('changeBorder', color)
  }
  const clearBorder = () => {
    emit('clearBorder', '')
  }
  const changeBackground = (color) => {
    emit('changeBackground', color)
  }
  const clearBackground = () => {
    emit('clearBackground', '')
  }

</script>