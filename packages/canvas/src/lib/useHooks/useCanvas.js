import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useDownMove } from './useCanvasMove'
import { useWheelMove } from './useWheelMove'
import { useCanvasZoom } from './useCanvasZoom'
import { useCanvasStore } from '@/useStore/useCanvasStore.js'

export function useCanvas() {
  const store = useCanvasStore()
  const { canvasBase } = storeToRefs(store)

  const containerRef = ref(null)
  const x = ref(0)
  const y = ref(0)

  const { cursor } = useDownMove({
    target: containerRef,
    callback: (deltaX, deltaY) => {
      canvasBase.value.x += deltaX
      canvasBase.value.y += deltaY
    },
  })
  useWheelMove({
    target: containerRef,
    callback: (type, wheelX, wheelY, wheelScale) => {
      switch (type) {
        case 'zoom':
          canvasBase.value.scale = wheelScale
          canvasBase.value.x = wheelX
          canvasBase.value.y = wheelY
          break
        case 'pan':
          canvasBase.value.x += wheelX
          canvasBase.value.y += wheelY
          break
      }
    },
  })
  const { zoomIn, zoomOut } = useCanvasZoom({
    target: containerRef,
  })

  return {
    containerRef,
    x,
    y,
    scale: canvasBase.value.scale,
    cursor,
    zoomIn,
    zoomOut,
  }
}
