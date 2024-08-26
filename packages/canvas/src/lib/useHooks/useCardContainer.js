import { computed, reactive, ref, watch, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { debounce } from 'lodash'
import { useCanvasStore } from '@/useStore/useCanvasStore.js'

export function useResize(props, emits) {
  const store = useCanvasStore()
  const { canvasBase, groupLayer, selectedNodes } = storeToRefs(store)
  const { handleNodeInsetGroup, updateNode } = store
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
    updateNode(props.id, {
      pid: selectedNodes.value[selectedNodes.value.length - 1] || 0,
    })
  }
  const _mousePos = reactive({
    x: 0,
    y: 0,
  })

  const currentGroups = ref([])
  const debouncedContainerMove = debounce((event) => {
    _mousePos.x = (event.clientX - canvasBase.value.x) / canvasBase.value.scale
    _mousePos.y = (event.clientY - canvasBase.value.y) / canvasBase.value.scale

    const newGroups = groupLayer.value.filter(group =>
      _mousePos.x >= group.position.x
      && _mousePos.x <= group.position.x + group.size.w
      && _mousePos.y >= group.position.y
      && _mousePos.y <= group.position.y + group.size.h,
    ).map(group => group.id)

    if (!arraysEqual(currentGroups.value, newGroups)) {
      updateGroupStatus(currentGroups.value, newGroups)
      currentGroups.value = newGroups
    }
  }, 16) // 约60fps

  function updateGroupStatus(oldGroups, newGroups) {
    // 处理离开的组
    oldGroups.forEach((groupId) => {
      if (!newGroups.includes(groupId)) {
        handleNodeInsetGroup(groupId, false)
      }
    })

    // 处理进入的组
    newGroups.forEach((groupId) => {
      if (!oldGroups.includes(groupId)) {
        handleNodeInsetGroup(groupId, true)
      }
    })

    // 如果新组为空，确保当前节点不在任何组内
    if (newGroups.length === 0) {
      handleNodeInsetGroup(props.id, false)
    }
  }

  function arraysEqual(a, b) {
    if (a.length !== b.length)
      return false
    return a.every((val, index) => val === b[index])
  }

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
    debouncedContainerMove(event, canvaScale)
  }

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
