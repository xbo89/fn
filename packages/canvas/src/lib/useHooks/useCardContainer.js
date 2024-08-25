import { computed, reactive, ref, watch, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useCanvasStore } from '@/useStore/useCanvasStore.js'

export function useResize(props, emits) {
  const store = useCanvasStore()
  const { canvasBase, nodes } = storeToRefs(store)
  const { handleNodeInsetGroup } = store
  const containerRef = ref(null)
  const position = reactive({ x: props.position.x, y: props.position.y })
  const size = reactive({ width: props.size.w, height: props.size.h })
  const start = reactive({ x: 0, y: 0 })
  const isDragging = ref(false)
  const isResizing = ref(false)
  const dragDirection = ref('')

  const style = computed(() => {
    return {
      position: 'absolute',
      transform: `translate(${position.x}px,${position.y}px)`,
      width: `${size.width}px`,
      height: `${size.height}px`,
      borderRadius: `${props.config.radius}px`,
      minWidth: `${props.limitMin.minW}px`,
      minHeight: `${props.limitMin.minH}px`,
      maxWidth: `${props.limitMax.maxW}px`,
      maxHeight: `${props.limitMax.maxH}px`,
    }
  })

  watchEffect(() => {
    position.x = props.position.x
    position.y = props.position.y
    size.width = props.size.w
    size.height = props.size.h
  })

  let mouseDownPoint = { x: 0, y: 0 }
  function dragStart(event) {
    event.stopPropagation()
    isDragging.value = true
    start.x = (event.clientX - position.x * canvasBase.value.scale)
    start.y = (event.clientY - position.y * canvasBase.value.scale)
    mouseDownPoint = {
      x: event.clientX,
      y: event.clientY,
    }
    emits('handle-move-start', { start, isDragging })
    document.onpointermove = function (event) {
      onPointerMove(event)
    }
    document.onpointerup = function (event) {
      onPointerUp(event)
    }
  }
  let ox, oy, ow, oh, omx, omy
  function resizeStart(event, dir) {
    isResizing.value = true
    dragDirection.value = dir
    ox = position.x
    oy = position.y
    ow = size.width
    oh = size.height
    omx = event.clientX
    omy = event.clientY

    emits('handle-resize-start')
    document.onpointermove = function (event) {
      onPointerMove(event)
    }
    document.onpointerup = function (event) {
      onPointerUp(event)
    }
  }
  function onPointerMove(event) {
    isDragging.value && containerMove(event, canvasBase.value.scale)
    isResizing.value && containerResize(event, canvasBase.value.scale)
  }

  function onPointerUp() {
    document.onpointermove = null
    document.onpointerup = null
    isDragging.value = false
    isResizing.value = false
    emits('handle-move-end')
    emits('handle-resize-end', { size, position })
  }
  const _mousePos = reactive({
    x: 0,
    y: 0,
  })
  const isInGroup = ref(false)
  const _InGroupNodeIndex = ref(-1)
  function containerMove(event, canvaScale) {
    position.x = (event.clientX - start.x) / canvaScale
    position.y = (event.clientY - start.y) / canvaScale
    emits('handle-move', {
      position,
      isDragging,
      delta: {
        x: (event.clientX - mouseDownPoint.x) / canvaScale,
        y: (event.clientY - mouseDownPoint.y) / canvaScale,
      },
    })
    // 判断position.y和position.x是否在nodes的某个对象所表示的node区域内部, 排除当前点击拖拽的这个node
    _mousePos.x = (event.clientX - canvasBase.value.x) / canvasBase.value.scale
    _mousePos.y = (event.clientY - canvasBase.value.y) / canvasBase.value.scale
    // 查询nodes中type为group的类型的node
    const groupNodes = nodes.value.filter(node => node.type === 'group')
    console.log('groupNodes', groupNodes)
    groupNodes.forEach((node, idx) => {
      if (_mousePos.x >= node.position.x && _mousePos.x <= node.position.x + node.size.w && _mousePos.y >= node.position.y && _mousePos.y <= node.position.y + node.size.h) {
        isInGroup.value = true
        _InGroupNodeIndex.value = idx
      }
      else {
        isInGroup.value = false
      }
    })
    // nodes.value.forEach((node, idx) => {
    //   if (node.type === 'group') {
    //     if (_mousePos.x >= node.position.x && _mousePos.x <= node.position.x + node.size.w && _mousePos.y >= node.position.y && _mousePos.y <= node.position.y + node.size.h) {
    //       isInGroup.value = true
    //       _InGroupNodeIndex.value = idx
    //     }
    //     else {
    //       handleNodeInsetGroup(idx, false)
    //       isInGroup.value = false
    //     }
    //   }
    // })
  }
  watch(isInGroup, (newVal) => {
    if (newVal) {
      handleNodeInsetGroup(_InGroupNodeIndex.value, true)
    }
    else {
      handleNodeInsetGroup(_InGroupNodeIndex.value, false)
    }
  })
  function containerResize(event, canvaScale) {
    const { left, top } = containerRef.value.getBoundingClientRect()
    let deltaXLeft, deltaYTop, deltaXBottomLeft, deltaXTopLeft, deltaYTopLeft, deltaYTopRight
    switch (dragDirection.value) {
      case 'right':
        size.width = (event.clientX - left) / canvaScale
        break
      case 'bottom':
        size.height = (event.clientY - top) / canvaScale
        break
      case 'left':
        deltaXLeft = (event.clientX - omx) / canvaScale
        size.width = (ow - deltaXLeft)
        position.x = ox + deltaXLeft
        break
      case 'top':
        deltaYTop = (event.clientY - omy) / canvaScale
        size.height = (oh - deltaYTop)
        position.y = oy + deltaYTop
        break
      case 'bottom-right':
        size.width = (event.pageX - left) / canvaScale
        size.height = (event.pageY - top) / canvaScale
        break
      case 'bottom-left':
        deltaXBottomLeft = (event.clientX - omx) / canvaScale
        size.width = (ow - deltaXBottomLeft)
        position.x = ox + deltaXBottomLeft
        size.height = (event.clientY - top) / canvaScale
        break
      case 'top-left':
        deltaXTopLeft = (event.clientX - omx) / canvaScale
        deltaYTopLeft = (event.clientY - omy) / canvaScale
        size.width = (ow - deltaXTopLeft)
        position.x = ox + deltaXTopLeft
        size.height = (oh - deltaYTopLeft)
        position.y = oy + deltaYTopLeft
        break
      case 'top-right':
        deltaYTopRight = (event.clientY - omy) / canvaScale
        size.width = (event.clientX - left) / canvaScale
        size.height = (oh - deltaYTopRight)
        position.y = oy + deltaYTopRight
        break
    }
    emits('handle-resize', { size, isResizing })
  }

  return {
    containerRef,
    style,
    dragStart,
    resizeStart,
  }
}
