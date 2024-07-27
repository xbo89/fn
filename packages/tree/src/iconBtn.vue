<template>
  <div
    class="size-6 rounded-lg text-xl flex items-center justify-center cursor-pointer hover:bg-gray-200 active:bg-gray-300 flex-shrink-0 text-gray-400"
    :style="{ visibility: visibility ? '' : 'hidden' }"
  >
    <i :class="[icon, rotate ? 'rotate-90' : '']" />
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: 'i-ri-arrow-drop-right-line',
  },
  visibility: {
    type: Boolean,
    default: true,
  },
  // transparent: {
  //   type: Boolean,
  //   default: true,
  // },
  rotate: {
    type: Boolean,
    default: false,
  },
})
</script>
