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
      { name: 'red', background: '#FEEBE7', border: '#FFCDC2' },
      { name: 'orange', background: '#FFEFD6', border: '#FFD19A' },
      { name: 'green', background: '#E6F6EB', border: '#C4E8D1' },
      { name: 'blue', background: '#EDF2FE', border: '#D2DEFF' },
      { name: 'purple', background: '#F4F0FE', border: '#E1D9FF' },
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
        color: 0,
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
