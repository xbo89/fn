<template>
  <Tree v-model="data" :data="data" />
</template>

<script setup>
import { ref } from 'vue'
import Tree from './index.vue'

const data = ref([
  {
    id: 'MKYinmh2iTxw',
    title: 'aaa',
    toggle: false,
    children: [
      {
        id: 'GHgh7SaX79Pu',
        title: 'bbb',
        toggle: false,
        children: [],
      },
    ],
  },
  {
    id: 'sxVIgXTHVmOe',
    title: 'bbb',
    toggle: false,
    children: [],
  },
  {
    id: 'pJqfG0HYKbNW',
    title: 'ccc',
    toggle: false,
    children: [],
  },
])
</script>

<style scoped>

</style>
