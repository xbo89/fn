<template>
  <div class="card-container fixed top-10 left-10 bg-white w-96 h-96 z-50 rounded-xl select-none border shadow-lg"
    :style="{
      transform: `translate(${cardConfigure.x}px, ${cardConfigure.y}px)`,
      width: cardConfigure.width + 'px',
      height: cardConfigure.height + 'px'
    }">
    <div class="card-header border-b px-4 py-2 font-medium">
      <div class="text-base">hello</div>
    </div>
    <slot />
  </div>
</template>
<script setup>
  import interact from 'interactjs'
  import { reactive } from 'vue'

  const cardConfigure = reactive({
    x: 0,
    y: 0,
    width: 260,
    height: 420
  })

  interact('.card-header').draggable({
    listeners: {
      start(event) {
        console.log(event.type, event.target)
      },
      move(event) {
        cardConfigure.x += event.dx
        cardConfigure.y += event.dy
      }
    }
  })
  interact('.card-container').resizable({
    edges: { top: true, left: true, bottom: true, right: true },
    listeners: {
      move: function (event) {
        let { x, y } = event.target.dataset

        x = (parseFloat(x) || 0) + event.deltaRect.left
        y = (parseFloat(y) || 0) + event.deltaRect.top
        cardConfigure.width = event.rect.width
        cardConfigure.height = event.rect.height
        cardConfigure.x += x
        cardConfigure.y += y
      }
    }
  })
</script>
<style></style>