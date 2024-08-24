import { onMounted, ref } from 'vue'
import { useEventListener } from './useEventListener'

const scale = ref(1)
const wheelX = ref(0)
const wheelY = ref(0)
export function useWheelMove({
  position,
  target,
  callback,
  config = {
    scale: {
      min: 0.1,
      max: 2,
    },
  },
}) {
  const containerRect = ref(null)
  useEventListener(target, 'wheel', mousewheel, { passive: false })
  onMounted(() => {
    containerRect.value = target.value.getBoundingClientRect()
  })
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
    const relativeX = (offsetX - position.x.value) / scale.value
    const relativeY = (offsetY - position.y.value) / scale.value
    // 缩放逻辑
    const dy = -deltaY || wheelDeltaY
    if (dy > 0 && scale.value < config.scale.max) {
      scale.value = Math.min(scale.value * (1 + zoomFactor), config.scale.max)
    }
    else if (dy < 0 && scale.value > config.scale.min) {
      scale.value = Math.max(scale.value * (1 - zoomFactor), config.scale.min)
    }

    // 调整 x 和 y，使得鼠标位置保持为缩放中心
    const newRelativeX = relativeX * scale.value
    const newRelativeY = relativeY * scale.value

    wheelX.value = offsetX - newRelativeX
    wheelY.value = offsetY - newRelativeY
    callback?.('zoom', wheelX.value, wheelY.value, scale.value)
  }

  function _mousewheelMoving(event) {
    event.preventDefault()
    callback?.('pan', -event.deltaX, -event.deltaY, scale.value)
  }

  return {
    wheelX,
    wheelY,
    scale,
  }
}
