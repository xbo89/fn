<script setup>
import { ref } from 'vue'
import FCanvas from './Canvas.vue'

const data = ref([
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
  },
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
  },
  {
    id: 'X3v9pFq7',
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
  },

])
</script>

<template>
  <FCanvas v-model="data" />
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
