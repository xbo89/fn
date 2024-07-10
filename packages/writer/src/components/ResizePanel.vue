<template>
  <!--  inline-block -->
  <div ref="containerEl" contenteditable="false" :class="[resizeBorderStyle, 'relative cursor-pointer']"
    :style="{ maxWidth: resizeWidth === 0 ? '100%' : resizeWidth + 'px' }" @mouseenter="handleResizeEnter"
    @mouseleave="handleResizeLeave">
    <div :class="[
        'absolute w-2 h-12 border-1 rounded-full border border-primary-200 bg-black/80 z-10 top-1/2 -translate-y-1/2 right-3 cursor-ew-resize active:bg-black/60',
        resizeDragBarStyle
      ]" @mousedown.prevent="handleResizeDragBarDown" :style="{
        height:elementHeight<64&&elementHeight!==null?elementHeight-16+'px':'48px'
      }" />
    <div v-show="dragMask" class="absolute inset-0" />
    <slot />
  </div>
</template>
<script setup>
  import { computed, ref, watchEffect } from 'vue'
  const props = defineProps({
    width: {
      type: Number,
      default: 0
    }
  })
  const emits = defineEmits([
    'onmousedown',
    'onmouseup',
    'onmousemove'
  ])
  const dragMask = ref(false)
  const containerEl = ref(null)
  const resizeWidth = ref(props.width)
  const resizeDisplay = ref(false)
  const elementHeight = ref(null)
  // computed
  const resizeDragBarStyle = computed(() => {
    return resizeDisplay.value ? 'opacity-100' : 'opacity-0'
  })
  const resizeBorderStyle = computed(() => {
    return resizeDisplay.value
      ? 'outline-primary-100 outline outline-4 rounded'
      : ''
  })
  // event
  watchEffect(() => { resizeWidth.value = props.width })
  const handleResizeDragBarMove = (event) => {
    const { width, height, left } = containerEl.value.getBoundingClientRect()
    let newWidth = event.clientX - left + 20

    // 确保宽度不小于100
    if (newWidth < 100) {
      newWidth = 100
    }
    elementHeight.value = height
    resizeWidth.value = newWidth
    emits('onmousemove', resizeWidth.value)
  }
  const handleResizeDragBarDown = () => {
    resizeDisplay.value = true
    dragMask.value = true
    emits('onmousedown', resizeWidth.value)
    document.addEventListener('mousemove', handleResizeDragBarMove, false)
    document.addEventListener('mouseup', handleResizeDragBarUp, false)
    document.body.classList.add('cursor-ew-resize')
  }
  const handleResizeDragBarUp = (event) => {
    event.preventDefault()
    event.stopPropagation()
    resizeDisplay.value = false
    dragMask.value = false
    emits('onmouseup', resizeWidth.value)
    document.body.classList.remove('cursor-ew-resize')
    document.removeEventListener('mousemove', handleResizeDragBarMove, false)
    document.removeEventListener('mouseup', handleResizeDragBarUp, false)
  }
  const handleResizeEnter = () => {
    resizeDisplay.value = true
    document.addEventListener('mouseup', handleResizeDragBarUp, false)
  }
  const handleResizeLeave = () => {
    resizeDisplay.value = false
  }
</script>