import { computed, inject, reactive, ref } from 'vue'

export function useResize(props, emits) {
  const draggableRef = ref(null)
  const position = reactive({ x: props.pos.x, y: props.pos.y })
  const size = reactive({ width: props.size.w, height: props.size.h })
  const start = reactive({ x: 0, y: 0 })
  // const isDragging = ref(false)
  const isResizing = ref(false)
  const dragDirection = ref('')
  const { scale } = inject('canvasBaseInfo')

  const { isDragging, deltaX, deltaY } = inject('cardDraging')

  const style = computed(() => {
    return {
      position: 'absolute',
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: `${size.width}px`,
      height: `${size.height}px`,
    }
  })
  let mouseDownPoint = { x: 0, y: 0 }
  function onPointerDown(event) {
    event.preventDefault()
    isDragging.value = true
    start.x = (event.clientX - position.x * scale.value)
    start.y = (event.clientY - position.y * scale.value)
    mouseDownPoint = {
      x: event.clientX,
      y: event.clientY,
    }
    emits('moveStart', { start, isDragging })
    document.addEventListener('pointermove', onPointerMove)
    document.addEventListener('pointerup', onPointerUp)
  }
  let ox, oy, ow, oh, omx, omy
  function onResizePointerDown(event, dir) {
    isResizing.value = true
    dragDirection.value = dir
    ox = position.x
    oy = position.y
    ow = size.width
    oh = size.height
    omx = event.clientX
    omy = event.clientY

    emits('resizeStart', { isResizing })
    document.addEventListener('pointermove', onPointerMove)
    document.addEventListener('pointerup', onPointerUp)
  }

  function onPointerMove(event) {
    const { left, top } = draggableRef.value.getBoundingClientRect()
    if (isDragging.value) {
      position.x = (event.clientX - start.x) / scale.value
      position.y = (event.clientY - start.y) / scale.value
      // props.position.x = position.x
      // props.position.y = position.y
      deltaX.value = (event.clientX - mouseDownPoint.x) / scale.value
      deltaY.value = (event.clientY - mouseDownPoint.y) / scale.value
      emits('move', {
        position,
        isDragging,
        delta: {
          x: (event.clientX - mouseDownPoint.x) / scale.value,
          y: (event.clientY - mouseDownPoint.y) / scale.value,
        },
      })
    }
    let deltaXLeft, deltaYTop, deltaXBottomLeft, deltaXTopLeft, deltaYTopLeft, deltaYTopRight
    if (isResizing.value) {
      switch (dragDirection.value) {
        case 'right':
          size.width = (event.clientX - left) / scale.value
          break
        case 'bottom':
          size.height = (event.clientY - top) / scale.value
          break
        case 'left':
          deltaXLeft = (event.clientX - omx) / scale.value
          size.width = (ow - deltaXLeft)
          position.x = ox + deltaXLeft
          break
        case 'top':
          deltaYTop = (event.clientY - omy) / scale.value
          size.height = (oh - deltaYTop)
          position.y = oy + deltaYTop
          break
        case 'bottom-right':
          size.width = (event.pageX - left) / scale.value
          size.height = (event.pageY - top) / scale.value
          break
        case 'bottom-left':
          deltaXBottomLeft = (event.clientX - omx) / scale.value
          size.width = (ow - deltaXBottomLeft)
          position.x = ox + deltaXBottomLeft
          size.height = (event.clientY - top) / scale.value
          break
        case 'top-left':
          deltaXTopLeft = (event.clientX - omx) / scale.value
          deltaYTopLeft = (event.clientY - omy) / scale.value
          size.width = (ow - deltaXTopLeft)
          position.x = ox + deltaXTopLeft
          size.height = (oh - deltaYTopLeft)
          position.y = oy + deltaYTopLeft
          break
        case 'top-right':
          deltaYTopRight = (event.clientY - omy) / scale.value
          size.width = (event.clientX - left) / scale.value
          size.height = (oh - deltaYTopRight)
          position.y = oy + deltaYTopRight
          break
      }
      emits('resize', { size, isResizing })
    }
    emits('change', { position, size, isDragging, isResizing })
  }

  function onPointerUp() {
    isDragging.value = false
    isResizing.value = false
    emits('moveEnd')
    emits('resizeEnd')
    // deltaX.value = 0
    // deltaY.value = 0
    document.removeEventListener('pointermove', onPointerMove)
    document.removeEventListener('pointerup', onPointerUp)
  }

  return {
    draggableRef,
    style,
    position,
    size,
    onPointerDown,
    onResizePointerDown,
  }
}
