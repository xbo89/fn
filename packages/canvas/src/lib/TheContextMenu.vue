<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0"
      @wheel.stop.prevent
      @contextmenu.stop.prevent="show = false"
      @mousedown.stop.prevent="show = false"
    />
    <div
      v-if="show"
      class="absolute left-0 top-0 bg-white border border-gray-200 rounded-lg p-1 drop-shadow-[0_26px_35px_rgba(0,0,0,0.1)] space-y-0.5 "
      :style="{
        transform: `translate(${position.x}px,${position.y}px)`,
      }"
    >
      <slot />
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  position: {
    type: Object,
    default: () => ({ x: 0, y: 0 }),
  },
})
const show = defineModel()
</script>
