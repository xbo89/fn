<template>
  <div class="menu-container relative">
    <div ref="reference" class="reference" @mouseenter="mouseenterRef" @mouseleave="mouseleaveRef">
      <slot />
    </div>
    <Teleport to="body" :disabled="!teleport">
      <div
        v-if="floatingDisplay" ref="floating" class="floating" :style="floatingStyles" @mouseenter="mouseenterFloat"
        @mouseleave="mouseleaveFloat"
        @mousedown="floatingDisplay = false"
      >
        <!-- @mousedown="floatingDisplay = false" -->
        <slot name="floating" />
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from '@floating-ui/vue'

const props = defineProps({
  teleport: {
    type: Boolean,
    default: true,
    required: false,
  },
  placement: {
    type: String,
    default: 'bottom',
    required: false,
  },
  offset: {
    type: Number,
    default: 6,
    required: false,
  },
  shift: {
    type: Object,
    default: () => {
      return {
        crossAxis: false,
        padding: 0,
      }
    },
    required: false,
  },
  delay: {
    type: Number,
    default: 300,
    required: false,
  },
})

const reference = ref(null)
const floating = ref(null)
const { floatingStyles } = useFloating(reference, floating, {
  placement: props.placement,
  middleware: [
    offset(props.offset),
    !props.shift.crossAxis && flip(),
    shift({ ...props.shift }),
  ],
  whileElementsMounted: autoUpdate,
})
const floatingDisplay = ref(false)
const timer = ref(null)

function mouseenterRef() {
  clearTimeout(timer.value)
  timer.value = setTimeout(() => {
    floatingDisplay.value = true
  }, props.delay)
}
function mouseleaveRef() {
  clearTimeout(timer.value)
  timer.value = setTimeout(() => {
    floatingDisplay.value = false
  }, props.delay)
}
function mouseenterFloat() {
  clearTimeout(timer.value)
}
function mouseleaveFloat() {
  timer.value = setTimeout(() => {
    floatingDisplay.value = false
  }, props.delay)
}
</script>
