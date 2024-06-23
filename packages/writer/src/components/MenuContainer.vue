<template>
  <div class="menu-container relative">
    <div class="reference" ref="reference" @mouseenter="mouseenterRef" @mouseleave="mouseleaveRef">
      <slot></slot>
    </div>
    <Teleport to="body" :disabled="!teleport">
      <div class="floating" ref="floating" :style="floatingStyles" v-if="floatingDisplay" @mouseenter="mouseenterFloat"
        @mouseleave="mouseleaveFloat" @mousedown="floatingDisplay=false">
        <slot name="floating"></slot>
      </div>
    </Teleport>
  </div>
</template>
<script setup>
  import { ref } from 'vue';
  import {
    useFloating,
    offset,
    flip,
    shift,
    autoUpdate,
    limitShift
  } from '@floating-ui/vue';


  const props = defineProps({
    teleport: {
      type: Boolean,
      default: true,
      required: false
    },
    placement: {
      type: String,
      default: 'bottom',
      required: false
    },
    offset: {
      type: Number,
      default: 6,
      required: false
    },
    shift: {
      type: Object,
      default: () => {
        return {
          crossAxis: false,
          padding: 0
        }
      },
      required: false
    },
    delay: {
      type: Number,
      default: 300,
      required: false
    }
  })

  const reference = ref(null);
  const floating = ref(null);
  const { floatingStyles } = useFloating(reference, floating, {
    placement: props.placement,
    middleware: [
      offset(props.offset),
      !props.shift.crossAxis && flip(),
      shift({ ...props.shift })
    ],
    whileElementsMounted: autoUpdate,
  });
  const floatingDisplay = ref(false)
  const timer = ref(null)

  const mouseenterRef = () => {
    clearTimeout(timer.value)
    timer.value = setTimeout(() => {
      floatingDisplay.value = true
    }, props.delay)
  }
  const mouseleaveRef = () => {
    clearTimeout(timer.value)
    timer.value = setTimeout(() => {
      floatingDisplay.value = false
    }, props.delay)
  }
  const mouseenterFloat = () => {
    clearTimeout(timer.value)
  }
  const mouseleaveFloat = () => {
    timer.value = setTimeout(() => {
      floatingDisplay.value = false
    }, props.delay)
  }
</script>
<style>

</style>