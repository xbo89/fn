<template>
  <div ref="floating" class="shadow border rounded-lg px-4 py-2 bg-white" :style="floatingStyles" v-show="show"
    @mousedown.prevent.stop>
    <div @click="highlight"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9h8m-8 4h6m-1.99 5.594L8 21v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v5.5M16 19h6m-3-3v6"/></svg></div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useFloating, offset, flip, shift } from '@floating-ui/vue';
const show = ref(false)
const reference = ref(null)
const floating = ref(null)
const { floatingStyles } = useFloating(reference, floating, {
  placement: 'top',
  middleware: [offset(10), flip(), shift()]
});

const selection = window.getSelection()

document.addEventListener('mouseup', () => {
  console.log(selection.toString().length)
  if (selection.toString().length > 0) {
    show.value = true
    const range = selection.getRangeAt(0)
    const boundingClientRect = range.getBoundingClientRect()

    reference.value = {
      getBoundingClientRect() {
        return boundingClientRect
      },
    };
  }
}, false)
document.addEventListener('mousedown', () => {
  show.value = false
}, false)

const highlight = () => {
  if (selection.rangeCount > 0) {
        let range = selection.getRangeAt(0);
        let span = document.createElement('span');
        span.style.backgroundColor = 'yellow'; // 可根据需要自定义样式
        range.surroundContents(span);
        console.log(range)
    }
}
</script>
<style></style>