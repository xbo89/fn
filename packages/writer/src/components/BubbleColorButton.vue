<template>
  <div
    class="rounded-lg w-7 h-7 shrink-0 cursor-pointer outline outline-offset-1 outline-0 hover:outline-gray-500 hover:outline-2"
    :style="{background:color}" v-if="mode==='color'" @mousedown="emit('selectColor',color)"
    :class="[active&&' outline-primary-500 outline-2']">
  </div>
  <div class="rounded-lg w-7 h-7 shrink-0 cursor-pointer border inline-flex justify-center items-center"
    v-if="mode==='empty'" @mousedown="emit('selectColor',color)">
    <i class="i-ri-prohibited-2-line text-gray-300 text-xl"></i>
  </div>
</template>
<script setup>
  const emit = defineEmits(['selectColor'])
  defineProps({
    color: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'color'
    },
    active: {
      type: Boolean,
      default: false
    }
  })
</script>