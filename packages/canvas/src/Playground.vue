<script setup>
import { ref } from 'vue'
import FCanvas from './lib/TheCanvas.vue'

const nodes = ref([

  {
    id: 'b7gO3uPc',
    pid: 0,
    type: 'group',
    title: '',
    position: {
      x: 0,
      y: 0,
    },
    size: {
      w: 400,
      h: 400,
    },
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
    position: {
      x: 0,
      y: 0,
    },
    size: {
      w: 300,
      h: 300,
    },
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
    position: {
      x: 0,
      y: 0,
    },
    size: {
      w: 600,
      h: 400,
    },
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
    position: {
      x: 0,
      y: 0,
    },
    size: {
      w: 600,
      h: 400,
    },
    color: {
      border: 1,
      background: 2,
    },
    fold: false,
    zinde: 1,
  },
  // {
  //   id: 'X3v9pFq7rt',
  //   pid: 'b7gO3uPc',
  //   type: 'card',
  //   title: '',
  //   position: {
  //     x: 0,
  //     y: 0,
  //   },
  //   size: {
  //     w: 600,
  //     h: 400,
  //   },
  //   color: {
  //     border: 1,
  //     background: 2,
  //   },
  //   fold: false,
  // },
  // {
  //   id: 'X3v9pFq7gfd',
  //   pid: 'b7gO3uPc',
  //   type: 'card',
  //   title: '',
  //   position: {
  //     x: 0,
  //     y: 0,
  //   },
  //   size: {
  //     w: 600,
  //     h: 400,
  //   },
  //   color: {
  //     border: 1,
  //     background: 2,
  //   },
  //   fold: false,
  // },
  // {
  //   id: 'X3v9pFq7cxv',
  //   pid: 'b7gO3uPc',
  //   type: 'card',
  //   title: '',
  //   position: {
  //     x: 0,
  //     y: 0,
  //   },
  //   size: {
  //     w: 600,
  //     h: 400,
  //   },
  //   color: {
  //     border: 1,
  //     background: 2,
  //   },
  //   fold: false,
  // },
  // {
  //   id: 'X3v9pFq7asdf',
  //   pid: 'b7gO3uPc',
  //   type: 'card',
  //   title: '',
  //   position: {
  //     x: 0,
  //     y: 0,
  //   },
  //   size: {
  //     w: 600,
  //     h: 400,
  //   },
  //   color: {
  //     border: 1,
  //     background: 2,
  //   },
  //   fold: false,
  // },
  // {
  //   id: 'X3v9pFq7asdfd',
  //   pid: 'b7gO3uPc',
  //   type: 'card',
  //   title: '',
  //   position: {
  //     x: 0,
  //     y: 0,
  //   },
  //   size: {
  //     w: 600,
  //     h: 400,
  //   },
  //   color: {
  //     border: 1,
  //     background: 2,
  //   },
  //   fold: false,
  // },
  // {
  //   id: 'X3v9pFq7asd',
  //   pid: 'b7gO3uPc',
  //   type: 'card',
  //   title: '',
  //   position: {
  //     x: 0,
  //     y: 0,
  //   },
  //   size: {
  //     w: 600,
  //     h: 400,
  //   },
  //   color: {
  //     border: 1,
  //     background: 2,
  //   },
  //   fold: false,
  // },
  // {
  //   id: 'X3v9pFq7sad',
  //   pid: 'b7gO3uPc',
  //   type: 'card',
  //   title: '',
  //   position: {
  //     x: 0,
  //     y: 0,
  //   },
  //   size: {
  //     w: 600,
  //     h: 400,
  //   },
  //   color: {
  //     border: 1,
  //     background: 2,
  //   },
  //   fold: false,
  // },
  // {
  //   id: 'X3v9pFq7dsa',
  //   pid: 'b7gO3uPc',
  //   type: 'card',
  //   title: '',
  //   position: {
  //     x: 0,
  //     y: 0,
  //   },
  //   size: {
  //     w: 600,
  //     h: 400,
  //   },
  //   color: {
  //     border: 1,
  //     background: 2,
  //   },
  //   fold: false,
  // },
  // {
  //   id: 'X3v9pFq7dsasdfgjj',
  //   pid: 'b7gO3uPc',
  //   type: 'card',
  //   title: '',
  //   position: {
  //     x: 0,
  //     y: 0,
  //   },
  //   size: {
  //     w: 600,
  //     h: 400,
  //   },
  //   color: {
  //     border: 1,
  //     background: 2,
  //   },
  //   fold: false,
  // },
])
const edges = ref([])
</script>

<template>
  <FCanvas
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
