import { onMounted, ref } from 'vue'
import { EASING, animate } from './useAnimation'

import { useEventListener } from './useEventListener'

export function useCanvasZoom({ target, position, scale, config = { max: 2, min: 0.1, step: 0.1 } }) {
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
          scale.value = 1
          break
      }
    }
  })
  function zoomControl(isZoomIn) {
    const old = scale.value
    const { left, top } = containerRect.value
    const offsetX = target.value.offsetWidth / 2 - left
    const offsetY = target.value.offsetHeight / 2 - top
    const relativeX = (offsetX - position.x.value) / scale.value
    const relativeY = (offsetY - position.y.value) / scale.value

    const targetScale = isZoomIn
      ? Math.min(scale.value + config.step, config.max)
      : Math.max(scale.value - config.step, config.min)

    animate({
      startValue: old,
      endValue: targetScale,
      duration: 300,
      easingFunction: EASING.easeOutQuint,
      onUpdate: (value) => {
        scale.value = value
        const newRelativeX = relativeX * scale.value
        const newRelativeY = relativeY * scale.value

        position.x.value = offsetX - newRelativeX
        position.y.value = offsetY - newRelativeY
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
