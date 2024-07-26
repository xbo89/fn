<template>
  <div
    class="w-6 h-6 rounded-md text-lg flex items-center justify-center cursor-pointer hover:bg-gray-300 active:bg-gray-400 flex-shrink-0"
    :style="{ visibility: visibility ? '' : 'hidden' }"
    :class="[transparent ? '' : 'bg-gray-100']"
  >
    <i
      :class="[`i-material-symbols-${icon}`, rotate ? 'rotate-90' : '']"
      :style="{
        fontSize: size === '' ? 'current' : `${size}px`,
      }"
    />
    <slot />
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '',
  },
  visibility: {
    type: Boolean,
    default: true,
  },
  transparent: {
    type: Boolean,
    default: false,
  },
  rotate: {
    type: Boolean,
    default: false,
  },
})
</script>
