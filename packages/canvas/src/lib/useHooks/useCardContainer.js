import { computed, reactive, ref, watchEffect } from 'vue'

export function useResize(props, emits) {
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
    start.x = (event.clientX - position.x * props.scale)
    start.y = (event.clientY - position.y * props.scale)
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
    isDragging.value && containerMove(event, props.scale)
    isResizing.value && containerResize(event, props.scale)
  }

  function onPointerUp() {
    document.onpointermove = null
    document.onpointerup = null
    isDragging.value = false
    isResizing.value = false
    emits('handle-move-end')
    emits('handle-resize-end', { size, position })
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
