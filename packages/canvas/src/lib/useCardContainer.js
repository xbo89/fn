import { computed, inject, reactive, ref, watchEffect } from 'vue'

export function useResize(props, emits) {
  const containerRef = ref(null)
  const position = reactive({ x: props.pos.x, y: props.pos.y })
  const size = reactive({ width: props.size.w, height: props.size.h })
  const start = reactive({ x: 0, y: 0 })
  const isDragging = ref(false)
  const isResizing = ref(false)
  const dragDirection = ref('')
  const { scale } = inject('canvasBaseInfo')

  const style = computed(() => {
    return {
      position: 'absolute',
      transform: `translate(${position.x}px,${position.y}px)`,
      // left: `${position.x}px`,
      // top: `${position.y}px`,
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
    position.x = props.pos.x
    position.y = props.pos.y
    size.width = props.size.w
    size.height = props.size.h
  })
  let mouseDownPoint = { x: 0, y: 0 }
  function dragStart(event) {
    // event.preventDefault()
    isDragging.value = true
    start.x = (event.clientX - position.x * scale.value)
    start.y = (event.clientY - position.y * scale.value)
    mouseDownPoint = {
      x: event.clientX,
      y: event.clientY,
    }
    emits('moveStart', { start, isDragging })
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

    emits('resizeStart', { isResizing })
    document.onpointermove = function (event) {
      onPointerMove(event)
    }
    document.onpointerup = function (event) {
      onPointerUp(event)
    }
  }
  function onPointerMove(event) {
    isDragging.value && containerMove(event, scale)
    isResizing.value && containerResize(event, scale)
  }

  function onPointerUp() {
    document.onpointermove = null
    document.onpointerup = null
    isDragging.value = false
    isResizing.value = false
    emits('moveEnd')
    emits('resizeEnd', { size })
  }

  function containerMove(event, canvaScale) {
    position.x = (event.clientX - start.x) / canvaScale.value
    position.y = (event.clientY - start.y) / canvaScale.value
    emits('move', {
      position,
      isDragging,
      delta: {
        x: (event.clientX - mouseDownPoint.x) / canvaScale.value,
        y: (event.clientY - mouseDownPoint.y) / canvaScale.value,
      },
    })
  }
  function containerResize(event, canvaScale) {
    const { left, top } = containerRef.value.getBoundingClientRect()
    let deltaXLeft, deltaYTop, deltaXBottomLeft, deltaXTopLeft, deltaYTopLeft, deltaYTopRight
    switch (dragDirection.value) {
      case 'right':
        size.width = (event.clientX - left) / canvaScale.value
        break
      case 'bottom':
        size.height = (event.clientY - top) / canvaScale.value
        break
      case 'left':
        deltaXLeft = (event.clientX - omx) / canvaScale.value
        size.width = (ow - deltaXLeft)
        position.x = ox + deltaXLeft
        break
      case 'top':
        deltaYTop = (event.clientY - omy) / canvaScale.value
        size.height = (oh - deltaYTop)
        position.y = oy + deltaYTop
        break
      case 'bottom-right':
        size.width = (event.pageX - left) / canvaScale.value
        size.height = (event.pageY - top) / canvaScale.value
        break
      case 'bottom-left':
        deltaXBottomLeft = (event.clientX - omx) / canvaScale.value
        size.width = (ow - deltaXBottomLeft)
        position.x = ox + deltaXBottomLeft
        size.height = (event.clientY - top) / canvaScale.value
        break
      case 'top-left':
        deltaXTopLeft = (event.clientX - omx) / canvaScale.value
        deltaYTopLeft = (event.clientY - omy) / canvaScale.value
        size.width = (ow - deltaXTopLeft)
        position.x = ox + deltaXTopLeft
        size.height = (oh - deltaYTopLeft)
        position.y = oy + deltaYTopLeft
        break
      case 'top-right':
        deltaYTopRight = (event.clientY - omy) / canvaScale.value
        size.width = (event.clientX - left) / canvaScale.value
        size.height = (oh - deltaYTopRight)
        position.y = oy + deltaYTopRight
        break
    }
    emits('resize', { size, isResizing })
  }

  return {
    containerRef,
    style,
    dragStart,
    resizeStart,
  }
}
