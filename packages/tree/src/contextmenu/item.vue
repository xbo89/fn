<template>
  <div id="ContextmenuItem" class="" @click="onClick">
    <div
      class="flex hover:bg-blue-700 hover:text-white px-2 py-1.5 rounded cursor-pointer space-x-2"
      :class="[submenuHoverState ? 'bg-gray-200' : '']"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave"
    >
      <i
        v-if="icon"
        :class="[`i-material-symbols-${icon}`]"
        class="text-xl text-gray-400 shrink-0"
      />
      <div class="flex items-center justify-between w-full">
        <slot :info="data" />
        <span class="text-xs text-gray-400">{{ shortkey }}</span>
        <span v-if="slotsSub">▶</span>
      </div>
    </div>
    <div
      v-if="slotsSub"
      v-show="submenuState"
      class="absolute bg-white left-full shadow-lg p-1 rounded top-2"
      @mouseenter="mouseenter"
    >
      <slot name="submenu" />
    </div>
  </div>
</template>

<script>
import { defineComponent, inject, ref, useSlots } from 'vue'

export default defineComponent({
  props: ['icon', 'shortkey'],
  emits: ['onclick'],
  setup(props, { emit }) {
    const slotsSub = !!useSlots().submenu
    const submenuState = ref(false)
    const submenuHoverState = ref(false)
    const timer = ref()
    const data = inject('data')
    const mouseenter = () => {
      submenuHoverState.value = true
      submenuState.value = true
      clearTimeout(timer.value)
    }
    const mouseleave = () => {
      submenuHoverState.value = false
      timer.value = setTimeout(() => {
        submenuState.value = false
      }, 200)
    }
    const onClick = () => {
      emit('onclick', data.value)
    }
    return {
      slotsSub,
      submenuState,
      submenuHoverState,
      mouseenter,
      mouseleave,
      onClick,
      timer,
      data,
    }
  },
})
</script>

<style></style>
