<script setup>
import { ref } from 'vue'

const nodes = ref([

  {
    id: 'b7gO3uPc',
    pid: 0,
    type: 'group',
    title: 'Card Group For Green Test',
    position: { x: 482.23419374974924, y: 449.14362109830057 },
    size: { w: 941.039137978995, h: 1044.7700159269161 },
    color: {
      border: 1,
      background: 2,
    },
    fold: false,
    zinde: 1,
  },
  {
    id: '9wL2xqXH',
    pid: 0,
    type: 'card',
    title: '',
    position: { x: 169.02206361267915, y: 446.89501465479816 },
    size: { w: 300, h: 766.3144746449944 },
    color: {
      border: 1,
      background: 2,
    },
    fold: false,
    zinde: 1,
  },

  {
    id: 'X3v9pFq7dghgf',
    pid: 'b7gO3uPc',
    type: 'card',
    title: '',
    position: { x: 514.5126363710378, y: 1057.8557079081634 },
    size: { w: 600, h: 400 },
    color: {
      border: 1,
      background: 2,
    },
    fold: false,
    zinde: 1,
  },
  {
    id: 'X3v9pFq7hfgh',
    pid: 'b7gO3uPc',
    type: 'card',
    title: '',
    position: { x: 517.7319240528658, y: 471.8555739117456 },
    size: { w: 870.759395014655, h: 571.542757260401 },
    color: {
      border: 1,
      background: 2,
    },
    fold: false,
    zinde: 1,
  },
])
const edges = ref([])
</script>

<template>
  <TheCanvas
    v-model:nodes="nodes"
    v-model:edges="edges"
  />
</template>

<style>
body,html,#app{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  touch-action: none;
}
</style>
