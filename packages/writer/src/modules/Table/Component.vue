<template>
  <div ref="container" class="table-container relative">
    <div v-show="(!isAtLeft&&!noScrollbar)||isInMiddle"
      class="left-shadow w-2 left-0 inset-y-0 absolute border-l bg-gradient-to-r from-black/5  z-10" />
    <SimpleBar ref="simplebarElement" class="w-full whitespace-normal">
      <table data-nodeview-table ref="tableElement" class="w-96">
        <colgroup data-nodeview-colgroup />
        <tbody data-nodeview-tbody />
      </table>
    </SimpleBar>
    <div v-show="(!isAtRight && !noScrollbar)||isInMiddle"
      class="right-shadow w-2 right-0 inset-y-0 absolute border-r bg-gradient-to-l from-black/5" />
  </div>
</template>
<script setup>
  import SimpleBar from 'simplebar-vue'
  import 'simplebar-vue/dist/simplebar.min.css'
  import { ref, onMounted } from 'vue'

  const simplebarElement = ref(null)
  const tableElement = ref(null)

  const offsetLeft = ref(0)
  const offsetRight = ref(0)
  const isRight = ref(false)

  const noScrollbar = ref()
  const isAtLeft = ref()
  const isAtRight = ref()
  const isInMiddle = ref()


  const checkScrollPosition = (e) => {
    const tWidth = tableElement.value.offsetWidth
    const wWidth = simplebarElement.value.$el.offsetWidth
    const oleft = e.target.scrollLeft

    // 处理小数值的比较
    const roundedOleft = Math.round(oleft);
    const roundedWWidth = Math.round(wWidth);
    const roundedTWidth = Math.round(tWidth);

    // 判断是否存在实际滚动条
    const hasScrollbar = roundedTWidth > roundedWWidth;

    // 判断是否在最左边
    isAtLeft.value = roundedOleft === 0;

    // 判断是否在最右边
    isAtRight.value = roundedOleft + roundedWWidth >= roundedTWidth;

    // 判断是否在中间状态
    isInMiddle.value = hasScrollbar && !isAtLeft && !isAtRight;

    // 处理没有滚动条的状态
    noScrollbar.value = !hasScrollbar;

    // console.log('没有滚动条:', noScrollbar);
    // console.log('最左边:', isAtLeft);
    // console.log('最右边:', isAtRight);
    // console.log('中间状态:', isInMiddle);
  };

  onMounted(() => {
    const simplebarInstance = simplebarElement.value.SimpleBar.getScrollElement()
    console.log(simplebarElement.value)
    simplebarInstance.addEventListener('scroll', checkScrollPosition)
  })

</script>