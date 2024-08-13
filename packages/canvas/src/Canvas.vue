<template>
  <div class="w-full h-full " data-simplebar data-simplebar-auto-hide="false">
    <div style="width: 125000px;height: 125000px;" class="bg-gray-100">
      a
    </div>
  </div>
</template>

<script setup>
import 'simplebar'
import 'simplebar/dist/simplebar.css'
import ResizeObserver from 'resize-observer-polyfill'
import { onMounted } from 'vue'

window.ResizeObserver = ResizeObserver
onMounted(() => {
  // const scrollableElement = document.querySelector('[data-simplebar] .simplebar-content-wrapper')
  // console.log(scrollableElement)
  // let isDragging = false
  // let startX, startY, scrollLeft, scrollTop

  // // 鼠标按下事件
  // scrollableElement.addEventListener('mousedown', (e) => {
  //   isDragging = true
  //   startX = e.pageX - scrollableElement.offsetLeft
  //   startY = e.pageY - scrollableElement.offsetTop
  //   scrollLeft = scrollableElement.scrollLeft
  //   scrollTop = scrollableElement.scrollTop
  // })

  // // 鼠标移动事件
  // scrollableElement.addEventListener('mousemove', (e) => {
  //   if (!isDragging)
  //     return
  //   e.preventDefault()
  //   const x = e.pageX - scrollableElement.offsetLeft
  //   const y = e.pageY - scrollableElement.offsetTop
  //   const walkX = (x - startX) * 2 // 调整滚动速度
  //   const walkY = (y - startY) * 2
  //   scrollableElement.scrollBy(-walkX, -walkY)
  // })

  // // 鼠标释放事件
  // scrollableElement.addEventListener('mouseup', () => {
  //   isDragging = false
  // })

  // // 鼠标离开事件（防止意外离开容器时仍在拖拽）
  // scrollableElement.addEventListener('mouseleave', () => {
  //   isDragging = false
  // })
})
</script>

<style>
</style>
