import { onMounted, reactive, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useEventListener } from './useEventListener'
import { useKeypress } from './useKeypress'

import { useCanvasStore } from '@/useStore/useCanvasStore.js'

export function useSelectionArea({ target }) {
  const store = useCanvasStore()
  const { selectionArea, canvasBase } = storeToRefs(store)
  const mousePosition = reactive({ x: 0, y: 0 })
  const edgeThreshold = 20
  const step = 6

  const { SPACE_KEY } = useKeypress()
  const containerRect = ref(null)
  onMounted(() => {
    containerRect.value = target.value.getBoundingClientRect()
  })
  // 鼠标+空格位移
  let selectionStartX = 0
  let selectionStartY = 0
  let selectionX = 0
  let selectionY = 0
  let timer = null

  useEventListener(target, 'mousedown', canvasSelection)
  function canvasSelection(event) {
    if (SPACE_KEY.value && event.button === 0) {
      return
    }
    mousePosition.x = event.clientX
    mousePosition.y = event.clientY
    selectionArea.value.size.w = 0
    selectionArea.value.size.h = 0

    selectionStartX = (event.clientX - canvasBase.value.x - containerRect.value.left) / canvasBase.value.scale
    selectionStartY = (event.clientY - canvasBase.value.y - containerRect.value.top) / canvasBase.value.scale
    selectionX = selectionStartX
    selectionY = selectionStartY

    animateMoveCanvas(event)
    document.onmousemove = function (event) {
      selectionArea.value.enable = true
      mousePosition.x = event.clientX
      mousePosition.y = event.clientY

      updateselection({ mx: event.clientX, my: event.clientY })
    }

    document.onmouseup = function () {
      document.onmousemove = null
      document.onmouseup = null
      selectionArea.value.enable = false
      selectionArea.value.size.w = 0
      selectionArea.value.size.h = 0
      cancelAnimationFrame(timer)
    }
  }
  watch(canvasBase, () => {
    if (!SPACE_KEY.value) {
      updateselection({ mx: mousePosition.x, my: mousePosition.y })
    }
  })

  function updateselection({ mx, my }) {
    // 更新当前鼠标位置
    selectionX = (mx - canvasBase.value.x - containerRect.value.left) / canvasBase.value.scale
    selectionY = (my - canvasBase.value.y - containerRect.value.top) / canvasBase.value.scale
    // 更新选框的尺寸和位置
    const minX = Math.min(selectionStartX, selectionX)
    const minY = Math.min(selectionStartY, selectionY)
    const width = Math.abs(selectionX - selectionStartX)
    const height = Math.abs(selectionY - selectionStartY)

    selectionArea.value.position.x = minX
    selectionArea.value.position.y = minY
    selectionArea.value.size.w = width
    selectionArea.value.size.h = height
  }
  function animateMoveCanvas(event) {
    if (mousePosition.x < edgeThreshold) {
      canvasBase.value.x += step // 向右平移画布
    }
    else if (mousePosition.x > window.innerWidth - edgeThreshold) {
      canvasBase.value.x -= step // 向左平移画布
    }
    else {
      cancelAnimationFrame(timer)
    }

    if (mousePosition.y < edgeThreshold) {
      canvasBase.value.y += step // 向下平移画布
    }
    else if (mousePosition.y > window.innerHeight - edgeThreshold) {
      canvasBase.value.y -= step // 向上平移画布
    }
    else {
      cancelAnimationFrame(timer)
    }

    timer = requestAnimationFrame(() => animateMoveCanvas(event))
  }
}

export function useNodeSelection({ target, nodes }) {
  const { SPACE_KEY } = useKeypress()
  const store = useCanvasStore()
  const { selectedNodes, selectionArea } = storeToRefs(store)
  useEventListener(target, 'mousedown', () => {
    if (!SPACE_KEY.value) {
      selectedNodes.value = []
    }
  })

  watch(selectionArea, (newVal) => {
    if (newVal.size.w !== 0 || newVal.size.h !== 0) {
      selectedNodes.value = []
      nodes.value.forEach((node, index) => {
        const nodeItemArea = {
          position: node.position,
          size: node.size,
        }
        if (node.type === 'card' && useIntersecting(selectionArea.value, nodeItemArea)) {
          selectedNodes.value.push(index)
        }

        if (node.type === 'group' && useCompletelyInside(nodeItemArea, selectionArea.value)) {
          selectedNodes.value.push(index)
        }
      })
    }
  }, { deep: true })
}
// 判断两个矩形是否相交
export function useIntersecting(selectionArea, nodeItemArea) {
  return !(
    selectionArea.position.x + selectionArea.size.w < nodeItemArea.position.x // box1 is to the left of box2
    || selectionArea.position.x > nodeItemArea.position.x + nodeItemArea.size.w // box1 is to the right of box2
    || selectionArea.position.y + selectionArea.size.h < nodeItemArea.position.y // box1 is above box2
    || selectionArea.position.y > nodeItemArea.position.y + nodeItemArea.size.h // box1 is below box2
  )
}
// 判断一个矩形是否完全在另一个矩形内
export function useCompletelyInside(nodeItemArea, selectionArea) {
  return (
    nodeItemArea.position.x >= selectionArea.position.x
    && nodeItemArea.position.x + nodeItemArea.size.w <= selectionArea.position.x + selectionArea.size.w
    && nodeItemArea.position.y >= selectionArea.position.y
    && nodeItemArea.position.y + nodeItemArea.size.h <= selectionArea.position.y + selectionArea.size.h
  )
}
