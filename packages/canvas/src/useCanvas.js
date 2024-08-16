import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const SPACEKEY_CODE = 32 // 32 表示空格键
const MOUSELEFTBUTTON_CODE = 0 // 0 表示鼠标左键
const CANVASSCAL_MAX = 2
const CANVASSCAL_MIN = 0.2

export function useCanvas(props) {
  const canvasRef = ref(null)
  const canvasContainerRef = ref(null)
  const canvasContainerRect = ref(null)
  // 基础坐标
  const x = ref(0)
  const y = ref(0)
  const scale = ref(1)
  // 按键状态
  const spaceKeyDown = ref(false)
  const mouseLeftButton = ref(false)

  // const isDragging = ref(false) // 是否在拖拽
  const startX = ref(0) // 拖拽开始的鼠标X位置
  const startY = ref(0) // 拖拽开始的鼠标Y位置

  onMounted(() => {
    canvasContainerRect.value = canvasContainerRef.value.getBoundingClientRect()
    document.addEventListener('keydown', keydown)
    document.addEventListener('keyup', keyup)
    document.addEventListener('wheel', mouseWheel, { passive: false })
    canvasContainerRef.value.addEventListener('mousedown', mousedown)
    canvasContainerRef.value.addEventListener('mouseup', mouseup)
    canvasContainerRef.value.addEventListener('mousemove', mousemove)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', keydown)
    document.removeEventListener('keyup', keyup)
    document.removeEventListener('wheel', mouseWheel)
    canvasContainerRef.value.removeEventListener('mousedown', mousedown)
    canvasContainerRef.value.removeEventListener('mouseup', mouseup)
    canvasContainerRef.value.removeEventListener('mousemove', mousemove)
  })

  /**
   * 根据空格键和鼠标左键状态更改鼠标指针样式
   */
  const cursorStyle = computed(() => {
    if (spaceKeyDown.value && !mouseLeftButton.value) {
      return 'cursor-grab'
    }
    else if (spaceKeyDown.value && mouseLeftButton.value) {
      return 'cursor-grabbing'
    }
  })

  /**
   * 空格键按下时的状态变化
   * 导出 {spaceKeyDown}
   * 按下 true
   * 抬起 false
   */
  function keydown(event) {
    toggleSpaceKeyState(event, true)
  }
  function keyup(event) {
    toggleSpaceKeyState(event, false)
  }
  function toggleSpaceKeyState(event, state) {
    if (event.keyCode === SPACEKEY_CODE) {
      event.preventDefault()
      spaceKeyDown.value = state
    }
  }
  /**
   * 空格键按下时的状态变化
   * 导出 {mouseLeftButton}
   * 按下 true
   * 抬起 false
   */
  function mousedown(event) {
    toggleMouseLeftButtonState(event, true)
    startX.value = event.clientX
    startY.value = event.clientY
  }
  function mouseup(event) {
    toggleMouseLeftButtonState(event, false)
  }
  function mousemove(event) {
    if (spaceKeyDown.value && mouseLeftButton.value) {
      // 计算鼠标移动的距离
      const deltaX = event.clientX - startX.value
      const deltaY = event.clientY - startY.value
      // 更新画布的原点位置
      x.value += deltaX
      y.value += deltaY
      // 更新开始的鼠标位置
      startX.value = event.clientX
      startY.value = event.clientY
    }
  }
  function toggleMouseLeftButtonState(event, state) {
    if (event.button === MOUSELEFTBUTTON_CODE) {
      event.preventDefault()
      mouseLeftButton.value = state
    }
  }

  /**
   * 处理鼠标滚轮事件
   */
  function mouseWheel(event) {
    const { metaKey, ctrlKey, deltaY, wheelDeltaY } = event
    const isZooming = metaKey || ctrlKey
    const touchpadThreshold = 10

    // 检测是否是触控板
    const isTouchpad = Math.abs(deltaY) < touchpadThreshold
    const zoomFactor = isTouchpad ? 0.02 : 0.3

    // 只有在缩放时才阻止默认行为
    if (isZooming) {
      event.preventDefault()
      // 获取鼠标相对于 canvasContainer 的位置
      const { left, top } = canvasContainerRect.value
      const offsetX = event.clientX - left
      const offsetY = event.clientY - top
      const relativeX = (offsetX - x.value) / scale.value
      const relativeY = (offsetY - y.value) / scale.value

      const dy = -deltaY || wheelDeltaY

      // 缩放逻辑
      if (dy > 0 && scale.value < CANVASSCAL_MAX) {
        scale.value = Math.min(scale.value * (1 + zoomFactor), CANVASSCAL_MAX)
      }
      else if (dy < 0 && scale.value > CANVASSCAL_MIN) {
        scale.value = Math.max(scale.value * (1 - zoomFactor), CANVASSCAL_MIN)
      }

      // 调整 x 和 y，使得鼠标位置保持为缩放中心
      const newRelativeX = relativeX * scale.value
      const newRelativeY = relativeY * scale.value

      x.value = offsetX - newRelativeX
      y.value = offsetY - newRelativeY
    }
    else {
      event.preventDefault()
      x.value -= event.deltaX
      y.value -= event.deltaY
    }
  }

  return {
    canvasRef,
    canvasContainerRef,
    spaceKeyDown,
    mouseLeftButton,
    cursorStyle,
    x,
    y,
    scale,
  }
}
