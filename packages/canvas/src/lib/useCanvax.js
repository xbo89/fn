import { computed, onBeforeUnmount, onMounted, reactive, ref, watchEffect } from 'vue'
import hotkeys from 'hotkeys-js'
import { animate, easeInOutQuad } from './useAnimation'

// hotkeys.filter = function (event) {
//   return true
// }

function _handleKeyboard(cbArr = {
  metaDown: [],
  metaUp: [],
  spaceDown: [],
  spaceUp: [],
  zoomReset: [],
  zoomIn: [],
  zoomOut: [],
}) {
  hotkeys('*', { keyup: true }, (event, handler) => {
    event.preventDefault()
    if (event.type === 'keydown' && (hotkeys.command || hotkeys.ctrl) && cbArr.metaDown.length > 0) {
      cbArr.metaDown.forEach((callback) => {
        callback(event, handler)
      })
    }
    if (event.type === 'keyup' && (hotkeys.command || hotkeys.ctrl) && cbArr.metaUp.length > 0) {
      cbArr.metaUp.forEach((callback) => {
        callback(event, handler)
      })
    }
  })

  hotkeys('space', { keyup: true }, (event, handler) => {
    event.preventDefault()
    if (event.type === 'keydown' && cbArr.spaceDown.length > 0) {
      cbArr.spaceDown.forEach((callback) => {
        callback(event, handler)
      })
    }
    if (event.type === 'keyup' && cbArr.spaceUp.length > 0) {
      cbArr.spaceUp.forEach((callback) => {
        callback(event, handler)
      })
    }
  })
  hotkeys('command+0', (event, handler) => {
    event.preventDefault()
    if (cbArr.zoomReset.length > 0) {
      cbArr.zoomReset.forEach((callback) => {
        callback(event, handler)
      })
    }
  })
  hotkeys('command+-', (event, handler) => {
    event.preventDefault()
    if (cbArr.zoomOut.length > 0) {
      cbArr.zoomOut.forEach((callback) => {
        callback(event, handler)
      })
    }
  })
  hotkeys('ctrl+=,command+=', (event, handler) => {
    event.preventDefault()
    if (cbArr.zoomIn.length > 0) {
      cbArr.zoomIn.forEach((callback) => {
        callback(event, handler)
      })
    }
  })
}
function _handleCanvasMouse(target, cbArr = {
  mousedown: [],
  mousemove: [],
  mouseup: [],
  mousewheel: [],
}) {
  onMounted(() => {
    document.addEventListener('wheel', mousewheel, { passive: false })
    target.value.addEventListener('mousedown', mousedown)
    target.value.addEventListener('mouseup', mouseup)
    target.value.addEventListener('mousemove', mousemove)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('wheel', mousewheel)
    target.value.removeEventListener('mousedown', mousedown)
    target.value.removeEventListener('mouseup', mouseup)
    target.value.removeEventListener('mousemove', mousemove)
  })
  function mousedown(event) {
    if (cbArr.mousedown.length > 0) {
      cbArr.mousedown.forEach((callback) => {
        callback(event)
      })
    }
  }
  function mousemove(event) {
    if (cbArr.mousemove.length > 0) {
      cbArr.mousemove.forEach((callback) => {
        callback(event)
      })
    }
  }
  function mouseup(event) {
    if (cbArr.mouseup.length > 0) {
      cbArr.mouseup.forEach((callback) => {
        callback(event)
      })
    }
  }
  function mousewheel(event) {
    if (cbArr.mousewheel.length > 0) {
      cbArr.mousewheel.forEach((callback) => {
        callback(event)
      })
    }
  }
}

export function useCanvas(props) {
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
  const _deltaX = ref(0)
  const _deltaY = ref(0)

  const mousePosition = reactive({ x: 0, y: 0 })

  const selectHelper = reactive({
    display: false,
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  })
  let timer = null
  watchEffect(() => {
    // 每次执行 watchEffect 时，先清除上一个定时器
    clearInterval(timer)

    if (mousePosition.x > window.innerWidth - 100 && selectHelper.display) {
      timer = setInterval(() => {
        x.value -= 3
      }, 10)
    }
  })
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
  })
  _handleKeyboard({
    metaDown: [
      () => keyboard.meta = true,
    ],
    metaUp: [
      () => keyboard.meta = false,
    ],
    spaceDown: [
      () => keyboard.space = true,
    ],
    spaceUp: [
      () => keyboard.space = false,
    ],
    zoomIn: [
      zoomIn,
    ],
    zoomOut: [
      zoomOut,
    ],
    zoomReset: [
      () => scale.value = 1,
    ],
  })
  _handleCanvasMouse(canvasContainerRef, {
    mousedown: [
      (event) => {
        if (event.button === 0) {
          event.preventDefault()
          mouse.left = true
        }
        _startX.value = event.clientX
        _startY.value = event.clientY
      },
      () => {

      },
    ],
    mousemove: [
      (event) => {
        if (keyboard.space && mouse.left) {
          // 计算鼠标移动的距离
          _deltaX.value = event.clientX - _startX.value
          _deltaY.value = event.clientY - _startY.value
          // 更新画布的原点位置
          x.value += _deltaX.value
          y.value += _deltaY.value
          // 更新开始的鼠标位置
          _startX.value = event.clientX
          _startY.value = event.clientY
        }
      },
      (event) => {

      },
    ],
    mouseup: [
      (event) => {
        if (event.button === 0) {
          event.preventDefault()
          mouse.left = false
        }
      },

    ],
    mousewheel: [
      (event) => {
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
      },
    ],
  })
  document.addEventListener('mousedown', (event) => {
    selectHelper.display = true
    // TODO:坐标位置计算，需要把事件添加到document
    selectHelper.x = event.clientX - x.value
    selectHelper.y = event.clientY
    console.log(event.clientX)
  })
  document.addEventListener('mousemove', (event) => {
    if (selectHelper.display && mouse.left && keyboard.space === false) {
      mousePosition.x = event.clientX
      mousePosition.y = event.clientY
      // 计算选框的位置和大小
      selectHelper.w = Math.abs(mousePosition.x - _startX.value)
      selectHelper.h = Math.abs(mousePosition.y - _startY.value)
      // selectHelper.x = Math.min(mousePosition.x, _startX.value)
      // selectHelper.y = Math.min(mousePosition.y, _startY.value)
    }
  })
  document.addEventListener('mouseup', (event) => {
    selectHelper.display = false
    selectHelper.w = 0
    selectHelper.h = 0
  })
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

    animate({
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
    cursor,
    x,
    y,
    scale,
    selectHelper,
    zoomIn,
    zoomOut,
  }
}
