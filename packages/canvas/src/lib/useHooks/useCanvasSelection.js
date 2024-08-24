import { onMounted, reactive, ref, watch } from 'vue'
import { useEventListener } from './useEventListener'
import { useKeypress } from './useKeypress'

const selection = reactive({
  display: false,
  x: 0,
  y: 0,
  w: 0,
  h: 0,
})
export function useCanvasSelection({ target, position, scale }) {
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
    if (SPACE_KEY.value || event.button !== 0) {
      return
    }
    mousePosition.x = event.clientX
    mousePosition.y = event.clientY
    selection.w = 0
    selection.h = 0

    selectionStartX = (event.clientX - position.x.value - containerRect.value.left) / scale.value
    selectionStartY = (event.clientY - position.y.value - containerRect.value.top) / scale.value
    selectionX = selectionStartX
    selectionY = selectionStartY

    animateMoveCanvas(event)
    document.onmousemove = function (event) {
      selection.display = true
      mousePosition.x = event.clientX
      mousePosition.y = event.clientY
      updateselection({ mx: event.clientX, my: event.clientY })
    }

    document.onmouseup = function () {
      document.onmousemove = null
      document.onmouseup = null
      selection.display = false
      selection.w = 0
      selection.h = 0
      cancelAnimationFrame(timer)
    }
  }
  watch([position.x, position.y], () => {
    updateselection({ mx: mousePosition.x, my: mousePosition.y })
  })

  function updateselection({ mx, my }) {
    // 更新当前鼠标位置
    selectionX = (mx - position.x.value - containerRect.value.left) / scale.value
    selectionY = (my - position.y.value - containerRect.value.top) / scale.value
    // 更新选框的尺寸和位置
    const minX = Math.min(selectionStartX, selectionX)
    const minY = Math.min(selectionStartY, selectionY)
    const width = Math.abs(selectionX - selectionStartX)
    const height = Math.abs(selectionY - selectionStartY)

    selection.x = minX
    selection.y = minY
    selection.w = width
    selection.h = height
  }
  function animateMoveCanvas(event) {
    if (mousePosition.x < edgeThreshold) {
      position.x.value += step // 向右平移画布
    }
    else if (mousePosition.x > window.innerWidth - edgeThreshold) {
      position.x.value -= step // 向左平移画布
    }
    else {
      cancelAnimationFrame(timer)
    }

    if (mousePosition.y < edgeThreshold) {
      position.y.value += step // 向下平移画布
    }
    else if (mousePosition.y > window.innerHeight - edgeThreshold) {
      position.y.value -= step // 向上平移画布
    }
    else {
      cancelAnimationFrame(timer)
    }

    timer = requestAnimationFrame(() => animateMoveCanvas(event))
  }
  return {
    selection,
  }
}

export function useNodeSelection({ container, nodes }) {
  const selectedNodeByIndex = ref([])
  useEventListener(container, 'mousedown', () => {
    selectedNodeByIndex.value = []
  })

  watch(selection, (v) => {
    if (v.w !== 0 || v.h !== 0) {
      selectedNodeByIndex.value = []
      nodes.value.forEach((node, index) => {
        const nodeBox = {
          position: node.position,
          size: node.size,
        }
        if (node.type === 'card' && isIntersecting(selection, nodeBox)) {
          selectedNodeByIndex.value.push(index)
        }

        if (node.type === 'group' && isCompletelyInside(nodeBox, selection)) {
          selectedNodeByIndex.value.push(index)
        }
      })
    }
  })
  function isIntersecting(box1, box2) {
    return !(
      box1.x + box1.w < box2.position.x // box1 is to the left of box2
      || box1.x > box2.position.x + box2.size.w // box1 is to the right of box2
      || box1.y + box1.h < box2.position.y // box1 is above box2
      || box1.y > box2.position.y + box2.size.h // box1 is below box2
    )
  }
  function isCompletelyInside(innerBox, outerBox) {
    return (
      innerBox.position.x >= outerBox.x
      && innerBox.position.x + innerBox.size.w <= outerBox.x + outerBox.w
      && innerBox.position.y >= outerBox.y
      && innerBox.position.y + innerBox.size.h <= outerBox.y + outerBox.h
    )
  }

  return {
    selectedNodeByIndex,
  }
}
