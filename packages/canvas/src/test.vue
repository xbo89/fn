<template>
  <div ref="canvasRef" class="w-full h-full">
    <div class="fixed touch-none origin-top-left top-0 left-0" :style="{ transform: `translate(${containerX}px,${containerY}px) scale(${containerScale})` }">
      <div class="w-20 h-20 bg-gray-100" />
    </div>
    <svg width="100%" height="100%">
      <pattern id="grid-dot-pattern" :width="20 * containerScale" :height="20 * containerScale" patternUnits="userSpaceOnUse" :patternTransform="`translate(${containerX},${containerY})`">
        <circle :cx="containerScale" :cy="containerScale" :r=" containerScale" fill-opacity="0.2" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid-dot-pattern)" />
    </svg>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { select } from 'd3-selection'
import { zoom, zoomIdentity } from 'd3-zoom'

const canvasRef = ref(null)
const containerX = ref(0)
const containerY = ref(0)
const containerScale = ref(1)
const isPanning = ref(false)
onMounted(() => {
  const selection = select(canvasRef.value)

  const zoomBehavior = zoom()
    .scaleExtent([0.1, 2])
    .filter((event) => {
    // // Allow zooming only if the space key is pressed and the left mouse button is used
    //   console.log(event)
    //   return event.metaKey && event.type === 'wheel'
    // 只允许在按住 Command 键时使用鼠标滚轮缩放
      if (event.type === 'wheel') {
        return event.metaKey
      }
      // 只允许在按住空格键时使用鼠标左键平移
      if (event.type === 'mousedown') {
        return event.button === 0 && isPanning.value
      }
      return false
    })
    .on('zoom', (event) => {
      // selection.attr('transform', event.transform)
      // console.log(event)
      const { x, y, k } = event.transform
      containerX.value = x
      containerY.value = y
      containerScale.value = k
    })

  // document.addEventListener('wheel', (event) => {
  //   console.log('a')
  // })

  selection.call(zoomBehavior).on('zoom.filter', (event) => {
    console.log(event)
  })

  const handleKeyDown = (event) => {
    if (event.key === ' ') {
      event.preventDefault()
      isPanning.value = true
    }
  }

  const handleKeyUp = (event) => {
    if (event.key === ' ') {
      event.preventDefault()
      isPanning.value = false
    }
  }

  const handleMouseDown = (event) => {
    if (isPanning.value && event.button === 0) {
      selection.call(zoomBehavior)
    }
  }

  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)
  document.addEventListener('mousedown', handleMouseDown)
  // selection.on('wheel', (event) => {
  //   event.preventDefault()
  //   console.log(event)
  // })
})
</script>

<style>

</style>
