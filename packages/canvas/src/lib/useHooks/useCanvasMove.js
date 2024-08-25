// 鼠标+空格位移

import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useKeyboardStore } from '../useStore/useKeyboardStore'
import { useEventListener } from './useEventListener'

export function useDownMove({ target, callback }) {
  const KeyboardStore = useKeyboardStore()
  const { SPACE_KEY } = storeToRefs(KeyboardStore)
  const mouseLeftDownState = ref(false)

  const deltaX = ref(0)
  const deltaY = ref(0)

  useEventListener(target, 'mousedown', mouseDownMove)
  function mouseDownMove(event) {
    if (!SPACE_KEY.value)
      return
    let startX = event.clientX
    let startY = event.clientY
    mouseLeftDownState.value = true
    document.onmousemove = function (event) {
      // 计算鼠标移动的距离
      const dX = event.clientX - startX
      const dY = event.clientY - startY
      // 更新开始的鼠标位置
      startX = event.clientX
      startY = event.clientY
      // 更新原点位置
      deltaX.value += dX
      deltaY.value += dY
      callback && callback(dX, dY)
    }
    document.onmouseup = function () {
      document.onmousemove = null
      document.onmouseup = null
      mouseLeftDownState.value = false
    }
  }
  const cursor = computed(() => {
    if (SPACE_KEY.value && !mouseLeftDownState.value) {
      return 'cursor-grab'
    }
    else if (SPACE_KEY.value && mouseLeftDownState.value) {
      return 'cursor-grabbing'
    }
    return ''
  })
  return {
    deltaX,
    deltaY,
    cursor,
  }
}
