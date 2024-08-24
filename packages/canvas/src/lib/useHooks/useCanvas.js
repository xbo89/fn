import { ref } from 'vue'
import { useDownMove } from './useCanvasMove'
import { useWheelMove } from './useWheelMove'
import { useCanvasZoom } from './useCanvasZoom'

export function useCanvas() {
  const containerRef = ref(null)
  const x = ref(0)
  const y = ref(0)
  const scale = ref(1)
  const { cursor } = useDownMove({
    target: containerRef,
    callback: (deltaX, deltaY) => {
      x.value += deltaX
      y.value += deltaY
    },
  })
  useWheelMove({
    target: containerRef,
    position: { x, y },
    callback: (type, wheelX, wheelY, wheelScale) => {
      switch (type) {
        case 'zoom':
          scale.value = wheelScale
          x.value = wheelX
          y.value = wheelY
          break
        case 'pan':
          x.value += wheelX
          y.value += wheelY
          break
      }
    },
  })
  const { zoomIn, zoomOut } = useCanvasZoom({
    target: containerRef,
    position: { x, y },
    scale,
  })

  return {
    containerRef,
    x,
    y,
    scale,
    cursor,
    zoomIn,
    zoomOut,
  }
}
