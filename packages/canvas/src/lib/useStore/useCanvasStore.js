import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'

export const useCanvasStore = defineStore('canvas', {
  state: () => ({
    nodes: [],
    canvasBase: {
      scale: 1,
      x: 0,
      y: 0,
    },
    selectedNodes: [],
    selectionArea: {
      enable: false,
      position: {
        x: 0,
        y: 0,
      },
      size: {
        w: 0,
        h: 0,
      },
    },
    colors: [
      { name: 'white', background: '#fff', border: '#ccc' },
      { name: 'red', background: '#fecdd3', border: '#e11d48' },
      { name: 'orange', background: '#fed7aa', border: '#ea580c' },
      { name: 'green', background: '#a7f3d0', border: '#059669' },
      { name: 'blue', background: '#bfdbfe', border: '#2563eb' },
      { name: 'purple', background: '#ddd6fe', border: '#7c3aed' },
    ],
  }),
  getters: {
    selectState: (state) => {
      return index => state.selectedNodes.includes(index)
    },
  },
  actions: {
    handleNodeSelect(index) {
      this.selectedNodes = []
      this.selectedNodes.push(index)
    },
    addNode({ type, clientPos, pid = 0 }) {
      this.nodes.push({
        id: nanoid(),
        pid,
        type,
        title: '',
        position: {
          x: (clientPos.x - this.canvasBase.x) / this.canvasBase.scale,
          y: (clientPos.y - this.canvasBase.y) / this.canvasBase.scale,
        },
        size: { w: 380, h: 180 },
        color: this.colors[0],
        fold: false,
        zinde: 1,
      })
    },
    updateNode(id, node) {
      const nodeIndex = this.nodes.findIndex(item => item.id === id)
      const mergeNode = { ...this.nodes[nodeIndex], ...node }
      this.nodes[nodeIndex] = mergeNode
    },
    removeNode(id) {
      const nodeIndex = this.nodes.findIndex(item => item.id === id)
      this.nodes.splice(nodeIndex, 1)
    },
  },
})
