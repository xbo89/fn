<template>
  <div class="w-full h-full block touch-none" :class="[spaceKeyDown ? 'cursor-grab' : '', spaceKeyDown && mouseLeftButton ? 'cursor-grabbing' : '']">
    <div
      ref="scrollableElement" class="fixed flex justify-center items-center touch-none " :style="{
        width: `${width}px`,
        height: `${height}px`,
        left: `${originX}px`,
        top: `${originY}px`,
      }"
    >
      <div class="z-50 size-60 bg-red-400">
        aa
      </div>
      <svg class="absolute left-0 top-0" style="height: 100%; width: 100%;"><pattern id="pattern-vue-flow-0" x="-5.691166989039337" y="0.9687298517085381" width="9.38749194068343" height="9.38749194068343" patternTransform="translate(-0.2933591231463572,-0.2933591231463572)" patternUnits="userSpaceOnUse"><circle cx="0.2933591231463572" cy="0.2933591231463572" r="0.2933591231463572" fill="#aaa" /><!----></pattern><rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-vue-flow-0)" /></svg>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  width: {
    type: Number,
    default: 12500,
  },
  height: {
    type: Number,
    default: 12500,
  },
})

window.ResizeObserver = ResizeObserver
const scrollableElement = ref(null)
const spaceKeyDown = ref(false)
const mouseLeftButton = ref(false)
const scale = ref(1)
const initialDistance = ref(0)
const isPinching = ref(false)
const pointers = ref(new Map()) // 用于存储当前的指针事件

const originX = ref(-(props.width / 2 - window.innerWidth / 2))
const originY = ref(-(props.height / 2 - window.innerHeight / 2))

onMounted(() => {
  // document.addEventListener('keydown', (ev) => {
  //   if (ev.keyCode === 32) {
  //     ev.preventDefault()
  //     spaceKeyDown.value = true
  //   }
  // }, false)
  // document.addEventListener('keyup', (ev) => {
  //   if (ev.keyCode === 32) {
  //     ev.preventDefault()
  //     spaceKeyDown.value = false
  //   }
  // }, false)
  // // 监听鼠标按下事件
  // document.addEventListener('mousedown', (event) => {
  //   if (event.button === 0) { // 0 表示鼠标左键
  //     mouseLeftButton.value = true
  //   }
  // })
  // // 监听鼠标松开事件
  // document.addEventListener('mouseup', (event) => {
  //   if (event.button === 0) {
  //     mouseLeftButton.value = false
  //   }
  // })
  document.addEventListener('wheel', (event) => {
  // Prevent the page from scrolling
    event.preventDefault()
    wheelEvent(event)

    // Calculate the new positions
    let newPositionX = originX.value - event.deltaX
    let newPositionY = originY.value - event.deltaY

    // Edge detection and correction
    if (newPositionX > 0) {
      newPositionX = 0 // Prevent moving right beyond the left edge
    }

    if (newPositionY > 0) {
      newPositionY = 0 // Prevent moving down beyond the top edge
    }

    // Update positions only if they are valid
    originX.value = newPositionX
    originY.value = newPositionY

    // Log the positions (optional)
    // console.log(positionX, positionY)

    // Set the new position
    scrollableElement.value.style.left = `${originX.value}px`
    scrollableElement.value.style.top = `${originY.value}px`
  }, { passive: false })

  // 计算两点之间的距离
  function getDistance(pointers) {
    const [pointer1, pointer2] = [...pointers.values()]
    const deltaX = pointer1.clientX - pointer2.clientX
    const deltaY = pointer1.clientY - pointer2.clientY
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY)
  }

  // 监听指针按下事件
  scrollableElement.value.addEventListener('pointerdown', (event) => {
    event.preventDefault()
    pointers.value.set(event.pointerId, event)

    console.log(pointers.value.size)
    if (pointers.value.size === 2) { // 检查是否有两个触摸点
      initialDistance.value = getDistance(pointers)
      isPinching.value = true
    }
  })

  // 监听指针移动事件
  scrollableElement.value.addEventListener('pointermove', (event) => {
    event.preventDefault()
    // console.log(event)
    if (isPinching.value && pointers.value.size === 2) {
      pointers.value.set(event.pointerId, event)

      const currentDistance = getDistance(pointers)
      const scale = currentDistance / initialDistance.value

      console.log('缩放比例:', scale)
      // 在这里，你可以根据 `scale` 的值来缩放元素
      // 例如：element.style.transform = `scale(${scale})`;

      initialDistance.value = currentDistance // 更新初始距离
    }
  })

  // 监听指针松开或取消事件
  scrollableElement.value.addEventListener('pointerup', (event) => {
    event.preventDefault()
    pointers.value.delete(event.pointerId)

    if (pointers.value.size < 2) { // 检查是否有触摸点减少到少于两个
      isPinching.value = false
    }
  })

  scrollableElement.value.addEventListener('pointercancel', (event) => {
    pointers.value.delete(event.pointerId)

    if (pointers.value.size < 2) {
      isPinching.value = false
    }
  })
})
function wheelEvent(e) {
  if (Math.abs(e.deltaX) !== 0 && Math.abs(e.deltaY) !== 0)
    return console.log('没有固定方向')
  if (e.deltaX < 0)
    return console.log('向右')
  if (e.deltaX > 0)
    return console.log('向左')
  if (e.ctrlKey) {
    if (e.deltaY > 0)
      return console.log('向内')
    if (e.deltaY < 0)
      return console.log('向外')
  }
  else {
    if (e.deltaY > 0)
      return console.log('向上')
    if (e.deltaY < 0)
      return console.log('向下')
  }
}
</script>

<style>
</style>
