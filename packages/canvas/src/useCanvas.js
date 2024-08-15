import { computed, onMounted, ref } from 'vue'

const SPACEKEY_CODE = 32 // 32 表示空格键
const MOUSELEFTBUTTON_CODE = 0 // 0 表示鼠标左键
const CANVASSCAL_MAX = 2
const CANVASSCAL_MIN = 0.2

export function documentGestureBase(props) {
  const scrollableElement = ref(null)
  const canvasContainer = ref(null)
  const canvasWidth = ref(0)
  const canvasHeight = ref(0)
  const originX = ref(0)
  const originY = ref(0)
  const canvasScale = ref(1)
  const canvasScaleStep = ref(0.016)
  onMounted(() => {
    canvasWidth.value = canvasContainer.value.offsetWidth
    canvasHeight.value = canvasContainer.value.offsetHeight
  })
  /**
   * 空格键按下时的状态变化
   * 导出 {spaceKeyDown}
   * 按下 true
   * 抬起 false
   */
  const spaceKeyDown = ref(false)
  document.addEventListener('keydown', keydown)
  document.addEventListener('keyup', keyup)
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
  const mouseLeftButton = ref(false)
  const isDragging = ref(false) // 是否在拖拽
  const startX = ref(0) // 拖拽开始的鼠标X位置
  const startY = ref(0) // 拖拽开始的鼠标Y位置
  const patternX = ref(0)
  const patternY = ref(0)
  const patternSize = ref(mapScaleToRange(canvasScale.value, CANVASSCAL_MIN, CANVASSCAL_MAX, 10, 40))
  const patternTransform = ref(mapScaleToRange(canvasScale.value, CANVASSCAL_MIN, CANVASSCAL_MAX, -0.25, -1))
  document.addEventListener('mousedown', mousedown)
  document.addEventListener('mouseup', mouseup)
  document.addEventListener('mousemove', mousemove)
  function mousedown(event) {
    toggleMouseLeftButtonState(event, true)
    // 开始拖拽
    isDragging.value = true
    startX.value = event.clientX
    startY.value = event.clientY
  }
  function mouseup(event) {
    toggleMouseLeftButtonState(event, false)
    if (isDragging.value) {
      // 结束拖拽
      isDragging.value = false
    }
  }
  function mousemove(event) {
    if (isDragging.value) {
      // 计算鼠标移动的距离
      const deltaX = event.clientX - startX.value
      const deltaY = event.clientY - startY.value
      patternX.value = (patternX.value - deltaX) % patternSize.value
      patternY.value = (patternY.value - deltaY) % patternSize.value

      // 更新画布的原点位置
      originX.value += deltaX
      originY.value += deltaY

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
   * 处理鼠标滚轮事件
   */

  document.addEventListener('wheel', mouseWheel, { passive: false })
  function mouseWheel(event) {
    event.preventDefault()

    // 获取鼠标相对于 canvasContainer 的位置
    const rect = canvasContainer.value.getBoundingClientRect()
    const offsetX = event.clientX - rect.left
    const offsetY = event.clientY - rect.top
    patternSize.value = mapScaleToRange(canvasScale.value, CANVASSCAL_MIN, CANVASSCAL_MAX, 10, 40)
    patternTransform.value = mapScaleToRange(canvasScale.value, CANVASSCAL_MIN, CANVASSCAL_MAX, -0.25, -1)
    // 缩放前鼠标相对于画布内容的相对位置
    const relativeX = (offsetX - originX.value) / canvasScale.value
    const relativeY = (offsetY - originY.value) / canvasScale.value

    const dir = wheelEvent(event)
    switch (dir) {
      case 'zoomout':
        if (canvasScale.value < CANVASSCAL_MAX) {
          canvasScale.value += canvasScaleStep.value
        }
        break
      case 'zoomin':
        if (canvasScale.value > CANVASSCAL_MIN) {
          canvasScale.value -= canvasScaleStep.value
        }
        break
      default:
        canvasMove(event)
        return
    }

    // 缩放后鼠标相对于画布内容的相对位置
    const newRelativeX = relativeX * canvasScale.value
    const newRelativeY = relativeY * canvasScale.value

    // 调整 originX 和 originY，使得鼠标位置保持为缩放中心
    originX.value = offsetX - newRelativeX
    originY.value = offsetY - newRelativeY

    // 更新 patternX 和 patternY，使图案的缩放中心与画布一致
    patternX.value = (relativeX - (offsetX - originX.value) / canvasScale.value) % patternSize.value
    patternY.value = (relativeY - (offsetY - originY.value) / canvasScale.value) % patternSize.value
  }

  function canvasMove(event) {
    // Calculate the new positions
    let newPositionX = originX.value - event.deltaX
    let newPositionY = originY.value - event.deltaY

    // 边界判断&限制
    if (newPositionX > 600) {
      newPositionX = 600
    }

    if (newPositionY > 600) {
      newPositionY = 600
    }

    // Update positions only if they are valid
    originX.value = newPositionX
    originY.value = newPositionY
  }

  function wheelEvent(e) {
    const dy = -e.deltaY || e.wheelDeltaY
    if (Math.abs(e.deltaX) !== 0 && Math.abs(e.deltaY) !== 0)
      return 'unknow'
    if (e.deltaX < 0)
      return 'right'
    if (e.deltaX > 0)
      return 'left'
    if (e.ctrlKey) {
      if (dy > 0)
        return 'zoomout'
      if (dy < 0)
        return 'zoomin'
    }
    else {
      if (e.deltaY > 0)
        return 'up'
      if (e.deltaY < 0)
        return 'down'
    }
  }

  return {
    scrollableElement,
    canvasContainer,
    spaceKeyDown,
    mouseLeftButton,
    cursorStyle,
    originX,
    originY,
    patternX,
    patternY,
    patternSize,
    patternTransform,
    canvasWidth,
    canvasHeight,
    canvasScale,
  }
}
function mapScaleToRange(value, inMin, inMax, outMin, outMax) {
  return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
}
