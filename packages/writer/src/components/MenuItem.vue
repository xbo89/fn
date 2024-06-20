<template>
  <div
    class="py-1.5 px-1.5 rounded-md hover:bg-gray-100 hover:dark:bg-gray-900 cursor-pointer whitespace-nowrap text-sm flex items-center justify-between "
    :class="[active&&'bg-gray-50 hover:bg-primary-50 text-primary-500']">
    <div class="flex items-center space-x-2">
      <i :class="[icon, 'text-xl text-gray-500',active&&'text-primary-500']" v-if="icon"></i>
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
      default: 'i-ri-compass-2-line',
      required: false
    },
    hasChild: {
      type: Boolean,
      default: false,
      required: false
    },
    active: {
      type: Boolean,
      default: false,
      required: false
    }
  })
</script>
<style>

</style>