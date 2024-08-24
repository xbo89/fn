import { defineStore } from 'pinia'

export const useCanvasStore = defineStore('canvas', {
  state: () => ({
    nodes: [],
    selectedNodes: [],
    canvas: {
      scale: 1,
      position: {
        x: 0,
        y: 0,
      },
    },
  }),
  getters: {
    doubleCount: state => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
