<template>
  <Tree :data="data" />
</template>

<script setup>
import { ref } from 'vue'
import Tree from './index.vue'

const data = ref([
  {
    title: 'aaa',
    children: [
      {
        title: 'bbb',
        children: [],
      },
    ],
  },
  {
    title: 'bbb',
    children: [],
  },
  {
    title: 'ccc',
    children: [],
  },
])
</script>

<style scoped>

</style>
