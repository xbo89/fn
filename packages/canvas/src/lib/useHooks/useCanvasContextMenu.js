import { reactive, ref } from 'vue'
import { useEventListener } from './useEventListener'

export function useCanvasContextMenu() {
  const showContextMenu = ref(false)
  const contextMenuPosition = reactive({ x: 0, y: 0 })
  function handleContextMenu(event) {
    showContextMenu.value = true
    contextMenuPosition.x = event.clientX
    contextMenuPosition.y = event.clientY
  }
  useEventListener(document, 'click', () => {
    showContextMenu.value = false
  })
  return {
    showContextMenu,
    contextMenuPosition,
    handleContextMenu,
  }
}
