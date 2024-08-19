import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import hotkeys from 'hotkeys-js'

const SPACEKEY_CODE = 32 // 32 表示空格键
const MOUSELEFTBUTTON_CODE = 0 // 0 表示鼠标左键
hotkeys.filter = function (event) {
  // 不过滤任何事件
  return true
}
hotkeys('command+0', () => {
  console.log('hei')
})
export function useCanvasKeyPress() {
  const cmdKey = ref(false)

  hotkeys('*', { keydown: true, keyup: false }, (event, handler) => {
    event.preventDefault()
    if (hotkeys.command || hotkeys.ctrl) {
      cmdKey.value = true
    }
  })
  hotkeys('*', { keydown: false, keyup: true }, (event, handler) => {
    event.preventDefault()
    if (hotkeys.command || hotkeys.ctrl) {
      cmdKey.value = false
    }
  })

  return {
    cmdKey,
  }
}
export function useCanvasMouseKeyPress() {
  const canvasContainerRef = ref(null)
  const mouseKey = reactive({
    left: false,
    right: false,
    middle: false,
  })
  onMounted(() => {
    canvasContainerRef.value.addEventListener('mousedown', mousedown)
    canvasContainerRef.value.addEventListener('mouseup', mouseup)
    canvasContainerRef.value.addEventListener('mousemove', mousemove)
  })
  onBeforeUnmount(() => {
    canvasContainerRef.value.removeEventListener('mousedown', mousedown)
    canvasContainerRef.value.removeEventListener('mouseup', mouseup)
    canvasContainerRef.value.removeEventListener('mousemove', mousemove)
  })
  function mousedown(event) {
    toggleMouseKey01State(event, true)
  }
  function mousemove(event) {

  }
  function mouseup(event) {
    toggleMouseKey01State(event, false)
  }
  function toggleMouseKey01State(event, state) {
    if (event.button === 0) {
      event.preventDefault()
      mouseKey.left = state
    }
    if (event.button === 1) {
      event.preventDefault()
      mouseKey.middle = state
    }
    if (event.button === 2) {
      event.preventDefault()
      mouseKey.right = state
    }
  }
  return {
    canvasContainerRef,
    mouseKey,
  }
}
export function useCanvasMouseWheel(rect, scale = { default: 1, min: 0.1, max: 2 }) {
  /**
   * scale:{default,max,min}
   */
  const x = ref(0)
  const y = ref(0)
  const k = ref(scale.default)
  onMounted(() => {
    document.addEventListener('wheel', mouseWheel, { passive: false })
  })

  onBeforeUnmount(() => {
    document.removeEventListener('wheel', mouseWheel)
  })
  function mouseWheel(event) {
    const { metaKey, ctrlKey, deltaY, wheelDeltaY } = event
    const isZooming = metaKey || ctrlKey
    const touchpadThreshold = 20

    // 检测是否是触控板
    const isTouchpad = Math.abs(deltaY) < touchpadThreshold
    const zoomFactor = isTouchpad ? 0.06 : 0.3

    // 只有在缩放时才阻止默认行为
    if (isZooming) {
      event.preventDefault()
      // 获取鼠标相对于 canvasContainer 的位置
      const { left, top } = rect.value
      const offsetX = event.clientX - left
      const offsetY = event.clientY - top
      const relativeX = (offsetX - x.value) / k.value
      const relativeY = (offsetY - y.value) / k.value

      const dy = -deltaY || wheelDeltaY

      // 缩放逻辑
      if (dy > 0 && k.value < scale.max) {
        k.value = Math.min(k.value * (1 + zoomFactor), scale.max)
      }
      else if (dy < 0 && k.value > scale.min) {
        k.value = Math.max(k.value * (1 - zoomFactor), scale.min)
      }

      // 调整 x 和 y，使得鼠标位置保持为缩放中心
      const newRelativeX = relativeX * k.value
      const newRelativeY = relativeY * k.value

      x.value = offsetX - newRelativeX
      y.value = offsetY - newRelativeY
    }
    else {
      event.preventDefault()
      x.value -= event.deltaX
      y.value -= event.deltaY
    }
  }
  return { x, y, k }
}
export function useCanvasContainerRect() {
  const rect = ref(null)
  const canvasContainerRef = ref(null)
  onMounted(() => {
    rect.value = canvasContainerRef.value.getBoundingClientRect()
  })
  return {
    rect,
  }
}
export function useCanvasHandleZoom(x, y, k, rect, scale = { default: 1, min: 0.1, max: 2 }) {
  function performZoom(isZoomIn) {
    const old = k.value
    const { left, top } = rect.value
    const offsetX = rect.value.offsetWidth / 2 - left
    const offsetY = rect.value.offsetHeight / 2 - top
    const relativeX = (offsetX - x.value) / k.value
    const relativeY = (offsetY - y.value) / k.value

    const targetScale = isZoomIn
      ? Math.min(k.value + scale.step, scale.max)
      : Math.max(k.value - scale.step, scale.min)

    animateValue({
      startValue: old,
      endValue: targetScale,
      duration: 300,
      easingFunction: easeInOutQuad,
      onUpdate: (value) => {
        k.value = value
        const newRelativeX = relativeX * k.value
        const newRelativeY = relativeY * k.value

        x.value = offsetX - newRelativeX
        y.value = offsetY - newRelativeY
      },
    })
  }
  function zoomIn() {
    performZoom(true)
  }

  function zoomOut() {
    performZoom(false)
  }
  return {
    zoomIn,
    zoomOut,
  }
}
export function useCanvasMove(spaceKey, mouseKey) {
  const startX = ref(0) // 拖拽开始的鼠标X位置
  const startY = ref(0) // 拖拽开始的鼠标Y位置
  const mode = ref(0)
  // 基础坐标
  const x = ref(0)
  const y = ref(0)

  function canvasMoveMouseEvent_move(event) {
    if (spaceKey.value && mouseKey.left) {
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
  return {
    x,
    y,
    mode,
    canvasMoveMouseEvent_move,
  }
}

export function useCanvas2(props) {
  // 基础坐标
  const x = ref(0)
  const y = ref(0)
  const scale = ref(props.patternStyle.scale.default)
  // 基础元素
  const canvasContainerRef = ref(null)
  const canvasNodesRef = ref(null)
  // 容器rect
  const canvasContainerRect = ref(null)
  // 按键状态
  const keyboard = reactive({
    space: false,
    meta: false,
  })
  const mouse = reactive({
    left: false,
    middle: false,
    right: false,
  })
  // 拖拽临时坐标缓存
  const _startX = ref(0) // 拖拽开始的鼠标X位置
  const _startY = ref(0) // 拖拽开始的鼠标Y位置

  const spaceKeyDown = ref(false)
  const mouseLeftButton = ref(false)

  // 鼠标指针管理
  const cursor = computed(() => {
    if (keyboard.space && !mouse.left) {
      return 'cursor-grab'
    }
    else if (keyboard.space && mouse.left) {
      return 'cursor-grabbing'
    }
  })

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
   * 空格键按下时的状态变化
   * 导出 {spaceKeyDown}
   * 按下 true
   * 抬起 false
   */
  function keydown(event) {
    toggleSpaceKeyState(event, true)
    if (event.metaKey && (event.key === '+' || event.key === '=')) {
      event.preventDefault()
      zoomIn()
    }
    if (event.metaKey && (event.key === '-')) {
      event.preventDefault()
      zoomOut()
    }
    if (event.metaKey && (event.key === '0')) {
      event.preventDefault()
      scale.value = 1
    }
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
    const touchpadThreshold = 20

    // 检测是否是触控板
    const isTouchpad = Math.abs(deltaY) < touchpadThreshold
    const zoomFactor = isTouchpad ? 0.06 : 0.3

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
      if (dy > 0 && scale.value < props.patternStyle.scale.max) {
        scale.value = Math.min(scale.value * (1 + zoomFactor), props.patternStyle.scale.max)
      }
      else if (dy < 0 && scale.value > props.patternStyle.scale.min) {
        scale.value = Math.max(scale.value * (1 - zoomFactor), props.patternStyle.scale.min)
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
  // const scaleAniState = ref(false)
  // let timer = null
  function performZoom(isZoomIn) {
    const old = scale.value
    const { left, top } = canvasContainerRect.value
    const offsetX = canvasContainerRef.value.offsetWidth / 2 - left
    const offsetY = canvasContainerRef.value.offsetHeight / 2 - top
    const relativeX = (offsetX - x.value) / scale.value
    const relativeY = (offsetY - y.value) / scale.value

    const targetScale = isZoomIn
      ? Math.min(scale.value + props.patternStyle.scale.step, props.patternStyle.scale.max)
      : Math.max(scale.value - props.patternStyle.scale.step, props.patternStyle.scale.min)

    animateValue({
      startValue: old,
      endValue: targetScale,
      duration: 300,
      easingFunction: easeInOutQuad,
      onUpdate: (value) => {
        scale.value = value
        const newRelativeX = relativeX * scale.value
        const newRelativeY = relativeY * scale.value

        x.value = offsetX - newRelativeX
        y.value = offsetY - newRelativeY
      },
    })
  }
  function zoomIn() {
    performZoom(true)
  }

  function zoomOut() {
    performZoom(false)
  }
  return {
    canvasNodesRef,
    canvasContainerRef,
    spaceKeyDown,
    mouseLeftButton,
    cursor,
    x,
    y,
    scale,
    mousedown,
    mousemove,
    mouseup,
    zoomIn,
    zoomOut,
  }
}
export function useCanvas(props) {
  const canvasRef = ref(null)
  const canvasContainerRef = ref(null)
  const canvasContainerRect = ref(null)
  // 基础坐标
  const x = ref(0)
  const y = ref(0)
  const scale = ref(props.patternStyle.scale.default)
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
    canvasContainerRef.value.addEventListener('wheel', mouseWheel, { passive: false })
    canvasContainerRef.value.addEventListener('mousedown', mousedown)
    canvasContainerRef.value.addEventListener('mouseup', mouseup)
    canvasContainerRef.value.addEventListener('mousemove', mousemove)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', keydown)
    document.removeEventListener('keyup', keyup)
    canvasContainerRef.value.removeEventListener('wheel', mouseWheel)
    canvasContainerRef.value.removeEventListener('mousedown', mousedown)
    canvasContainerRef.value.removeEventListener('mouseup', mouseup)
    canvasContainerRef.value.removeEventListener('mousemove', mousemove)
  })

  /**
   * 根据空格键和鼠标左键状态更改鼠标指针样式
   */
  const cursor = computed(() => {
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
    if (event.metaKey && (event.key === '+' || event.key === '=')) {
      event.preventDefault()
      zoomIn()
    }
    if (event.metaKey && (event.key === '-')) {
      event.preventDefault()
      zoomOut()
    }
    if (event.metaKey && (event.key === '0')) {
      event.preventDefault()
      scale.value = 1
    }
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
    const touchpadThreshold = 20

    // 检测是否是触控板
    const isTouchpad = Math.abs(deltaY) < touchpadThreshold
    const zoomFactor = isTouchpad ? 0.06 : 0.3

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
      if (dy > 0 && scale.value < props.patternStyle.scale.max) {
        scale.value = Math.min(scale.value * (1 + zoomFactor), props.patternStyle.scale.max)
      }
      else if (dy < 0 && scale.value > props.patternStyle.scale.min) {
        scale.value = Math.max(scale.value * (1 - zoomFactor), props.patternStyle.scale.min)
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
  // const scaleAniState = ref(false)
  // let timer = null
  function performZoom(isZoomIn) {
    const old = scale.value
    const { left, top } = canvasContainerRect.value
    const offsetX = canvasContainerRef.value.offsetWidth / 2 - left
    const offsetY = canvasContainerRef.value.offsetHeight / 2 - top
    const relativeX = (offsetX - x.value) / scale.value
    const relativeY = (offsetY - y.value) / scale.value

    const targetScale = isZoomIn
      ? Math.min(scale.value + props.patternStyle.scale.step, props.patternStyle.scale.max)
      : Math.max(scale.value - props.patternStyle.scale.step, props.patternStyle.scale.min)

    animateValue({
      startValue: old,
      endValue: targetScale,
      duration: 300,
      easingFunction: easeInOutQuad,
      onUpdate: (value) => {
        scale.value = value
        const newRelativeX = relativeX * scale.value
        const newRelativeY = relativeY * scale.value

        x.value = offsetX - newRelativeX
        y.value = offsetY - newRelativeY
      },
    })
  }
  function zoomIn() {
    performZoom(true)
  }

  function zoomOut() {
    performZoom(false)
  }
  return {
    canvasRef,
    canvasContainerRef,
    spaceKeyDown,
    mouseLeftButton,
    cursor,
    x,
    y,
    scale,
    mousedown,
    mousemove,
    mouseup,
    zoomIn,
    zoomOut,
  }
}
function animateValue({ startValue, endValue, duration, easingFunction, onUpdate = () => {}, onComplete = () => {} }) {
  const startTime = performance.now()

  function tick(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = easingFunction(progress)

    const currentValue = startValue + (endValue - startValue) * easedProgress
    onUpdate(currentValue)

    if (progress < 1) {
      requestAnimationFrame(tick)
    }
    else {
      if (onComplete)
        onComplete()
    }
  }

  requestAnimationFrame(tick)
}

// 示例缓动函数（例如：easeInOutQuad）
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}
