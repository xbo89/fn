import { defineStore } from 'pinia'

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
  },
})
