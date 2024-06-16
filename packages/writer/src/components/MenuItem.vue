<template>
  <div
    class="py-1.5 px-1.5 rounded-md hover:bg-gray-100 cursor-pointer whitespace-nowrap text-sm text-gray-900 dark:text-gray-300 hover:dark:text-gray-200 flex items-center justify-between hover:dark:bg-gray-900 ">
    <div class="flex items-center space-x-2">
      <i :class="[icon, 'text-xl text-gray-500']" v-if="icon"></i>
      <span>
        <slot></slot>
      </span>
    </div>
    <i class="i-ri-arrow-right-s-line text-gray-400 dark:text-gray-600 text-xl" v-if="hasChild"></i>
  </div>
</template>
<script setup>
  defineProps({
    icon: {
      type: String,
      default: 'i-ri-compass-2-line'
    },
    hasChild: {
      type: Boolean,
      default: false
    }
  })
</script>
<style>

</style>