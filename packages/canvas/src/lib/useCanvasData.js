import { ref } from 'vue'

export function useCanvasData(nodeData) {
  const cachePosition = ref([])
  function updateNodePositionData({ id, position, delta }) {
    const node = nodeData.value.find(i => i.id === id)
    node.position.x = position.x
    node.position.y = position.y
    const nodeChild = nodeData.value.filter(i => i.pid === id)
    for (let i = 0; i < nodeChild.length; i++) {
      if (!cachePosition.value[i]) {
        cachePosition.value[i] = {
          x: nodeChild[i].position.x,
          y: nodeChild[i].position.y,
        }
      }
      else {
        nodeChild[i].position.x = cachePosition.value[i].x + delta.x
        nodeChild[i].position.y = cachePosition.value[i].y + delta.y
      }
    }
  }
  function updateNodeSizeData({ id, size }) {
    const node = nodeData.value.find(i => i.id === id)
    node.size.w = size.width
    node.size.h = size.height
  }
  function updateClear() {
    cachePosition.value = []
  }
  return {
    updateNodePositionData,
    updateNodeSizeData,
    updateClear,
  }
}
