<template>
  <!--  inline-block -->
  <div ref="containerEl" contenteditable="false" :class="[resizeBorderStyle, 'relative']"
    :style="{ maxWidth: resizeWidth === 0 ? '100%' : resizeWidth + 'px' }" @mouseenter="handleResizeEnter"
    @mouseleave="handleResizeLeave">
    <div :class="[
        'absolute w-2.5 h-12 border-1 rounded-full border border-white/30 bg-black/80 z-10 top-1/2 -translate-y-1/2 right-3 cursor-ew-resize active:bg-black/60',
        resizeDragBarStyle
      ]" @mousedown.prevent="handleResizeDragBarDown" />
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
  const handleResizeDragBarUpMove = (event) => {
    resizeWidth.value =
      event.clientX - containerEl.value.getBoundingClientRect().left + 20
    emits('onmousemove', resizeWidth.value)
  }
  const handleResizeDragBarDown = () => {
    resizeDisplay.value = true
    dragMask.value = true
    emits('onmousedown', resizeWidth.value)
    document.addEventListener('mousemove', handleResizeDragBarUpMove, false)
    document.body.classList.add('cursor-ew-resize')
  }
  const handleResizeDragBarUp = (event) => {
    event.preventDefault()
    event.stopPropagation()
    resizeDisplay.value = false
    dragMask.value = false
    emits('onmouseup', resizeWidth.value)
    document.body.classList.remove('cursor-ew-resize')
    document.removeEventListener('mousemove', handleResizeDragBarUpMove, false)
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