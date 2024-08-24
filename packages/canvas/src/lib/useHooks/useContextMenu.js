import { reactive, ref } from 'vue'

export function useCanvasContextMenu() {
  const showContextMenu = ref(false)
  const contextMenuPosition = reactive({ x: 0, y: 0 })
  function handleContextMenu(event) {
    showContextMenu.value = false
    contextMenuPosition.x = event.clientX
    contextMenuPosition.y = event.clientY
    showContextMenu.value = true
  }
  return {
    showContextMenu,
    contextMenuPosition,
    handleContextMenu,
  }
}
