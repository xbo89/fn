<template>
  <div class="flex items-center space-x-2 px-2 py-2 rounded w-52">
    <template v-for="(color, index) in colors" :key="color.name">
      <div
        class="size-6 rounded bg-gray-300 cursor-pointer"
        :class="index === colorIndex
          ? 'outline outline-2 outline-offset-1 outline-blue-600'
          : ''"
        :style="{
          border: `1px solid ${color.border}`,
          background: color.background,
        }"
        @click.stop="handleColor(index)"
      />
    </template>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCanvasStore } from '@/useStore/useCanvasStore'

defineProps({
  colorIndex: {
    type: Number,
    default: 0,
  },
})
const emits = defineEmits('handleColor')
const store = useCanvasStore()
const { colors } = storeToRefs(store)

function handleColor(index) {
  emits('handleColor', index)
}
</script>
