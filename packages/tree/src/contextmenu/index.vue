<template>
  <Teleport to="body">
    <div
      v-if="show"
      id="contextMenu"
      ref="contextMenu"
      class="contextmenu rounded-lg p-1 shadow-lg text-sm bg-white border border-0.5 border-gray-300"
      :style="floatingStyles"
      @mousedown="closeMenu"
    >
      <slot />
    </div>
  </Teleport>
</template>

<script>
import { defineComponent, onMounted, provide, reactive, ref, watch } from 'vue'
import { flip, useFloating } from '@floating-ui/vue'

export default defineComponent({
  setup() {
    const reference = ref()
    const contextMenu = ref()
    const { floatingStyles } = useFloating(reference, contextMenu, {
      placement: 'right-start',
      middleware: [flip()],
    })
    const show = ref(false)
    const data = ref()
    const pos = reactive({
      x: 0,
      y: 0,
    })
    provide('data', data)
    watch(show, (nv) => {
      if (nv) {
        document.addEventListener('click', closeMenu)
        window.addEventListener('resize', closeMenu)
      }
      else {
        document.removeEventListener('click', closeMenu)
        window.removeEventListener('resize', closeMenu)
      }
    })
    const position = ({ x, y }) => {
      pos.x = x
      pos.y = y
    }
    const closeMenu = () => {
      show.value = false
    }
    const toggle = (state) => {
      reference.value = {
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: pos.x,
            y: pos.y,
            top: pos.y,
            left: pos.x,
            right: pos.x,
            bottom: pos.y,
          }
        },
      }
      show.value = state
    }
    onMounted(() => {})
    return {
      position,
      toggle,
      show,
      pos,
      data,
      reference,
      contextMenu,
      floatingStyles,
    }
  },
})
</script>

<style scoped>
.contextmenu {
  min-width: 200px;
}
</style>
