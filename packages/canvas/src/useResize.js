import { computed, reactive, ref } from 'vue'

export function useResize(props) {
  const draggableRef = ref(null)
  const position = reactive({ x: props.config.defaultX, y: props.config.defaultY })
  const size = reactive({ width: props.config.defaultWidth, height: props.config.defaultHeight })
  const start = reactive({ x: 0, y: 0 })
  const isDragging = ref(false)
  const isResizing = ref(false)
  const dragDirection = ref('')

  const style = computed(() => {
    return {
      position: 'absolute',
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: `${size.width}px`,
      height: `${size.height}px`,
    }
  })

  function onPointerDown(event) {
    isDragging.value = true
    start.x = (event.clientX - position.x * props.scale)
    start.y = (event.clientY - position.y * props.scale)

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
    document.addEventListener('pointermove', onPointerMove)
    document.addEventListener('pointerup', onPointerUp)
  }

  function onPointerMove(event) {
    const { left, top } = draggableRef.value.getBoundingClientRect()
    if (isDragging.value) {
      position.x = (event.clientX - start.x) / props.scale
      position.y = (event.clientY - start.y) / props.scale
    }
    let deltaXLeft, deltaYTop, deltaXBottomLeft, deltaXTopLeft, deltaYTopLeft, deltaYTopRight
    if (isResizing.value) {
      switch (dragDirection.value) {
        case 'right':
          size.width = (event.clientX - left) / props.scale
          break
        case 'bottom':
          size.height = (event.clientY - top) / props.scale
          break
        case 'left':
          deltaXLeft = (event.clientX - omx) / props.scale
          size.width = (ow - deltaXLeft)
          position.x = ox + deltaXLeft
          break
        case 'top':
          deltaYTop = (event.clientY - omy) / props.scale
          size.height = (oh - deltaYTop)
          position.y = oy + deltaYTop
          break
        case 'bottom-right':
          size.width = (event.pageX - left) / props.scale
          size.height = (event.pageY - top) / props.scale
          break
        case 'bottom-left':
          deltaXBottomLeft = (event.clientX - omx) / props.scale
          size.width = (ow - deltaXBottomLeft)
          position.x = ox + deltaXBottomLeft
          size.height = (event.clientY - top) / props.scale
          break
        case 'top-left':
          deltaXTopLeft = (event.clientX - omx) / props.scale
          deltaYTopLeft = (event.clientY - omy) / props.scale
          size.width = (ow - deltaXTopLeft)
          position.x = ox + deltaXTopLeft
          size.height = (oh - deltaYTopLeft)
          position.y = oy + deltaYTopLeft
          break
        case 'top-right':
          deltaYTopRight = (event.clientY - omy) / props.scale
          size.width = (event.clientX - left) / props.scale
          size.height = (oh - deltaYTopRight)
          position.y = oy + deltaYTopRight
          break
      }
    }
  }

  function onPointerUp() {
    isDragging.value = false
    isResizing.value = false
    document.removeEventListener('pointermove', onPointerMove)
    document.removeEventListener('pointerup', onPointerUp)
  }

  return {
    draggableRef,
    style,
    onPointerDown,
    onResizePointerDown,
  }
}
