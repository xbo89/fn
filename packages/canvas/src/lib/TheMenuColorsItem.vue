<template>
  <div class="flex items-center space-x-2 px-2 py-2 rounded w-52">
    <template v-for="color in colors" :key="color.name">
      <div class="size-6 rounded bg-gray-300 cursor-pointer" :style="{ border: `1px solid ${color.border}`, background: color.background }" @click="handleColor(color)" />
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emits = defineEmits('handleColor')

const colors = ref([
  { name: 'white', background: '#fff', border: '#ccc' },
  { name: 'red', background: '#fecdd3', border: '#e11d48' },
  { name: 'orange', background: '#fed7aa', border: '#ea580c' },
  { name: 'green', background: '#a7f3d0', border: '#059669' },
  { name: 'blue', background: '#bfdbfe', border: '#2563eb' },
  { name: 'purple', background: '#ddd6fe', border: '#7c3aed' },
])

function handleColor(color) {
  emits('handleColor', color)
}
</script>
