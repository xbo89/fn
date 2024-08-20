import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { EASING, animate } from './useAnimation'

export function useCanvas(props) {
  const x = ref(0)
  const y = ref(0)
  const scale = ref(props.patternStyle.scale.default)
  const containerRef = ref(null)
  const containerRect = ref(null)
  const keyboard = reactive({
    space: false,
    meta: false,
  })
  const mouse = reactive({
    left: false,
    middle: false,
    right: false,
  })
  const selectHelper = reactive({
    display: false,
    x: 0,
    y: 0,
    w: 0,
    h: 0,
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
    containerRect.value = containerRef.value.getBoundingClientRect()
    document.addEventListener('wheel', mousewheel, { passive: false })
    containerRef.value.addEventListener('mousedown', canvasMouseDragMove)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('wheel', mousewheel)
    containerRef.value.removeEventListener('mousedown', canvasMouseDragMove)
  })

  // 鼠标+空格位移
  function canvasMouseDragMove(event) {
    let startX = event.clientX
    let startY = event.clientY

    const selectionStartX = (event.clientX - x.value - containerRect.value.left) / scale.value
    const selectionStartY = (event.clientY - y.value - containerRect.value.top) / scale.value
    let selectionX = selectionStartX
    let selectionY = selectionStartY

    selectHelper.display = true

    mouse.left = true
    document.onmousemove = function (event) {
      if (keyboard.space) {
        // 计算鼠标移动的距离
        const deltaX = event.clientX - startX
        const deltaY = event.clientY - startY
        // 更新开始的鼠标位置
        startX = event.clientX
        startY = event.clientY
        // 更新画布的原点位置
        x.value += deltaX
        y.value += deltaY
      }
      else {
        // 更新当前鼠标位置
        selectionX = (event.clientX - x.value - containerRect.value.left) / scale.value
        selectionY = (event.clientY - y.value - containerRect.value.top) / scale.value
        console.log(containerRect.value.left)
        // 更新选框的尺寸和位置
        const minX = Math.min(selectionStartX, selectionX)
        const minY = Math.min(selectionStartY, selectionY)
        const width = Math.abs(selectionX - selectionStartX)
        const height = Math.abs(selectionY - selectionStartY)

        selectHelper.x = minX
        selectHelper.y = minY
        selectHelper.w = width
        selectHelper.h = height

        // 检测鼠标是否接近窗口边缘，并相应地平移画布
        const edgeThreshold = 20
        if (event.clientX < edgeThreshold) {
          x.value += 10 // 向右平移画布
        }
        else if (event.clientX > window.innerWidth - edgeThreshold) {
          x.value -= 10 // 向左平移画布
        }

        if (event.clientY < edgeThreshold) {
          y.value += 10 // 向下平移画布
        }
        else if (event.clientY > window.innerHeight - edgeThreshold) {
          y.value -= 10 // 向上平移画布
        }
      }
    }
    document.onmouseup = function () {
      document.onmousemove = null
      document.onmouseup = null
      mouse.left = false
      selectHelper.display = false
      selectHelper.w = 0
      selectHelper.h = 0
    }
  }

  function mousewheel(event) {
    const { metaKey, ctrlKey } = event
    const isZooming = metaKey || ctrlKey
    isZooming ? _mousewheelZoom(event) : _mousewheelMoving(event)
  }

  function _mousewheelZoom(event) {
    event.preventDefault()
    const { deltaY, wheelDeltaY } = event
    // 检测是否是触控板
    const touchpadThreshold = 20
    const isTouchpad = Math.abs(deltaY) < touchpadThreshold
    const zoomFactor = isTouchpad ? 0.06 : 0.3
    // 获取鼠标相对于 canvasContainer 的位置
    const { left, top } = containerRect.value

    /**
     * 这里left top是最外层容器距离窗口的左、顶边距
     * clientX\clientY是鼠标的位置（距离窗口左、顶边距）
     * offsetX和offsetY是鼠标距离容器左、顶边距的距离
     * x 向右>0、向左<0
     * y 向上<0、向下>0
     */
    const offsetX = event.clientX - left
    const offsetY = event.clientY - top
    const relativeX = (offsetX - x.value) / scale.value
    const relativeY = (offsetY - y.value) / scale.value

    // 缩放逻辑
    const dy = -deltaY || wheelDeltaY
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

  function _mousewheelMoving(event) {
    event.preventDefault()
    x.value -= event.deltaX
    y.value -= event.deltaY
  }

  window.addEventListener('keydown', (event) => {
    switch (event.key) {
      case ' ':
        keyboard.space = true
        break
    }
  })
  window.addEventListener('keyup', (event) => {
    switch (event.key) {
      case ' ':
        keyboard.space = false
        break
    }
  })

  function zoomControl(isZoomIn) {
    const old = scale.value
    const { left, top } = containerRect.value
    const offsetX = containerRef.value.offsetWidth / 2 - left
    const offsetY = containerRef.value.offsetHeight / 2 - top
    const relativeX = (offsetX - x.value) / scale.value
    const relativeY = (offsetY - y.value) / scale.value

    const targetScale = isZoomIn
      ? Math.min(scale.value + props.patternStyle.scale.step, props.patternStyle.scale.max)
      : Math.max(scale.value - props.patternStyle.scale.step, props.patternStyle.scale.min)

    animate({
      startValue: old,
      endValue: targetScale,
      duration: 300,
      easingFunction: EASING.easeOutQuint,
      onUpdate: (value) => {
        scale.value = value
        const newRelativeX = relativeX * scale.value
        const newRelativeY = relativeY * scale.value

        x.value = offsetX - newRelativeX
        y.value = offsetY - newRelativeY
      },
    })
  }
  return {
    x,
    y,
    scale,
    cursor,
    containerRef,
    selectHelper,
    zoomControl,
  }
}
