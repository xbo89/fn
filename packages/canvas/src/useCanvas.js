import { computed, onMounted, ref } from 'vue'

const SPACEKEY_CODE = 32 // 32 表示空格键
const MOUSELEFTBUTTON_CODE = 0 // 0 表示鼠标左键
const CANVASSCAL_MAX = 2
const CANVASSCAL_MIN = 0.2

export function documentGestureBase(props) {
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
  document.addEventListener('mousedown', mousedown)
  document.addEventListener('mouseup', mouseup)
  function mousedown(event) {
    toggleMouseLeftButtonState(event, true)
  }
  function mouseup(event) {
    toggleMouseLeftButtonState(event, false)
  }
  function toggleMouseLeftButtonState(event, state) {
    if (event.button === MOUSELEFTBUTTON_CODE) {
      event.preventDefault()
      mouseLeftButton.value = state
      console.log(mouseLeftButton.value)
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

  const scrollableElement = ref(null)
  const canvasContainer = ref(null)
  const canvasWidth = ref(0)
  const canvasHeight = ref(0)
  const originX = ref(0)
  const originY = ref(0)
  const canvasScale = ref(1)
  const canvasScaleStep = ref(0.1)
  onMounted(() => {
    canvasWidth.value = canvasContainer.value.offsetWidth
    canvasHeight.value = canvasContainer.value.offsetHeight
    // originX.value = -(props.width / 2 - canvasWidth.value / 2)
    // originY.value = -(props.height / 2 - canvasHeight.value / 2)
  })

  /**
   * 处理鼠标滚轮事件
   */
  document.addEventListener('wheel', mouseWheel, { passive: false })
  function mouseWheel(event) {
    event.preventDefault()

    const dir = wheelEvent(event)
    switch (dir) {
      case 'zoomin':
        canvasScale.value -= canvasScaleStep.value
        if (canvasScale.value < CANVASSCAL_MIN) {
          canvasScale.value = CANVASSCAL_MIN
        }
        break
      case 'zoomout':
        canvasScale.value += canvasScaleStep.value
        if (canvasScale.value > CANVASSCAL_MAX) {
          canvasScale.value = CANVASSCAL_MAX
        }
        break
      default:
        canvasMove(event)
        break
    }
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
    canvasWidth,
    canvasHeight,
    canvasScale,
  }
}
