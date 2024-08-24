import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { EASING, animate } from './useAnimation'

import { useEventListener } from './useEventListener'
import { useCanvasStore } from '@/useStore/useCanvasStore.js'

export function useCanvasZoom({ target, config = { max: 2, min: 0.1, step: 0.1 } }) {
  const store = useCanvasStore()
  const { canvasBase } = storeToRefs(store)
  const containerRect = ref(null)

  onMounted(() => {
    containerRect.value = target.value.getBoundingClientRect()
  })

  useEventListener(window, 'keydown', (event) => {
    const metaKey = event.metaKey || event.ctrlKey
    if (metaKey) {
      switch (event.key) {
        case '=':
          event.preventDefault()
          zoomControl(true)
          break
        case '-':
          event.preventDefault()
          zoomControl(false)
          break
        case '0':
          event.preventDefault()
          canvasBase.value.scale = 1
          break
      }
    }
  })
  function zoomControl(isZoomIn) {
    const old = canvasBase.value.scale
    const { left, top } = containerRect.value
    const offsetX = target.value.offsetWidth / 2 - left
    const offsetY = target.value.offsetHeight / 2 - top
    const relativeX = (offsetX - canvasBase.value.x) / canvasBase.value.scale
    const relativeY = (offsetY - canvasBase.value.y) / canvasBase.value.scale

    const targetScale = isZoomIn
      ? Math.min(canvasBase.value.scale + config.step, config.max)
      : Math.max(canvasBase.value.scale - config.step, config.min)

    animate({
      startValue: old,
      endValue: targetScale,
      duration: 300,
      easingFunction: EASING.easeOutQuint,
      onUpdate: (value) => {
        canvasBase.value.scale = value
        const newRelativeX = relativeX * canvasBase.value.scale
        const newRelativeY = relativeY * canvasBase.value.scale

        canvasBase.value.x = offsetX - newRelativeX
        canvasBase.value.y = offsetY - newRelativeY
      },
    })
  }
  function zoomIn() {
    zoomControl(true)
  }
  function zoomOut() {
    zoomControl(false)
  }
  return {
    zoomIn,
    zoomOut,
  }
}
